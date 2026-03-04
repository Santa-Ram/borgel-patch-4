import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Search } from 'lucide-react';
import { expertisesAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';
import { CardExpertise } from '../components/Cards';

const demoExpertises = [
  {id:1,slug:'accidents-circulation',icon:'🚗',name:'Accident de la Circulation',summary:"Défense des victimes d'accidents de la route, piétons, cyclistes, motards et passagers pour une indemnisation complète."},
  {id:2,slug:'agressions',icon:'🛡️',name:'Agressions et Infractions',summary:"Accompagnement des victimes d'agressions et d'infractions pénales pour l'obtention d'une indemnisation via le FGTI."},
  {id:3,slug:'victimes-attentat',icon:'⚖️',name:"Victimes d'Attentat",summary:"Défense des victimes d'actes terroristes pour la reconnaissance de leur statut et l'indemnisation de leurs préjudices."},
  {id:4,slug:'accident-medical',icon:'🏥',name:'Accident Médical',summary:"Accompagnement des patients victimes d'accidents médicaux, d'infections nosocomiales et d'aléas thérapeutiques."},
  {id:5,slug:'accidents-travail',icon:'⚙️',name:'Accident du Travail',summary:"Protection des salariés victimes d'accidents du travail ou de maladies professionnelles pour une réparation intégrale."},
  {id:6,slug:'accident-vie-courante',icon:'🏠',name:'Accident de la Vie Courante',summary:"Défense des victimes d'accidents domestiques, de loisirs ou sportifs pour l'indemnisation de leurs préjudices."},
  {id:7,slug:'assurance-dommage',icon:'📋',name:'Contentieux Droit des Assurances',summary:"Analyse des contrats, négociation et contentieux face aux compagnies d'assurance pour la juste indemnisation."},
  {id:8,slug:'prejudice-corporel',icon:'💙',name:'Réparation du Préjudice Corporel',summary:"Évaluation et réparation exhaustive de tous les postes de préjudice : physique, moral, économique et fonctionnel."},
  {id:9,slug:'expertise-medicale',icon:'🩺',name:'Médecin de Recours et Expertise',summary:"Assistance médicale lors des expertises pour contrer les conclusions des médecins mandatés par les assureurs."},
];

export default function Expertises() {
  const [expertises, setExpertises] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    expertisesAPI.list()
      .then((res) => setExpertises(res.data.results || res.data))
      .catch(() => setExpertises(demoExpertises))
      .finally(() => setLoading(false));
  }, []);

  const displayed = (expertises.length > 0 ? expertises : demoExpertises).filter(
    (e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Nos Expertises — Borgel & Associés</title>
        <meta name="description" content="Découvrez tous les domaines d'expertise du cabinet Borgel & Associés : accidents de la route, fautes médicales, dommage corporel." />
      </Helmet>
      <HeroBanner title="Nos Expertises" subtitle="Des domaines spécialisés pour une défense efficace et complète" badge="Domaines d'intervention" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative max-w-md mx-auto mb-12">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="search"
              placeholder="Rechercher une expertise..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-11 text-sm"
            />
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card animate-pulse h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    </>
  );
}
