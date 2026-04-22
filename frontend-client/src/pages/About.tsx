import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IconArrowRight, IconShield, IconScale, IconHeart, IconTarget, IconQuote } from '@tabler/icons-react';

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const associates = [
  {
    name: "Maître Alban Borgel",
    role: "Avocat associé fondateur",
    bio: "Fondateur du cabinet en 2007, Maître Borgel défend les victimes avec plus de 20 ans d'expérience en dommage corporel. Reconnu pour sa rigueur et ses résultats.",
    photo: null,
  },
  {
    name: "Maître Sophie Durand",
    role: "Avocate associée",
    bio: "Spécialiste en responsabilité médicale et accidents du travail, elle accompagne chaque client avec combativité et une écoute attentive tout au long de la procédure.",
    photo: null,
  },
];

function initials(name: string) {
  const parts = name.split(' ').filter(w => !/^(maître|maitre|me\.?)$/i.test(w));
  return parts.map(w => w[0]).join('').substring(0, 2).toUpperCase();
}

const values = [
  { icon: IconHeart,  title: 'Humanité',     desc: "Chaque client est une personne avant d'être un dossier. Nous mettons l'humain au cœur de notre accompagnement." },
  { icon: IconShield, title: 'Rigueur',      desc: "Une approche juridique exigeante, documentée et structurée pour maximiser les chances de succès de chaque affaire." },
  { icon: IconTarget, title: 'Engagement',   desc: "Nous défendons vos intérêts avec combativité et ne lâchons rien tant que la juste réparation n'est pas obtenue." },
  { icon: IconScale,  title: 'Transparence', desc: "Informations claires, honoraires explicites, et communication régulière tout au long de la procédure." },
];

const timeline = [
  { year: '2007', title: 'Fondation du cabinet',   desc: "Maître Borgel ouvre son cabinet à Marseille, spécialisé en dommage corporel." },
  { year: '2012', title: 'Première expansion',     desc: "Recrutement des premiers collaborateurs et développement du pôle accidents du travail." },
  { year: '2018', title: 'Borgel & Associés',      desc: "Le cabinet évolue en structure associée avec l'arrivée de nouveaux avocats experts." },
  { year: '2023', title: '500+ dossiers résolus',  desc: "Le cabinet franchit le cap des 500 dossiers traités avec un taux de satisfaction de 95%." },
  { year: '2025', title: "Aujourd'hui",            desc: "Une équipe soudée de 6 avocats, reconnus par leurs pairs et plébiscités par leurs clients." },
];

const stats = [
  { value: '15+',  label: "Ans d'expérience" },
  { value: '500+', label: 'Dossiers traités' },
  { value: '95%',  label: 'Taux de satisfaction' },
  { value: '6',    label: 'Avocats experts' },
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

      {/* ── Présentation de l'équipe associée ─────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Gauche : texte */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="section-label">L'équipe</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-bold text-slate-900 mb-5 leading-tight">
                L'équipe qui vous{' '}
                <span className="text-[#1e40af]">accompagne</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-6">
                Un cabinet fondé sur l'engagement personnel, la rigueur juridique et la proximité humaine. Chaque avocat met son expertise au service d'une seule cause : obtenir la juste réparation de votre préjudice.
              </motion.p>
              <motion.p variants={fadeUp} className="text-slate-500 leading-relaxed mb-8">
                Totalement indépendants des compagnies d'assurance, nous défendons exclusivement les intérêts des victimes, avec transparence et détermination.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link to="/equipe" className="btn-outline">
                  Rencontrer l'équipe <IconArrowRight size={14} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Droite : deux cartes associés */}
            <div className="grid sm:grid-cols-2 gap-6">
              {associates.map((assoc, i) => (
                <motion.div
                  key={assoc.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white rounded-2xl border border-[#e2e8f0] p-6 flex flex-col items-center text-center hover:border-[#00d4b8] hover:shadow-md transition"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                >
                  {/* Photo circulaire */}
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-[#e0f7fa]">
                    {assoc.photo ? (
                      <img src={assoc.photo} alt={assoc.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1e40af] to-[#00b8a0] flex items-center justify-center">
                        <span className="text-2xl font-bold text-white/80">{initials(assoc.name)}</span>
                      </div>
                    )}
                  </div>

                  {/* Badge */}
                  <span className="inline-block text-[10px] uppercase tracking-widest font-bold text-[#00b8a0] bg-[#f0fdfa] px-3 py-1 rounded-full mb-3">
                    Expert du cabinet
                  </span>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">{assoc.name}</h3>
                  <p className="text-xs text-[#00b8a0] font-medium mb-3">{assoc.role}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{assoc.bio}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ─────────────────────────────────────────── */}
      <section className="py-12 px-6 bg-[#f7f7f7] border-y border-slate-200">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-3xl font-bold text-[#1e40af]">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Notre histoire — Timeline ──────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="section-label">Depuis 2007</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Notre histoire</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
              Une trajectoire construite sur l'engagement, la confiance des clients et la passion du droit.
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#00d4b8]/50 via-[#00d4b8]/20 to-transparent" />

            <div className="space-y-8 pl-16">
              {timeline.map((item, i) => (
                <motion.div key={item.year}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative">
                  <div className="absolute -left-[42px] w-4 h-4 rounded-full bg-[#00d4b8] border-2 border-white ring-2 ring-[#00d4b8]/30" />
                  <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-[#00d4b8]/40 transition">
                    <span className="text-xs font-bold text-[#1e40af] mb-1 block">{item.year}</span>
                    <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Nos valeurs ───────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f7f7f7]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}
            className="text-center mb-14">
            <motion.p variants={fadeUp} className="section-label">Ce qui nous guide</motion.p>
            <motion.h2 variants={fadeUp} className="section-title">Nos valeurs</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 max-w-xl mx-auto">
              Quatre principes fondateurs qui guident chacune de nos actions et décisions.
            </motion.p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:border-[#00d4b8]/40 transition group shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#eff6ff] flex items-center justify-center mb-4 group-hover:bg-[#ccfbf1] transition">
                  <v.icon size={20} className="text-[#1e40af]" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Témoignage mis en avant ───────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="bg-white rounded-2xl border border-[#e2e8f0] p-10 relative overflow-hidden"
            style={{ boxShadow: "0 4px 20px rgba(0,212,184,0.08)" }}>
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#00d4b8]/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#00b0f0]/10 rounded-full blur-xl" />
            <IconQuote size={32} className="text-[#1e40af]/40 mx-auto mb-6" />
            <p className="text-slate-700 text-lg leading-relaxed italic mb-6">"{testimonial.quote}"</p>
            <div>
              <p className="font-semibold text-slate-900">{testimonial.author}</p>
              <p className="text-xs text-slate-400 mt-1">{testimonial.context}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="section-label">Prêt à défendre vos droits ?</p>
            <h2 className="section-title">Prenez rendez-vous</h2>
            <p className="text-slate-500 mb-8 max-w-lg mx-auto">
              Consultez l'un de nos avocats pour évaluer votre situation et connaître vos droits sans engagement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Prendre rendez-vous <IconArrowRight size={16} />
              </Link>
              <Link to="/expertises" className="btn-outline">
                Nos expertises
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
