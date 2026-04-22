import { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconNews,
  IconTool,
  IconArrowRight,
} from "@tabler/icons-react";
import toast from "react-hot-toast";
import { contactsAPI } from "../api/client";

const CYAN  = "#00d4b8";

const domaineOptions = [
  "Sélectionnez un domaine",
  "Accidents de la circulation",
  "Droit de la santé / Faute médicale",
  "Responsabilité médicale",
  "Accident du travail",
  "Victimes d'attentat",
  "Assurance & Dommage corporel",
  "Préjudice corporel",
  "Autre",
];

const sourceOptions = [
  "Comment nous avez-vous connu ?",
  "Recommandation d'un proche",
  "Google",
  "Réseaux sociaux",
  "Bouche à oreille",
  "Ancienne client(e)",
  "Autre",
];

const inputSty: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.10)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: "8px",
  padding: "12px 16px",
  color: "#ffffff",
  fontFamily: "'Poppins', sans-serif",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
};

const focusSty = {
  background: "rgba(255,255,255,0.15)",
  borderColor: `rgba(0,212,184,0.7)`,
  boxShadow: "0 0 0 3px rgba(0,212,184,0.15)",
};

function DarkInput({ type = "text", value, onChange, placeholder, required }: {
  type?: string; value: string; onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{ ...inputSty, ...(focused ? focusSty : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function DarkSelect({ value, onChange, options }: {
  value: string; onChange: React.ChangeEventHandler<HTMLSelectElement>; options: string[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputSty, appearance: "auto", ...(focused ? focusSty : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {options.map((o, i) => (
        <option key={o} value={i === 0 ? "" : o} style={{ background: "#2d1b6b", color: "#ffffff" }}>
          {o}
        </option>
      ))}
    </select>
  );
}

function DarkTextarea({ value, onChange, placeholder, rows = 6, required }: {
  value: string; onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string; rows?: number; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      style={{ ...inputSty, resize: "none", ...(focused ? focusSty : {}) }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

const labelSty: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "rgba(255,255,255,0.75)",
  marginBottom: "6px",
};

function SupportCard({ icon, title, description, variants }: {
  icon: React.ReactNode; title: string; description: string; variants: any;
}) {
  return (
    <motion.div
      variants={variants}
      className="relative rounded-2xl p-6 text-white transition"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.11)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg"
             style={{ background: "rgba(79,53,194,0.15)", color: CYAN }}>
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-start" style={{ color: "rgba(255,255,255,0.6)" }}>{description}</p>
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", domaine: "", source: "", message: "",
  });
  const [loading, setLoading] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactsAPI.submit({
        name:    form.name,
        email:   form.email,
        phone:   form.phone,
        message: `[${form.domaine}] ${form.message}\nSource : ${form.source}`,
        expertises: [],
      });
      toast.success("Message envoyé ! Nous vous répondrons sous 24 h.");
      setForm({ name: "", email: "", phone: "", domaine: "", source: "", message: "" });
    } catch {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const fadeUpCard = {
    hidden:  { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };
  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <>
      <Helmet>
        <title>Contact — Borgel & Associés</title>
        <meta
          name="description"
          content="Contactez le cabinet Borgel & Associés pour une consultation. Avocat à Marseille spécialisé en dommage corporel."
        />
      </Helmet>

      {/* ── Hero section ─────────────────────────────────── */}
      <section className="relative overflow-hidden lg:min-h-[520px] sm:pt-10 lg:pb-20" style={{ background: "linear-gradient(135deg, #1a0e5c 0%, #2d1b6b 50%, #3b2494 100%)" }}>
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 bottom-1/4 w-[500px] aspect-square rounded-full bg-[#5b72e8]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 left-0 w-[400px] aspect-square rounded-full bg-purple-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 mt-10 lg:mt-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="text-xs uppercase tracking-[0.3em] font-bold mb-4"
              style={{ color: CYAN }}
            >
              Centre de contact
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="font-bold text-3xl sm:text-5xl text-white mb-4"
            >
              Centre de contact
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-xl mx-auto mb-10"
              style={{ color: "rgba(200,208,248,0.75)" }}
            >
              Envoyez-nous un message pour toute question ou demande d'information ou de consultation.
            </motion.p>

            <motion.div
              variants={container}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <SupportCard icon={<IconPhone />}     title="Consultation" description="Contactez-nous pour votre première consultation gratuite. Nous évaluons votre situation et vos droits." variants={fadeUpCard} />
              <SupportCard icon={<IconTool />}    title="Support"      description="Notre équipe est disponible pour répondre à toutes vos questions juridiques du lundi au vendredi." variants={fadeUpCard} />
              <SupportCard icon={<IconNews />} title="Formulaire"   description="Remplissez notre formulaire de contact pour nous décrire votre situation. Réponse sous 24 heures." variants={fadeUpCard} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Two-column layout ─────────────────────────────── */}
      <div className="min-h-screen grid lg:grid-cols-[1fr_1.15fr]" style={{ background: "linear-gradient(160deg, #0f0820 0%, #1a0e5c 60%, #2d1b6b 100%)" }}>

        {/* ── LEFT — Info + Map ─────────────────────────── */}
        <div
          className="flex flex-col px-8 lg:px-14 py-16 lg:py-20"
          style={{ background: "rgba(255,255,255,0.04)", borderRight: "1px solid rgba(255,255,255,0.08)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col h-full"
          >
            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-6" style={{ color: CYAN }}>
              Cabinet Borgel &amp; Associés
            </p>

            <h2 className="font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
              Venez nous rencontrer à{" "}
              <span style={{ color: "#00d4b8" }}>Marseille</span>
            </h2>

            <p className="leading-relaxed mb-10 max-w-md text-sm" style={{ color: "#c8d0f8" }}>
              Vous avez subi un accident ou une faute médicale ? Nos avocats sont disponibles pour une première consultation gratuite et confidentielle afin d'évaluer votre situation et vos droits.
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-10">
              {[
                { icon: IconMapPin, label: "ADRESSE",   lines: ["89, Rue Saint Jacques", "13006 Marseille"] },
                { icon: IconPhone,  label: "TÉLÉPHONE", lines: ["04 91 33 50 00"] },
                { icon: IconMail,   label: "EMAIL",     lines: ["contact@borgel-avocat.fr"] },
                { icon: IconClock,  label: "HORAIRES",  lines: ["Lundi – Vendredi : 9h00 – 18h00", "Urgences sur rendez-vous"] },
              ].map(({ icon: Icon, label, lines }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                       style={{ background: "rgba(0,212,184,0.10)", border: "1px solid rgba(0,212,184,0.20)" }}>
                    <Icon size={15} style={{ color: CYAN }} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-bold mb-0.5"
                       style={{ color: "rgba(255,255,255,0.4)" }}>
                      {label}
                    </p>
                    {lines.map((l) => (
                      <p key={l} className="text-sm" style={{ color: "#c8d0f8" }}>{l}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Google Maps */}
            <div className="mt-auto rounded-2xl overflow-hidden flex-1 min-h-[220px] max-h-[300px]"
                 style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              <iframe
                title="Cabinet Borgel & Associés — Marseille"
                src="https://maps.google.com/maps?q=89+Rue+Saint+Jacques+13006+Marseille+France&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: "block", minHeight: "220px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT — Form ──────────────────────────────── */}
        <div
          className="flex flex-col px-8 lg:px-14 py-16 lg:py-20"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h2 className="font-bold text-white mb-2" style={{ fontSize: "1.5rem" }}>
              Envoyez-nous un message
            </h2>
            <p className="text-sm mb-8" style={{ color: "rgba(200,208,248,0.7)" }}>
              Première consultation gratuite · Réponse sous 24 h
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label style={labelSty}>Nom complet *</label>
                <DarkInput type="text" required value={form.name} onChange={set("name")} placeholder="Marie Dupont" />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label style={labelSty}>Email *</label>
                  <DarkInput type="email" required value={form.email} onChange={set("email")} placeholder="marie@email.fr" />
                </div>
                <div>
                  <label style={labelSty}>Téléphone</label>
                  <DarkInput type="tel" value={form.phone} onChange={set("phone")} placeholder="06 XX XX XX XX" />
                </div>
              </div>

              <div>
                <label style={labelSty}>Domaine concerné</label>
                <DarkSelect value={form.domaine} onChange={set("domaine")} options={domaineOptions} />
              </div>

              <div>
                <label style={labelSty}>Votre message *</label>
                <DarkTextarea required rows={6} value={form.message} onChange={set("message")} placeholder="Décrivez brièvement votre situation..." />
              </div>

              <div>
                <label style={labelSty}>Comment nous avez-vous connu ?</label>
                <DarkSelect value={form.source} onChange={set("source")} options={sourceOptions} />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition disabled:opacity-60"
                style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)", border: "none" }}
              >
                {loading ? "Envoi en cours…" : (<>Envoyer le message <IconArrowRight size={15} /></>)}
              </motion.button>

              <p className="text-xs text-center" style={{ color: "rgba(255,255,255,0.35)" }}>
                En soumettant ce formulaire, vous acceptez que vos données soient utilisées uniquement pour vous répondre.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}
