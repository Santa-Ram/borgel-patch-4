import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, XCircle } from 'lucide-react';
import API from '../api/client';
import toast from 'react-hot-toast';

const demo = [
  { id: 1, name: 'Accidents de la circulation', slug: 'accidents-circulation', icon: '🚗', is_active: true, order: 1 },
  { id: 2, name: 'Droit de la santé', slug: 'droit-sante', icon: '🏥', is_active: true, order: 2 },
  { id: 3, name: 'Assurance & Dommage corporel', slug: 'assurance-dommage', icon: '🛡️', is_active: true, order: 3 },
  { id: 4, name: 'Responsabilité médicale', slug: 'responsabilite-medicale', icon: '⚖️', is_active: false, order: 4 },
];

export default function ExpertisesAdmin() {
  const [expertises, setExpertises] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/admin/expertises/').then(r=>setExpertises(r.data.results||r.data)).catch(()=>setExpertises(demo)).finally(()=>setLoading(false));
  }, []);

  const toggle = async (e: any) => {
    try { await API.patch(`/admin/expertises/${e.slug}/`,{is_active:!e.is_active}); setExpertises(p=>p.map(x=>x.id===e.id?{...x,is_active:!x.is_active}:x)); toast.success('Mis à jour'); }
    catch { toast.error('Erreur'); }
  };
  const del = async (slug: string) => {
    if (!confirm('Supprimer cette expertise ?')) return;
    try { await API.delete(`/admin/expertises/${slug}/`); setExpertises(p=>p.filter(x=>x.slug!==slug)); toast.success('Supprimé'); }
    catch { toast.error('Erreur'); }
  };

  const list = expertises.length > 0 ? expertises : demo;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Expertises</h1><p className="text-sm text-white/50">{list.length} domaine{list.length!==1?'s':''}</p></div>
        <button className="btn-primary"><Plus size={15}/> Ajouter expertise</button>
      </div>
      <div className="glass-card overflow-hidden">
        {loading ? <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"/></div> : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/10"><th className="text-left py-3 px-4 text-white/50 text-xs uppercase">Domaine</th><th className="text-left py-3 px-4 text-white/50 text-xs uppercase hidden md:table-cell">Slug</th><th className="text-left py-3 px-4 text-white/50 text-xs uppercase hidden sm:table-cell">Ordre</th><th className="text-left py-3 px-4 text-white/50 text-xs uppercase">Statut</th><th className="text-right py-3 px-4 text-white/50 text-xs uppercase">Actions</th></tr></thead>
            <tbody>
              {list.map((e:any)=>(
                <tr key={e.id} className="border-b border-white/5 hover:bg-white/3 transition">
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><span className="text-xl">{e.icon}</span><p className="text-white font-medium">{e.name}</p></div></td>
                  <td className="py-3 px-4 hidden md:table-cell"><code className="text-xs text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded">{e.slug}</code></td>
                  <td className="py-3 px-4 hidden sm:table-cell text-white/50">{e.order}</td>
                  <td className="py-3 px-4"><button onClick={()=>toggle(e)}>{e.is_active?<span className="badge badge-green flex items-center gap-1 w-fit"><CheckCircle size={10}/>Actif</span>:<span className="badge badge-red flex items-center gap-1 w-fit"><XCircle size={10}/>Inactif</span>}</button></td>
                  <td className="py-3 px-4"><div className="flex justify-end gap-1"><button className="btn-ghost p-1.5">✏️</button><button onClick={()=>del(e.slug)} className="btn-ghost text-red-400 p-1.5"><Trash2 size={13}/></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
