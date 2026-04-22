import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { IconArrowRight, IconBrandLinkedin } from "@tabler/icons-react";
import { teamAPI } from "../api/client";
import TeamSection from "./teamSection";

const demoMembers = [
  { id: 1, name: "Maître Borgel",  role: "Avocat associé fondateur",          photo: null, linkedin: "" },
  { id: 2, name: "Sophie Durand",  role: "Avocate senior – Dommage corporel", photo: null, linkedin: "" },
  { id: 3, name: "Thomas Martin",  role: "Avocat collaborateur",              photo: null, linkedin: "" },
  { id: 4, name: "Julie Leroy",    role: "Juriste spécialisée",               photo: null, linkedin: "" },
  { id: 5, name: "Marc Petit",     role: "Avocat – Accidents du travail",     photo: null, linkedin: "" },
  { id: 6, name: "Clara Blanc",    role: "Avocate – Responsabilité médicale", photo: null, linkedin: "" },
];


const cardGradients = [
  "from-teal-500 to-teal-700",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-violet-500 to-purple-600",
  "from-sky-500 to-blue-600",
  "from-purple-500 to-indigo-600",
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

function resolvePhoto(photo: string | null | undefined): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `http://localhost:8000${photo}`;
}


export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamAPI
      .list()
      .then((res) =>
        setMembers(
          (res.data.results || res.data).map((m: any) => ({ ...m, photo: resolvePhoto(m.photo) }))
        )
      )
      .catch(() => setMembers(demoMembers))
      .finally(() => setLoading(false));
  }, []);

  const displayed = members.length > 0 ? members : demoMembers;

  return (
    <>
      <Helmet>
        <title>Notre Équipe — Borgel & Associés</title>
        <meta name="description" content="Rencontrez les avocats du cabinet Borgel & Associés, spécialisés en droit du dommage corporel à Marseille." />
      </Helmet>

      {/* ── Banner ──────────────────────────────────────────── */}
      <section>
        <TeamSection />
      </section>

      {/* ── Team grid ───────────────────────────────────────── */}
      <section className="py-20 px-8 lg:px-20 bg-[#f7f7f7]">
        <div className="max-w-6xl mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <p className="section-label">Tous nos avocats</p>
            <h2 className="text-3xl font-bold text-slate-900">
              Une équipe à votre service
            </h2>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-slate-200 rounded-2xl h-80 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {displayed.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                  className="bg-white border border-[#e2e8f0] rounded-2xl overflow-hidden hover:border-[#00d4b8] hover:shadow-lg transition cursor-pointer group"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  onClick={() => (window.location.href = `/equipe/${m.id}`)}
                >
                  {/* Photo */}
                  <div className="aspect-[4/3] overflow-hidden relative">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${cardGradients[i % cardGradients.length]} flex items-center justify-center text-5xl font-black text-white/70`}>
                        {initials(m.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                      <span className="text-xs text-white font-semibold px-4 py-1.5 rounded-full"
                            style={{ background: "linear-gradient(90deg, #00d4b8, #00b0f0)" }}>
                        Voir le profil →
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#00b8a0] transition mb-0.5">
                        {m.name}
                      </h3>
                      <p className="text-xs text-slate-400">{m.role}</p>
                    </div>
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#00b8a0] hover:bg-[#ccfbf1] transition shrink-0"
                        aria-label="LinkedIn"
                      >
                        <IconBrandLinkedin size={13} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
