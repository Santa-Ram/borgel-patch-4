import { useState, useEffect } from 'react';
import { Mail, Trash2, CheckCircle, Archive, Search, MailOpen, ExternalLink, ArrowLeft, Filter, X, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';
import { showToast } from '../components/Alert';

const demo:any[] = [
  {id:1,name:'Marie Dupont',email:'marie@example.com',phone:'0612345678',message:'Bonjour, suite à mon accident de voiture survenu le 15 janvier, je souhaite obtenir des conseils sur mes droits en matière d\'indemnisation. Pouvez-vous me contacter svp ?',status:'new',is_read:false,is_archived:false,created_at:'2025-01-22T10:30:00Z'},
  {id:2,name:'Pierre Martin',email:'pierre@example.com',phone:'',message:'Je cherche un avocat spécialisé dans les accidents du travail. Mon employeur refuse de reconnaître ma blessure comme accident professionnel. Merci.',status:'read',is_read:true,is_archived:false,created_at:'2025-01-21T15:20:00Z'},
  {id:3,name:'Sophie Bernard',email:'sophie@example.com',phone:'0698765432',message:'Bonjour, j\'ai besoin d\'aide urgente concernant une faute médicale commise lors de mon opération. Merci de me rappeler.',status:'replied',is_read:true,is_archived:false,created_at:'2025-01-20T09:15:00Z'},
  {id:4,name:'Jean Leroy',email:'jean@example.com',phone:'',message:'Suite à votre recommandation, je souhaite prendre rendez-vous pour une consultation.',status:'new',is_read:false,is_archived:false,created_at:'2025-01-19T14:00:00Z'},
];

const FILTERS = [
  {value:'',     label:'Tous'},
  {value:'new',  label:'Nouveaux'},
  {value:'read', label:'Lus'},
  {value:'replied',label:'Répondus'},
];

const statusBadge: Record<string,JSX.Element> = {
  new:     <span className="badge badge-orange">Nouveau</span>,
  read:    <span className="badge bg-white/10 text-white/50">Lu</span>,
  replied: <span className="badge badge-green">Répondu</span>,
  archived:<span className="badge badge-purple">Archivé</span>,
};

export default function ContactsAdmin({ archived=false }:{archived?:boolean}) {
  const [contacts, setContacts] = useState<any[]>([]);
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('');
  const [loading, setLoading]   = useState(true);
  const [selected, setSelected] = useState<any>(null);
  const [confirmDel, setConfirmDel] = useState<any>(null);

  useEffect(()=>{
    fetchContacts();
  },[archived,filter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if(archived) params.set('archived','true');
      if(filter) params.set('status',filter);
      const r = await API.get(`/contacts/?${params}`);
      setContacts(r.data.results||r.data);
    } catch {
      setContacts(archived?[]:demo);
    } finally { setLoading(false); }
  };

  const displayed = contacts.filter(c=>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.message.toLowerCase().includes(search.toLowerCase())
  );

  const markRead = async (c:any) => {
    try { await API.patch(`/contacts/${c.id}/mark_read/`); } catch {}
    setContacts(p=>p.map(x=>x.id===c.id?{...x,is_read:true,status:'read'}:x));
    if(selected?.id===c.id) setSelected({...c,is_read:true,status:'read'});
  };

  const markUnread = async (c:any) => {
    try { await API.patch(`/contacts/${c.id}/mark_unread/`); } catch {}
    setContacts(p=>p.map(x=>x.id===c.id?{...x,is_read:false,status:'new'}:x));
    if(selected?.id===c.id) setSelected({...c,is_read:false,status:'new'});
    showToast('info','Marqué comme non lu');
  };

  const archiveContact = async (c:any) => {
    try { await API.patch(`/contacts/${c.id}/archive/`); } catch {}
    setContacts(p=>p.filter(x=>x.id!==c.id));
    if(selected?.id===c.id) setSelected(null);
    showToast('success','Message archivé');
  };

  const unarchiveContact = async (c:any) => {
    try { await API.patch(`/contacts/${c.id}/unarchive/`); } catch {}
    setContacts(p=>p.filter(x=>x.id!==c.id));
    if(selected?.id===c.id) setSelected(null);
    showToast('success','Message restauré');
  };

  const deleteContact = async (c:any) => {
    try { await API.delete(`/contacts/${c.id}/`); } catch {}
    setContacts(p=>p.filter(x=>x.id!==c.id));
    if(selected?.id===c.id) setSelected(null);
    showToast('success','Message supprimé');
    setConfirmDel(null);
  };

  const replyByEmail = (c:any) => {
    const subject = encodeURIComponent(`RE: Demande de contact — Borgel & Associés`);
    const body = encodeURIComponent(`Bonjour ${c.name},\n\nEn réponse à votre message :\n"${c.message}"\n\nCordialement,\nBorgel & Associés`);
    window.open(`mailto:${c.email}?subject=${subject}&body=${body}`, '_blank');
    // Mark as replied
    API.patch(`/contacts/${c.id}/`,{status:'replied'}).catch(()=>{});
    setContacts(p=>p.map(x=>x.id===c.id?{...x,status:'replied'}:x));
  };

  const openContact = (c:any) => {
    setSelected(c);
    if(!c.is_read) markRead(c);
  };

  const timeAgo = (iso:string) => new Date(iso).toLocaleDateString('fr-FR',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'});

  const unreadCount = displayed.filter(c=>!c.is_read).length;

  return (
    <div className="space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{archived?'Messages archivés':'Messages de contact'}</h1>
          <p className="text-sm text-white/50">
            {unreadCount>0?<><span className="text-orange-400 font-medium">{unreadCount} non lu{unreadCount>1?'s':''}</span> · </>:''}
            {displayed.length} message{displayed.length!==1?'s':''}
          </p>
        </div>
      </div>

      {/* Search + filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
          <input type="search" placeholder="Rechercher nom, email, message..." value={search} onChange={e=>setSearch(e.target.value)} className="input-dark pl-8"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          {!archived && FILTERS.map(f=>(
            <button key={f.value} onClick={()=>setFilter(f.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${filter===f.value?'bg-orange-500/20 border-orange-500/40 text-orange-400':'bg-white/5 border-white/10 text-white/60 hover:border-white/20'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Split view */}
      <div className="flex gap-4 h-[calc(100vh-220px)]">
        {/* List */}
        <div className={`flex flex-col gap-2 overflow-y-auto ${selected?'hidden lg:flex lg:w-80 flex-shrink-0':'flex-1'}`}>
          {loading ? Array.from({length:4}).map((_,i)=>(
            <div key={i} className="glass-card h-20 animate-pulse"/>
          )) : displayed.length===0 ? (
            <div className="glass-card p-8 text-center">
              <Mail size={32} className="text-white/20 mx-auto mb-3"/>
              <p className="text-white/50">{archived?'Aucun message archivé':'Aucun message trouvé'}</p>
            </div>
          ) : displayed.map(c=>(
            <button key={c.id} onClick={()=>openContact(c)}
              className={`glass-card p-4 text-left hover:border-white/20 transition w-full ${selected?.id===c.id?'border-orange-500/40 bg-orange-500/5':''} ${!c.is_read?'border-orange-500/20':''}`}>
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${!c.is_read?'bg-orange-500/30 text-orange-300':'bg-white/10 text-white/60'}`}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`text-sm font-medium truncate ${!c.is_read?'text-white':'text-white/70'}`}>{c.name}</p>
                    {statusBadge[c.status]}
                  </div>
                  <p className="text-xs text-white/40 mb-1">{c.email}</p>
                  <p className="text-xs text-white/50 line-clamp-2">{c.message}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <p className="text-[10px] text-white/30">{timeAgo(c.created_at)}</p>
                  {!c.is_read && <div className="w-2 h-2 rounded-full bg-orange-500"/>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
            className="flex-1 glass-card p-5 overflow-y-auto flex flex-col">
            {/* Panel header */}
            <div className="flex items-start gap-3 pb-4 border-b border-white/10 mb-4">
              <button onClick={()=>setSelected(null)} className="lg:hidden btn-ghost p-1.5"><ArrowLeft size={15}/></button>
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl flex-shrink-0">
                {selected.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white">{selected.name}</p>
                <a href={`mailto:${selected.email}`} className="text-sm text-orange-400 hover:underline">{selected.email}</a>
                {selected.phone && <p className="text-xs text-white/50 mt-0.5">{selected.phone}</p>}
              </div>
              <div className="flex flex-col gap-1">
                {statusBadge[selected.status]}
                <p className="text-[10px] text-white/30 text-right">{timeAgo(selected.created_at)}</p>
              </div>
            </div>

            {/* Message */}
            <div className="flex-1 mb-4">
              <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Message</p>
              <div className="bg-white/3 rounded-xl p-4 border border-white/8">
                <p className="text-sm text-white/80 leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              <button onClick={()=>replyByEmail(selected)}
                className="btn-primary flex-1 justify-center">
                <ExternalLink size={14}/>Répondre par email
              </button>
              {selected.is_read
                ? <button onClick={()=>markUnread(selected)} className="btn-ghost"><MailOpen size={14}/>Non lu</button>
                : <button onClick={()=>markRead(selected)} className="btn-ghost"><CheckCircle size={14}/>Marquer lu</button>
              }
              {!archived
                ? <button onClick={()=>archiveContact(selected)} className="btn-ghost"><Archive size={14}/>Archiver</button>
                : <button onClick={()=>unarchiveContact(selected)} className="btn-ghost"><RotateCcw size={14}/>Restaurer</button>
              }
              <button onClick={()=>setConfirmDel(selected)} className="btn-ghost text-red-400"><Trash2 size={14}/>Supprimer</button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Confirm delete */}
      <AnimatePresence>
        {confirmDel && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <motion.div initial={{scale:0.9}} animate={{scale:1}} exit={{scale:0.9}}
              className="glass-card p-6 max-w-sm mx-4 w-full">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0"><Trash2 size={18} className="text-red-400"/></div>
                <div>
                  <h3 className="font-semibold text-white">Supprimer ce message ?</h3>
                  <p className="text-sm text-white/60 mt-1">De {confirmDel.name} — action irréversible.</p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={()=>setConfirmDel(null)} className="btn-secondary">Annuler</button>
                <button onClick={()=>deleteContact(confirmDel)} className="btn-danger"><Trash2 size={13}/>Supprimer</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
