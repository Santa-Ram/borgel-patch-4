import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, HelpCircle, FileText, Users, MessageSquare, Star, Video, Mail, Image, Bell, Menu, Scale, LogOut, ChevronDown, Search, Archive, FolderOpen, BookOpen } from 'lucide-react';
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
  { icon: HelpCircle,      label: 'FAQ',          path: '/faq' },
  { icon: BookOpen,        label: 'Expertises',   path: '/expertises' },
];

interface Notif { id:number; type:string; title:string; message:string; is_read:boolean; created_at:string; link:string; }
interface Props { children: React.ReactNode }

export default function AdminSidebarLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifs, setNotifs]           = useState<Notif[]>([]);
  const navigate   = useNavigate();
  const notifRef   = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unread = notifs.filter(n => !n.is_read).length;

  useEffect(() => {
    fetchNotifs();
    const iv = setInterval(fetchNotifs, 30000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (notifRef.current  && !notifRef.current.contains(e.target as Node))  setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const fetchNotifs = async () => {
    try {
      const r = await API.get('/notifications/');
      setNotifs((r.data.results || r.data).slice(0, 15));
    } catch {
      setNotifs([
        { id:1, type:'contact',    title:'Nouveau message de Marie D.', message:'Suite à mon accident...',  is_read:false, created_at:new Date().toISOString(),                  link:'/contacts'  },
        { id:2, type:'newsletter', title:'Nouvelle inscription newsletter', message:'jean@example.com',    is_read:false, created_at:new Date(Date.now()-300000).toISOString(),   link:'/newsletter' },
        { id:3, type:'review',     title:'Nouvel avis 5 étoiles',       message:'Pierre Martin',           is_read:true,  created_at:new Date(Date.now()-3600000).toISOString(),  link:'/reviews'   },
      ]);
    }
  };

  const markAllRead = async () => {
    try { await API.patch('/notifications/mark_all_read/'); } catch {}
    setNotifs(p => p.map(n => ({ ...n, is_read: true })));
  };

  const markRead = async (id: number, link: string) => {
    try { await API.patch(`/notifications/${id}/mark_read/`); } catch {}
    setNotifs(p => p.map(n => n.id === id ? { ...n, is_read: true } : n));
    setNotifOpen(false);
    if (link) navigate(link);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const timeAgo = (iso: string) => {
    const d = Date.now() - new Date(iso).getTime();
    if (d < 60000)   return "À l'instant";
    if (d < 3600000) return `${Math.floor(d / 60000)}min`;
    if (d < 86400000)return `${Math.floor(d / 3600000)}h`;
    return `${Math.floor(d / 86400000)}j`;
  };

  const typeEmoji: Record<string, string> = { contact: '✉️', newsletter: '📧', review: '⭐', update: '🔔' };

  const NavContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5" style={{ borderBottom: "1px solid #f1f5f9" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #00d4b8 0%, #00b0f0 100%)" }}
        >
          <Scale size={18} className="text-white" />
        </div>
        <div className="min-w-0">
          <p className="font-bold text-sm text-slate-900 truncate">Borgel &amp; Associés</p>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider">Administration</p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'text-[#00b8a0] font-semibold'
                  : 'text-slate-600 hover:text-[#00b8a0] hover:bg-[#f0fdfa]'
              }`
            }
            style={({ isActive }) =>
              isActive
                ? { background: "linear-gradient(90deg, #f0fdfa 0%, #e0f7fa 100%)", borderLeft: "3px solid #00d4b8" }
                : {}
            }
          >
            <Icon size={15} className="flex-shrink-0" />{label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: "1px solid #f1f5f9" }} className="p-3">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
        >
          <LogOut size={14} />Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex w-56 flex-col flex-shrink-0"
        style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0" }}
      >
        <NavContent />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-56 lg:hidden"
              style={{ background: "#ffffff", borderRight: "1px solid #e2e8f0", boxShadow: "4px 0 24px rgba(0,0,0,0.1)" }}
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header
          className="flex items-center gap-3 px-4 h-14 flex-shrink-0"
          style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden btn-ghost p-1.5">
            <Menu size={18} />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-sm relative hidden sm:block">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full rounded-lg pl-8 pr-4 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition"
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#00d4b8";
                e.currentTarget.style.background = "#f0fdfa";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,184,0.12)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.background = "#f8fafc";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="flex-1" />

          {/* Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
            >
              <Bell size={17} />
              {unread > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center px-0.5"
                  style={{ background: "#00d4b8" }}
                >
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 glass-card shadow-2xl z-50 overflow-hidden"
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <div className="flex items-center gap-2">
                      <Bell size={13} style={{ color: "#00b8a0" }} />
                      <p className="font-semibold text-sm text-slate-800">Notifications</p>
                      {unread > 0 && <span className="badge badge-cyan">{unread}</span>}
                    </div>
                    {unread > 0 && (
                      <button onClick={markAllRead} className="text-xs text-slate-400 hover:text-slate-700 transition">
                        Tout lire
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto">
                    {notifs.length === 0 ? (
                      <p className="text-center text-slate-400 text-sm py-8">Aucune notification</p>
                    ) : notifs.map(n => (
                      <button
                        key={n.id}
                        onClick={() => markRead(n.id, n.link)}
                        className="w-full text-left px-4 py-3 hover:bg-slate-50 transition flex items-start gap-3"
                        style={{
                          borderBottom: "1px solid #f8fafc",
                          background: !n.is_read ? "#f0fdfa" : "transparent",
                        }}
                      >
                        <span className="text-lg flex-shrink-0">{typeEmoji[n.type] || '🔔'}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-medium truncate ${n.is_read ? 'text-slate-500' : 'text-slate-800'}`}>
                            {n.title}
                          </p>
                          {n.message && (
                            <p className="text-xs text-slate-400 truncate mt-0.5">{n.message}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-[10px] text-slate-400">{timeAgo(n.created_at)}</span>
                          {!n.is_read && (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00d4b8" }} />
                          )}
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
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg text-slate-600 hover:bg-slate-100 transition"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs"
                style={{ background: "linear-gradient(135deg, #00d4b8 0%, #00b0f0 100%)" }}
              >
                A
              </div>
              <ChevronDown size={13} className="text-slate-400" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-44 glass-card shadow-2xl z-50 py-1 overflow-hidden"
                >
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition"
                  >
                    <LogOut size={13} />Déconnexion
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
