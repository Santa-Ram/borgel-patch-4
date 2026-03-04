import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Phone,
  Car,
  Stethoscope,
  Shield,
  Scale,
  Briefcase,
  Heart,
} from "lucide-react";
import axios from "axios";

const demoExpertises = [
  {
    id: 1,
    slug: "accidents-circulation",
    icon: "🚗",
    name: "Accidents de la circulation",
    summary: "Défense des victimes d'accidents de la route face aux assureurs.",
    description:
      "<p>Suite à un accident de la circulation, les victimes doivent faire face à des démarches complexes, notamment face aux compagnies d'assurance qui cherchent souvent à minimiser les indemnisations.</p><p>Notre cabinet intervient dès le lendemain de l'accident pour sécuriser vos droits et vous accompagner tout au long de la procédure d'indemnisation, que ce soit à l'amiable ou devant les tribunaux.</p><p>Nous défendons les piétons, cyclistes, motards et passagers victimes d'accidents de la route pour obtenir la juste réparation de l'ensemble de leurs préjudices.</p>",
    legal_elements: [
      "Droit à indemnisation intégrale",
      "Expertise médicale contradictoire",
      "Calcul du pretium doloris",
      "Préjudice d'agrément",
      "Perte de revenus future",
    ],
    is_active: true,
  },
  {
    id: 2,
    slug: "droit-sante",
    icon: "🏥",
    name: "Droit de la santé",
    summary: "Responsabilité médicale et droits des patients.",
    description:
      "<p>Le droit de la santé est un domaine complexe qui touche à la fois les patients et les professionnels de santé. Notre cabinet vous accompagne dans la défense de vos droits.</p>",
    legal_elements: [
      "Responsabilité du médecin",
      "Infection nosocomiale",
      "Aléa thérapeutique",
      "Droit à l'information",
    ],
    is_active: true,
  },
  {
    id: 3,
    slug: "assurance-dommage",
    icon: "🛡️",
    name: "Assurance & Dommage corporel",
    summary: "Optimisation de vos indemnisations d'assurance.",
    description:
      "<p>Nous analysons vos contrats d'assurance et défendons vos intérêts face aux compagnies pour obtenir une indemnisation juste et complète.</p>",
    legal_elements: [
      "Analyse des garanties",
      "Négociation amiable",
      "Recours contentieux",
      "Expertise contradictoire",
    ],
    is_active: true,
  },
  {
    id: 4,
    slug: "responsabilite-medicale",
    icon: "⚖️",
    name: "Responsabilité médicale",
    summary: "Défense des victimes de fautes médicales.",
    description:
      "<p>Une faute médicale peut avoir des conséquences dévastatrices. Nous vous aidons à faire reconnaître votre préjudice et à obtenir réparation.</p>",
    legal_elements: [
      "Faute médicale",
      "Défaut de consentement",
      "Perte de chance",
      "Commission CRCI",
    ],
    is_active: true,
  },
  {
    id: 5,
    slug: "accidents-travail",
    icon: "⚙️",
    name: "Accidents du travail",
    summary: "Protection des salariés victimes d'accidents professionnels.",
    description:
      "<p>L'accident du travail ouvre droit à des indemnisations spécifiques. Nous vous accompagnons pour faire valoir tous vos droits.</p>",
    legal_elements: [
      "Reconnaissance accident",
      "Faute inexcusable de l'employeur",
      "Rente AT",
      "Incapacité permanente",
    ],
    is_active: true,
  },
  {
    id: 6,
    slug: "prejudice-moral",
    icon: "💔",
    name: "Préjudice moral",
    summary: "Réparation du préjudice moral et psychologique.",
    description:
      "<p>Au-delà du préjudice physique, la souffrance morale mérite également réparation. Nous défendons la reconnaissance de votre souffrance.</p>",
    legal_elements: [
      "Pretium doloris",
      "Préjudice d'affection",
      "Souffrances endurées",
      "Troubles dans les conditions d'existence",
    ],
    is_active: true,
  },
];

