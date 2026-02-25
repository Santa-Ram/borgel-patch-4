import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Check, MapPin, Phone, Mail, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactsAPI } from '../api/client';
import HeroBanner from '../components/HeroBanner';

const expertisesList = [
  { id: 1, name: 'Accidents de la circulation' },
  { id: 2, name: 'Droit de la santé' },
  { id: 3, name: 'Assurance & Dommage corporel' },
  { id: 4, name: 'Responsabilité médicale' },
  { id: 5, name: 'Accidents du travail' },
  { id: 6, name: 'Préjudice moral' },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [selectedExpertises, setSelectedExpertises] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleExpertise = (id: number) => {
    setSelectedExpertises((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactsAPI.submit({ ...formData, expertises: selectedExpertises });
      toast.success('Message envoyé ! Nous vous répondrons sous 24h.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setSelectedExpertises([]);
    } catch {
      toast.error('Erreur lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact — Borgel & Associés</title>
        <meta name="description" content="Contactez le cabinet Borgel & Associés pour une consultation. Avocat à Marseille spécialisé en dommage corporel." />
      </Helmet>
      <HeroBanner title="Contactez-nous" subtitle="Nous vous répondons dans les 24h ouvrées" badge="Prise de contact" />

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom"
                  className="input-dark"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="votre@email.fr"
                    className="input-dark"
                  />
                </div>
                <div>
                  <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Téléphone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 XX XX XX XX"
                    className="input-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Expertise(s) concernée(s)</label>
                <div className="flex flex-wrap gap-2">
                  {expertisesList.map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() => toggleExpertise(exp.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition ${
                        selectedExpertises.includes(exp.id)
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                          : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30'
                      }`}
                    >
                      {selectedExpertises.includes(exp.id) && <Check size={10} />}
                      {exp.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-white/60 mb-2 uppercase tracking-wider">Votre message *</label>
                <textarea
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Décrivez votre situation..."
                  className="input-dark resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-400 transition shadow-lg shadow-orange-500/25 disabled:opacity-60"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </motion.button>

              <p className="text-xs text-white/30 text-center">
                En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour vous répondre.
              </p>
            </form>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Nos coordonnées</h2>

            {[
              { icon: MapPin, title: 'Adresse', lines: ['89, Rue Saint Jacques', '13006 Marseille'] },
              { icon: Phone, title: 'Téléphone', lines: ['04 91 33 50 00', 'Lun–Ven 9h–18h'] },
              { icon: Mail, title: 'Email', lines: ['contact@borgel-avocat.fr'] },
              { icon: Clock, title: 'Horaires', lines: ['Lundi – Vendredi : 9h00 – 18h00', 'Urgences sur rendez-vous'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="glass-card p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-orange-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white mb-1">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-white/60">{line}</p>
                  ))}
                </div>
              </div>
            ))}

            <div className="glass-card p-5 border-orange-500/20">
              <p className="text-sm text-white/80 font-semibold mb-2">🎯 Consultation gratuite</p>
              <p className="text-sm text-white/60">
                Nous offrons une première consultation téléphonique gratuite de 20 minutes pour évaluer votre situation.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
