import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search } from "lucide-react";
import { expertisesAPI } from "../api/client";
import HeroBanner from "../components/HeroBanner";
import { CardExpertise } from "../components/Cards";

const demoExpertises = [
  {
    id: 1,
    name: "Accidents de la circulation",
    slug: "accidents-circulation",
    icon: "🚗",
    summary:
      "Défense des victimes d'accidents de la route, piétons, cyclistes et passagers pour une indemnisation complète.",
  },
  {
    id: 2,
    name: "Droit de la santé",
    slug: "droit-sante",
    icon: "🏥",
    summary:
      "Accompagnement des patients victimes de fautes médicales, infections nosocomiales et accidents médicaux.",
  },
  {
    id: 3,
    name: "Assurance & Dommage corporel",
    slug: "assurance-dommage",
    icon: "🛡️",
    summary:
      "Négociation et contentieux face aux compagnies d'assurance pour obtenir la juste indemnisation de votre préjudice.",
  },
  {
    id: 4,
    name: "Responsabilité médicale",
    slug: "responsabilite-medicale",
    icon: "⚖️",
    summary:
      "Mise en cause de la responsabilité des professionnels de santé en cas de faute ou d'erreur médicale.",
  },
  {
    id: 5,
    name: "Accidents du travail",
    slug: "accidents-travail",
    icon: "💼",
    summary:
      "Défense des salariés victimes d'accidents du travail ou de maladies professionnelles.",
  },
  {
    id: 6,
    name: "Préjudice moral",
    slug: "prejudice-moral",
    icon: "💙",
    summary:
      "Réparation du préjudice moral, d'affection et d'agrément subi par la victime et ses proches.",
  },
];

export default function Expertises() {
  const [expertises, setExpertises] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    expertisesAPI
      .list()
      .then((res) => setExpertises(res.data.results || res.data))
      .catch(() => setExpertises(demoExpertises))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (
    expertises.length > 0 ? expertises : demoExpertises
  ).filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.summary.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Helmet>
        <title>Nos Expertises — Borgel & Associés</title>
        <meta
          name="description"
          content="Découvrez tous les domaines d'expertise du cabinet Borgel & Associés : accidents de la route, fautes médicales, dommage corporel."
        />
      </Helmet>
      <HeroBanner
        title="Nos Expertises"
        subtitle="Des domaines spécialisés pour une défense efficace et complète"
        badge="Domaines d'intervention"
      />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto mb-12">
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="search"
              placeholder="Rechercher une expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-11 text-sm"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="glass-card animate-pulse h-64 rounded-2xl"
                />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((expertise, i) => (
                <motion.div
                  key={expertise.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                >
                  <CardExpertise expertise={expertise} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
