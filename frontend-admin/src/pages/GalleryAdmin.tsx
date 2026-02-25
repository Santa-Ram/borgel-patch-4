import { useState, useEffect } from 'react';
import { Plus, Trash2, Image } from 'lucide-react';
import API from '../api/client';
import toast from 'react-hot-toast';

const demoSections = [
  { id: 1, name: 'Cabinet', slug: 'cabinet', images: [{ id: 1, caption: 'Entrée', order: 1 }, { id: 2, caption: 'Salle de réunion', order: 2 }] },
  { id: 2, name: 'Équipe', slug: 'equipe', images: [{ id: 3, caption: 'Portrait équipe', order: 1 }] },
];

export default function GalleryAdmin() {
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/gallery/sections/').then(r=>setSections(r.data.results||r.data)).catch(()=>setSections(demoSections)).finally(()=>setLoading(false));
  }, []);

  const list = sections.length > 0 ? sections : demoSections;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Galerie Photos</h1><p className="text-sm text-white/50">{list.length} section{list.length!==1?'s':''}</p></div>
        <button className="btn-primary"><Plus size={15}/> Nouvelle section</button>
      </div>
      {loading ? <div className="glass-card p-8 text-center"><div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto"/></div> : (
        <div className="space-y-4">
          {list.map((section:any)=>(
            <div key={section.id} className="glass-card p-5">
              <div className="flex items-center justify-between mb-4">
                <div><h2 className="font-semibold text-white">{section.name}</h2><p className="text-xs text-white/40">{section.images?.length||0} image{(section.images?.length||0)!==1?'s':''}</p></div>
                <div className="flex gap-2"><button className="btn-primary text-xs py-1.5 px-3"><Plus size={12}/> Ajouter photo</button><button className="btn-ghost text-red-400 p-1.5"><Trash2 size={14}/></button></div>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {section.images?.map((img:any)=>(
                  <div key={img.id} className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group relative cursor-pointer">
                    <Image size={20} className="text-white/20 group-hover:text-white/40 transition"/>
                    <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition p-0.5 bg-red-500/80 rounded-md"><Trash2 size={10} className="text-white"/></button>
                    {img.caption && <p className="absolute bottom-0 left-0 right-0 text-[9px] text-white/60 text-center p-1 truncate">{img.caption}</p>}
                  </div>
                ))}
                <div className="aspect-square bg-white/3 rounded-xl border border-dashed border-white/20 flex items-center justify-center cursor-pointer hover:border-orange-500/40 hover:bg-orange-500/5 transition">
                  <Plus size={18} className="text-white/30"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
