import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Search, Shield, Award, Scale } from "lucide-react";
import { expertisesAPI } from "../api/client";
import { CardExpertise } from "../components/Cards";

const TEAM_PHOTO = "/src/assets/imhero-ba.png";

const demoExpertises = [
  {
    id: 1,
    slug: "accidents-circulation",
    icon: "🚗",
    name: "Accident de la Circulation",
    summary:
      "Défense des victimes d'accidents de la route, piétons, cyclistes, motards et passagers pour une indemnisation complète.",
  },
  {
    id: 2,
    slug: "agressions",
    icon: "🛡️",
    name: "Agressions et Infractions",
    summary:
      "Accompagnement des victimes d'agressions et d'infractions pénales pour l'obtention d'une indemnisation via le FGTI.",
  },
  {
    id: 3,
    slug: "victimes-attentat",
    icon: "⚖️",
    name: "Victimes d'Attentat",
    summary:
      "Défense des victimes d'actes terroristes pour la reconnaissance de leur statut et l'indemnisation de leurs préjudices.",
  },
  {
    id: 4,
    slug: "accident-medical",
    icon: "🏥",
    name: "Accident Médical",
    summary:
      "Accompagnement des patients victimes d'accidents médicaux, d'infections nosocomiales et d'aléas thérapeutiques.",
  },
  {
    id: 5,
    slug: "accidents-travail",
    icon: "⚙️",
    name: "Accident du Travail",
    summary:
      "Protection des salariés victimes d'accidents du travail ou de maladies professionnelles pour une réparation intégrale.",
  },
  {
    id: 6,
    slug: "accident-vie-courante",
    icon: "🏠",
    name: "Accident de la Vie Courante",
    summary:
      "Défense des victimes d'accidents domestiques, de loisirs ou sportifs pour l'indemnisation de leurs préjudices.",
  },
  {
    id: 7,
    slug: "assurance-dommage",
    icon: "📋",
    name: "Contentieux Droit des Assurances",
    summary:
      "Analyse des contrats, négociation et contentieux face aux compagnies d'assurance pour la juste indemnisation.",
  },
  {
    id: 8,
    slug: "prejudice-corporel",
    icon: "💙",
    name: "Réparation du Préjudice Corporel",
    summary:
      "Évaluation et réparation exhaustive de tous les postes de préjudice : physique, moral, économique et fonctionnel.",
  },
  {
    id: 9,
    slug: "expertise-medicale",
    icon: "🩺",
    name: "Médecin de Recours et Expertise",
    summary:
      "Assistance médicale lors des expertises pour contrer les conclusions des médecins mandatés par les assureurs.",
  },
];

