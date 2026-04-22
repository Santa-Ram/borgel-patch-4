import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  IconArrowRight,
  IconShield,
  IconScale,
  IconBriefcase,
  IconChevronLeft,
  IconChevronRight,
  IconCar,
  IconStethoscope,
  IconStar,
  IconQuote,
  IconAward,
  IconCircleCheck,
  IconCalendar,
  IconEye,
  IconPlayerPlay,
  IconPhone,
  IconFileSearch,
} from "@tabler/icons-react";
import { postsAPI, teamAPI, reviewsAPI } from "../api/client";
import { CardPost, CardTeam, CardReview } from "../components/Cards";
import { ParallaxSections } from "../components/ParallaxSection";
import Newsletter from "../components/Newsletter";
import type { Variants } from "framer-motion";

type Direction = 1 | -1;

const heroSlides = [
  {
    id: 1,
    label: "Notre objectif :",
    badge: "Accident de la Circulation",
    quote:
      "La reconnaissance de votre droit à indemnisation. Face à un événement traumatisant, nous vous accompagnons avec rigueur et humanité.",
    line1: "Borgel & Associés – Marseille",
    line2: "Contentieux complexes · Conseil stratégique",
  },
  {
    id: 2,
    label: "Notre objectif :",
    badge: "Droit de la santé",
    quote:
      "Le dossier médical, propriété sacrée du patient — nous vous accompagnons à chaque étape pour faire valoir vos droits.",
    line1: "Proximité & transparence",
    line2: "Compte-rendus réguliers · Pédagogie juridique",
  },
  {
    id: 3,
    label: "Expertise",
    badge: "20+ ans d'expérience",
    quote:
      "Nous défendons les victimes avec rigueur, combativité et une parfaite maîtrise du dommage corporel.",
    line1: "Droit du dommage corporel",
    line2: "Accidents graves · Fautes médicales",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  enter: (d: Direction) => ({ x: d * 40, opacity: 0, scale: 0.96 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (d: Direction) => ({ x: d * -40, opacity: 0, scale: 0.96 }),
};

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };

  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((p) => (p + 1) % heroSlides.length);
    }, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  return (
    <section className="dark-zone relative isolate flex justify-center overflow-hidden min-h-[90vh] lg:h-98" style={{ background: "linear-gradient(135deg, #1a0e5c 0%, #2d1b6b 40%, #4f35c2 75%, #5b72e8 100%)" }}>
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-20 right-1/4 w-[500px] aspect-square rounded-full bg-[#5b72e8]/10 blur-[200px]" />
        <div className="absolute top-1/6 -left-15 w-[400px] aspect-square rounded-full bg-[#4f35c2]/20 blur-[100px]" />

        <div className="absolute -top-10 right-1/2 mr-10 blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              width: 550,
            }}
            className="aspect-[1097/845] bg-gradient-to-tr from-[#5b72e8]/15 to-[#4f35c2]/20 opacity-35"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 py-10 lg:top-10 md:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-4 font-semibold"
          >
            Avocat au Barreau de Marseille
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Borgel &amp; Associés
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0"
          >
            Cabinet d'avocats spécialisé en{" "}
            <span className="text-purple-400 font-semibold">
              droit du dommage corporel et de la responsabilité médicale
            </span>
            , avec une expertise reconnue en contentieux complexes.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/contact" className="btn-primary">
                Prendre rendez-vous <IconArrowRight size={16} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link to="/expertises" className="btn-outline">
                Nos expertises
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/50"
          >
            {[
              [IconShield, "15+ ans d'expérience"],
              [IconScale, "Experts reconnus"],
              [IconBriefcase, "Accompagnement sur mesure"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-2">
                <Icon size={14} className="text-purple-400" />
                <span>{label as string}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="flex-1 w-full max-w-md mx-auto"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div
            className="relative rounded-3xl bg-white/8 border border-white/15 p-7 pb-8 backdrop-blur shadow-2xl overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={heroSlides[current].id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                onDragEnd={(_e, info) => {
                  if (info.offset.x < -80)
                    go((current + 1) % heroSlides.length);
                  else if (info.offset.x > 80)
                    go(current - 1 < 0 ? heroSlides.length - 1 : current - 1);
                }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[10px] uppercase tracking-widest text-white/50">
                    {heroSlides[current].label}
                  </span>
                  <span className="text-xs rounded-full bg-purple-500/15 text-purple-300 px-3 py-1">
                    {heroSlides[current].badge}
                  </span>
                </div>
                <p className="text-lg font-light text-white leading-relaxed mb-5">
                  "{heroSlides[current].quote}"
                </p>
                <div className="text-xs text-white/50 space-y-0.5">
                  <p>{heroSlides[current].line1}</p>
                  <p>{heroSlides[current].line2}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                {[IconChevronLeft, IconChevronRight].map((Icon, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setPaused(true);
                      if (i === 0)
                        go(
                          current - 1 < 0 ? heroSlides.length - 1 : current - 1,
                        );
                      else go((current + 1) % heroSlides.length);
                      setTimeout(() => setPaused(false), 2500);
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-purple-500/60 hover:text-purple-400 transition"
                    aria-label={i === 0 ? "Précédent" : "Suivant"}
                  >
                    <Icon size={14} />
                  </button>
                ))}
              </div>
              <div className="flex gap-1.5">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-purple-500" : "w-2 bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Photos pour le scroll automatique ─────────────────────────── */
const scrollCol1 = [
  { id: 1,  grad: "from-purple-600 to-purple-900", h: 210, label: "Cabinet Borgel & Associés" },
  { id: 3,  grad: "from-slate-500 to-slate-700",  h: 170, label: "Expertise médicale" },
  { id: 5,  grad: "from-purple-700 to-purple-950",  h: 250, label: "Dossiers traités" },
  { id: 7,  grad: "from-stone-400 to-stone-600",  h: 190, label: "Cabinet Marseille" },
];
const scrollCol2 = [
  { id: 2,  grad: "from-purple-800 to-purple-950",  h: 260, label: "Maître Borgel" },
  { id: 4,  grad: "from-indigo-500 to-indigo-800",    h: 185, label: "Équipe associée" },
  { id: 6,  grad: "from-indigo-500 to-purple-800", h: 230, label: "Accompagnement" },
  { id: 8,  grad: "from-slate-600 to-slate-900",  h: 200, label: "Nos résultats" },
];

interface ScrollPhotoItem {
  id: number;
  grad: string;
  h: number;
  label: string;
  src?: string;
}

function PhotoColumn({ items, duration }: { items: ScrollPhotoItem[]; duration: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="flex-1 overflow-hidden">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          animation: `scrollUpCol ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className={`rounded-2xl overflow-hidden shrink-0 bg-gradient-to-br ${item.grad} flex items-end`}
            style={{ height: `${item.h}px` }}
          >
            {item.src ? (
              <img src={item.src} alt={item.label} className="w-full h-full object-cover" />
            ) : (
              <span className="p-3 text-[11px] font-medium text-white/50 leading-tight">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPreviewSection() {
  return (
    <section className="py-20 px-8 lg:px-20 overflow-hidden" style={{ background: "#f4f4f2" }}>
      <style>{`
        @keyframes scrollUpCol {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Gauche : texte ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Pill badge */}
          <span className="inline-block text-xs px-3.5 py-1.5 bg-white border border-slate-200 rounded-full text-slate-500 mb-8 shadow-sm">
            Notre ambition
          </span>

          {/* Grand titre */}
          <h2 className="font-black leading-none tracking-tight mb-8 uppercase"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}>
            <span className="block text-slate-900">15 ANS</span>
            <span className="block text-slate-900">AU SERVICE</span>
            <span className="block" style={{ color: "#1e40af" }}>DES VICTIMES</span>
          </h2>

          <p className="text-slate-600 leading-relaxed mb-5 max-w-lg">
            Le cabinet de <strong className="text-slate-900">Maître Alban Borgel</strong> est
            entièrement dédié à la réparation du préjudice corporel, totalement indépendant des
            compagnies d’assurances et autres fonds d’indemnisation.
          </p>

          <p className="text-slate-600 leading-relaxed mb-5 max-w-lg">
            <strong className="text-slate-900">
              Si vous aviez accès à la pleine réparation de votre préjudice, votre vie pourrait
              s’en trouver profondément transformée.
            </strong>{" "}
            Notre cabinet met tout en œuvre pour y parvenir.
          </p>

          <p className="text-slate-500 leading-relaxed mb-10 max-w-lg text-sm">
            Devenir un cabinet de référence en dommage corporel est notre objectif
            depuis 2007. Un cabinet bâti sur l’engagement, la rigueur et la proximité
            humaine — jouant un rôle déterminant dans la vie de nos clients.
          </p>

          <Link
            to="/a-propos"
            className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full transition text-sm shadow-md hover:shadow-lg hover:opacity-90"
            style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
          >
            En savoir plus <IconArrowRight size={16} />
          </Link>
        </motion.div>

        {/* ── Droite : colonnes de photos scrollantes ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="hidden lg:block relative h-[600px]"
        >
          {/* Fade top */}
          <div className="absolute top-0 left-0 right-0 h-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #f4f4f2, transparent)" }} />
          {/* Fade bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-20 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to top, #f4f4f2, transparent)" }} />

          <div className="h-full flex gap-3 overflow-hidden">
            <PhotoColumn items={scrollCol1} duration={22} />
            <PhotoColumn items={scrollCol2} duration={28} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// function PresentationSection() {
//   return (
//     <section className="py-24 px-6 bg-[#0a0f1e]">
//       <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
//         <motion.div
//           initial={{ opacity: 0, x: -30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//         >
//           <p className="section-label">Le cabinet</p>
//           <h2 className="section-title">
//             Des avocats engagés pour votre indemnisation
//           </h2>
//           <p className="text-white/70 mb-6 leading-relaxed">
//             Fondé par Maître Borgel, notre cabinet est spécialisé depuis plus de
//             15 ans dans la défense des victimes d'accidents et de fautes
//             médicales. Nous mettons notre expertise au service d'une cause
//             essentielle : obtenir la juste réparation de votre préjudice.
//           </p>
//           <p className="text-white/70 mb-8 leading-relaxed">
//             Notre approche combine rigueur juridique, pédagogie et engagement
//             personnel pour chaque dossier. Nous croyons en la transparence et
//             dans un accompagnement humain tout au long de la procédure.
//           </p>
//           <div className="grid grid-cols-3 gap-6 mb-8">
//             {[
//               ["15+", "Ans d'expérience"],
//               ["500+", "Dossiers traités"],
//               ["95%", "Taux de satisfaction"],
//             ].map(([nb, label]) => (
//               <div key={label} className="text-center">
//                 <p className="text-2xl font-bold text-purple-400">{nb}</p>
//                 <p className="text-xs text-white/50 mt-1">{label}</p>
//               </div>
//             ))}
//           </div>
//           <Link to="/equipe" className="btn-outline">
//             En savoir plus <IconArrowRight size={16} />
//           </Link>
//         </motion.div>
//         <motion.div
//           initial={{ opacity: 0, x: 30 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.2 }}
//           className="grid grid-cols-2 gap-4"
//         >
//           {[
//             {
//               icon: IconCar,
//               title: "Accidents circulation",
//               desc: "Indemnisation complète des victimes",
//             },
//             {
//               icon: IconStethoscope,
//               title: "Fautes médicales",
//               desc: "Expertise en responsabilité médicale",
//             },
//             {
//               icon: IconShield,
//               title: "Dommage corporel",
//               desc: "Évaluation et réparation du préjudice",
//             },
//             {
//               icon: IconScale,
//               title: "Contentieux",
//               desc: "Défense en justice à tous niveaux",
//             },
//           ].map(({ icon: Icon, title, desc }) => (
//             <div
//               key={title}
//               className="glass-card p-5 hover:border-orange-500/20 transition"
//             >
//               <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-3">
//                 <Icon size={18} className="text-purple-400" />
//               </div>
//               <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
//               <p className="text-xs text-white/50">{desc}</p>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

function ExpertisesPreviewSection() {
  const expertiseItems = [
    {
      icon: IconCar,
      title: "Accidents de la circulation",
      desc: "Défense des victimes d'accidents de la route, piétons, cyclistes, passagers.",
      slug: "accidents-circulation",
    },
    {
      icon: IconStethoscope,
      title: "Droit de la santé",
      desc: "Accompagnement des patients victimes de fautes médicales et infections nosocomiales.",
      slug: "droit-sante",
    },
    {
      icon: IconShield,
      title: "Assurance & Dommage corporel",
      desc: "Négociation et contentieux face aux compagnies d'assurance pour obtenir une juste indemnisation.",
      slug: "assurance-dommage",
    },
  ];

  return (
    <section className="py-20 px-8 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label">Domaines d'intervention</p>
          <h2 className="section-title">Nos Expertises</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Des domaines spécialisés pour une défense efficace et un
            accompagnement adapté à chaque situation.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {expertiseItems.map((exp, i) => (
            <motion.div
              key={exp.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-6 hover:border-[#00d4b8] hover:shadow-lg transition group"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
            >
              <Link to={`/expertises/${exp.slug}`} className="block">
                <div className="w-12 h-12 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#ccfbf1] transition">
                  <exp.icon size={22} className="text-[#1e40af]" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-[#1e40af] transition">
                  {exp.title}
                </h3>
                <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                  {exp.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-[#00b8a0] font-semibold">
                  Découvrir <IconArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/expertises" className="btn-outline">
            Toutes nos expertises <IconArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const allDemoMembers = [
  {
    id: 1,
    name: "Maître Borgel",
    role: "Avocat associé fondateur",
    photo: null,
  },
  {
    id: 2,
    name: "Sophie Durand",
    role: "Avocate senior – Dommage corporel",
    photo: null,
  },
  { id: 3, name: "Thomas Martin", role: "Avocat collaborateur", photo: null },
  { id: 4, name: "Julie Leroy", role: "Juriste spécialisée", photo: null },
  {
    id: 5,
    name: "Marc Petit",
    role: "Avocat – Accidents du travail",
    photo: null,
  },
  {
    id: 6,
    name: "Clara Blanc",
    role: "Avocate – Responsabilité médicale",
    photo: null,
  },
];

const avatarColorsHome = [
  "from-teal-400 to-teal-600",
  "from-blue-400 to-blue-600",
  "from-violet-400 to-violet-600",
  "from-emerald-400 to-emerald-600",
];

function getRandomFour(arr: any[]) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4);
}

function resolvePhoto(photo: string | null | undefined): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `http://localhost:8000${photo}`;
}

function initials(name: string) {
  return name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

function TeamPreviewSection() {
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    teamAPI
      .list()
      .then((res) => {
        const list: any[] = res.data.results || res.data;
        const active = list
          .filter((m) => m.is_active !== false)
          .map((m) => ({ ...m, photo: resolvePhoto(m.photo) }));
        const pool = active.length > 0 ? active : allDemoMembers;
        setAllMembers(pool);
        setDisplayed(getRandomFour(pool));
      })
      .catch(() => {
        setAllMembers(allDemoMembers);
        setDisplayed(getRandomFour(allDemoMembers));
      });
  }, []);

  // Rotation toutes les 60 secondes avec fade
  useEffect(() => {
    if (allMembers.length <= 4) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setDisplayed(getRandomFour(allMembers));
        setVisible(true);
      }, 400);
    }, 60_000);
    return () => clearInterval(interval);
  }, [allMembers]);

  return (
    <section className="py-20 px-8 lg:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header aligné à gauche — comme la photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Notre équipe</h2>
          <p className="text-slate-500 text-base max-w-lg leading-relaxed">
            Un groupe d'avocats passionnés par leur métier et dévoués à obtenir
            les meilleurs résultats pour leurs clients.
          </p>
        </motion.div>

        {/* Grille 4 membres circulaires */}
        <AnimatePresence mode="wait">
          {visible && displayed.length > 0 && (
            <motion.div
              key={displayed.map((m) => m.id).join("-")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-10"
            >
              {displayed.map((member, i) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    to={`/equipe/${member.id}`}
                    className="flex flex-col items-center text-center group cursor-pointer"
                  >
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-5 ring-2 ring-[#e2e8f0] group-hover:ring-[#00d4b8]/50 transition duration-300">
                      {member.photo ? (
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                      ) : (
                        <div
                          className={`w-full h-full bg-gradient-to-br ${avatarColorsHome[i % avatarColorsHome.length]} flex items-center justify-center text-2xl font-bold text-white`}
                        >
                          {initials(member.name)}
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-[#00b8a0] transition">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500">{member.role}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition border border-slate-200 hover:border-teal-400/40 px-6 py-2.5 rounded-full"
          >
            Voir toute l'équipe <IconArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

const demoPosts = [
  {
    id: 1,
    title: "Nouvelles règles d'indemnisation en 2025",
    slug: "indemnisation-2025",
    excerpt: "Découvrez les changements importants concernant l'indemnisation des victimes d'accidents de la route en 2025.",
    views: 234,
    created_at: "2025-01-15",
    cover_image: undefined as string | undefined,
    expertise: { name: "Accidents de la route", slug: "accidents-circulation" },
  },
  {
    id: 2,
    title: "Faute médicale : comment réagir ?",
    slug: "faute-medicale",
    excerpt: "Tout ce que vous devez savoir sur vos droits en cas de faute médicale avérée ou suspectée.",
    views: 189,
    created_at: "2025-01-10",
    cover_image: undefined as string | undefined,
    expertise: { name: "Droit de la santé", slug: "droit-sante" },
  },
  {
    id: 3,
    title: "Accident du travail et indemnisation",
    slug: "accident-travail",
    excerpt: "Guide complet sur les démarches à suivre après un accident du travail pour obtenir la pleine réparation.",
    views: 312,
    created_at: "2025-01-05",
    cover_image: undefined as string | undefined,
    expertise: { name: "Accidents du travail", slug: "accidents-travail" },
  },
  {
    id: 4,
    title: "Droits des victimes d'attentat",
    slug: "victimes-attentat",
    excerpt: "Comprendre le régime spécifique d'indemnisation des victimes d'actes terroristes.",
    views: 156,
    created_at: "2024-12-20",
    cover_image: undefined as string | undefined,
    expertise: { name: "Victimes d'attentat", slug: "victimes-attentat" },
  },
  {
    id: 5,
    title: "Expertise médicale : vos droits",
    slug: "expertise-medicale",
    excerpt: "Comment se préparer à une expertise médicale et défendre vos intérêts face au médecin de l'assurance.",
    views: 278,
    created_at: "2024-12-15",
    cover_image: undefined as string | undefined,
    expertise: { name: "Expertise médicale", slug: "expertise-medicale" },
  },
];

const postCoverGrads = [
  "from-purple-600 to-purple-900",
  "from-slate-600 to-slate-800",
  "from-purple-700 to-purple-950",
  "from-stone-500 to-stone-800",
  "from-purple-800 to-purple-950",
];

/* ── Carte article image (pleine hauteur) ───────────────────────── */
function PostImageCard({ post, gradIdx }: { post: any; gradIdx: number }) {
  return (
    <Link
      to={`/actualites/${post.slug}`}
      className="relative shrink-0 rounded-2xl overflow-hidden group block"
      style={{ width: "340px", height: "390px" }}
    >
      {post.cover_image ? (
        <img
          src={post.cover_image}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${postCoverGrads[gradIdx % postCoverGrads.length]}`}
        />
      )}

      {/* Voile sombre */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

      {/* Bouton play centré */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition duration-300">
          <IconPlayerPlay size={20} className="text-slate-800 ml-0.5" fill="currentColor" />
        </div>
      </div>

      {/* Footer */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full shrink-0 bg-white/20 ring-2 ring-white/30 flex items-center justify-center backdrop-blur-sm">
            <span className="text-base">⚖️</span>
          </div>
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm leading-tight line-clamp-1">
              {post.title}
            </p>
            <p className="text-white/60 text-xs mt-0.5">
              {post.expertise?.name ?? "Actualité juridique"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Carte avis texte ────────────────────────────────────────────── */
const reviewAvatarGrads = [
  "from-teal-400 to-teal-600",
  "from-blue-400 to-blue-600",
  "from-violet-400 to-violet-600",
  "from-emerald-400 to-emerald-600",
  "from-purple-400 to-purple-600",
];

function ReviewTextCard({ review, gradIdx }: { review: any; gradIdx: number }) {
  const inis = (name: string) =>
    name.split(" ").map((w: string) => w[0]).join("").substring(0, 2).toUpperCase();
  return (
    <div
      className="shrink-0 bg-white rounded-2xl p-7 flex flex-col border border-slate-100 shadow-sm"
      style={{ width: "340px", height: "390px" }}
    >
      {/* Étoiles */}
      <div className="flex gap-0.5 mb-5">
        {Array.from({ length: 5 }).map((_, j) => (
          <IconStar
            key={j}
            size={13}
            className={j < (review.rating ?? 5) ? "text-amber-400 fill-amber-400" : "text-slate-200"}
          />
        ))}
      </div>

      {/* Texte avis */}
      <p className="text-slate-800 text-[1rem] leading-relaxed flex-1 mb-5">
        {review.content}
      </p>

      {/* Séparateur */}
      <div className="h-px bg-slate-100 mb-5" />

      {/* Auteur */}
      <div className="flex items-center gap-3">
        {review.avatar ? (
          <img
            src={review.avatar}
            alt={review.name}
            className="w-11 h-11 rounded-full object-cover shrink-0"
          />
        ) : (
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${reviewAvatarGrads[gradIdx % reviewAvatarGrads.length]} flex items-center justify-center text-sm font-bold text-white shrink-0`}
          >
            {inis(review.name)}
          </div>
        )}
        <div>
          <p className="font-semibold text-slate-900 text-sm leading-tight">{review.name}</p>
          <p className="text-slate-400 text-xs mt-0.5">
            {review.role ?? review.source ?? "Client"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Section Actualités & Avis (carousel) ────────────────────────── */
function PostsPreviewSection() {
  const [posts,   setPosts]   = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [offset,  setOffset]  = useState(0);

  useEffect(() => {
    postsAPI
      .list({ page_size: 10 })
      .then((res) => {
        const l = res.data.results || res.data;
        setPosts(l.length > 0 ? l : demoPosts);
      })
      .catch(() => setPosts(demoPosts));
    reviewsAPI
      .list()
      .then((res) => {
        setReviews((res.data.results || res.data).slice(0, 10));
      })
      .catch(() => {});
  }, []);

  const postPool = posts.length > 0 ? posts : demoPosts;

  /* Construire la liste mixte : post, post, review, post, post, review… */
  const items: Array<{ type: "post" | "review"; data: any; uid: string }> = [];
  {
    let pi = 0, ri = 0;
    for (let i = 0; items.length < Math.min(postPool.length * 2 + reviews.length, 12); i++) {
      if (i % 3 === 2 && reviews.length > 0) {
        items.push({ type: "review", data: reviews[ri % reviews.length], uid: `r-${ri}` });
        ri++;
      } else {
        items.push({ type: "post", data: postPool[pi % postPool.length], uid: `p-${pi}` });
        pi++;
      }
    }
  }

  const CARD_W  = 340;
  const GAP     = 20;
  const VISIBLE = 3;
  const maxOff  = Math.max(0, items.length - VISIBLE);

  return (
    <section className="py-20 bg-white">
      {/* Header */}
      <div className="px-8 lg:px-20 mb-10">
        <div className="max-w-6xl mx-auto flex items-end justify-between gap-4">
          <div>
            <p className="section-label">Actualités & Avis clients</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Ce que disent nos clients
            </h2>
          </div>

          {items.length > VISIBLE && (
            <div className="flex gap-2 shrink-0 mb-1">
              <button
                onClick={() => setOffset((o) => Math.max(o - 1, 0))}
                disabled={offset === 0}
                aria-label="Précédent"
                className={`w-11 h-11 rounded-full border flex items-center justify-center transition
                  ${offset === 0
                    ? "border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                    : "border-slate-300 text-slate-700 hover:border-[#00d4b8] hover:text-[#00b8a0] bg-white"}`}
              >
                <IconChevronLeft size={18} />
              </button>
              <button
                onClick={() => setOffset((o) => Math.min(o + 1, maxOff))}
                disabled={offset >= maxOff}
                aria-label="Suivant"
                className={`w-11 h-11 rounded-full flex items-center justify-center transition
                  ${offset >= maxOff
                    ? "border border-slate-200 text-slate-300 cursor-not-allowed bg-white"
                    : "text-white hover:opacity-90"}`}
                    style={offset < maxOff ? { background: "linear-gradient(135deg, #00d4b8 0%, #00b0f0 100%)" } : {}}
              >
                <IconChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Carousel */}
      <div className="px-8 lg:px-20 overflow-hidden">
        <div className="max-w-6xl mx-auto overflow-hidden">
          <motion.div
            className="flex"
            style={{ gap: `${GAP}px` }}
            animate={{ x: -(offset * (CARD_W + GAP)) }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {items.map((item, i) =>
              item.type === "post" ? (
                <PostImageCard key={item.uid} post={item.data} gradIdx={i} />
              ) : (
                <ReviewTextCard key={item.uid} review={item.data} gradIdx={i} />
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 px-6">
        <Link
          to="/actualites"
          className="inline-flex items-center gap-2 text-sm font-semibold text-white px-7 py-3 rounded-full transition shadow-sm hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
        >
          Toutes nos actualités <IconArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}

const demoReviewsGlobal = [
  {
    id: 1,
    name: "Marie L.",
    role: "Victime d'accident de la circulation",
    rating: 5,
    content:
      "Maître Borgel et son équipe ont su transformer une situation dramatique en victoire juridique. Leur humanité, leur rigueur et leur disponibilité m'ont donné la force de tenir durant toute la procédure. Une indemnisation bien au-delà de mes espérances.",
    published_at: "2025-01-20",
    source: "Google",
    avatar: null,
  },
  {
    id: 2,
    name: "Pierre M.",
    role: "Client – Accident du travail",
    rating: 5,
    content:
      "Suivi irréprochable de mon dossier. Maître Borgel a su anticiper chaque obstacle et défendre mes droits avec une efficacité remarquable. Je n'aurais jamais obtenu une telle indemnisation sans son expertise. Je recommande sans réserve.",
    published_at: "2025-01-15",
    source: "Google",
    avatar: null,
  },
  {
    id: 3,
    name: "Anne-Sophie R.",
    role: "Cliente – Responsabilité médicale",
    rating: 5,
    content:
      "Professionnalisme, écoute et résultats concrets. L'équipe m'a guidée avec patience dans un dossier très complexe. Leur maîtrise du droit médical et leur combativité ont fait toute la différence. Un cabinet que je recommande en toute confiance.",
    published_at: "2025-01-10",
    source: "Google",
    avatar: null,
  },
  {
    id: 4,
    name: "Thomas B.",
    role: "Client – Dommage corporel",
    rating: 5,
    content:
      "Une équipe réellement à l'écoute et d'une grande compétence. Mon dossier a été traité avec beaucoup de sérieux et de transparence du début à la fin. Le résultat obtenu dépasse largement ce que j'aurais pu espérer seul face à l'assurance.",
    published_at: "2024-12-28",
    source: "Google",
    avatar: null,
  },
  {
    id: 5,
    name: "Isabelle D.",
    role: "Cliente – Faute médicale",
    rating: 5,
    content:
      "Votre expertise en responsabilité médicale a été déterminante dans notre affaire. Vous avez su nous accompagner avec humanité dans les moments les plus difficiles. Merci infiniment pour votre engagement et pour avoir obtenu la juste réparation de notre préjudice.",
    published_at: "2024-12-15",
    source: "Google",
    avatar: null,
  },
];

function ReviewsPreviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    reviewsAPI
      .list()
      .then((res) => {
        const l = (res.data.results || res.data).slice(0, 12);
        setReviews(l.length > 0 ? l : demoReviewsGlobal);
      })
      .catch(() => setReviews(demoReviewsGlobal));
  }, []);

  const displayed = reviews.length > 0 ? reviews : demoReviewsGlobal;
  const count     = displayed.length;
  const CARD_W    = 520;
  const STEP      = 562;

  const avatarGrads = [
    "from-teal-400 to-teal-600",
    "from-blue-400 to-blue-600",
    "from-violet-400 to-violet-600",
    "from-emerald-400 to-emerald-600",
    "from-purple-400 to-purple-600",
  ];

  const getInitials = (name: string) =>
    name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();

  const prev = () => setCurrent((i) => (i - 1 + count) % count);
  const next = () => setCurrent((i) => (i + 1) % count);

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Dot grid background */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #e2e8f0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.65,
        }}
      />

      <div className="relative z-10">
        {/* Header centré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center px-6 mb-16"
        >
          <p
            className="text-xs uppercase tracking-[0.45em] font-bold mb-4"
            style={{ color: "#00d4b8" }}
          >
            Témoignages clients
          </p>
          <h2
            className="font-black uppercase leading-none mb-6 text-slate-900"
            style={{ fontSize: "clamp(3.5rem, 10vw, 6.5rem)", letterSpacing: "-0.02em" }}
          >
            AVIS
          </h2>
          <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
            Retours directs de nos clients sur leur expérience et l'impact de notre accompagnement juridique.
          </p>
        </motion.div>

        {/* Carousel — carte centrale focalisée */}
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ height: "460px" }}
        >
          {displayed.map((review: any, i: number) => {
            let pos = i - current;
            if (pos >  count / 2) pos -= count;
            if (pos < -count / 2) pos += count;

            if (Math.abs(pos) > 1) return null;

            const isActive = pos === 0;

            return (
              <motion.div
                key={review.id}
                className="absolute"
                style={{ width: `${CARD_W}px`, zIndex: isActive ? 10 : 5 }}
                animate={{
                  x:       pos * STEP,
                  scale:   isActive ? 1 : 0.82,
                  opacity: isActive ? 1 : 0.28,
                  filter:  isActive ? "blur(0px)" : "blur(2.5px)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
              >
                <div
                  className="bg-white rounded-2xl p-9 relative flex flex-col overflow-hidden"
                  style={{
                    minHeight: "400px",
                    border:    isActive ? "1px solid #e2e8f0" : "1px solid #f1f5f9",
                    boxShadow: isActive ? "0 20px 60px rgba(0,0,0,0.09)" : "none",
                  }}
                >
                  {/* Barre accent gauche */}
                  <div
                    className="absolute left-0 top-8 bottom-8 w-[3px] rounded-r-full"
                    style={{ background: "#00d4b8" }}
                  />

                  {/* Guillemet décoratif */}
                  <span
                    aria-hidden
                    className="absolute top-4 right-7 font-black leading-none select-none pointer-events-none"
                    style={{ fontSize: "90px", color: "#1e40af", opacity: 0.07 }}
                  >
                    "
                  </span>

                  {/* Étoiles */}
                  <div className="flex gap-1 mb-5 ml-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <IconStar
                        key={j}
                        size={14}
                        className={
                          j < (review.rating ?? 5)
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200"
                        }
                      />
                    ))}
                  </div>

                  {/* Texte de l'avis */}
                  <p className="text-slate-700 text-lg italic leading-relaxed flex-1 ml-4 mb-7">
                    "{review.content}"
                  </p>

                  {/* Séparateur */}
                  <div className="h-px bg-slate-100 mb-5 ml-4" />

                  {/* Auteur */}
                  <div className="flex items-center gap-4 ml-4">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-[#e0f7fa]"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarGrads[i % avatarGrads.length]} flex items-center justify-center text-sm font-bold text-white shrink-0`}
                      >
                        {getInitials(review.name)}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-slate-900 text-base leading-tight">
                        {review.name}
                      </p>
                      <p
                        className="text-xs uppercase tracking-widest font-semibold mt-0.5"
                        style={{ color: "#00b8a0" }}
                      >
                        {review.role ?? review.source ?? "Client"}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots + flèches */}
        <div className="flex flex-col items-center gap-5 mt-10">
          <div className="flex gap-2 items-center">
            {displayed.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Avis ${i + 1}`}
                style={{
                  width:      i === current ? "28px" : "8px",
                  height:     "8px",
                  borderRadius: "9999px",
                  background: i === current ? "#00d4b8" : "#d1d5db",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={prev}
              aria-label="Précédent"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-[#00d4b8] hover:text-[#00b8a0] bg-white transition"
            >
              <IconChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label="Suivant"
              className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:border-[#00d4b8] hover:text-[#00b8a0] bg-white transition"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Section Processus ──────────────────────────────────────────── */
const processSteps = [
  {
    id: 1,
    icon: IconPhone,
    title: "Prise de contact",
    desc: "Contactez notre cabinet pour une consultation initiale gratuite. Nous évaluons votre situation et vous informons sur vos droits et les voies de recours possibles.",
    side: "left" as const,
  },
  {
    id: 2,
    icon: IconFileSearch,
    title: "Analyse de votre dossier",
    desc: "Nos avocats étudient minutieusement les éléments de votre dossier, évaluent l'étendue de vos préjudices et définissent la stratégie juridique la plus adaptée.",
    side: "right" as const,
  },
  {
    id: 3,
    icon: IconScale,
    title: "Défense et négociation",
    desc: "Nous prenons en charge toutes les démarches : expertises médicales, constitutions de dossier et négociations avec les compagnies d'assurance.",
    side: "left" as const,
  },
  {
    id: 4,
    icon: IconCircleCheck,
    title: "Obtention de l'indemnisation",
    desc: "Nous obtenons la juste réparation de votre préjudice, par accord amiable ou décision judiciaire — dans les meilleurs délais.",
    side: "right" as const,
  },
];

const PROC_ORANGE = "#1e40af";
const PROC_GREEN  = "#00d4b8";
const PROC_BG     = "#f0fdfa";

function ProcessStepCard({
  step,
  delay = 0,
}: {
  step: (typeof processSteps)[number];
  delay?: number;
}) {
  const Icon  = step.icon;
  const isLeft = step.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`flex items-start ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Cercle icône */}
      <div
        className="shrink-0 w-[68px] h-[68px] rounded-full bg-white flex items-center justify-center shadow-md z-10"
        style={{ border: `1.5px solid ${PROC_ORANGE}35` }}
      >
        <Icon size={26} style={{ color: PROC_ORANGE }} strokeWidth={1.5} />
      </div>

      {/* Carte */}
      <div
        className="bg-white shadow-sm flex-1 px-7 py-6"
        style={{
          marginLeft:   isLeft ? "-10px" : "0",
          marginRight:  isLeft ? "0" : "-10px",
          borderRadius: isLeft ? "0 18px 18px 18px" : "18px 0 18px 18px",
        }}
      >
        <h3 className="font-bold text-slate-900 mb-2" style={{ fontSize: "16px" }}>
          {step.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

function ProcessusSection() {
  const CARD_H      = 175;
  const COL_GAP     = 70;
  const RIGHT_OFF   = 210;

  const s1cy = CARD_H / 2;
  const s2cy = RIGHT_OFF + CARD_H / 2;
  const s3cy = CARD_H + COL_GAP + CARD_H / 2;
  const s4cy = RIGHT_OFF + CARD_H + COL_GAP + CARD_H / 2;
  const cH   = Math.max(s3cy + CARD_H / 2, s4cy + CARD_H / 2) + 60;

  return (
    <section className="py-20 px-6 lg:px-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-4" style={{ color: PROC_GREEN }}>
          Notre méthode
        </p>
        <h2
          className="font-bold text-slate-900 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
        >
          Voyez comme il est{" "}
          <span style={{ color: PROC_ORANGE }}>simple</span>{" "}
          de travailler avec nous
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed text-sm">
          De la prise de contact jusqu'à l'obtention de votre indemnisation — un accompagnement
          clair et structuré à chaque étape.
        </p>
      </motion.div>

      {/* Mobile: liste simple */}
      <div className="flex flex-col gap-8 lg:hidden max-w-lg mx-auto">
        {processSteps.map((step) => (
          <div key={step.id} className="flex items-start gap-4">
            <div
              className="shrink-0 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-sm"
              style={{ border: `1.5px solid ${PROC_ORANGE}40` }}
            >
              <step.icon size={18} style={{ color: PROC_ORANGE }} strokeWidth={1.5} />
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm flex-1">
              <div
                className="w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center mb-2"
                style={{ background: PROC_ORANGE }}
              >
                {step.id}
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">{step.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: zigzag */}
      <div
        className="max-w-5xl mx-auto relative hidden lg:block"
        style={{ minHeight: `${cH}px` }}
      >
        {/* SVG connectors */}
        <svg
          className="absolute inset-0 pointer-events-none"
          style={{ width: "100%", height: "100%", overflow: "visible" }}
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.3 }}
            d={`M 455,${s1cy} L 930,${s1cy} Q 950,${s1cy} 950,${s1cy + 22} L 950,${s2cy}`}
            stroke={PROC_ORANGE}
            strokeWidth="2"
            strokeDasharray="10 7"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.5 }}
            d={`M 455,${s3cy} L 930,${s3cy} Q 950,${s3cy} 950,${s3cy + 22} L 950,${s4cy}`}
            stroke={PROC_ORANGE}
            strokeWidth="2"
            strokeDasharray="10 7"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Left column: steps 1 & 3 */}
        <div className="absolute" style={{ left: 0, top: 0, width: "47%" }}>
          <ProcessStepCard step={processSteps[0]} delay={0.1} />
          <div style={{ marginTop: `${COL_GAP}px` }}>
            <ProcessStepCard step={processSteps[2]} delay={0.3} />
          </div>
        </div>

        {/* Right column: steps 2 & 4 (décalé) */}
        <div className="absolute" style={{ right: 0, top: `${RIGHT_OFF}px`, width: "47%" }}>
          <ProcessStepCard step={processSteps[1]} delay={0.2} />
          <div style={{ marginTop: `${COL_GAP}px` }}>
            <ProcessStepCard step={processSteps[3]} delay={0.4} />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-14 lg:mt-20">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:opacity-90"
          style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
        >
          Consultation gratuite <IconArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Borgel & Associés — Avocat Marseille — Dommage Corporel</title>
        <meta
          name="description"
          content="Cabinet d'avocats spécialisé en droit du dommage corporel et responsabilité médicale à Marseille. Accidents de la route, fautes médicales, accidents du travail."
        />
      </Helmet>
      <HeroSection />
      <AboutPreviewSection />
      {/* <PresentationSection /> */}
      {/* <ParallaxSections /> */}
      <ExpertisesPreviewSection />
      <ProcessusSection />
      <TeamPreviewSection />
      <PostsPreviewSection />
      <ReviewsPreviewSection />
      <Newsletter />
    </>
  );
}
