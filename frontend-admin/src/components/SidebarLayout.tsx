import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, MessageSquare, Star, Video, Mail, Image, Bell, Menu, Scale, LogOut, ChevronDown, Search, Archive, FolderOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../api/client';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',   path: '/' },
  { icon: FileText,        label: 'Posts',        path: '/posts' },
  { icon: Users,           label: 'Équipe',       path: '/team' },
  { icon: MessageSquare,   label: 'Contacts',     path: '/contacts' },
  { icon: Archive,         label: 'Archives',     path: '/contacts/archives' },
  { icon: Star,            label: 'Avis clients', path: '/reviews' },
  { icon: Video,           label: 'Vidéos',       path: '/videos' },
  { icon: Mail,            label: 'Newsletter',   path: '/newsletter' },
  { icon: Image,           label: 'Médiathèque',  path: '/media' },
  { icon: FolderOpen,      label: 'Galerie',      path: '/gallery' },
];

interface Notif { id:number; type:string; title:string; message:string; is_read:boolean; created_at:string; link:string; }
interface Props { children: React.ReactNode }

export default function AdminSidebarLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs]           = useState<Notif[]>([]);
  const navigate  = useNavigate();
  const notifRef  = useRef<HTMLDivElement>(null);
  const profileRef= useRef<HTMLDivElement>(null);

  const unread = notifs.filter(n=>!n.is_read).length;

  useEffect(() => {
    fetchNotifs();
    const iv = setInterval(fetchNotifs, 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const h = (e:MouseEvent) => {
      if(notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if(profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const fetchNotifs = async () => {
    try {
      const r = await API.get('/notifications/');
      setNotifs((r.data.results||r.data).slice(0,15));
    } catch {
      setNotifs([
        {id:1,type:'contact',title:'Nouveau message de Marie D.',message:'Suite à mon accident...',is_read:false,created_at:new Date().toISOString(),link:'/contacts'},
        {id:2,type:'newsletter',title:'Nouvelle inscription newsletter',message:'jean@example.com',is_read:false,created_at:new Date(Date.now()-300000).toISOString(),link:'/newsletter'},
        {id:3,type:'review',title:'Nouvel avis 5 étoiles',message:'Pierre Martin',is_read:true,created_at:new Date(Date.now()-3600000).toISOString(),link:'/reviews'},
      ]);
    }
  };

  const markAllRead = async () => {
    try { await API.patch('/notifications/mark_all_read/'); } catch {}
    setNotifs(p=>p.map(n=>({...n,is_read:true})));
  };

  const markRead = async (id:number, link:string) => {
    try { await API.patch(`/notifications/${id}/mark_read/`); } catch {}
    setNotifs(p=>p.map(n=>n.id===id?{...n,is_read:true}:n));
    setNotifOpen(false);
    if(link) navigate(link);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const timeAgo = (iso:string) => {
    const d = Date.now()-new Date(iso).getTime();
    if(d<60000) return "À l'instant";
    if(d<3600000) return `${Math.floor(d/60000)}min`;
    if(d<86400000) return `${Math.floor(d/3600000)}h`;
    return `${Math.floor(d/86400000)}j`;
  };

  const typeEmoji:Record<string,string> = {contact:'✉️',newsletter:'📧',review:'⭐',update:'🔔'};

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/8">
        <div className="w-9 h-9 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
          <Scale size={18} className="text-orange-400"/>
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-white truncate">Borgel & Associés</p>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Administration</p>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({icon:Icon,label,path})=>(
          <NavLink key={path} to={path} end={path==='/'} onClick={()=>setSidebarOpen(false)}
            className={({isActive})=>`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive?'bg-orange-500/15 text-orange-400 border border-orange-500/20':'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <Icon size={15} className="flex-shrink-0"/>{label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-white/8 p-3">
        <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition">
          <LogOut size={14}/>Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-56 flex-col bg-[#060b1a] border-r border-white/8 flex-shrink-0">
        <NavContent/>
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={()=>setSidebarOpen(false)}/>
            <motion.aside initial={{x:-280}} animate={{x:0}} exit={{x:-280}}
              transition={{type:'spring',damping:25,stiffness:200}}
              className="fixed left-0 top-0 bottom-0 z-50 w-56 bg-[#060b1a] border-r border-white/10 lg:hidden">
              <NavContent/>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center gap-3 px-4 h-14 bg-[#060b1a]/90 backdrop-blur-md border-b border-white/8 flex-shrink-0">
          <button onClick={()=>setSidebarOpen(true)} className="lg:hidden btn-ghost p-1.5">
            <Menu size={18}/>
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"/>
            <input type="search" placeholder="Rechercher..." className="w-full bg-white/5 border border-white/8 rounded-lg pl-8 pr-4 py-1.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-orange-500/40 transition"/>
          </div>

          <div className="flex-1"/>

          {/* Bell */}
          <div className="relative" ref={notifRef}>
            <button onClick={()=>setNotifOpen(!notifOpen)} className="relative btn-ghost p-1.5">
              <Bell size={17}/>
              {unread>0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-orange-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-0.5">
                  {unread>9?'9+':unread}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div initial={{opacity:0,y:8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.95}}
                  className="absolute right-0 top-full mt-2 w-80 glass-card shadow-2xl z-50 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Bell size={13} className="text-orange-400"/>
                      <p className="font-semibold text-sm text-white">Notifications</p>
                      {unread>0 && <span className="badge badge-orange">{unread}</span>}
                    </div>
                    {unread>0 && <button onClick={markAllRead} className="text-xs text-white/40 hover:text-white transition">Tout lire</button>}
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifs.length===0 ? (
                      <p className="text-center text-white/40 text-sm py-8">Aucune notification</p>
                    ) : notifs.map(n=>(
                      <button key={n.id} onClick={()=>markRead(n.id,n.link)}
                        className={`w-full text-left px-4 py-3 border-b border-white/5 hover:bg-white/5 transition flex items-start gap-3 ${!n.is_read?'bg-orange-500/5':''}`}>
                        <span className="text-lg flex-shrink-0">{typeEmoji[n.type]||'🔔'}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate ${n.is_read?'text-white/60':'text-white'}`}>{n.title}</p>
                          {n.message && <p className="text-xs text-white/40 truncate mt-0.5">{n.message}</p>}
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-[10px] text-white/30">{timeAgo(n.created_at)}</span>
                          {!n.is_read && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/>}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button onClick={()=>setProfileOpen(!profileOpen)} className="flex items-center gap-2 btn-ghost py-1 px-2">
              <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">A</div>
              <ChevronDown size={13} className="text-white/40"/>
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div initial={{opacity:0,y:8,scale:0.95}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:8,scale:0.95}}
                  className="absolute right-0 top-full mt-2 w-44 glass-card shadow-2xl z-50 py-1 overflow-hidden">
                  <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition">
                    <LogOut size={13}/>Déconnexion
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
