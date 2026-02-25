import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, XCircle, Play, ArrowLeft, Save, Edit3, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demo = [
  { id:1, title:'Comment se passe une expertise médicale ?', url:'https://www.youtube.com/embed/dQw4w9WgXcQ', is_active:true, order:1, description:'' },
  { id:2, title:'Indemnisation : les étapes clés', url:'https://www.youtube.com/embed/dQw4w9WgXcQ', is_active:true, order:2, description:'' },
  { id:3, title:'Faute médicale : quand consulter ?', url:'https://www.youtube.com/embed/dQw4w9WgXcQ', is_active:false, order:3, description:'' },
];

const emptyForm = { title:'', url:'', description:'', is_active:true, order:0 };

type Platform = 'youtube' | 'facebook' | 'instagram' | 'unknown';

function getPlatform(url: string): Platform {
  if (!url) return 'unknown';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('facebook.com') || url.includes('fb.watch')) return 'facebook';
  if (url.includes('instagram.com')) return 'instagram';
  return 'unknown';
}

function toEmbedUrl(url: string): string {
  if (!url) return '';
  const platform = getPlatform(url);

  if (platform === 'youtube') {
    if (url.includes('youtube.com/embed/')) return url;
    const watchMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
    if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
    const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  }

  if (platform === 'facebook') {
    // Déjà un embed Facebook
    if (url.includes('facebook.com/plugins/video')) return url;
    // Construire l'URL embed Facebook
    const encoded = encodeURIComponent(url);
    return `https://www.facebook.com/plugins/video.php?href=${encoded}&show_text=0&width=560&autoplay=false`;
  }

  // Instagram : pas d'iframe direct possible, on retourne l'URL originale
  // (sera géré par le composant VideoPreview)
  return url;
}

