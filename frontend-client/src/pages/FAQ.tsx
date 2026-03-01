import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, ChevronRight, HelpCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import API from '../api/client';

/* ─── Demo data ─────────────────────────────────────────── */
const demoFAQs = [
  { id:1, question:"Comment fonctionne une expertise médicale ?",         answer:"L'expertise médicale est une évaluation réalisée par un médecin expert pour évaluer les préjudices subis. Nous vous accompagnons à chaque étape pour défendre vos intérêts.", keywords:"expertise,médecin,évaluation", category:"Droit de la santé", is_active:true, order:1 },
  { id:2, question:"Quel est le délai pour engager une action en justice ?",answer:"Les délais de prescription varient selon le type de dommage. En matière d'accident de la circulation, vous disposez généralement de 10 ans à compter de la consolidation.", keywords:"délai,prescription,action,justice", category:"Procédure", is_active:true, order:2 },
  { id:3, question:"Quels honoraires pratiquez-vous ?",                   answer:"Nos honoraires sont transparents et adaptés à chaque situation. Nous proposons une consultation initiale pour évaluer votre dossier et vous informer des coûts prévisibles.", keywords:"honoraires,tarifs,consultation", category:"Honoraires", is_active:true, order:3 },
  { id:4, question:"Prenez-vous en charge les accidents de la route ?",   answer:"Oui, le droit du dommage corporel lié aux accidents de la circulation est l'une de nos spécialités. Nous défendons les victimes pour obtenir la meilleure indemnisation possible.", keywords:"accident,route,circulation,indemnisation", category:"Accidents", is_active:true, order:4 },
  { id:5, question:"Comment préparer mon premier rendez-vous ?",          answer:"Rassemblez tous les documents liés à votre dossier : rapports médicaux, constats, échanges avec les assurances, jugements éventuels. Plus votre dossier est complet, plus notre accompagnement sera efficace.", keywords:"rendez-vous,préparation,documents", category:"Procédure", is_active:true, order:5 },
  { id:6, question:"Qu'est-ce qu'une faute médicale ?",                  answer:"Une faute médicale est un manquement aux règles de l'art médical par un professionnel de santé. Cela peut résulter d'une erreur de diagnostic, d'une intervention mal réalisée ou d'un défaut d'information du patient.", keywords:"faute,médicale,responsabilité,médecin", category:"Droit de la santé", is_active:true, order:6 },
];

const CATEGORIES = ['Toutes', 'Droit de la santé', 'Accidents', 'Procédure', 'Honoraires'];

const fadeUp = {
  hidden:  { opacity:0, y:20 },
  visible: { opacity:1, y:0, transition:{ duration:0.5 } },
};

