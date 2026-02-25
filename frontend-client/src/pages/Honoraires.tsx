import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Scale } from 'lucide-react';
import HeroBanner from '../components/HeroBanner';
import { Link } from 'react-router-dom';

export function Honoraires() {
  return (
    <>
      <Helmet>
        <title>Nos Honoraires — Borgel & Associés</title>
        <meta name="description" content="Découvrez les honoraires du cabinet Borgel & Associés. Transparence et équité dans la facturation de nos services juridiques." />
      </Helmet>
      <HeroBanner title="Nos Honoraires" subtitle="Une tarification transparente adaptée à chaque situation" badge="Tarification" />

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 mb-8 border-orange-500/20">
            <div className="flex items-center gap-3 mb-4">
              <Scale size={24} className="text-orange-400" />
              <h2 className="text-xl font-bold text-white">Consultation initiale gratuite</h2>
            </div>
            <p className="text-white/70 leading-relaxed">
              Nous proposons une première consultation téléphonique gratuite de 20 minutes pour évaluer votre situation
              et vous informer sur vos droits. Cette démarche vous permet de comprendre les enjeux de votre dossier
              sans engagement financier.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              {
                title: 'Honoraires au résultat',
                price: '15 à 20%',
                desc: 'Des sommes obtenues à l\'issue de la procédure',
                features: ['Aucun frais si pas d\'indemnisation', 'Alignement de nos intérêts', 'Convention signée en amont', 'Transparence totale'],
                highlight: true,
              },
              {
                title: 'Honoraires fixes',
                price: 'Sur devis',
                desc: 'Pour les consultations et expertises ponctuelles',
                features: ['Tarif horaire : 150-250€/h', 'Devis préalable gratuit', 'Facturation transparente', 'Aide juridictionnelle acceptée'],
                highlight: false,
              },
            ].map((plan) => (
              <motion.div
                key={plan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`glass-card p-6 ${plan.highlight ? 'border-orange-500/40' : ''}`}
              >
                <h3 className="font-bold text-white text-lg mb-1">{plan.title}</h3>
                <p className="text-3xl font-bold text-orange-400 my-3">{plan.price}</p>
                <p className="text-sm text-white/60 mb-5">{plan.desc}</p>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <CheckCircle size={14} className="text-orange-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Aide juridictionnelle</h3>
            <p className="text-white/70 mb-6 max-w-2xl mx-auto">
              Si vos revenus sont modestes, vous pouvez bénéficier de l'aide juridictionnelle. Notre cabinet accepte
              les bénéficiaires de l'aide juridictionnelle totale ou partielle.
            </p>
            <Link to="/contact" className="btn-primary">Demander un devis gratuit</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Honoraires;
