import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { teamAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';
import { CardTeam } from '../components/Cards';

const demoMembers = [
  { id: 1, name: 'Maître Borgel', role: 'Avocat associé fondateur' },
  { id: 2, name: 'Sophie Durand', role: 'Avocate senior – Dommage corporel' },
  { id: 3, name: 'Thomas Martin', role: 'Avocat collaborateur' },
  { id: 4, name: 'Julie Leroy', role: 'Juriste spécialisée' },
  { id: 5, name: 'Marc Petit', role: 'Avocat – Accidents du travail' },
  { id: 6, name: 'Clara Blanc', role: 'Avocate – Responsabilité médicale' },
];

export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamAPI.list()
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setMembers(demoMembers))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (members.length > 0 ? members : demoMembers).filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Notre Équipe — Borgel & Associés</title>
        <meta name="description" content="Découvrez l'équipe d'avocats experts de Borgel & Associés, spécialisés en dommage corporel et responsabilité médicale à Marseille." />
      </Helmet>
      <HeroBanner
        title="Notre Équipe"
        subtitle="Des avocats engagés, experts et à l'écoute de chaque client"
        badge="Borgel & Associés"
      />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-12">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Rechercher un avocat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-11 text-sm"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {displayed.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.1 }}
                >
                  <CardTeam member={member} />
                </motion.div>
              ))}
            </div>
          )}

          {displayed.length === 0 && !loading && (
            <p className="text-center text-white/50 py-20">Aucun résultat pour "{search}"</p>
          )}
        </div>
      </section>
    </>
  );
}
