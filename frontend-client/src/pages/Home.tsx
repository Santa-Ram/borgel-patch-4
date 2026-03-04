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
  ArrowRight,
  Shield,
  Scale,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Car,
  Stethoscope,
  Star,
  Quote,
  Award,
  CheckCircle,
  Calendar,
  Eye,
} from "lucide-react";
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
    <section className="relative isolate flex justify-center bg-[#080d1e] overflow-hidden min-h-[90vh] lg:min-h-screen">
      <div
        aria-hidden
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute -top-20 right-1/3 w-[600px] aspect-square rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -left-20 w-[400px] aspect-square rounded-full bg-indigo-600/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] aspect-square rounded-full bg-orange-600/15 blur-[130px]" />
        <div className="absolute -top-10 right-1/2 mr-10 blur-3xl">
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              width: 550,
            }}
            className="aspect-[1097/845] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-25"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 lg:py-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Text */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-4 font-semibold"
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
            <span className="text-orange-400 font-semibold">
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
                Prendre rendez-vous <ArrowRight size={16} />
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
              [Shield, "15+ ans d'expérience"],
              [Scale, "Experts reconnus"],
              [Briefcase, "Accompagnement sur mesure"],
            ].map(([Icon, label]) => (
              <div key={label as string} className="flex items-center gap-2">
                <Icon size={14} className="text-orange-400" />
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
            className="relative rounded-3xl bg-white/5 border border-white/10 p-7 pb-8 backdrop-blur shadow-2xl overflow-hidden"
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
                  <span className="text-xs rounded-full bg-orange-500/15 text-orange-300 px-3 py-1">
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
                {[ChevronLeft, ChevronRight].map((Icon, i) => (
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
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-white/20 text-white/60 hover:border-orange-500/60 hover:text-orange-400 transition"
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
                    className={`h-1.5 rounded-full transition-all ${i === current ? "w-5 bg-orange-500" : "w-2 bg-white/30"}`}
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

function AboutPreviewSection() {
  return (
    <section className="py-20 px-6 bg-[#080d1e]">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Gauche : texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">
              À propos du cabinet
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">
              15 ans au service des victimes
            </h2>
            <p className="text-white/65 leading-relaxed mb-5">
              Fondé en 2007 par Maître Borgel, notre cabinet s'est imposé comme
              une référence en droit du dommage corporel à Marseille. Nous
              défendons les victimes d'accidents et de fautes médicales avec
              rigueur et humanité.
            </p>
            <p className="text-white/65 leading-relaxed mb-8">
              Notre approche : transparence totale, communication régulière et
              combativité sans faille pour obtenir la{" "}
              <span className="text-orange-400 font-semibold">
                juste réparation
              </span>{" "}
              de chaque préjudice.
            </p>
            {/* Valeurs résumées */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                [Shield, "Rigueur juridique"],
                [Award, "Expertise reconnue"],
                [CheckCircle, "Résultats prouvés"],
                [Quote, "Écoute & humanité"],
              ].map(([Icon, label]) => (
                <div
                  key={label as string}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <Icon size={15} className="text-orange-400 shrink-0" />
                  {label as string}
                </div>
              ))}
            </div>
            <Link
              to="/a-propos"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-orange-500/40 hover:text-orange-400 text-white text-sm font-medium px-6 py-2.5 rounded-full transition"
            >
              En savoir plus <ArrowRight size={14} />
            </Link>
          </motion.div>

          {/* Droite : stats + citation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                ["15+", "Ans d'expérience"],
                ["500+", "Dossiers"],
                ["95%", "Satisfaction"],
              ].map(([v, l]) => (
                <div key={l} className="glass-card p-4 text-center">
                  <p className="text-2xl font-bold text-orange-400">{v}</p>
                  <p className="text-[11px] text-white/45 mt-0.5">{l}</p>
                </div>
              ))}
            </div>
            {/* Citation client */}
            <div className="glass-card p-6 relative overflow-hidden">
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-orange-500/8 rounded-full blur-xl" />
              <Quote size={22} className="text-orange-400/50 mb-3" />
              <p className="text-white/70 text-sm leading-relaxed italic mb-4">
                "Maître Borgel et son équipe m'ont accompagné avec une humanité
                et une rigueur exemplaires. L'indemnisation obtenue a changé ma
                vie."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center text-xs font-bold text-orange-400">
                  M
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">Marie L.</p>
                  <p className="text-[10px] text-white/35">
                    Victime d'accident — 2024
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PresentationSection() {
  return (
    <section className="py-24 px-6 bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Le cabinet</p>
          <h2 className="section-title">
            Des avocats engagés pour votre indemnisation
          </h2>
          <p className="text-white/70 mb-6 leading-relaxed">
            Fondé par Maître Borgel, notre cabinet est spécialisé depuis plus de
            15 ans dans la défense des victimes d'accidents et de fautes
            médicales. Nous mettons notre expertise au service d'une cause
            essentielle : obtenir la juste réparation de votre préjudice.
          </p>
          <p className="text-white/70 mb-8 leading-relaxed">
            Notre approche combine rigueur juridique, pédagogie et engagement
            personnel pour chaque dossier. Nous croyons en la transparence et
            dans un accompagnement humain tout au long de la procédure.
          </p>
          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              ["15+", "Ans d'expérience"],
              ["500+", "Dossiers traités"],
              ["95%", "Taux de satisfaction"],
            ].map(([nb, label]) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-bold text-orange-400">{nb}</p>
                <p className="text-xs text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Link to="/equipe" className="btn-outline">
            En savoir plus <ArrowRight size={16} />
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            {
              icon: Car,
              title: "Accidents circulation",
              desc: "Indemnisation complète des victimes",
            },
            {
              icon: Stethoscope,
              title: "Fautes médicales",
              desc: "Expertise en responsabilité médicale",
            },
            {
              icon: Shield,
              title: "Dommage corporel",
              desc: "Évaluation et réparation du préjudice",
            },
            {
              icon: Scale,
              title: "Contentieux",
              desc: "Défense en justice à tous niveaux",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="glass-card p-5 hover:border-orange-500/20 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center mb-3">
                <Icon size={18} className="text-orange-400" />
              </div>
              <h4 className="font-semibold text-white text-sm mb-1">{title}</h4>
              <p className="text-xs text-white/50">{desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ExpertisesPreviewSection() {
  const expertiseItems = [
    {
      icon: Car,
      title: "Accidents de la circulation",
      desc: "Défense des victimes d'accidents de la route, piétons, cyclistes, passagers.",
      slug: "accidents-circulation",
    },
    {
      icon: Stethoscope,
      title: "Droit de la santé",
      desc: "Accompagnement des patients victimes de fautes médicales et infections nosocomiales.",
      slug: "droit-sante",
    },
    {
      icon: Shield,
      title: "Assurance & Dommage corporel",
      desc: "Négociation et contentieux face aux compagnies d'assurance pour obtenir une juste indemnisation.",
      slug: "assurance-dommage",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label">Domaines d'intervention</p>
          <h2 className="section-title">Nos Expertises</h2>
          <p className="text-white/60 max-w-xl mx-auto">
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
              className="glass-card p-6 hover:border-orange-500/30 transition group"
            >
              <Link to={`/expertises/${exp.slug}`} className="block">
                <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 group-hover:bg-orange-500/25 transition">
                  <exp.icon size={22} className="text-orange-400" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-orange-400 transition">
                  {exp.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 leading-relaxed">
                  {exp.desc}
                </p>
                <span className="inline-flex items-center gap-1 text-xs text-orange-400">
                  Découvrir <ArrowRight size={12} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Link to="/expertises" className="btn-outline">
            Toutes nos expertises <ArrowRight size={16} />
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
  "from-orange-400 to-orange-600",
  "from-blue-400 to-blue-600",
  "from-purple-400 to-purple-600",
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
    <section className="py-24 px-6 bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto">
        {/* Header aligné à gauche — comme la photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Notre équipe</h2>
          <p className="text-white/55 text-base max-w-lg leading-relaxed">
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
                  className="flex flex-col items-center text-center group"
                >
                  {/* Photo circulaire */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-5 ring-2 ring-white/5 group-hover:ring-orange-500/30 transition duration-300">
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
                  <h3 className="font-bold text-white text-sm mb-1 group-hover:text-orange-400 transition">
                    {member.name}
                  </h3>
                  <p className="text-xs text-white/50">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition border border-white/15 hover:border-orange-500/40 px-6 py-2.5 rounded-full"
          >
            Voir toute l'équipe <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PostsPreviewSection() {
  const [all, setAll] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  const demoPosts = [
    {
      id: 1,
      title: "Nouvelles règles d'indemnisation en 2025",
      slug: "indemnisation-2025",
      excerpt:
        "Découvrez les changements importants concernant l'indemnisation des victimes d'accidents de la route.",
      views: 234,
      created_at: "2025-01-15",
      cover_image: undefined,
    },
    {
      id: 2,
      title: "Faute médicale : comment réagir ?",
      slug: "faute-medicale",
      excerpt:
        "Tout ce que vous devez savoir sur vos droits en cas de faute médicale avérée ou suspectée.",
      views: 189,
      created_at: "2025-01-10",
      cover_image: undefined,
    },
    {
      id: 3,
      title: "Accident du travail et indemnisation",
      slug: "accident-travail",
      excerpt:
        "Guide complet sur les démarches à suivre après un accident du travail.",
      views: 312,
      created_at: "2025-01-05",
      cover_image: undefined,
    },
    {
      id: 4,
      title: "Droits des victimes d'attentat",
      slug: "victimes-attentat",
      excerpt:
        "Comprendre le régime spécifique d'indemnisation des victimes d'actes terroristes.",
      views: 156,
      created_at: "2024-12-20",
      cover_image: undefined,
    },
    {
      id: 5,
      title: "Expertise médicale : vos droits",
      slug: "expertise-medicale",
      excerpt:
        "Comment se préparer à une expertise médicale et défendre vos intérêts face au médecin de l'assurance.",
      views: 278,
      created_at: "2024-12-15",
      cover_image: undefined,
    },
  ];

  const getRandom3 = (arr: any[]) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, 3);

  useEffect(() => {
    postsAPI
      .list({ page_size: 20 })
      .then((res) => {
        const list = res.data.results || res.data;
        const pool = list.length > 0 ? list : demoPosts;
        setAll(pool);
        setDisplayed(getRandom3(pool));
      })
      .catch(() => {
        setAll(demoPosts);
        setDisplayed(getRandom3(demoPosts));
      });
  }, []);

  useEffect(() => {
    if (all.length <= 3) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setDisplayed(getRandom3(all));
        setVisible(true);
      }, 400);
    }, 60_000);
    return () => clearInterval(interval);
  }, [all]);

  return (
    <section className="py-24 px-6 bg-[#080d1e]">
      <div className="max-w-6xl mx-auto">
        {/* Header — aligné gauche comme TeamPreview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">
            Actualités
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Dernières publications
              </h2>
              <p className="text-white/55 text-base max-w-lg leading-relaxed">
                Restez informé des dernières évolutions juridiques et de nos
                conseils pratiques.
              </p>
            </div>
            <Link
              to="/actualites"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition border border-white/10 hover:border-orange-500/30 px-4 py-2 rounded-full shrink-0"
            >
              Tout voir <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Liste verticale — style magazine */}
        <AnimatePresence mode="wait">
          {visible && displayed.length > 0 && (
            <motion.div
              key={displayed.map((p: any) => p.id).join("-")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {displayed.map((post: any, i: number) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex gap-5 items-center rounded-2xl border border-white/8 bg-[#0d1117] hover:border-orange-500/20 hover:bg-[#111827] transition p-4"
                >
                  {/* Numéro */}
                  <span className="text-4xl font-black text-white/6 group-hover:text-orange-500/15 transition w-10 shrink-0 text-center leading-none select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Image miniature */}
                  <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-gradient-to-br from-blue-900/30 to-indigo-900/20 relative">
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xl opacity-20">
                        📰
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1.5">
                      <span className="text-[10px] text-white/30 flex items-center gap-1">
                        <Calendar size={9} />
                        {new Date(post.created_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                      {post.views > 0 && (
                        <span className="text-[10px] text-white/20 flex items-center gap-1">
                          <Eye size={9} />
                          {post.views}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-orange-400 transition mb-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-white/40 line-clamp-1">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Flèche */}
                  <Link
                    to={`/actualites/${post.slug}`}
                    className="w-8 h-8 rounded-full border border-white/10 group-hover:border-orange-500/30 flex items-center justify-center text-white/20 group-hover:text-orange-400 transition shrink-0"
                  >
                    <ArrowRight size={13} />
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA — même style que TeamPreview */}
        <div className="mt-10 text-center">
          <Link
            to="/actualites"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition border border-white/15 hover:border-orange-500/40 px-6 py-2.5 rounded-full"
          >
            Voir toutes les actualités <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ReviewsPreviewSection() {
  const [all, setAll] = useState<any[]>([]);
  const [displayed, setDisplayed] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);

  const demoReviews = [
    {
      id: 1,
      name: "Marie L.",
      rating: 5,
      content:
        "Cabinet exceptionnel ! Maître Borgel a su défendre mes droits avec une efficacité remarquable. Je recommande vivement.",
      published_at: "2025-01-20",
      source: "Google",
      avatar: null,
    },
    {
      id: 2,
      name: "Pierre M.",
      rating: 5,
      content:
        "Suivi impeccable de mon dossier d'accident de la route. Indemnisation obtenue bien au-delà de mes espérances.",
      published_at: "2025-01-15",
      source: "Google",
      avatar: null,
    },
    {
      id: 3,
      name: "Anne-Sophie R.",
      rating: 5,
      content:
        "Professionnalisme, écoute et résultats. Très satisfaite de l'accompagnement reçu tout au long de mon dossier.",
      published_at: "2025-01-10",
      source: "Google",
      avatar: null,
    },
    {
      id: 4,
      name: "Thomas B.",
      rating: 5,
      content:
        "Une équipe à l'écoute et très compétente. Mon dossier d'accident du travail a été traité avec beaucoup de sérieux.",
      published_at: "2024-12-28",
      source: "Google",
      avatar: null,
    },
    {
      id: 5,
      name: "Isabelle D.",
      rating: 5,
      content:
        "Merci infiniment pour votre accompagnement. Votre expertise en responsabilité médicale a été déterminante dans notre cas.",
      published_at: "2024-12-15",
      source: "Google",
      avatar: null,
    },
  ];

  const getRandom3 = (arr: any[]) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, 3);
  const avgRating =
    displayed.length > 0
      ? displayed.reduce((a: number, r: any) => a + r.rating, 0) /
        displayed.length
      : 5;

  useEffect(() => {
    reviewsAPI
      .list()
      .then((res) => {
        const list = (res.data.results || res.data).slice(0, 20);
        const pool = list.length > 0 ? list : demoReviews;
        setAll(pool);
        setDisplayed(getRandom3(pool));
      })
      .catch(() => {
        setAll(demoReviews);
        setDisplayed(getRandom3(demoReviews));
      });
  }, []);

  useEffect(() => {
    if (all.length <= 3) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setDisplayed(getRandom3(all));
        setVisible(true);
      }, 400);
    }, 60_000);
    return () => clearInterval(interval);
  }, [all]);

  const avatarColors = [
    "from-blue-600 to-indigo-700",
    "from-orange-500 to-red-600",
    "from-emerald-500 to-teal-600",
  ];

  return (
    <section className="py-24 px-6 bg-[#0a0f1e]">
      <div className="max-w-6xl mx-auto">
        {/* Header — aligné gauche comme TeamPreview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">
            Témoignages
          </p>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-4xl font-bold text-white mb-2">
                Avis de nos clients
              </h2>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={
                        i < Math.round(avgRating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <span className="text-xs text-white/40">
                  {avgRating.toFixed(1)}/5 · Google
                </span>
              </div>
            </div>
            <Link
              to="/avis"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition border border-white/10 hover:border-orange-500/30 px-4 py-2 rounded-full shrink-0"
            >
              Tout voir <ArrowRight size={13} />
            </Link>
          </div>
        </motion.div>

        {/* Grille citations — style grande quote */}
        <AnimatePresence mode="wait">
          {visible && displayed.length > 0 && (
            <motion.div
              key={displayed.map((r: any) => r.id).join("-")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-3 gap-5"
            >
              {displayed.map((review: any, i: number) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative rounded-2xl border border-white/8 bg-[#0d1117] p-6 hover:border-orange-500/20 transition flex flex-col overflow-hidden"
                >
                  {/* Guillemet déco */}
                  <span className="absolute top-4 right-5 text-6xl font-black text-white/4 group-hover:text-orange-500/8 transition leading-none select-none">
                    "
                  </span>

                  {/* Étoiles */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        className={
                          j < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-white/15"
                        }
                      />
                    ))}
                  </div>

                  {/* Contenu — prend toute la place */}
                  <p className="text-sm text-white/65 leading-relaxed line-clamp-4 flex-1 mb-5">
                    {review.content}
                  </p>

                  {/* Séparateur */}
                  <div className="h-px bg-white/6 mb-4" />

                  {/* Auteur en bas */}
                  <div className="flex items-center gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/10"
                      />
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-xs font-bold text-white shrink-0`}
                      >
                        {review.name[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {review.name}
                      </p>
                      <p className="text-[10px] text-white/30">
                        {review.source} ·{" "}
                        {new Date(review.published_at).toLocaleDateString(
                          "fr-FR",
                          { month: "short", year: "numeric" },
                        )}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA — même style que TeamPreview */}
        <div className="mt-10 text-center">
          <Link
            to="/avis"
            className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition border border-white/15 hover:border-orange-500/40 px-6 py-2.5 rounded-full"
          >
            Voir tous les avis <ArrowRight size={14} />
          </Link>
        </div>
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
      <PresentationSection />
      <ParallaxSections />
      <ExpertisesPreviewSection />
      <TeamPreviewSection />
      <PostsPreviewSection />
      <ReviewsPreviewSection />
      <Newsletter />
    </>
  );
}
