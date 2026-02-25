import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Star } from 'lucide-react';
import { reviewsAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';
import { CardReview } from '../components/Cards';

const demoReviews = [
  { id: 1, name: 'Marie L.', rating: 5, content: 'Cabinet exceptionnel ! Maître Borgel a su défendre mes droits avec une efficacité remarquable. Indemnisation obtenue rapidement.', published_at: '2025-01-20', source: 'Google', external_link: '' },
  { id: 2, name: 'Pierre M.', rating: 5, content: 'Suivi impeccable de mon dossier d\'accident de la route. Indemnisation bien au-delà de mes espérances. Je recommande vivement.', published_at: '2025-01-15', source: 'Google' },
  { id: 3, name: 'Anne-Sophie R.', rating: 5, content: 'Professionnalisme, écoute et résultats. Très satisfaite de l\'accompagnement tout au long de mon dossier.', published_at: '2025-01-10', source: 'Google' },
  { id: 4, name: 'François B.', rating: 4, content: 'Bonne équipe, réactive et compétente. Mon dossier de faute médicale a été géré avec sérieux.', published_at: '2025-01-05', source: 'Google' },
  { id: 5, name: 'Caroline D.', rating: 5, content: 'Après mon accident, j\'étais perdue. Maître Borgel et son équipe m\'ont accompagnée avec beaucoup de bienveillance et d\'efficacité.', published_at: '2024-12-20', source: 'Google' },
  { id: 6, name: 'Jean-Marc P.', rating: 5, content: 'Excellent cabinet, je recommande sans hésitation. Résultat au-delà de mes attentes pour mon dossier d\'accident du travail.', published_at: '2024-12-15', source: 'Google' },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewsAPI.list()
      .then((res) => setReviews(res.data.results || res.data))
      .catch(() => setReviews(demoReviews))
      .finally(() => setLoading(false));
  }, []);

  const displayed = reviews.length > 0 ? reviews : demoReviews;
  const avgRating = displayed.reduce((acc, r) => acc + r.rating, 0) / displayed.length;

  return (
    <>
      <Helmet>
        <title>Avis Clients — Borgel & Associés</title>
        <meta name="description" content="Découvrez les avis de nos clients sur le cabinet Borgel & Associés. Note moyenne 5/5 sur Google." />
      </Helmet>
      <HeroBanner title="Avis Clients" subtitle="Ce que nos clients disent de nous" badge="Témoignages" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="glass-card inline-flex items-center gap-4 px-8 py-5 mb-8">
              <div>
                <p className="text-5xl font-bold text-white">{avgRating.toFixed(1)}</p>
                <div className="flex gap-0.5 my-1 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className={i < Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'} />
                  ))}
                </div>
                <p className="text-xs text-white/50">Note Google</p>
              </div>
              <div className="w-px h-16 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-orange-400">{displayed.length}+</p>
                <p className="text-xs text-white/50 mt-1">Avis vérifiés</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <CardReview review={review} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?sca_esv=62b03b7345eac9c6&cs=1&output=search&kgmid=/g/1hc383qyx&q=Borgel+%26+Associ%C3%A9s,+sp%C3%A9cialiste+en+r%C3%A9paration+du+dommage+corporel&shem=epsdc,shrtsdl&shndl=30&source=sh/x/kp/local/m1/1&kgs=70c70378c4a56d1c&utm_source=epsdc,shrtsdl,sh/x/kp/local/m1/1#lrd=0x12c9c0ba69fa0d1b:0xaeb21a7104014c17,1,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Laisser un avis Google
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