const demoTeam = [
  {
    id: 1,
    name: "Maître Borgel",
    role: "Avocat associé fondateur",
    photo: null,
  },
  { id: 2, name: "Sophie Durand", role: "Avocate senior", photo: null },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ExpertiseDetail() {
  const { slug } = useParams();
  const [expertise, setExpertise] = useState<any>(null);
  const [others, setOthers] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    Promise.all([
      axios.get(`/api/expertises/${slug}/`).catch(() => ({
        data: demoExpertises.find((e) => e.slug === slug) || demoExpertises[0],
      })),
      axios
        .get("/api/expertises/")
        .catch(() => ({ data: { results: demoExpertises } })),
    ])
      .then(([expRes, allRes]) => {
        const exp = expRes.data;
        setExpertise(exp);
        setTeam(exp.lawyers || demoTeam);
        const all = allRes.data.results || allRes.data;
        setOthers(
          all.filter((e: any) => e.slug !== slug && e.is_active).slice(0, 5),
        );
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );

  if (!expertise)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">Expertise non trouvée</p>
          <Link to="/expertises" className="text-orange-400">
            ← Retour
          </Link>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{expertise.name} — Borgel & Associés</title>
        <meta name="description" content={expertise.summary} />
      </Helmet>

      {/* Hero — style "On a mission" */}
      <section className="relative overflow-hidden bg-[#080d1e] py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link
            to="/expertises"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white mb-10 transition group"
          >
            <ArrowLeft
              size={15}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Toutes les expertises
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — image / quote card */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...fadeUp, }}
            >
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0d1435] to-[#1a2550] border border-white/10 p-8 min-h-[340px] flex flex-col justify-between">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-blue-600/5" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{expertise.icon || "⚖️"}</span>
                    <div>
                      <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider">
                        Expertise
                      </p>
                      <p className="text-lg font-bold text-white">
                        {expertise.name}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-white/70 text-base leading-relaxed italic">
                    "Notre cabinet met toute son expertise au service des
                    victimes pour obtenir la juste réparation de leurs
                    préjudices."
                  </blockquote>
                  <p className="text-sm text-white/50 mt-4 not-italic font-medium">
                    — Maître Borgel, Fondateur
                  </p>
                </div>
                {/* Stats */}
                <div className="relative grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10">
                  {[
                    ["15+", "Ans d'expérience"],
                    ["500+", "Dossiers traités"],
                    ["95%", "Satisfaction"],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-xl font-bold text-orange-400">{n}</p>
                      <p className="text-xs text-white/40 leading-tight">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                ...fadeUp,
                
              }}
            >
              <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">
                Notre expertise
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                {expertise.name}
              </h1>
              <div
                className="text-white/70 leading-relaxed space-y-4 text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    expertise.description || `<p>${expertise.summary}</p>`,
                }}
              />

              {/* Legal elements */}
              {expertise.legal_elements?.length > 0 && (
                <div className="mt-8">
                  <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-4">
                    Domaines d'intervention
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {expertise.legal_elements.map((el: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <CheckCircle
                          size={14}
                          className="text-orange-400 flex-shrink-0"
                        />
                        <span className="text-sm text-white/70">{el}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-8 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3.5 rounded-2xl font-semibold transition active:scale-95"
              >
                <Phone size={16} />
                Consultation gratuite
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Avocats specialises */}
      {team.length > 0 && (
        <section className="py-16 px-6 bg-[#080d1e]">
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest mb-2">
              Equipe dediee
            </p>
            <h2 className="text-2xl font-bold text-white mb-8">
              Avocats specialises dans ce domaine
            </h2>
            <div className="flex flex-wrap gap-4">
              {team.map((m: any) => {
                const initials = m.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .substring(0, 2)
                  .toUpperCase();
                const cols = [
                  "from-blue-600 to-indigo-700",
                  "from-orange-500 to-red-600",
                  "from-emerald-500 to-teal-600",
                  "from-purple-500 to-pink-600",
                ];
                return (
                  <Link
                    key={m.id}
                    to={"/equipe/" + m.id}
                    className="group flex items-center gap-4 glass-card px-5 py-4 hover:border-orange-500/30 transition min-w-[220px]"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-white/10 group-hover:ring-orange-500/30 transition">
                      {m.photo ? (
                        <img
                          src={
                            m.photo.startsWith("http")
                              ? m.photo
                              : "http://localhost:8000" + m.photo
                          }
                          alt={m.name}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div
                          className={
                            "w-full h-full bg-gradient-to-br " +
                            cols[m.id % cols.length] +
                            " flex items-center justify-center text-sm font-bold text-white"
                          }
                        >
                          {initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition">
                        {m.name}
                      </p>
                      <p className="text-xs text-white/45">{m.role}</p>
                    </div>
                    <ArrowRight
                      size={14}
                      className="ml-auto text-white/20 group-hover:text-orange-400 transition shrink-0"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Autres expertises en cartes */}
      {others.length > 0 && (
        <section className="py-16 bg-[#080d1e]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
              Autres domaines
            </p>
            <h2 className="text-2xl font-bold text-white mb-8">
              Explorez nos autres expertises
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {others.map((e: any, i: number) => (
                <motion.div
                  key={e.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={`/expertises/${e.slug}`}
                    className="glass-card p-4 flex flex-col gap-3 hover:border-orange-500/30 hover:-translate-y-1 transition-all group block"
                  >
                    <span className="text-2xl">{e.icon || "⚖️"}</span>
                    <p className="text-sm font-semibold text-white group-hover:text-orange-400 transition leading-tight">
                      {e.name}
                    </p>
                    <p className="text-xs text-white/50 line-clamp-2">
                      {e.summary}
                    </p>
                    <div className="flex items-center gap-1 text-orange-400 text-xs font-medium mt-auto">
                      En savoir plus <ArrowRight size={11} />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA final */}
      <section className="py-16 bg-gradient-to-r from-orange-600/20 to-blue-600/10 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Besoin d'un conseil juridique ?
          </h2>
          <p className="text-white/60 mb-8">
            Première consultation téléphonique de 20 minutes offerte pour
            évaluer votre situation.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="tel:0491335000"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3.5 rounded-2xl font-semibold transition active:scale-95"
            >
              <Phone size={16} />
              04 91 33 50 00
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white px-6 py-3.5 rounded-2xl font-semibold transition"
            >
              Envoyer un message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