export default function Expertises() {
  const [expertises, setExpertises] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = (expertises.length > 0 ? expertises : demoExpertises)
    .filter((e) =>
      search.length > 0
        ? e.name.toLowerCase().includes(search.toLowerCase())
        : true,
    )
    .slice(0, 5);

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

      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${TEAM_PHOTO})` }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2e]/95 via-[#0d1b2e]/80 to-[#0d1b2e]/40" />

        {/* <div className="absolute top-10 left-1/3 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" /> */}
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-8xl mx-auto px-3 md:pt-30 scale-90 xl:scale-80 2xl:scale-100 grid md:grid-cols-2 gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-[10px] sm:text-xs md:text-lg font-semibold tracking-widest uppercase text-orange-400 border border-orange-400/30 px-4 py-1.5 rounded-full mb-2 md:mb-6">
              Domaines d'intervention
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-1md:mb-3">
              Notre <span className="text-orange-400">Expertise</span>
            </h1>

            <p className="text-white/70 text-sm md:text-lg mb-2 leading-relaxed">
              <span className="text-orange-400 font-semibold">
                Nous assurons
              </span>{" "}
              exclusivement la défense des victimes d'un préjudice corporel à la
              suite :
            </p>

            <ul className="space-y-2 mb-2 text-sm md:text-lg md:space-y-2 md:mb-4 ">
              {[
                "D'un accident de la circulation",
                "D'une agression ou de dommages résultant d'une infraction",
                "D'un accident médical",
                "D'un accident de la vie courante",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-1.5 text-white/80"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <div className="h-px w-24 bg-orange-400/40 mb-2 md:mb-4" />

            <p className="text-white/50 text-sm italic">
              Spécialiste en droit du dommage corporel
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex md:block"
          >
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 space-y-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-orange-400/20 flex items-center justify-center">
                  <Award size={16} className="text-orange-400" />
                </div>
                <h2 className="text-white font-semibold text-lg">
                  La spécialisation, une garantie pour les victimes
                </h2>
              </div>

              <p className="text-white/70 text-sm leading-relaxed">
                Nous sommes titulaires du{" "}
                <span className="text-white font-semibold">
                  certificat de spécialisation en droit du dommage corporel
                </span>
                , seul reconnu par la loi, et sommes ainsi en mesure de répondre
                à l'ensemble des problématiques rencontrées par les victimes.
              </p>

              <p className="text-white/70 text-sm leading-relaxed">
                Ce certificat témoigne de la reconnaissance par le monde
                judiciaire de{" "}
                <span className="text-white font-semibold">
                  plusieurs années de pratique associées à une compétence
                  technique.
                </span>
              </p>

              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { icon: Shield, label: "Protection", sub: "des victimes" },
                  { icon: Scale, label: "Expertise", sub: "judiciaire" },
                  { icon: Award, label: "Certifié", sub: "par la loi" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="text-center p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <Icon size={18} className="text-orange-400 mx-auto mb-1" />
                    <p className="text-white text-xs font-semibold">{label}</p>
                    <p className="text-white/40 text-xs">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1b2e] to-transparent" />
      </section>

      <section className="py-16 px-6 bg-[#0d1b2e]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-md mx-auto mb-12">
            <p className="text-white/60 text-sm font-medium mb-2 tracking-wide">
              Rechercher une expertise
            </p>

            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10"
              />
              <input
                type="search"
                placeholder=""
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                className="input-dark w-full pl-9 text-sm"
              />

              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#0d1b2e] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl">
                  {suggestions.map((e) => (
                    <button
                      key={e.id}
                      onMouseDown={() => {
                        setSearch(e.name);
                        setShowSuggestions(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left"
                    >
                      <span className="text-lg">{e.icon}</span>
                      <div>
                        <p className="text-white text-sm font-medium">
                          {e.name}
                        </p>
                        <p className="text-white/40 text-xs line-clamp-1">
                          {e.summary}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
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
            <div className="grid scale-90 2xl:scale-100 md:grid-cols-2 lg:grid-cols-3 gap-16 2xl:gap-6">
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

      <section className="relative py-10 bg-[#0d1b2e] overflow-hidden">
        {/* <div className="absolute top-0 left-0 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" /> */}

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-white/50 text-sm font-light mb-1 tracking-wide">
                Borgel & Associés
              </p>
              <h2 className="text-5xl md:text-5xl font-bold text-white leading-none mb-3">
                AVOCATS
              </h2>
              <p className="text-white/50 text-base tracking-widest uppercase mb-12">
                au barreau de{" "}
                <span className="text-white font-semibold">Marseille</span>
              </p>

              <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                {[
                  {
                    title: "Optimiser",
                    desc: "l'indemnisation de votre préjudice corporel.",
                  },
                  {
                    title: "Défendre",
                    desc: "nos clients dans le cadre d'un litige face à une compagnie d'assurance.",
                  },
                  {
                    title: "Accompagner",
                    desc: "les victimes en qualité de spécialistes en droit du dommage corporel.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                    <div>
                      <p className="text-orange-400 font-bold text-lg">
                        {item.title}
                      </p>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative w-100 h-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src="/src/assets/Borgel.png"
                  alt="Avocat Borgel & Associés"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1b2e]/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white text-xs font-semibold">
                    Cabinet Borgel & Associés
                  </p>
                  <p className="text-white/50 text-[10px]">
                    Barreau de Marseille
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 bg-[#0d1b2e] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: "Santa", label: "Ramamonjisoa" },
              { value: "Santa", label: "Ramamonjisoa" },
              { value: "Santa", label: "Ramamonjisoa" },
              { value: "Santa", label: "Ramamonjisoa" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <p className="text-3xl font-bold text-orange-400 mb-1">
                  {stat.value}
                </p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Vous êtes <span className="text-orange-400">victime</span> ?
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8">
              Nos avocats spécialisés analysent votre situation gratuitement et
              vous accompagnent à chaque étape de votre dossier.
            </p>
            <a
              href="/contact"
              className="inline-block bg-orange-400 hover:bg-orange-500 text-[#0d1b2e] font-semibold px-8 py-3.5 rounded-xl transition-colors"
            >
              Consulter gratuitement
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
