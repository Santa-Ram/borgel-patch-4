import { useState, useEffect } from 'react';
import { Trash2, Send, CheckCircle, XCircle, Search, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demo = [
  { id:1, email:'marie@example.com',  subscribed_at:'2025-01-22T10:00:00Z', is_active:true },
  { id:2, email:'pierre@example.com', subscribed_at:'2025-01-20T09:00:00Z', is_active:true },
  { id:3, email:'sophie@example.com', subscribed_at:'2025-01-18T14:00:00Z', is_active:false },
  { id:4, email:'jean@example.com',   subscribed_at:'2025-01-15T11:00:00Z', is_active:true },
];

export default function NewsletterAdmin() {
  const [subs, setSubs]           = useState<any[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState<'all'|'active'|'inactive'>('all');
  const [confirmDel, setConfirmDel] = useState<any>(null);

  useEffect(() => {
    API.get('/admin/newsletter/')
      .then(r => setSubs(r.data.results || r.data))
      .catch(() => setSubs(demo))
      .finally(() => setLoading(false));
  }, []);

  const list = subs.length > 0 ? subs : demo;

  const displayed = list.filter(s => {
    const matchSearch = s.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'active' && s.is_active) || (filter === 'inactive' && !s.is_active);
    return matchSearch && matchFilter;
  });

  const handleDelete = async (s: any) => {
    try {
      await API.delete(`/admin/newsletter/${s.id}/`);
      setSubs(p => p.filter(x => x.id !== s.id));
      showToast('success', `${s.email} désinscrit`);
    } catch { showToast('error', 'Erreur'); }
    setConfirmDel(null);
  };

  const toggleActive = async (s: any) => {
    try {
      await API.patch(`/admin/newsletter/${s.id}/`, { is_active: !s.is_active });
      setSubs(p => p.map(x => x.id === s.id ? { ...x, is_active: !x.is_active } : x));
      showToast('success', s.is_active ? 'Abonné désactivé' : 'Abonné réactivé');
    } catch { showToast('error', 'Erreur'); }
  };

  const activeCount = list.filter(s => s.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Newsletter</h1>
          <p className="text-sm text-white/50">{activeCount} abonné{activeCount !== 1 ? 's' : ''} actif{activeCount !== 1 ? 's' : ''} · {list.length} total</p>
        </div>
        <div className="glass-card px-4 py-2.5 flex items-center gap-2">
          <Send size={14} className="text-orange-400"/>
          <span className="text-sm text-white/70">{activeCount} destinataires</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label:'Total', value:list.length, color:'text-white' },
          { label:'Actifs', value:list.filter(s=>s.is_active).length, color:'text-green-400' },
          { label:'Inactifs', value:list.filter(s=>!s.is_active).length, color:'text-red-400' },
        ].map(s => (
          <div key={s.label} className="glass-card p-4">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-white/40">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
          <input
            type="search" placeholder="Rechercher un email..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="input-dark pl-8"
          />
        </div>
        <div className="flex gap-2">
          {(['all','active','inactive'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                filter === f ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}>
              {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Inactifs'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"/>
          </div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center">
            <Mail size={32} className="text-white/20 mx-auto mb-3"/>
            <p className="text-white/40">{search ? 'Aucun résultat' : 'Aucun abonné'}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Email</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider hidden sm:table-cell">Date inscription</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(s => (
                <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                        <Mail size={12} className="text-orange-400"/>
                      </div>
                      <span className="text-white">{s.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell text-white/50 text-xs">
                    {new Date(s.subscribed_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggleActive(s)}>
                      {s.is_active
                        ? <span className="badge badge-green flex items-center gap-1 w-fit"><CheckCircle size={9}/>Actif</span>
                        : <span className="badge badge-red flex items-center gap-1 w-fit"><XCircle size={9}/>Inactif</span>
                      }
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => setConfirmDel(s)} className="btn-ghost text-red-400 p-1.5">
                      <Trash2 size={13}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirm delete */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Désinscrire cet abonné ?</h3>
              <p className="text-sm text-white/60 mb-4">{confirmDel.email}</p>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setConfirmDel(null)} className="btn-secondary">Annuler</button>
                <button onClick={() => handleDelete(confirmDel)} className="btn-danger"><Trash2 size={13}/>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
