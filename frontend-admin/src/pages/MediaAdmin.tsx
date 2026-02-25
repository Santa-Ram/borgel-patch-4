import { useState, useRef } from 'react';
import { Upload, Trash2, Image, FileText, Video, Copy, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from '../components/Alert';

type MediaItem = {
  id: string;
  name: string;
  type: 'image' | 'video' | 'pdf';
  url: string;
  size: number;
  created_at: string;
};

const demoMedia: MediaItem[] = [
  {id:'1',name:'cabinet-exterieur.jpg',type:'image',url:'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',size:245000,created_at:'2025-01-20T10:00:00Z'},
  {id:'2',name:'salle-reunion.jpg',type:'image',url:'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=400',size:312000,created_at:'2025-01-19T10:00:00Z'},
  {id:'3',name:'bureau-avocat.jpg',type:'image',url:'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400',size:198000,created_at:'2025-01-18T10:00:00Z'},
  {id:'4',name:'equipe-photo.jpg',type:'image',url:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400',size:421000,created_at:'2025-01-17T10:00:00Z'},
];

const typeFilter = ['Tous','Images','Vidéos','PDFs'] as const;
const typeMap: Record<string, MediaItem['type'][]> = {
  'Tous': ['image','video','pdf'],
  'Images': ['image'],
  'Vidéos': ['video'],
  'PDFs': ['pdf'],
};

export default function MediaAdmin() {
  const [media, setMedia]         = useState<MediaItem[]>(demoMedia);
  const [filter, setFilter]       = useState<typeof typeFilter[number]>('Tous');
  const [search, setSearch]       = useState('');
  const [dragging, setDragging]   = useState(false);
  const [copied, setCopied]       = useState<string>('');
  const [selected, setSelected]   = useState<MediaItem|null>(null);
  const [confirmDel, setConfirmDel] = useState<MediaItem|null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayed = media.filter(m=>
    typeMap[filter].includes(m.type) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(f => {
      const type: MediaItem['type'] = f.type.startsWith('image/') ? 'image' : f.type.startsWith('video/') ? 'video' : 'pdf';
      const item: MediaItem = {
        id: Date.now().toString() + Math.random(),
        name: f.name,
        type,
        url: URL.createObjectURL(f),
        size: f.size,
        created_at: new Date().toISOString(),
      };
      setMedia(p => [item, ...p]);
    });
    showToast('success', `${files.length} fichier${files.length>1?'s':''} ajouté${files.length>1?'s':''}`);
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(''), 2000);
    showToast('success', 'URL copiée dans le presse-papier');
  };

  const deleteMedia = (id: string) => {
    setMedia(p => p.filter(m => m.id !== id));
    if(selected?.id === id) setSelected(null);
    showToast('success', 'Fichier supprimé');
    setConfirmDel(null);
  };

  const fmtSize = (b:number) => b>1048576 ? `${(b/1048576).toFixed(1)} Mo` : `${(b/1024).toFixed(0)} Ko`;

  const TypeIcon = ({type}:{type:MediaItem['type']}) => {
    if(type==='image') return <Image size={16} className="text-blue-400"/>;
    if(type==='video') return <Video size={16} className="text-purple-400"/>;
    return <FileText size={16} className="text-orange-400"/>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Médiathèque</h1>
          <p className="text-sm text-white/50">{media.length} fichier{media.length!==1?'s':''}</p>
        </div>
        <button onClick={()=>inputRef.current?.click()} className="btn-primary">
          <Upload size={15}/>Importer des fichiers
        </button>
        <input ref={inputRef} type="file" multiple accept="image/*,video/*,application/pdf" className="hidden"
          onChange={e=>e.target.files&&handleFiles(e.target.files)}/>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e=>{e.preventDefault();setDragging(true)}}
        onDragLeave={()=>setDragging(false)}
        onDrop={e=>{e.preventDefault();setDragging(false);handleFiles(e.dataTransfer.files)}}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${dragging?'border-orange-500 bg-orange-500/10':'border-white/10 hover:border-white/20 hover:bg-white/3'}`}
        onClick={()=>inputRef.current?.click()}
      >
        <Upload size={28} className={`mx-auto mb-2 ${dragging?'text-orange-400':'text-white/30'}`}/>
        <p className="text-sm text-white/50">Glissez-déposez vos fichiers ici ou <span className="text-orange-400">cliquez pour parcourir</span></p>
        <p className="text-xs text-white/30 mt-1">Images, Vidéos, PDFs acceptés</p>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
          <input type="search" placeholder="Rechercher..." value={search} onChange={e=>setSearch(e.target.value)} className="input-dark pl-8"/>
        </div>
        <div className="flex gap-2">
          {typeFilter.map(f=>(
            <button key={f} onClick={()=>setFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${filter===f?'bg-orange-500/20 border-orange-500/40 text-orange-400':'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {displayed.map(m=>(
          <div key={m.id} onClick={()=>setSelected(m)}
            className="glass-card overflow-hidden cursor-pointer hover:border-white/30 hover:scale-[1.02] transition-all group aspect-square relative">
            {m.type==='image'
              ? <img src={m.url} alt={m.name} className="w-full h-full object-cover"/>
              : <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-white/3">
                  <TypeIcon type={m.type}/>
                  <p className="text-xs text-white/50 text-center px-2 truncate max-w-full">{m.name}</p>
                </div>
            }
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button onClick={e=>{e.stopPropagation();copyUrl(m.url)}}
                className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition">
                {copied===m.url?<Check size={14} className="text-green-400"/>:<Copy size={14} className="text-white"/>}
              </button>
              <button onClick={e=>{e.stopPropagation();setConfirmDel(m)}}
                className="w-8 h-8 bg-red-500/30 rounded-lg flex items-center justify-center hover:bg-red-500/50 transition">
                <Trash2 size={14} className="text-red-400"/>
              </button>
            </div>
          </div>
        ))}
      </div>

      {displayed.length===0 && (
        <div className="glass-card p-12 text-center">
          <Image size={36} className="text-white/20 mx-auto mb-3"/>
          <p className="text-white/50">Aucun fichier trouvé</p>
        </div>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={()=>setSelected(null)}>
            <motion.div initial={{y:40,opacity:0}} animate={{y:0,opacity:1}} exit={{y:40,opacity:0}}
              onClick={e=>e.stopPropagation()}
              className="glass-card p-5 w-full max-w-lg mx-4 mb-4 sm:mb-0">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TypeIcon type={selected.type}/>
                  <p className="font-medium text-white text-sm truncate max-w-[240px]">{selected.name}</p>
                </div>
                <button onClick={()=>setSelected(null)} className="text-white/40 hover:text-white transition"><X size={16}/></button>
              </div>
              {selected.type==='image' && <img src={selected.url} alt={selected.name} className="w-full rounded-xl mb-4 max-h-64 object-contain bg-black/20"/>}
              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="bg-white/5 rounded-lg p-2.5"><p className="text-white/40">Taille</p><p className="text-white font-medium">{fmtSize(selected.size)}</p></div>
                <div className="bg-white/5 rounded-lg p-2.5"><p className="text-white/40">Date</p><p className="text-white font-medium">{new Date(selected.created_at).toLocaleDateString('fr-FR')}</p></div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>copyUrl(selected.url)} className="btn-primary flex-1 justify-center">
                  {copied===selected.url?<Check size={14}/>:<Copy size={14}/>}
                  {copied===selected.url?'Copié !':'Copier l\'URL'}
                </button>
                <button onClick={()=>setConfirmDel(selected)} className="btn-danger"><Trash2 size={14}/></button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm delete */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} className="glass-card p-6 max-w-sm mx-4 w-full">
              <h3 className="font-semibold text-white mb-2">Supprimer ce fichier ?</h3>
              <p className="text-sm text-white/60 mb-4">{confirmDel.name}</p>
              <div className="flex gap-3 justify-end">
                <button onClick={()=>setConfirmDel(null)} className="btn-secondary">Annuler</button>
                <button onClick={()=>deleteMedia(confirmDel.id)} className="btn-danger"><Trash2 size={13}/>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