function VideoPreview({ url }: { url: string }) {
  const platform = getPlatform(url);
  const embedUrl = toEmbedUrl(url);

  if (platform === 'youtube' || platform === 'facebook') {
    return (
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allowFullScreen
          title="preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
    );
  }

  if (platform === 'instagram') {
    return (
      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 text-center">
        <div className="text-3xl mb-3">📱</div>
        <p className="text-white/70 text-sm mb-3">Instagram — aperçu non disponible directement</p>
        <a href={url} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-pink-400 hover:text-pink-300 transition underline">
          Voir sur Instagram ↗
        </a>
        <p className="text-[10px] text-white/30 mt-2">La vidéo s'affichera sur le site via le lien</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/3 p-6 text-center">
      <p className="text-white/50 text-sm">URL non reconnue — vérifiez le lien</p>
    </div>
  );
}

export default function VideosAdmin() {
  const [videos, setVideos]         = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [view, setView]             = useState<'list'|'form'>('list');
  const [editing, setEditing]       = useState<any>(null);
  const [form, setForm]             = useState<any>(emptyForm);
  const [saving, setSaving]         = useState(false);
  const [confirmDel, setConfirmDel] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    API.get('/admin/videos/')
      .then(r => setVideos(r.data.results || r.data))
      .catch(() => setVideos(demo))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (videos.length > 0 ? videos : demo)
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()));

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setPreviewUrl('');
    setView('form');
  };

  const openEdit = (v: any) => {
    setEditing(v);
    setForm({ title:v.title||'', url:v.url||'', description:v.description||'', is_active:v.is_active, order:v.order||0 });
    setPreviewUrl(v.url || '');
    setView('form');
  };

  const set = (k: string, val: any) => setForm((p: any) => ({ ...p, [k]: val }));

  const handleUrlChange = (val: string) => {
    set('url', val);
    setPreviewUrl(toEmbedUrl(val));
  };

  const handleSave = async () => {
    if (!form.title) { showToast('error', 'Le titre est obligatoire'); return; }
    if (!form.url)   { showToast('error', "L'URL YouTube est obligatoire"); return; }
    setSaving(true);
    const payload = {
      title: form.title,
      url: toEmbedUrl(form.url),
      description: form.description || '',
      is_active: form.is_active,
      order: form.order || 0,
    };
    try {
      if (editing) {
        const res = await API.patch(`/admin/videos/${editing.id}/`, payload);
        setVideos(p => p.map(x => x.id === editing.id ? res.data : x));
        showToast('success', 'Vidéo mise à jour');
      } else {
        const res = await API.post('/admin/videos/', payload);
        setVideos(p => [res.data, ...p]);
        showToast('success', 'Vidéo ajoutée');
      }
      setView('list');
    } catch (err: any) {
      const detail = err?.response?.data ? JSON.stringify(err.response.data) : 'Erreur inconnue';
      showToast('error', detail.substring(0, 120));
    } finally {
      setSaving(false);
    }
  };

  const toggle = async (v: any) => {
    try {
      await API.patch(`/admin/videos/${v.id}/`, { is_active: !v.is_active });
      setVideos(p => p.map(x => x.id === v.id ? { ...x, is_active: !x.is_active } : x));
      showToast('success', v.is_active ? 'Vidéo désactivée (retirée du site)' : 'Vidéo publiée sur le site');
    } catch { showToast('error', 'Erreur'); }
  };

  const handleDelete = async (v: any) => {
    try {
      await API.delete(`/admin/videos/${v.id}/`);
      setVideos(p => p.filter(x => x.id !== v.id));
      showToast('success', 'Vidéo supprimée');
      if (view === 'form') setView('list');
    } catch { showToast('error', 'Erreur lors de la suppression'); }
    setConfirmDel(null);
  };

  // ── FORM ──────────────────────────────────────────────
  if (view === 'form') return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => setView('list')} className="btn-ghost p-1.5"><ArrowLeft size={16}/></button>
        <div>
          <h1 className="text-xl font-bold text-white">{editing ? 'Modifier la vidéo' : 'Ajouter une vidéo'}</h1>
          <p className="text-sm text-white/50">{editing ? editing.title : 'Nouvelle vidéo YouTube'}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card p-5 space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Titre *</label>
              <input type="text" value={form.title} onChange={e => set('title', e.target.value)}
                className="input-dark" placeholder="Comment se passe une expertise médicale ?"/>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">URL YouTube *</label>
              <input type="url" value={form.url} onChange={e => handleUrlChange(e.target.value)}
                className="input-dark" placeholder="https://www.youtube.com/watch?v=..."/>
              <p className="text-[10px] text-white/30 mt-1">URL normale ou youtu.be — convertie automatiquement.</p>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Description</label>
              <textarea value={form.description} onChange={e => set('description', e.target.value)}
                className="input-dark resize-none" rows={3} placeholder="Description courte..."/>
            </div>
          </div>

          {previewUrl && (
            <div className="glass-card p-4">
              <p className="text-xs text-white/50 mb-3">Aperçu</p>
              <VideoPreview url={previewUrl}/>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="glass-card p-4 space-y-4">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">Publication</p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white">Visible sur le site</span>
              <button onClick={() => set('is_active', !form.is_active)}
                className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active ? 'bg-orange-500' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active ? 'translate-x-5' : 'translate-x-0.5'}`}/>
              </button>
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Ordre d'affichage</label>
              <input type="number" value={form.order} onChange={e => set('order', parseInt(e.target.value) || 0)}
                className="input-dark" min={0}/>
            </div>
            <button onClick={handleSave} disabled={saving} className="btn-primary w-full justify-center py-2.5">
              <Save size={14}/>{saving ? 'Sauvegarde...' : (editing ? 'Mettre à jour' : 'Ajouter la vidéo')}
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
      </div>

      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer cette vidéo ?</h3>
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

  // ── LIST ──────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Vidéos</h1>
          <p className="text-sm text-white/50">
            {displayed.filter(v=>v.is_active).length} publiées · {displayed.filter(v=>!v.is_active).length} désactivées
          </p>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={15}/>Ajouter vidéo</button>
      </div>

      <div className="relative max-w-xs">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
        <input type="search" placeholder="Rechercher une vidéo..." value={search}
          onChange={e => setSearch(e.target.value)} className="input-dark pl-8"/>
      </div>

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"/>
          </div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center">
            <Play size={36} className="text-white/20 mx-auto mb-3"/>
            <p className="text-white/40">{search ? 'Aucun résultat' : 'Aucune vidéo — cliquez sur "Ajouter vidéo"'}</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Titre</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider hidden sm:table-cell">Ordre</th>
                <th className="text-left py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Statut</th>
                <th className="text-right py-3 px-4 text-white/40 text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayed.map(v => (
                <tr key={v.id} className="border-b border-white/5 hover:bg-white/3 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Play size={13} className="text-orange-400"/>
                      </div>
                      <p className="text-white font-medium truncate max-w-[200px]">{v.title}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <span className="text-white/50 text-xs">#{v.order}</span>
                  </td>
                  <td className="py-3 px-4">
                    <button onClick={() => toggle(v)}>
                      {v.is_active
                        ? <span className="badge badge-green flex items-center gap-1 w-fit"><CheckCircle size={9}/>Publié</span>
                        : <span className="badge badge-red flex items-center gap-1 w-fit"><XCircle size={9}/>Désactivé</span>
                      }
                    </button>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(v)} className="btn-ghost p-1.5" title="Modifier"><Edit3 size={13}/></button>
                      <button onClick={() => setConfirmDel(v)} className="btn-ghost text-red-400 p-1.5" title="Supprimer"><Trash2 size={13}/></button>
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
              <h3 className="font-semibold text-white mb-2">Supprimer cette vidéo ?</h3>
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
