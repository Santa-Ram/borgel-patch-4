import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Award, Briefcase, Building2, Search, Users } from 'lucide-react';
import { postsAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';
import { CardPost } from '../components/Cards';

const demoPosts = [
  { id: 1, title: 'Nouvelles règles d\'indemnisation 2025', slug: 'indemnisation-2025', excerpt: 'Les changements importants concernant l\'indemnisation des victimes d\'accidents de la route en 2025.', views: 234, created_at: '2025-01-15' },
  { id: 2, title: 'Faute médicale : comment réagir ?', slug: 'faute-medicale', excerpt: 'Tout ce que vous devez savoir sur vos droits en cas de faute médicale avérée ou suspectée.', views: 189, created_at: '2025-01-10' },
  { id: 3, title: 'Accident du travail et indemnisation', slug: 'accident-travail', excerpt: 'Guide complet sur les démarches à suivre après un accident du travail.', views: 312, created_at: '2025-01-05' },
  { id: 4, title: 'Indemnisation : les pièges à éviter', slug: 'pieges-indemnisation', excerpt: 'Conseils pour ne pas commettre d\'erreurs lors de votre demande d\'indemnisation.', views: 98, created_at: '2024-12-20' },
  { id: 5, title: 'Responsabilité du médecin en 2025', slug: 'responsabilite-medecin', excerpt: 'Évolution de la jurisprudence concernant la responsabilité médicale.', views: 145, created_at: '2024-12-15' },
  { id: 6, title: 'Accident vélo : vos droits', slug: 'accident-velo-droits', excerpt: 'Cycliste victime d\'un accident ? Découvrez vos droits à indemnisation.', views: 201, created_at: '2024-12-10' },
];

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postsAPI.list()
      .then((res) => setPosts(res.data.results || res.data))
      .catch(() => setPosts(demoPosts))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (posts.length > 0 ? posts : demoPosts).filter(
    (p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase())
  );

type Direction = 1 | -1;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

  return (
    <>
      <Helmet>
        <title>Actualités juridiques — Borgel & Associés</title>
        <meta name="description" content="Restez informé des dernières actualités juridiques concernant le dommage corporel, les accidents et la responsabilité médicale." />
      </Helmet>
      <HeroBanner title="Actualités Juridiques" subtitle="Conseils, arrêts importants et évolutions du droit" badge="Publications" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto mb-12">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-11 text-sm"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <CardPost post={post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="flex justify-center py-6 lg:py-12 bg-indigo-50 m-6 shadow-xl/75 rounded-3xl">
        <div className="flex sm:flex-col-2 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="flex grid-cols-2 sm:flex-row items-center justify-between gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="text-center lg:text-left max-w-lg"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-quartio mb-3">
                Réseau & reconnaissance
              </p>
              <h2 className="font-serif text-sm text-black sm:text-xl mb-3">
                Un cabinet reconnu dans l’écosystème juridique.
              </h2>
              <p className="text-xs sm:text-base text-black/75">
                Borgel &amp; Associés travaille en lien avec des associations de
                victimes, des institutions médicales et des acteurs spécialisés
                du secteur.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto text-center text-[11px] text-white/90"
            >
              <div className="rounded-xl bg-gray-900/40 border border-white/10 px-4 py-3 flex flex-col items-center gap-1">
                <Award className="w-4 h-4 text-ba-gold mb-1" />
                <span>Barreau de Marseille</span>
              </div>
              <div className="rounded-xl bg-gray-900/40 border border-white/10 px-4 py-3 flex flex-col items-center gap-1">
                <Building2 className="w-4 h-4 text-ba-gold mb-1" />
                <span>Institutions médicales</span>
              </div>
              <div className="rounded-xl bg-gray-900/40 border border-white/10 px-4 py-3 flex flex-col items-center gap-1">
                <Users className="w-4 h-4 text-ba-gold mb-1" />
                <span>Associations de victimes</span>
              </div>
              <div className="rounded-xl bg-gray-900/40 border border-white/10 px-4 py-3 flex flex-col items-center gap-1">
                <Briefcase className="w-4 h-4 text-ba-gold mb-1" />
                <span>Partenaires assurances</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
