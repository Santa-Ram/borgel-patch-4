import { useState } from 'react';
import { motion } from 'framer-motion';
import { IconCalendar, IconHandStop, IconSend } from '@tabler/icons-react';
import axios from 'axios';

const CYAN = "#00d4b8";

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
      setSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 px-8 lg:px-16" style={{ background: "linear-gradient(135deg, #1a0e5c 0%, #2d1b6b 50%, #3b2494 100%)" }}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-2 items-center">

          {/* Left */}
          <div className="max-w-xl lg:max-w-lg">
            <p className="section-label">Newsletter juridique</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, marginBottom: "12px", lineHeight: 1.2 }}>
              Restez informé de vos droits
            </h2>
            <p style={{ color: "#c8d0f8", lineHeight: 1.75, marginBottom: "24px", fontSize: "0.9rem" }}>
              Recevez nos analyses juridiques, nouvelles jurisprudences et actualités du droit du dommage corporel directement dans votre boîte mail.
            </p>

            {success ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-2xl px-5 py-4"
                style={{ background: "rgba(0,212,184,0.1)", border: "1px solid rgba(0,212,184,0.25)" }}
              >
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                     style={{ background: "rgba(0,212,184,0.2)" }}>
                  <IconSend size={15} style={{ color: CYAN }} />
                </div>
                <div>
                  <p style={{ color: CYAN, fontWeight: 600, fontSize: "0.875rem" }}>Inscription confirmée !</p>
                  <p style={{ color: "rgba(167,139,250,0.8)", fontSize: "0.75rem" }}>Vous recevrez prochainement notre newsletter.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
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
                    style={{
                      width: "100%",
                      background: "rgba(255,255,255,0.12)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      color: "#ffffff",
                      fontFamily: "'Poppins', sans-serif",
                      fontSize: "0.875rem",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.borderColor = "rgba(0,212,184,0.7)";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,184,0.15)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-none flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition active:scale-95 disabled:opacity-60 whitespace-nowrap"
                  style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)", color: "#fff", border: "none" }}
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    : <IconSend size={14} />
                  }
                  S'inscrire
                </button>
              </form>
            )}
          </div>

          {/* Right — feature points */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: IconCalendar,
                title: 'Articles hebdomadaires',
                desc: 'Chaque semaine, un décryptage clair des évolutions législatives et jurisprudentielles qui vous concernent.',
              },
              {
                icon: IconHandStop,
                title: 'Zéro spam garanti',
                desc: 'Uniquement du contenu à valeur ajoutée. Vous pouvez vous désabonner à tout moment en un clic.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start">
                <div className="rounded-xl p-2.5 mb-4"
                     style={{ background: "rgba(0,212,184,0.12)", border: "1px solid rgba(0,212,184,0.2)" }}>
                  <Icon size={20} style={{ color: CYAN }} />
                </div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#ffffff", marginBottom: "8px" }}>{title}</p>
                <p style={{ fontSize: "0.875rem", color: "#c8d0f8", lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
