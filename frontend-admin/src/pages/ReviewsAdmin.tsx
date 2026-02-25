import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Star, CheckCircle, XCircle, Edit3, Camera, Upload, X, Save, ArrowLeft, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demo = [
  {id:1,name:'Marie L.',rating:5,content:'Cabinet exceptionnel ! Maître Borgel a su défendre mes intérêts avec beaucoup de professionnalisme. Je recommande vivement.',source:'Google',is_active:true,published_at:'2025-01-20',avatar:null},
  {id:2,name:'Pierre M.',rating:5,content:'Suivi impeccable de mon dossier accident. Résultat excellent en moins de 6 mois.',source:'Google',is_active:true,published_at:'2025-01-15',avatar:null},
  {id:3,name:'Sophie R.',rating:4,content:'Très professionnels et à l\'écoute. Je recommande.',source:'Google',is_active:false,published_at:'2025-01-10',avatar:null},
];

const emptyForm = {name:'',content:'',rating:5,source:'Google',is_active:true,published_at:new Date().toISOString().split('T')[0]};

export default function ReviewsAdmin() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [view, setView]       = useState<'list'|'form'>('list');
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm]       = useState<any>(emptyForm);
  const [avatarFile, setAvatarFile] = useState<File|null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [saving, setSaving]   = useState(false);
  const [confirmDel, setConfirmDel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const avatarRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    API.get('/admin/reviews/').then(r=>setReviews(r.data.results||r.data)).catch(()=>setReviews(demo)).finally(()=>setLoading(false));
  },[]);

  const openNew = ()=>{ setEditing(null); setForm(emptyForm); setAvatarFile(null); setAvatarPreview(''); setView('form'); };
  const openEdit = (r:any)=>{ setEditing(r); setForm({name:r.name,content:r.content,rating:r.rating,source:r.source,is_active:r.is_active,published_at:r.published_at}); setAvatarPreview(r.avatar||''); setAvatarFile(null); setView('form'); };

  const handleSave = async () => {
    if(!form.name||!form.content){ showToast('error','Nom et contenu obligatoires'); return; }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=>fd.append(k,String(v)));
      if(avatarFile) fd.append('avatar',avatarFile);
      if(editing){
        await API.patch(`/admin/reviews/${editing.id}/`,fd,{headers:{'Content-Type':'multipart/form-data'}});
        setReviews(p=>p.map(x=>x.id===editing.id?{...x,...form}:x));
        showToast('success','Avis mis à jour');
      } else {
        const res = await API.post('/admin/reviews/',fd,{headers:{'Content-Type':'multipart/form-data'}});
        setReviews(p=>[res.data,...p]);
        showToast('success','Avis ajouté');
      }
      setView('list');
    } catch { showToast('error','Erreur lors de la sauvegarde'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (r:any) => {
    try { await API.delete(`/admin/reviews/${r.id}/`); setReviews(p=>p.filter(x=>x.id!==r.id)); showToast('success','Avis supprimé'); }
    catch { showToast('error','Erreur'); }
    setConfirmDel(null);
    if(view==='form') setView('list');
  };

  const toggleActive = async (r:any) => {
    try { await API.patch(`/admin/reviews/${r.id}/`,{is_active:!r.is_active}); setReviews(p=>p.map(x=>x.id===r.id?{...x,is_active:!x.is_active}:x)); showToast('success',r.is_active?'Avis désactivé (retiré du site)':'Avis publié sur le site'); }
    catch { showToast('error','Erreur'); }
  };

  const set = (k:string,v:any)=>setForm((p:any)=>({...p,[k]:v}));

  const avgRating = reviews.filter(r=>r.is_active).length > 0
    ? reviews.filter(r=>r.is_active).reduce((s,r)=>s+r.rating,0)/reviews.filter(r=>r.is_active).length
    : 0;

  const Stars = ({n,interactive=false,onChange}:{n:number,interactive?:boolean,onChange?:(v:number)=>void})=>(
    <div className="flex gap-0.5">
      {Array.from({length:5}).map((_,i)=>(
        <Star key={i} size={interactive?20:14}
          className={`${i<n?'text-amber-400 fill-amber-400':'text-white/20'} ${interactive?'cursor-pointer hover:scale-110 transition':''}`}
          onClick={interactive?()=>onChange?.(i+1):undefined}/>
      ))}
    </div>
  );

  if(view==='form') return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <button onClick={()=>setView('list')} className="btn-ghost p-1.5"><ArrowLeft size={16}/></button>
        <h1 className="text-xl font-bold text-white">{editing?'Modifier l\'avis':'Nouvel avis'}</h1>
      </div>

      <div className="glass-card p-6 space-y-5">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500/10 border-2 border-dashed border-orange-500/30 flex items-center justify-center">
              {avatarPreview
                ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover"/>
                : <span className="text-2xl font-bold text-orange-400/50">{form.name?.[0]||'?'}</span>}
            </div>
            <button onClick={()=>avatarRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-400 transition">
              <Camera size={11} className="text-white"/>
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={e=>{const f=e.target.files?.[0];if(f){setAvatarFile(f);setAvatarPreview(URL.createObjectURL(f))}}}/>
          </div>
          <div>
            <p className="text-sm text-white font-medium">{form.name||'Nom du client'}</p>
            <Stars n={form.rating}/>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Nom *</label>
            <input type="text" value={form.name} onChange={e=>set('name',e.target.value)} className="input-dark" placeholder="Marie L."/>
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Source</label>
            <select value={form.source} onChange={e=>set('source',e.target.value)} className="input-dark">
              {['Google','Barreau','Recommandation','Direct','Autre'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-2">Note *</label>
          <Stars n={form.rating} interactive onChange={v=>set('rating',v)}/>
        </div>

        <div>
          <label className="text-xs text-white/50 block mb-1.5">Contenu de l'avis *</label>
          <textarea value={form.content} onChange={e=>set('content',e.target.value)} className="input-dark min-h-[120px] resize-none" rows={5} placeholder="Ce que le client dit du cabinet..."/>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Date de publication</label>
            <input type="date" value={form.published_at} onChange={e=>set('published_at',e.target.value)} className="input-dark"/>
          </div>
          <div className="flex items-center gap-3 pt-5">
            <button onClick={()=>set('is_active',!form.is_active)}
              className={`relative w-10 h-5 rounded-full transition-colors ${form.is_active?'bg-orange-500':'bg-white/10'}`}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.is_active?'translate-x-5':'translate-x-0.5'}`}/>
            </button>
            <span className="text-sm text-white">{form.is_active?'Publié sur le site':'Désactivé (masqué)'}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center py-2.5"><Save size={15}/>{saving?'Sauvegarde...':(editing?'Mettre à jour':'Publier l\'avis')}</button>
          {editing && <button onClick={()=>setConfirmDel(editing)} className="btn-danger"><Trash2 size={15}/></button>}
          <button onClick={()=>setView('list')} className="btn-secondary">Annuler</button>
        </div>
      </div>

      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer cet avis ?</h3>
              <p className="text-sm text-white/60 mb-4">Action irréversible.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={()=>setConfirmDel(null)} className="btn-secondary">Annuler</button>
                <button onClick={()=>handleDelete(confirmDel)} className="btn-danger"><Trash2 size={13}/>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Avis Clients</h1>
          <div className="flex items-center gap-2 mt-1">
            <Stars n={Math.round(avgRating)}/>
            <p className="text-sm text-white/50">{avgRating.toFixed(1)}/5 · {reviews.filter(r=>r.is_active).length} publiés</p>
          </div>
        </div>
        <button onClick={openNew} className="btn-primary"><Plus size={15}/>Ajouter avis</button>
      </div>

      <div className="relative max-w-xs">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
        <input type="search" placeholder="Rechercher un avis..." value={search} onChange={e => setSearch(e.target.value)} className="input-dark pl-8"/>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({length:3}).map((_,i)=><div key={i} className="glass-card h-40 animate-pulse"/>)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(reviews.length>0?reviews:demo).filter((r:any)=>r.name.toLowerCase().includes(search.toLowerCase())||r.content.toLowerCase().includes(search.toLowerCase())).map(r=>(
            <div key={r.id} className={`glass-card p-4 hover:border-white/20 transition ${r.is_active?'':'opacity-60'}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  {r.avatar ? <img src={r.avatar} alt={r.name} className="w-full h-full object-cover"/> : <span className="font-bold text-orange-400">{r.name[0]}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm">{r.name}</p>
                  <Stars n={r.rating}/>
                </div>
                <button onClick={()=>toggleActive(r)} title={r.is_active?'Désactiver':'Publier'}>
                  {r.is_active ? <CheckCircle size={16} className="text-green-400"/> : <XCircle size={16} className="text-red-400"/>}
                </button>
              </div>
              <p className="text-xs text-white/60 line-clamp-3 mb-3">{r.content}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/30">{r.source} · {new Date(r.published_at).toLocaleDateString('fr-FR')}</span>
                <div className="flex gap-1">
                  <button onClick={()=>openEdit(r)} className="btn-ghost p-1"><Edit3 size={12}/></button>
                  <button onClick={()=>setConfirmDel(r)} className="btn-ghost text-red-400 p-1"><Trash2 size={12}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {confirmDel && view==='list' && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer l'avis de {confirmDel.name} ?</h3>
              <p className="text-sm text-white/60 mb-4">Cette action est irréversible.</p>
              <div className="flex gap-3 justify-end">
                <button onClick={()=>setConfirmDel(null)} className="btn-secondary">Annuler</button>
                <button onClick={()=>handleDelete(confirmDel)} className="btn-danger"><Trash2 size={13}/>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
