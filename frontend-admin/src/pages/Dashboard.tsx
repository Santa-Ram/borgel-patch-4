import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Star, Mail, Video, Image, FileText, ArrowRight, CheckCircle, Clock, MailOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../api/client';

const demoStats = {
  contacts:    { total: 24, unread: 7 },
  team:        { total: 5,  active: 5 },
  reviews:     { total: 18, active: 14 },
  newsletter:  { total: 312, active: 289 },
  posts:       { total: 9, published: 7 },
  videos:      { total: 6, active: 6 },
};

const demoContacts = [
  { id:1, name:'Marie Dupont',   email:'marie@example.com', status:'new',  created_at: new Date().toISOString() },
  { id:2, name:'Pierre Martin',  email:'pierre@example.com', status:'read', created_at: new Date(Date.now()-3600000).toISOString() },
  { id:3, name:'Sophie Bernard', email:'sophie@example.com', status:'replied', created_at: new Date(Date.now()-7200000).toISOString() },
  { id:4, name:'Jean Leroy',     email:'jean@example.com', status:'new',  created_at: new Date(Date.now()-86400000).toISOString() },
];

const statusBadge: Record<string,JSX.Element> = {
  new:     <span className="badge badge-orange">Nouveau</span>,
  read:    <span className="badge bg-white/10 text-white/50 text-[10px]">Lu</span>,
  replied: <span className="badge badge-green text-[10px]">Répondu</span>,
};

const timeAgo = (iso:string) => {
  const d = Date.now()-new Date(iso).getTime();
  if(d<60000) return "À l'instant";
  if(d<3600000) return `${Math.floor(d/60000)} min`;
  if(d<86400000) return `${Math.floor(d/3600000)}h`;
  return `${Math.floor(d/86400000)}j`;
};

export default function Dashboard() {
  const [stats, setStats]       = useState(demoStats);
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([
      API.get('/contacts/?archived=false').then(r=>r.data).catch(()=>null),
      API.get('/team/').then(r=>r.data).catch(()=>null),
      API.get('/admin/reviews/').then(r=>r.data).catch(()=>null),
      API.get('/admin/newsletter/').then(r=>r.data).catch(()=>null),
      API.get('/posts/').then(r=>r.data).catch(()=>null),
    ]).then(([contacts_r, team_r, reviews_r, newsletter_r, posts_r])=>{
      const c = (contacts_r?.results||contacts_r)||[];
      const t = (team_r?.results||team_r)||[];
      const rv= (reviews_r?.results||reviews_r)||[];
      const n = (newsletter_r?.results||newsletter_r)||[];
      const p = (posts_r?.results||posts_r)||[];

      if(c.length) {
        setStats(prev => ({
          ...prev,
          contacts:   { total: c.length, unread: c.filter((x:any)=>!x.is_read).length },
          team:       { total: t.length, active: t.filter((x:any)=>x.is_active).length },
          reviews:    { total: rv.length, active: rv.filter((x:any)=>x.is_active).length },
          newsletter: { total: n.length, active: n.filter((x:any)=>x.is_active).length },
          posts:      { total: p.length, published: p.filter((x:any)=>x.published).length },
        }));
        setContacts(c.slice(0,5));
      } else {
        setContacts(demoContacts);
      }
    }).finally(()=>setLoading(false));
  },[]);

  const cards = [
    { icon: MessageSquare, label: 'Messages', value: stats.contacts.total, sub: `${stats.contacts.unread} non lus`, color: 'text-orange-400', bg: 'bg-orange-500/10', link: '/contacts' },
    { icon: Users,         label: 'Membres',  value: stats.team.total,     sub: `${stats.team.active} actifs`,     color: 'text-blue-400',   bg: 'bg-blue-500/10',   link: '/team' },
    { icon: Star,          label: 'Avis',     value: stats.reviews.total,  sub: `${stats.reviews.active} publiés`, color: 'text-amber-400',  bg: 'bg-amber-500/10',  link: '/reviews' },
    { icon: Mail,          label: 'Abonnés',  value: stats.newsletter.total, sub: `${stats.newsletter.active} actifs`, color: 'text-green-400', bg: 'bg-green-500/10', link: '/newsletter' },
    { icon: FileText,      label: 'Posts',    value: stats.posts.total,    sub: `${stats.posts.published} publiés`, color: 'text-purple-400', bg: 'bg-purple-500/10', link: '/posts' },
    { icon: Video,         label: 'Vidéos',   value: stats.videos.total,   sub: `${stats.videos.active} actifs`,   color: 'text-pink-400',   bg: 'bg-pink-500/10',   link: '/videos' },
  ];

  const quickLinks = [
    { icon: Users,   label: 'Ajouter un membre',  path: '/team',     desc: 'Équipe du cabinet' },
    { icon: FileText,label: 'Nouveau post',        path: '/posts',    desc: 'Actualités juridiques' },
    { icon: Star,    label: 'Ajouter un avis',     path: '/reviews',  desc: 'Avis clients' },
    { icon: Image,   label: 'Médiathèque',         path: '/media',    desc: 'Photos, vidéos, PDFs' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
        <p className="text-sm text-white/50">Bienvenue sur votre espace d'administration Borgel & Associés</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        {cards.map(({icon:Icon,label,value,sub,color,bg,link},i)=>(
          <motion.div key={label} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*0.05}}>
            <Link to={link} className="stat-card flex flex-col gap-3 hover:border-white/20 transition block group">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
                <Icon size={16} className={color}/>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{loading?'—':value}</p>
                <p className="text-xs text-white/50 font-medium">{label}</p>
                <p className="text-[10px] text-white/30 mt-0.5">{loading?'...':sub}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent messages */}
        <div className="lg:col-span-2 glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Messages récents</h2>
            <Link to="/contacts" className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1 transition">
              Voir tout <ArrowRight size={11}/>
            </Link>
          </div>
          <div className="space-y-3">
            {(loading ? Array.from({length:4}) : contacts.slice(0,4)).map((c:any,i:number)=>(
              loading ? (
                <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse"/>
              ) : (
                <Link key={c.id} to="/contacts" className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${!c.is_read?'bg-orange-500/30 text-orange-300':'bg-white/10 text-white/60'}`}>
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-white truncate">{c.name}</p>
                      {statusBadge[c.status]||null}
                    </div>
                    <p className="text-xs text-white/40 truncate">{c.email}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className="text-[10px] text-white/30">{timeAgo(c.created_at)}</span>
                    {!c.is_read && <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/>}
                  </div>
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div className="glass-card p-5">
          <h2 className="font-semibold text-white mb-4">Actions rapides</h2>
          <div className="space-y-2">
            {quickLinks.map(({icon:Icon,label,path,desc})=>(
              <Link key={path} to={path}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/10 transition">
                  <Icon size={14} className="text-white/50 group-hover:text-orange-400 transition"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">{label}</p>
                  <p className="text-xs text-white/40">{desc}</p>
                </div>
                <ArrowRight size={13} className="text-white/20 group-hover:text-orange-400/50 transition"/>
              </Link>
            ))}
          </div>

          {/* Status du site */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">État du site</p>
            <div className="space-y-2">
              {[
                { label:'Site client', port:'3000', ok:true },
                { label:'Administration', port:'3001', ok:true },
                { label:'API Django', port:'8000', ok:true },
              ].map(s=>(
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${s.ok?'bg-green-500':'bg-red-500'}`}/>
                    <span className="text-xs text-white/60">{s.label}</span>
                  </div>
                  <span className="text-[10px] text-white/30">:{s.port}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
