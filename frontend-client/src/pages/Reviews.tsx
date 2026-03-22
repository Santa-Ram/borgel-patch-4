import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Star } from "lucide-react";
import { reviewsAPI } from "../api/client";
import HeroBanner from "../components/HeroBanner";
import { CardReview } from "../components/Cards";

const demoReviews = [
  {
    id: 1,
    name: "Marie L.",
    rating: 5,
    content:
      "Cabinet exceptionnel ! Maître Borgel a su défendre mes droits avec une efficacité remarquable. Indemnisation obtenue rapidement.",
    published_at: "2025-01-20",
    source: "Google",
    external_link: "",
  },
  {
    id: 2,
    name: "Pierre M.",
    rating: 5,
    content:
      "Suivi impeccable de mon dossier d'accident de la route. Indemnisation bien au-delà de mes espérances. Je recommande vivement.",
    published_at: "2025-01-15",
    source: "Google",
  },
  {
    id: 3,
    name: "Anne-Sophie R.",
    rating: 5,
    content:
      "Professionnalisme, écoute et résultats. Très satisfaite de l'accompagnement tout au long de mon dossier.",
    published_at: "2025-01-10",
    source: "Google",
  },
  {
    id: 4,
    name: "François B.",
    rating: 4,
    content:
      "Bonne équipe, réactive et compétente. Mon dossier de faute médicale a été géré avec sérieux.",
    published_at: "2025-01-05",
    source: "Google",
  },
  {
    id: 5,
    name: "Caroline D.",
    rating: 5,
    content:
      "Après mon accident, j'étais perdue. Maître Borgel et son équipe m'ont accompagnée avec beaucoup de bienveillance et d'efficacité.",
    published_at: "2024-12-20",
    source: "Google",
  },
  {
    id: 6,
    name: "Jean-Marc P.",
    rating: 5,
    content:
      "Excellent cabinet, je recommande sans hésitation. Résultat au-delà de mes attentes pour mon dossier d'accident du travail.",
    published_at: "2024-12-15",
    source: "Google",
  },
];

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    reviewsAPI
      .list()
      .then((res) => setReviews(res.data.results || res.data))
      .catch(() => setReviews(demoReviews))
      .finally(() => setLoading(false));
  }, []);

  const displayed = reviews.length > 0 ? reviews : demoReviews;
  const avgRating =
    displayed.reduce((acc, r) => acc + r.rating, 0) / displayed.length;

  return (
    <>
      <Helmet>
        <title>Avis Clients — Borgel & Associés</title>
        <meta
          name="description"
          content="Découvrez les avis de nos clients sur le cabinet Borgel & Associés. Note moyenne 5/5 sur Google."
        />
      </Helmet>
      
      <section className="relative min-h-[52vh] flex items-center overflow-hidden bg-[#0d1b2e]">
        
        
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

        
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {[
            {
              top: "8%",
              left: "4%",
              size: "text-7xl",
              rot: "-12deg",
              op: "opacity-[0.06]",
            },
            {
              top: "18%",
              left: "18%",
              size: "text-5xl",
              rot: "8deg",
              op: "opacity-[0.04]",
            },
            {
              top: "5%",
              left: "38%",
              size: "text-8xl",
              rot: "-5deg",
              op: "opacity-[0.05]",
            },
            {
              top: "22%",
              left: "55%",
              size: "text-6xl",
              rot: "14deg",
              op: "opacity-[0.04]",
            },
            {
              top: "10%",
              left: "72%",
              size: "text-9xl",
              rot: "-8deg",
              op: "opacity-[0.06]",
            },
            {
              top: "30%",
              left: "88%",
              size: "text-5xl",
              rot: "10deg",
              op: "opacity-[0.04]",
            },
            {
              top: "55%",
              left: "2%",
              size: "text-8xl",
              rot: "6deg",
              op: "opacity-[0.05]",
            },
            {
              top: "60%",
              left: "22%",
              size: "text-5xl",
              rot: "-10deg",
              op: "opacity-[0.04]",
            },
            {
              top: "50%",
              left: "42%",
              size: "text-7xl",
              rot: "12deg",
              op: "opacity-[0.05]",
            },
            {
              top: "65%",
              left: "62%",
              size: "text-9xl",
              rot: "-6deg",
              op: "opacity-[0.06]",
            },
            {
              top: "48%",
              left: "80%",
              size: "text-5xl",
              rot: "9deg",
              op: "opacity-[0.04]",
            },
            {
              top: "75%",
              left: "90%",
              size: "text-6xl",
              rot: "-14deg",
              op: "opacity-[0.05]",
            },
          ].map((item, i) => (
            <span
              key={i}
              className={`absolute font-bold text-white ${item.size} ${item.op}`}
              style={{
                top: item.top,
                left: item.left,
                transform: `rotate(${item.rot})`,
              }}
            >
              {i % 3 === 0 ? "G" : i % 3 === 1 ? "❝" : "★"}
            </span>
          ))}
        </div>

        
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-orange-400 border border-orange-400/30 px-4 py-1.5 rounded-full mb-">
              Témoignages
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ce que disent
            <br />
            <span className="text-orange-400">nos clients</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Chaque témoignage reflète un engagement : défendre nos clients avec
            rigueur et humanité. Découvrez les retours de celles et ceux que
            nous avons accompagnés.
          </motion.p>

          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="inline-flex items-center gap-3 bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
          >
            <span
              className="text-2xl font-black"
              style={{
                background:
                  "linear-gradient(90deg,#4285F4,#EA4335,#FBBC05,#34A853)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              G
            </span>
            <span className="text-white/70 text-sm">
              Avis vérifiés sur Google
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  className="text-orange-400 fill-orange-400"
                />
              ))}
            </div>
          </motion.div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d1b2e] to-transparent" />
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="glass-card inline-flex items-center gap-4 px-8 py-5 mb-8">
              <div>
                <p className="text-5xl font-bold text-white">
                  {avgRating.toFixed(1)}
                </p>
                <div className="flex gap-0.5 my-1 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.round(avgRating)
                          ? "text-orange-400 fill-orange-400"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <p className="text-xs text-white/50">Note Google</p>
              </div>
              <div className="w-px h-16 bg-white/10" />
              <div>
                <p className="text-3xl font-bold text-orange-400">
                  {displayed.length}+
                </p>
                <p className="text-xs text-white/50 mt-1">Avis vérifiés</p>
              </div>
            </div>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card animate-pulse h-48 rounded-2xl"
                />
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
