import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import API from '../api/client';

const tooltipStyle = { backgroundColor: '#0d1435', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' };

const monthlyData = [
  { month: 'Août', contacts: 4, vues: 320 }, { month: 'Sep', contacts: 7, vues: 450 },
  { month: 'Oct', contacts: 5, vues: 380 }, { month: 'Nov', contacts: 9, vues: 520 },
  { month: 'Déc', contacts: 12, vues: 680 }, { month: 'Jan', contacts: 8, vues: 590 },
];

const expertiseData = [
  { name: 'Accidents circ.', value: 35, color: '#f97316' },
  { name: 'Droit santé', value: 25, color: '#3b82f6' },
  { name: 'Assurance', value: 20, color: '#8b5cf6' },
  { name: 'Resp. méd.', value: 12, color: '#10b981' },
  { name: 'Acc. travail', value: 8, color: '#f59e0b' },
];

export default function StatsAdmin() {
  const [stats, setStats] = useState({ posts: 24, team: 6, contacts: 47, reviews: 52, newsletter: 134, views: 2840 });

  useEffect(() => {
    API.get('/admin/stats/').then(r=>setStats(r.data)).catch(()=>{});
  }, []);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-white">Statistiques</h1><p className="text-sm text-white/50">Vue d'ensemble de l'activité du site</p></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[['Posts', stats.posts, '#3b82f6'], ['Équipe', stats.team, '#10b981'], ['Messages', stats.contacts, '#f97316'], ['Avis', stats.reviews, '#f59e0b'], ['Newsletter', stats.newsletter, '#8b5cf6'], ['Vues total', stats.views, '#ec4899']].map(([label, value, color])=>(
          <div key={label as string} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold" style={{color: color as string}}>{value}</p>
            <p className="text-xs text-white/50 mt-1">{label as string}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card p-5">
          <h2 className="font-semibold text-white mb-5 text-sm">Contacts & Vues mensuels</h2>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="month" tick={{fill:'rgba(255,255,255,0.4)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'rgba(255,255,255,0.4)',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tooltipStyle}/>
              <Legend formatter={(v)=><span style={{color:'rgba(255,255,255,0.6)',fontSize:12}}>{v}</span>}/>
              <Line type="monotone" dataKey="contacts" stroke="#f97316" strokeWidth={2} dot={{r:3,fill:'#f97316'}} name="Messages"/>
              <Line type="monotone" dataKey="vues" stroke="#3b82f6" strokeWidth={2} dot={{r:3,fill:'#3b82f6'}} name="Vues (÷10)"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card p-5">
          <h2 className="font-semibold text-white mb-5 text-sm">Répartition des expertises consultées</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={expertiseData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value">
                {expertiseData.map((entry, i)=><Cell key={i} fill={entry.color}/>)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} formatter={(v:any)=>[`${v}%`,'Part']}/>
              <Legend formatter={(v)=><span style={{color:'rgba(255,255,255,0.6)',fontSize:11}}>{v}</span>}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card p-5">
        <h2 className="font-semibold text-white mb-5 text-sm">Vues par expertise</h2>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={expertiseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
            <XAxis dataKey="name" tick={{fill:'rgba(255,255,255,0.4)',fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'rgba(255,255,255,0.4)',fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={tooltipStyle}/>
            <Bar dataKey="value" radius={[6,6,0,0]}>
              {expertiseData.map((entry,i)=><Cell key={i} fill={entry.color}/>)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
