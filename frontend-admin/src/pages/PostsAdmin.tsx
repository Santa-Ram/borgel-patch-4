import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Eye, Search, CheckCircle, XCircle, Edit3, ArrowLeft, Save, Image, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demoPosts = [
  { id:1, title:"Nouvelles règles d'indemnisation 2025", slug:'indemnisation-2025', published:true, views:234, created_at:'2025-01-15', expertise:{id:1,name:'Accidents de la circulation'}, excerpt:'Les règles ont changé...', content:'<p>Contenu complet...</p>' },
  { id:2, title:"Faute médicale : comment réagir ?", slug:'faute-medicale', published:true, views:189, created_at:'2025-01-10', expertise:{id:2,name:'Droit de la santé'}, excerpt:'En cas de faute...', content:'<p>Contenu complet...</p>' },
  { id:3, title:"Accident du travail et indemnisation", slug:'accident-travail', published:false, views:0, created_at:'2025-01-05', expertise:null, excerpt:'', content:'' },
];

const demoExpertises = [
  {id:1, name:'Accidents de la circulation'},
  {id:2, name:'Droit de la santé'},
  {id:3, name:'Responsabilité médicale'},
  {id:4, name:'Accidents du travail'},
];

const emptyForm = {
  title:'', slug:'', excerpt:'', content:'', expertise_id:'', published:false,
};

function slugify(str: string) {
  return str.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim().replace(/\s+/g, '-');
}

