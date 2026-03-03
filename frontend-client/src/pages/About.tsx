import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Shield, Scale, Heart, Target, Award,
  Users, Clock, CheckCircle, Quote
} from 'lucide-react';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const values = [
  { icon: Heart,   title: 'Humanité',    desc: "Chaque client est une personne avant d'être un dossier. Nous mettons l'humain au cœur de notre accompagnement." },
  { icon: Shield,  title: 'Rigueur',     desc: "Une approche juridique exigeante, documentée et structurée pour maximiser les chances de succès de chaque affaire." },
  { icon: Target,  title: 'Engagement',  desc: "Nous défendons vos intérêts avec combativité et ne lâchons rien tant que la juste réparation n'est pas obtenue." },
  { icon: Scale,   title: 'Transparence',desc: "Informations claires, honoraires explicites, et communication régulière tout au long de la procédure." },
];

const timeline = [
  { year: '2007', title: 'Fondation du cabinet', desc: "Maître Borgel ouvre son cabinet à Marseille, spécialisé en dommage corporel." },
  { year: '2012', title: 'Première expansion', desc: "Recrutement des premiers collaborateurs et développement du pôle accidents du travail." },
  { year: '2018', title: 'Borgel & Associés', desc: "Le cabinet évolue en structure associée avec l'arrivée de nouveaux avocats experts." },
  { year: '2023', title: '500+ dossiers résolus', desc: "Le cabinet franchit le cap des 500 dossiers traités avec un taux de satisfaction de 95%." },
  { year: '2025', title: "Aujourd'hui", desc: "Une équipe soudée de 6 avocats, reconnus par leurs pairs et plébiscités par leurs clients." },
];

const stats = [
  { value: '15+', label: "Ans d'expérience" },
  { value: '500+', label: 'Dossiers traités' },
  { value: '95%', label: 'Taux de satisfaction' },
  { value: '6', label: 'Avocats experts' },
];

const testimonial = {
  quote: "Maître Borgel et son équipe ont su transformer une situation dramatique en victoire juridique. Leur humanité et leur rigueur m'ont donné la force de tenir durant toute la procédure.",
  author: "Marie L.",
  context: "Victime d'un accident de la circulation — 2024",
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>À Propos — Borgel & Associés</title>
        <meta name="description" content="Découvrez l'histoire, les valeurs et l'équipe du cabinet Borgel & Associés, spécialisé en droit du dommage corporel à Marseille depuis 2007." />
      </Helmet>

      {/* ── Bannière ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080d1e] pt-12 pb-24 min-h-[60vh] flex items-center">
        {/* Blobs déco */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 right-1/4 w-[600px] aspect-square rounded-full bg-blue-600/15 blur-[120px]"/>
          <div className="absolute top-1/2 -left-20 w-[400px] aspect-square rounded-full bg-indigo-600/15 blur-[100px]"/>
          <div className="absolute bottom-0 right-0 w-[500px] aspect-square rounded-full bg-orange-600/10 blur-[130px]"/>
          {/* Polygone SVG déco */}
          <div aria-hidden className="absolute -top-10 right-1/2 mr-10 blur-3xl opacity-20">
            <div style={{
              clipPath:'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              width: 500,
            }} className="aspect-[1097/845] bg-gradient-to-tr from-orange-400 to-blue-500"/>
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Texte */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-4 font-semibold">
                À propos du cabinet
              </motion.p>
              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Un cabinet fondé sur la défense des victimes
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/65 text-lg leading-relaxed mb-8">
                Depuis 2007, Borgel & Associés défend les victimes d'accidents et de fautes médicales
                à Marseille et dans toute la France. Notre mission : obtenir la <span className="text-orange-400 font-semibold">juste réparation</span> de chaque préjudice.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/equipe" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-3 rounded-full transition">
                  Notre équipe <ArrowRight size={15}/>
                </Link>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white text-sm font-medium px-6 py-3 rounded-full transition">
                  Nous contacter
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats grid */}
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.7, delay:0.2 }}
              className="grid grid-cols-2 gap-4">
              {stats.map(s => (
                <div key={s.label} className="glass-card p-6 text-center">
                  <p className="text-3xl font-bold text-orange-400 mb-1">{s.value}</p>
                  <p className="text-xs text-white/50">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Notre histoire — Timeline ──────────────────────── */}
      <section className="py-24 px-6 bg-[#0a0f1e]">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={stagger}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">Depuis 2007</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">Notre histoire</motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 max-w-xl mx-auto">
              Une trajectoire construite sur l'engagement, la confiance des clients et la passion du droit.
            </motion.p>
          </motion.div>

          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/50 via-orange-500/20 to-transparent"/>

            <div className="space-y-8 pl-16">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative">
                  {/* Dot */}
                  <div className="absolute -left-[42px] w-4 h-4 rounded-full bg-orange-500 border-2 border-[#0a0f1e] ring-2 ring-orange-500/30"/>
                  <div className="glass-card p-5">
                    <span className="text-xs font-bold text-orange-400 mb-1 block">{item.year}</span>
                    <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-white/55">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Nos valeurs ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#080d1e]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={stagger}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">Ce qui nous guide</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-white mb-4">Nos valeurs</motion.h2>
            <motion.p variants={fadeUp} className="text-white/55 max-w-xl mx-auto">
              Quatre principes fondateurs qui guident chacune de nos actions et décisions.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 hover:border-orange-500/25 transition group">
                <div className="w-11 h-11 rounded-xl bg-orange-500/15 flex items-center justify-center mb-4 group-hover:bg-orange-500/25 transition">
                  <v.icon size={20} className="text-orange-400"/>
                </div>
                <h3 className="font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignage mis en avant ───────────────────────── */}
      <section className="py-20 px-6 bg-[#0a0f1e]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity:0, scale:0.96 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
            className="glass-card p-10 relative overflow-hidden">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl"/>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"/>
            <Quote size={32} className="text-orange-400/40 mx-auto mb-6"/>
            <p className="text-white/80 text-lg leading-relaxed italic mb-6">"{testimonial.quote}"</p>
            <div>
              <p className="font-semibold text-white">{testimonial.author}</p>
              <p className="text-xs text-white/40 mt-1">{testimonial.context}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#080d1e]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
            <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">Prêt à défendre vos droits ?</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Prenez rendez-vous</h2>
            <p className="text-white/55 mb-8 max-w-lg mx-auto">
              Consultez l'un de nos avocats pour évaluer votre situation et connaître vos droits sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition">
                Prendre rendez-vous <ArrowRight size={16}/>
              </Link>
              <Link to="/expertises" className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-3 rounded-full transition">
                Nos expertises
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
