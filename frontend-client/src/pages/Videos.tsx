import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Play } from 'lucide-react';
import { videosAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';

const demoVideos = [
  { id: 1, title: 'Comment se passe une expertise médicale ?', description: 'Tout savoir sur le déroulement d\'une expertise médicale après un accident.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 1 },
  { id: 2, title: 'Indemnisation après un accident : les étapes clés', description: 'Guide pratique pour comprendre les étapes de votre indemnisation.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 2 },
  { id: 3, title: 'Faute médicale : quand consulter un avocat ?', description: 'Découvrez quand et pourquoi faire appel à un avocat spécialisé.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 3 },
  { id: 4, title: 'Accident du travail : vos droits expliqués', description: 'Tout comprendre sur vos droits en cas d\'accident du travail.', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 4 },
];

export default function Videos() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);

  useEffect(() => {
    videosAPI.list()
      .then((res) => setVideos(res.data.results || res.data))
      .catch(() => setVideos(demoVideos))
      .finally(() => setLoading(false));
  }, []);

  const displayed = videos.length > 0 ? videos : demoVideos;

  return (
    <>
      <Helmet>
        <title>Vidéos — Borgel & Associés</title>
        <meta name="description" content="Découvrez nos vidéos explicatives sur le droit du dommage corporel, les accidents et la responsabilité médicale." />
      </Helmet>
      <HeroBanner title="Nos Vidéos" subtitle="Comprendre vos droits en quelques minutes" badge="Ressources vidéo" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {displayed.map((video, i) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 2) * 0.1 }}
                  className="glass-card overflow-hidden hover:border-orange-500/30 transition group"
                >
                  <div className="relative aspect-video bg-navy cursor-pointer" onClick={() => setActiveVideo(activeVideo === video.id ? null : video.id)}>
                    {activeVideo === video.id ? (
                      <iframe
                        src={video.url + '?autoplay=1'}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video.title}
                      />
                    ) : (
                      <>
                        {video.thumbnail ? (
                          <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-deep to-navy flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center group-hover:bg-orange-500/30 transition">
                              <Play size={24} className="text-orange-400 ml-1" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition">
                          <div className="w-16 h-16 rounded-full bg-orange-500/80 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                            <Play size={22} className="text-white ml-1" />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition">{video.title}</h3>
                    {video.description && <p className="text-sm text-white/60">{video.description}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