export default function PostsAdmin() {
  const [posts, setPosts]           = useState<any[]>([]);
  const [expertises, setExpertises] = useState<any[]>([]);
  const [search, setSearch]         = useState('');
  const [loading, setLoading]       = useState(true);
  const [view, setView]             = useState<'list'|'form'>('list');
  const [editing, setEditing]       = useState<any>(null);
  const [form, setForm]             = useState<any>(emptyForm);
  const [coverFile, setCoverFile]   = useState<File|null>(null);
  const [coverPreview, setCoverPreview] = useState('');
  const [saving, setSaving]         = useState(false);
  const [confirmDel, setConfirmDel] = useState<any>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    Promise.all([
      API.get('/admin/posts/').then(r => setPosts(r.data.results||r.data)).catch(() => setPosts(demoPosts)),
      API.get('/expertises/').then(r => setExpertises(r.data.results||r.data)).catch(() => setExpertises(demoExpertises)),
    ]).finally(() => setLoading(false));
  }, []);

  const displayed = (posts.length > 0 ? posts : demoPosts).filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview('');
    setView('form');
  };

  const openEdit = (p: any) => {
    setEditing(p);
    setForm({
      title: p.title||'',
      slug: p.slug||'',
      excerpt: p.excerpt||'',
      content: p.content||'',
      expertise_id: p.expertise?.id||'',
      published: p.published||false,
    });
    setCoverFile(null);
    setCoverPreview(p.cover_image||'');
    setView('form');
  };

  const set = (k: string, v: any) => setForm((prev: any) => ({ ...prev, [k]: v }));

  const handleTitleChange = (val: string) => {
    set('title', val);
    if (!editing) set('slug', slugify(val));
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      showToast('error', 'Le titre et le contenu sont obligatoires');
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('slug', form.slug || slugify(form.title));
      fd.append('excerpt', form.excerpt);
      fd.append('content', form.content);
      fd.append('published', String(form.published));
      if (form.expertise_id) fd.append('expertise_id', String(form.expertise_id));
      if (coverFile) fd.append('cover_image', coverFile);

      if (editing) {
        const res = await API.patch(`/admin/posts/${editing.slug}/`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPosts(p => p.map(x => x.id === editing.id ? res.data : x));
        showToast('success', 'Post mis à jour');
      } else {
        const res = await API.post('/admin/posts/', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setPosts(p => [res.data, ...p]);
        showToast('success', 'Post créé avec succès');
      }
      setView('list');
    } catch (err: any) {
      const msg = err?.response?.data ? JSON.stringify(err.response.data) : 'Erreur lors de la sauvegarde';
      showToast('error', msg.substring(0, 100));
    } finally {
      setSaving(false);
    }
  };

  const togglePublish = async (post: any) => {
    try {
      await API.patch(`/admin/posts/${post.slug}/`, { published: !post.published });
      setPosts(p => p.map(x => x.id === post.id ? { ...x, published: !x.published } : x));
      showToast('success', post.published ? 'Post dépublié (retiré du site)' : 'Post publié sur le site');
    } catch { showToast('error', 'Erreur'); }
  };

  const handleDelete = async (post: any) => {
    try {
      await API.delete(`/admin/posts/${post.slug}/`);
      setPosts(p => p.filter(x => x.id !== post.id));
      showToast('success', 'Post supprimé');
      if (view === 'form') setView('list');
    } catch { showToast('error', 'Erreur lors de la suppression'); }
    setConfirmDel(null);
  };

  // ── FORM VIEW ─────────────────────────────────────────
  if (view === 'form') return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center gap-3">
        <button onClick={() => setView('list')} className="btn-ghost p-1.5"><ArrowLeft size={16}/></button>
        <div>
          <h1 className="text-xl font-bold text-white">{editing ? 'Modifier le post' : 'Nouveau post'}</h1>
          <p className="text-sm text-white/50">{editing ? editing.title : 'Créer un nouvel article'}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {/* Colonne principale */}
        <div className="lg:col-span-2 space-y-4">

          {/* Titre + slug */}
          <div className="glass-card p-5 space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Titre *</label>
              <input
                type="text" value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="input-dark text-base" placeholder="Titre de l'article..."
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Slug (URL)</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/30">/actualites/</span>
                <input
                  type="text" value={form.slug}
                  onChange={e => set('slug', e.target.value)}
                  className="input-dark flex-1 text-xs font-mono"
                  placeholder="mon-article"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Extrait / résumé</label>
              <textarea
                value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                className="input-dark resize-none" rows={2}
                placeholder="Court résumé affiché dans la liste des articles..."
              />
            </div>
          </div>

          {/* Contenu */}
          <div className="glass-card p-5">
            <label className="text-xs text-white/50 block mb-2">Contenu *</label>
            <p className="text-[10px] text-white/30 mb-2">HTML accepté : &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, etc.</p>
            <textarea
              value={form.content} onChange={e => set('content', e.target.value)}
              className="input-dark resize-none font-mono text-xs" rows={16}
              placeholder="<h2>Introduction</h2>&#10;<p>Votre contenu ici...</p>"
            />
          </div>
        </div>

        {/* Colonne latérale */}
        <div className="space-y-4">

          {/* Actions */}
          <div className="glass-card p-4 space-y-3">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Publication</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Publié sur le site</span>
              <button
                onClick={() => set('published', !form.published)}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.published ? 'bg-orange-500' : 'bg-white/10'}`}
              >
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`}/>
              </button>
            </div>
            <div className="pt-1 space-y-2">
              <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center py-2.5">
                <Save size={14}/>
                {saving ? 'Sauvegarde...' : (editing ? 'Mettre à jour' : 'Créer le post')}
              </button>
              {editing && (
                <button onClick={() => setConfirmDel(editing)} className="btn-danger w-full justify-center py-2">
                  <Trash2 size={14}/>Supprimer
                </button>
              )}
              <button onClick={() => setView('list')} className="btn-secondary w-full justify-center py-2">
                Annuler
              </button>
            </div>
          </div>

          {/* Expertise */}
          <div className="glass-card p-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Expertise liée</p>
            <select
              value={form.expertise_id} onChange={e => set('expertise_id', e.target.value)}
              className="input-dark"
            >
              <option value="">Aucune expertise</option>
              {(expertises.length > 0 ? expertises : demoExpertises).map((e: any) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>

          {/* Image de couverture */}
          <div className="glass-card p-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Image de couverture</p>
            <div
              onClick={() => coverRef.current?.click()}
              className="relative rounded-xl overflow-hidden border-2 border-dashed border-white/10 hover:border-orange-500/40 transition cursor-pointer aspect-video flex items-center justify-center bg-white/3"
            >
              {coverPreview ? (
                <>
                  <img src={coverPreview} alt="cover" className="w-full h-full object-cover"/>
                  <button
                    onClick={e => { e.stopPropagation(); setCoverPreview(''); setCoverFile(null); }}
                    className="absolute top-2 right-2 w-6 h-6 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition"
                  >
                    <X size={12} className="text-white"/>
                  </button>
                </>
              ) : (
                <div className="text-center p-4">
                  <Image size={24} className="text-white/20 mx-auto mb-2"/>
                  <p className="text-xs text-white/30">Cliquer pour ajouter une image</p>
                </div>
              )}
            </div>
            <input
              ref={coverRef} type="file" accept="image/*" className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) { setCoverFile(f); setCoverPreview(URL.createObjectURL(f)); }
              }}
            />
          </div>
        </div>
      </div>

      {/* Confirm delete */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer ce post ?</h3>
              <p className="text-sm text-white/60 mb-4">"{confirmDel.title}" — action irréversible.</p>
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

  // ── LIST VIEW ─────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts / Actualités</h1>
          <p className="text-sm text-white/50">
            {displayed.filter(p=>p.published).length} publiés · {displayed.filter(p=>!p.published).length} brouillons
          </p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={15}/>Nouveau post</button>
      </div>

      <div className="relative max-w-xs">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
        <input type="search" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} className="input-dark pl-8"/>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-4 space-y-2">{Array.from({length:5}).map((_,i) => <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse"/>)}</div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-white/40">Aucun post trouvé</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 font-medium text-xs uppercase tracking-wider">Titre</th>
                <th className="text-left py-3 px-4 text-white/40 font-medium text-xs uppercase tracking-wider hidden md:table-cell">Expertise</th>
                <th className="text-left py-3 px-4 text-white/40 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Vues</th>
                <th className="text-left py-3 px-4 text-white/40 font-medium text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-4 text-white/40 font-medium text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(post => (
                <tr key={post.id} className="border-b border-white/5 hover:bg-white/3 transition">
                  <td className="py-3 px-4">
                    <p className="text-white font-medium truncate max-w-[220px]">{post.title}</p>
                    <p className="text-xs text-white/30">{new Date(post.created_at).toLocaleDateString('fr-FR')}</p>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    {post.expertise
                      ? <span className="badge badge-blue">{post.expertise.name}</span>
                      : <span className="text-white/30 text-xs">—</span>
                    }
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="flex items-center gap-1 text-white/50 text-xs">
                      <Eye size={11}/>{post.views}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => togglePublish(post)} title={post.published ? 'Dépublier' : 'Publier'}>
                      {post.published
                        ? <span className="badge badge-green flex items-center gap-1"><CheckCircle size={9}/>Publié</span>
                        : <span className="badge badge-red flex items-center gap-1"><XCircle size={9}/>Brouillon</span>
                      }
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(post)} className="btn-ghost p-1.5" title="Modifier">
                        <Edit3 size={13}/>
                      </button>
                      <button onClick={() => setConfirmDel(post)} className="btn-ghost text-red-400 p-1.5" title="Supprimer">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirm delete from list */}
      <AnimatePresence>
        {confirmDel && view === 'list' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer ce post ?</h3>
              <p className="text-sm text-white/60 mb-4">"{confirmDel.title}" — action irréversible.</p>
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
