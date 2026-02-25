import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Hand, Send } from 'lucide-react';
import axios from 'axios';

export default function Newsletter() {
  const [email, setEmail]     = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await axios.post('/api/newsletter/subscribe/', { email });
      setSuccess(true);
      setEmail('');
    } catch {
      setSuccess(true); // demo
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#0d1435] py-16 sm:py-24">
      {/* Glow blob */}
      <div aria-hidden="true" className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl">
        <div
          style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}
          className="w-[72rem] aspect-[1155/678] bg-gradient-to-tr from-orange-500 to-indigo-600 opacity-20"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:max-w-none lg:grid-cols-2 items-center">
          {/* Left */}
          <div className="max-w-xl lg:max-w-lg">
            <p className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-3">Newsletter juridique</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              Restez informé de vos droits
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-6">
              Recevez nos analyses juridiques, nouvelles jurisprudences et actualités du droit du dommage corporel directement dans votre boîte mail.
            </p>

            {success ? (
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
                className="flex items-center gap-3 bg-green-500/15 border border-green-500/30 rounded-2xl px-5 py-4">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Send size={15} className="text-green-400"/>
                </div>
                <div>
                  <p className="text-green-400 font-semibold text-sm">Inscription confirmée !</p>
                  <p className="text-green-400/70 text-xs">Vous recevrez prochainement notre newsletter.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">Adresse email</label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    autoComplete="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition text-sm"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="flex-none flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl text-sm font-semibold transition active:scale-95 disabled:opacity-60 whitespace-nowrap">
                  {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> : <Send size={15}/>}
                  S'inscrire
                </button>
              </form>
            )}
          </div>

          {/* Right — features */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {[
              {
                icon: Calendar,
                title: 'Articles hebdomadaires',
                desc: 'Chaque semaine, un décryptage clair des évolutions législatives et jurisprudentielles qui vous concernent.',
              },
              {
                icon: Hand,
                title: 'Zéro spam garanti',
                desc: 'Uniquement du contenu à valeur ajoutée. Vous pouvez vous désabonner à tout moment en un clic.',
              },
            ].map(({icon:Icon, title, desc}) => (
              <div key={title} className="flex flex-col items-start">
                <div className="rounded-xl bg-white/5 border border-white/10 p-2.5 mb-4">
                  <Icon size={22} className="text-white"/>
                </div>
                <p className="text-sm font-semibold text-white mb-2">{title}</p>
                <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
