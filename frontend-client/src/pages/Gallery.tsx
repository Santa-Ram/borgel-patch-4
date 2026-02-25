import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { X } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';

const demoGallery = [
  { id: 1, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800', caption: 'Cabinet Borgel & Associés', section: 'Cabinet' },
  { id: 2, image: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=800', caption: 'Salle de réunion', section: 'Cabinet' },
  { id: 3, image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800', caption: 'Bureau principal', section: 'Cabinet' },
  { id: 4, image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800', caption: 'Bibliothèque juridique', section: 'Cabinet' },
  { id: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', caption: 'Accueil', section: 'Équipe' },
  { id: 6, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800', caption: 'Consultation client', section: 'Équipe' },
];

export default function Gallery() {
  const [selected, setSelected] = useState<typeof demoGallery[0] | null>(null);

  return (
    <>
      <Helmet>
        <title>Galerie — Borgel & Associés</title>
        <meta name="description" content="Découvrez le cabinet Borgel & Associés en images." />
      </Helmet>
      <HeroBanner title="Notre Cabinet" subtitle="Découvrez nos locaux et notre équipe" badge="Galerie photos" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="columns-2 md:columns-3 gap-4 space-y-4">
            {demoGallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className="break-inside-avoid cursor-pointer group overflow-hidden rounded-2xl"
                onClick={() => setSelected(img)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.image}
                    alt={img.caption}
                    loading="lazy"
                    className="w-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300 flex items-end">
                    <p className="text-white text-sm font-medium px-4 pb-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition duration-300">
                      {img.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4"
            onClick={() => setSelected(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white transition"
              onClick={() => setSelected(null)}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selected.image}
              alt={selected.caption}
              className="max-w-4xl w-full max-h-[80vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-sm">{selected.caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
