import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Search, Save, ArrowLeft, HelpCircle, Tag, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demoFaqs = [
  { id:1, question:"Comment fonctionne une expertise médicale ?", answer:"L'expertise médicale est une évaluation réalisée par un médecin expert...", keywords:"expertise,médecin", category:"Droit de la santé", is_active:true, order:1 },
  { id:2, question:"Quel est le délai pour engager une action en justice ?", answer:"Les délais de prescription varient selon le type de dommage...", keywords:"délai,prescription", category:"Procédure", is_active:true, order:2 },
];

const emptyForm = { question:'', answer:'', keywords:'', category:'', order:0, is_active:true };

const CATEGORIES = ['Droit de la santé', 'Accidents', 'Procédure', 'Honoraires', 'Général'];

export default function FaqAdmin() {
  const [faqs, setFaqs]         = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState<'all'|'active'|'inactive'>('all');
  const [view, setView]         = useState<'list'|'form'>('list');
  const [editing, setEditing]   = useState<any>(null);
  const [form, setForm]         = useState<any>(emptyForm);
  const [saving, setSaving]     = useState(false);
  const [confirmDel, setConfirmDel] = useState<any>(null);
  const [keywordInput, setKeywordInput] = useState('');

  useEffect(() => {
    API.get('/admin/faq/')
      .then(r => setFaqs(r.data.results || r.data))
      .catch(() => setFaqs(demoFaqs))
      .finally(() => setLoading(false));
  }, []);

  const list = faqs.length > 0 ? faqs : demoFaqs;

  const displayed = list.filter(f => {
    const q = search.toLowerCase();
    const matchSearch = !q || f.question.toLowerCase().includes(q) || (f.keywords||'').toLowerCase().includes(q);
    const matchFilter = filter === 'all' || (filter === 'active' && f.is_active) || (filter === 'inactive' && !f.is_active);
    return matchSearch && matchFilter;
  });

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));

  const keywords = (): string[] => form.keywords ? form.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];
  const addKeyword = () => {
    const kw = keywordInput.trim().toLowerCase();
    if (!kw) return;
    const existing = keywords();
    if (!existing.includes(kw)) set('keywords', [...existing, kw].join(','));
    setKeywordInput('');
  };
  const removeKeyword = (kw: string) => {
    set('keywords', keywords().filter(k => k !== kw).join(','));
  };

  const openNew = () => { setEditing(null); setForm(emptyForm); setKeywordInput(''); setView('form'); };
  const openEdit = (f: any) => { setEditing(f); setForm({ ...emptyForm, ...f }); setKeywordInput(''); setView('form'); };

  const handleSave = async () => {
    if (!form.question.trim()) { showToast('error', 'La question est obligatoire'); return; }
    if (!form.answer.trim())   { showToast('error', 'La réponse est obligatoire'); return; }
    setSaving(true);
    try {
      if (editing) {
        const res = await API.patch(`/admin/faq/${editing.id}/`, form);
        setFaqs(p => p.map(x => x.id === editing.id ? res.data : x));
        showToast('success', 'FAQ mise à jour');
      } else {
        const res = await API.post('/admin/faq/', form);
        setFaqs(p => [res.data, ...p]);
        showToast('success', 'FAQ ajoutée');
      }
      setView('list');
    } catch (err: any) {
      showToast('error', JSON.stringify(err?.response?.data || 'Erreur').substring(0, 100));
    } finally { setSaving(false); }
  };

  const handleDelete = async (f: any) => {
    try {
      await API.delete(`/admin/faq/${f.id}/`);
      setFaqs(p => p.filter(x => x.id !== f.id));
      showToast('success', 'FAQ supprimée');
      if (view === 'form') setView('list');
    } catch { showToast('error', 'Erreur lors de la suppression'); }
    setConfirmDel(null);
  };

  const toggle = async (f: any) => {
    try {
      await API.patch(`/admin/faq/${f.id}/`, { is_active: !f.is_active });
      setFaqs(p => p.map(x => x.id === f.id ? { ...x, is_active: !x.is_active } : x));
    } catch { showToast('error', 'Erreur'); }
  };

  /* ── FORM ─────────────────────────────────────────────── */
  if (view === 'form') return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => setView('list')} className="btn-ghost p-1.5"><ArrowLeft size={16}/></button>
        <div>
          <h1 className="text-xl font-bold text-white">{editing ? 'Modifier la FAQ' : 'Nouvelle FAQ'}</h1>
          <p className="text-sm text-white/50">{editing ? editing.question.substring(0,50)+'...' : 'Ajouter une question/réponse'}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Question *</label>
              <textarea value={form.question} onChange={e => set('question', e.target.value)}
                className="input-dark resize-none" rows={3} placeholder="Comment fonctionne une expertise médicale ?"/>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Réponse *</label>
              <textarea value={form.answer} onChange={e => set('answer', e.target.value)}
                className="input-dark resize-none" rows={6} placeholder="Rédigez une réponse claire et complète..."/>
            </div>
          </div>

          {/* Mots-clés */}
          <div className="glass-card p-5">
            <label className="text-xs text-white/50 block mb-3">
              <Tag size={11} className="inline mr-1"/>Mots-clés (pour la recherche)
            </label>
            <div className="flex gap-2 mb-3">
              <input type="text" value={keywordInput} onChange={e => setKeywordInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addKeyword(); }}}
                className="input-dark flex-1" placeholder="ex: accident, indemnisation..."/>
              <button onClick={addKeyword} className="btn-secondary px-3">
                <Plus size={14}/>
              </button>
            </div>
            {keywords().length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {keywords().map(kw => (
                  <span key={kw} className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">
                    #{kw}
                    <button onClick={() => removeKeyword(kw)} className="ml-1 hover:text-red-400 transition">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="glass-card p-4 space-y-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Paramètres</p>

            <div>
              <label className="text-xs text-white/50 block mb-1.5">Catégorie</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="input-dark">
                <option value="">Sans catégorie</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-white/50 block mb-1.5">Ordre</label>
              <input type="number" value={form.order} onChange={e => set('order', parseInt(e.target.value)||0)}
                className="input-dark" min={0}/>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Visible sur le site</span>
              <button onClick={() => set('is_active', !form.is_active)}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? 'bg-orange-500' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`}/>
              </button>
            </div>

            <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center py-2.5">
              <Save size={14}/>{saving ? 'Sauvegarde...' : (editing ? 'Mettre à jour' : 'Ajouter la FAQ')}
            </button>
            {editing && (
              <button onClick={() => setConfirmDel(editing)} className="btn-danger w-full justify-center py-2">
                <Trash2 size={14}/>Supprimer
              </button>
            )}
            <button onClick={() => setView('list')} className="btn-secondary w-full justify-center py-2">Annuler</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer cette FAQ ?</h3>
              <p className="text-sm text-white/60 mb-4 line-clamp-2">"{confirmDel.question}"</p>
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

  /* ── LIST ─────────────────────────────────────────────── */
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ</h1>
          <p className="text-sm text-white/50">{list.filter(f=>f.is_active).length} publiées · {list.filter(f=>!f.is_active).length} masquées</p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={15}/>Ajouter une FAQ</button>
      </div>

      {/* Filtres */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
          <input type="search" placeholder="Rechercher une question ou mot-clé..."
            value={search} onChange={e => setSearch(e.target.value)} className="input-dark pl-8"/>
        </div>
        <div className="flex gap-2">
          {(['all','active','inactive'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${
                filter === f ? 'bg-orange-500/20 border-orange-500/40 text-orange-400' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
              }`}>
              {f === 'all' ? 'Toutes' : f === 'active' ? 'Publiées' : 'Masquées'}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"/></div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center">
            <HelpCircle size={36} className="text-white/20 mx-auto mb-3"/>
            <p className="text-white/40">{search ? 'Aucun résultat' : 'Aucune FAQ — cliquez sur "Ajouter une FAQ"'}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Question</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider hidden md:table-cell">Catégorie</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider hidden lg:table-cell">Mots-clés</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(f => (
                <tr key={f.id} className="border-b border-white/5 hover:bg-white/3 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-start gap-2">
                      <HelpCircle size={13} className="text-orange-400 mt-0.5 shrink-0"/>
                      <p className="text-white font-medium line-clamp-2 max-w-xs">{f.question}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-xs text-white/50 bg-white/5 px-2 py-0.5 rounded">{f.category || '—'}</span>
                  </td>
                  <td className="py-3 px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(f.keywords||'').split(',').filter(Boolean).slice(0,3).map((k: string) => (
                        <span key={k.trim()} className="text-[10px] px-1.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400">#{k.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggle(f)}
                      className={`text-xs px-2 py-0.5 rounded-full border transition ${
                        f.is_active ? 'badge badge-green' : 'badge badge-red'
                      }`}>
                      {f.is_active ? 'Publiée' : 'Masquée'}
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(f)} className="btn-ghost p-1.5"><Edit3 size={13}/></button>
                      <button onClick={() => setConfirmDel(f)} className="btn-ghost text-red-400 p-1.5"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <AnimatePresence>
        {confirmDel && view === 'list' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer cette FAQ ?</h3>
              <p className="text-sm text-white/60 mb-4 line-clamp-2">"{confirmDel.question}"</p>
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
