import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  IconPhone,
  IconFileSearch,
  IconScale,
  IconCircleCheck,
  IconArrowRight,
} from "@tabler/icons-react";

const ORANGE = "#1e40af";
const GREEN  = "#00d4b8";
const BG     = "#f0fdfa";

const steps = [
  {
    id: 1,
    icon: IconPhone,
    title: "Prise de contact",
    desc: "Contactez notre cabinet pour une consultation initiale. Nous évaluons votre situation, vous informons sur vos droits et les voies de recours possibles pour obtenir réparation.",
    side: "left" as const,
  },
  {
    id: 2,
    icon: IconFileSearch,
    title: "Analyse de votre dossier",
    desc: "Nos avocats étudient minutieusement les éléments de votre dossier, évaluent vos préjudices et définissent la stratégie juridique la plus adaptée à votre situation.",
    side: "right" as const,
  },
  {
    id: 3,
    icon: IconScale,
    title: "Défense et négociation",
    desc: "Nous prenons en charge toutes les démarches : expertises médicales, constitutions de dossier et négociations face aux compagnies d'assurance. Vous êtes informé à chaque étape.",
    side: "left" as const,
  },
  {
    id: 4,
    icon: IconCircleCheck,
    title: "Obtention de l'indemnisation",
    desc: "Nous obtenons la juste réparation de votre préjudice, par accord amiable ou décision judiciaire. Notre objectif : maximiser votre indemnisation dans les meilleurs délais.",
    side: "right" as const,
  },
];