export default function FAQPage() {
  const [faqs, setFaqs]       = useState<any[]>([]);
  const [search, setSearch]   = useState('');
  const [category, setCategory] = useState('Toutes');
  const [openId, setOpenId]   = useState<number|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/faq/')
      .then(r => setFaqs(r.data.results || r.data))
      .catch(() => setFaqs(demoFAQs))
      .finally(() => setLoading(false));
  }, []);

  const displayed = useMemo(() => {
    return (faqs.length > 0 ? faqs : demoFAQs).filter(f => {
      const q = search.toLowerCase();
      const matchSearch = !q || f.question.toLowerCase().includes(q)
        || f.answer.toLowerCase().includes(q)
        || (f.keywords || '').toLowerCase().includes(q);
      const matchCat = category === 'Toutes' || f.category === category;
      return matchSearch && matchCat;
    });
  }, [faqs, search, category]);

  const categories = useMemo(() => {
    const cats = [...new Set((faqs.length > 0 ? faqs : demoFAQs).map(f => f.category).filter(Boolean))];
    return ['Toutes', ...cats];
  }, [faqs]);

  return (
    <>
      <Helmet>
        <title>FAQ — Borgel & Associés</title>
        <meta name="description" content="Retrouvez les réponses aux questions les plus fréquentes sur nos services, honoraires et procédures juridiques."/>
      </Helmet>

      {/* ── Bannière ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#080d1e] pt-10 pb-20">
        {/* Blobs */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-[500px] aspect-square rounded-full bg-blue-600/15 blur-[100px]"/>
          <div className="absolute bottom-0 left-0 w-[400px] aspect-square rounded-full bg-orange-600/10 blur-[120px]"/>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible:{ transition:{ staggerChildren:0.1 } } }}>
            <motion.p variants={fadeUp} className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-4 font-semibold">
              Centre d'aide
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Questions fréquentes
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/60 text-lg max-w-xl mx-auto mb-10">
              Retrouvez les réponses aux questions les plus posées sur nos services et nos procédures.
            </motion.p>

            {/* Barre de recherche hero */}
            <motion.div variants={fadeUp} className="relative max-w-lg mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"/>
              <input
                type="search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher une question..."
                className="w-full bg-white/8 border border-white/15 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-white/35 outline-none focus:border-orange-500/40 transition text-sm"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition">
                  ×
                </button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Contenu ───────────────────────────────────────── */}
      <section className="py-16 px-6 bg-[#0a0f1e] min-h-[50vh]">
        <div className="max-w-4xl mx-auto">

          {/* Filtres catégories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                  category === cat
                    ? 'bg-orange-500/20 border-orange-500/40 text-orange-400'
                    : 'bg-white/4 border-white/10 text-white/55 hover:border-white/20 hover:text-white'
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Résultat count */}
          {search && (
            <p className="text-sm text-white/40 mb-6">
              {displayed.length} résultat{displayed.length !== 1 ? 's' : ''} pour "{search}"
            </p>
          )}

          {/* FAQ accordion */}
          {loading ? (
            <div className="space-y-3">
              {[1,2,3,4].map(i => <div key={i} className="h-16 rounded-2xl bg-white/4 animate-pulse"/>)}
            </div>
          ) : displayed.length === 0 ? (
            <div className="text-center py-16">
              <HelpCircle size={40} className="text-white/20 mx-auto mb-4"/>
              <p className="text-white/40">Aucune question trouvée</p>
              <button onClick={() => { setSearch(''); setCategory('Toutes'); }}
                className="mt-4 text-sm text-orange-400 hover:underline">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {displayed.map(faq => {
                const isOpen = openId === faq.id;
                return (
                  <motion.div key={faq.id}
                    initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    className="rounded-2xl border border-white/10 bg-white/4 overflow-hidden hover:border-white/15 transition">
                    <button
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between px-5 py-4 text-left"
                    >
                      <span className="text-sm sm:text-base font-medium text-white pr-4">{faq.question}</span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${
                        isOpen ? 'bg-orange-500 text-white' : 'bg-white/8 text-white/50'
                      }`}>
                        {isOpen ? <Minus size={14}/> : <Plus size={14}/>}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height:0, opacity:0 }}
                          animate={{ height:'auto', opacity:1 }}
                          exit={{ height:0, opacity:0 }}
                          transition={{ duration:0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5">
                            <p className="text-sm text-white/65 leading-relaxed">{faq.answer}</p>
                            {/* Keywords */}
                            {faq.keywords && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {faq.keywords.split(',').filter(Boolean).map((k: string) => (
                                  <button key={k.trim()} onClick={() => setSearch(k.trim())}
                                    className="text-[11px] px-2 py-0.5 rounded-full bg-white/6 text-white/40 hover:bg-orange-500/15 hover:text-orange-400 transition">
                                    #{k.trim()}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* CTA contact */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="mt-14 text-center rounded-3xl border border-white/10 bg-white/4 p-8">
            <HelpCircle size={28} className="text-orange-400 mx-auto mb-3"/>
            <h3 className="font-bold text-white text-lg mb-2">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="text-white/55 text-sm mb-5">Notre équipe est disponible pour répondre à toutes vos questions.</p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition">
              Nous contacter <ChevronRight size={15}/>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