/* ── Carte d'étape ──────────────────────────────────────────── */
function StepCard({
  step,
  delay = 0,
}: {
  step: (typeof steps)[number];
  delay?: number;
}) {
  const Icon = step.icon;
  const isLeft = step.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`flex items-start gap-0 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Cercle icône */}
      <div
        className="shrink-0 w-[72px] h-[72px] rounded-full bg-white flex items-center justify-center shadow-md z-10"
        style={{ border: `1.5px solid ${ORANGE}30` }}
      >
        <Icon size={28} style={{ color: ORANGE }} strokeWidth={1.5} />
      </div>

      {/* Carte */}
      <div
        className="bg-white rounded-2xl shadow-sm flex-1"
        style={{
          padding: "28px 32px",
          marginLeft: isLeft ? "-12px" : "0",
          marginRight: isLeft ? "0" : "-12px",
          borderRadius: isLeft
            ? "0 20px 20px 20px"
            : "20px 0 20px 20px",
        }}
      >
        <h3
          className="font-bold text-slate-900 mb-3"
          style={{ fontSize: "17px" }}
        >
          {step.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Ligne de connexion SVG ──────────────────────────────────── */
function Connector({ fromY, toY }: { fromY: number; toY: number }) {
  return (
    <svg
      className="absolute pointer-events-none hidden lg:block"
      style={{ left: 0, top: 0, width: "100%", height: "100%", overflow: "visible" }}
      viewBox="0 0 1000 1"
      preserveAspectRatio="none"
    >
      <path
        d={`M 460,${fromY} L 940,${fromY} Q 960,${fromY} 960,${fromY + 20} L 960,${toY}`}
        stroke={ORANGE}
        strokeWidth="2"
        strokeDasharray="10 7"
        fill="none"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function ProcessusPage() {
  /* Heights used to position SVG connectors (px) */
  const CARD_H     = 190; /* approximate card height */
  const COL_GAP    = 80;  /* gap between cards in same column */
  const RIGHT_OFFSET = 220; /* right column top padding */

  /* Center-Y of each step card from container top */
  const s1cy = CARD_H / 2;                          /* ~95  */
  const s2cy = RIGHT_OFFSET + CARD_H / 2;           /* ~315 */
  const s3cy = CARD_H + COL_GAP + CARD_H / 2;       /* ~365 */
  const s4cy = RIGHT_OFFSET + CARD_H + COL_GAP + CARD_H / 2; /* ~585 */

  const containerH = Math.max(s3cy + CARD_H / 2, s4cy + CARD_H / 2) + 80;

  return (
    <>
      <Helmet>
        <title>Notre Processus — Borgel & Associés</title>
        <meta
          name="description"
          content="Découvrez comment le cabinet Borgel & Associés vous accompagne étape par étape, de la prise de contact à l'obtention de votre indemnisation."
        />
      </Helmet>

      {/* ── Hero header ─────────────────────────────────────── */}
      <section style={{ background: BG }} className="pt-16 pb-0 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto pt-12 pb-14"
        >
          <p
            className="text-xs uppercase tracking-[0.4em] font-bold mb-5"
            style={{ color: GREEN }}
          >
            Notre méthode
          </p>
          <h1
            className="font-bold text-slate-900 leading-tight mb-5"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
          >
            Voyez comme il est{" "}
            <span style={{ color: ORANGE }}>simple</span>
            {" "}de travailler avec nous
          </h1>
          <p className="text-slate-500 leading-relaxed">
            Un accompagnement clair, transparent et structuré — de votre première
            prise de contact jusqu'à l'obtention de votre indemnisation.
          </p>
        </motion.div>
      </section>

      {/* ── Étapes ──────────────────────────────────────────── */}
      <section style={{ background: BG }} className="pb-24 px-6 lg:px-16">
        <div
          className="max-w-5xl mx-auto relative"
          style={{ minHeight: `${containerH}px` }}
        >
          {/* ── SVG connector lines (desktop only) ── */}
          <svg
            className="absolute inset-0 pointer-events-none hidden lg:block"
            style={{ width: "100%", height: "100%", overflow: "visible" }}
          >
            {/* Connector: Step 1 → Step 2 */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              d={`M 460,${s1cy} L 940,${s1cy} Q 960,${s1cy} 960,${s1cy + 20} L 960,${s2cy}`}
              stroke={ORANGE}
              strokeWidth="2"
              strokeDasharray="10 7"
              fill="none"
              strokeLinecap="round"
            />
            {/* Connector: Step 3 → Step 4 */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
              d={`M 460,${s3cy} L 940,${s3cy} Q 960,${s3cy} 960,${s3cy + 20} L 960,${s4cy}`}
              stroke={ORANGE}
              strokeWidth="2"
              strokeDasharray="10 7"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* ── Grid: 2 colonnes (desktop) ── */}
          <div className="flex flex-col gap-10 lg:hidden">
            {/* Mobile: stack simple */}
            {steps.map((step, i) => (
              <div key={step.id} className="flex items-start gap-4">
                <div
                  className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm"
                  style={{ border: `1.5px solid ${ORANGE}40` }}
                >
                  <step.icon size={20} style={{ color: ORANGE }} strokeWidth={1.5} />
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm flex-1">
                  <div
                    className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center mb-3"
                    style={{ background: ORANGE }}
                  >
                    {step.id}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: zigzag 2-col layout */}
          <div className="hidden lg:block">
            {/* Left column: steps 1 & 3 */}
            <div className="absolute" style={{ left: 0, top: 0, width: "48%" }}>
              <StepCard step={steps[0]} delay={0.1} />
              <div style={{ marginTop: `${COL_GAP}px` }}>
                <StepCard step={steps[2]} delay={0.3} />
              </div>
            </div>

            {/* Right column: steps 2 & 4 (offset) */}
            <div
              className="absolute"
              style={{ right: 0, top: `${RIGHT_OFFSET}px`, width: "48%" }}
            >
              <StepCard step={steps[1]} delay={0.2} />
              <div style={{ marginTop: `${COL_GAP}px` }}>
                <StepCard step={steps[3]} delay={0.4} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Checklist rapide ────────────────────────────────── */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-3 gap-8 text-center"
          >
            {[
              { num: "01", label: "Consultation initiale gratuite" },
              { num: "02", label: "Honoraires transparents dès le départ" },
              { num: "03", label: "Accompagnement de A à Z" },
            ].map((item) => (
              <div key={item.num} className="flex flex-col items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-black text-sm"
                  style={{ background: ORANGE }}
                >
                  {item.num}
                </div>
                <p className="text-slate-700 font-semibold text-sm">{item.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: BG }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <p
            className="text-xs uppercase tracking-[0.4em] font-bold mb-4"
            style={{ color: GREEN }}
          >
            Prêt à commencer ?
          </p>
          <h2
            className="font-bold text-slate-900 mb-5 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
          >
            Votre consultation initiale est{" "}
            <span style={{ color: ORANGE }}>gratuite</span>
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
            Prenez rendez-vous avec l'un de nos avocats. Nous évaluons votre dossier
            sans engagement et vous orientons vers la meilleure stratégie.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-md hover:shadow-lg hover:opacity-90"
              style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
            >
              Prendre rendez-vous <IconArrowRight size={16} />
            </Link>
            <Link
              to="/expertises"
              className="inline-flex items-center gap-2 font-semibold px-8 py-3.5 rounded-full border-2 transition"
              style={{ borderColor: GREEN, color: GREEN }}
            >
              Nos expertises
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
