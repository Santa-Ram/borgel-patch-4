import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { teamAPI } from "../api/client";
import HeroBanner from "../components/HeroBanner";

const demoMembers = [
  {
    id: 1,
    name: "Maître Borgel",
    role: "Avocat associé fondateur",
    photo: null,
    linkedin: "",
    twitter: "",
  },
  {
    id: 2,
    name: "Sophie Durand",
    role: "Avocate senior – Dommage corporel",
    photo: null,
    linkedin: "",
    twitter: "",
  },
  {
    id: 3,
    name: "Thomas Martin",
    role: "Avocat collaborateur",
    photo: null,
    linkedin: "",
    twitter: "",
  },
  {
    id: 4,
    name: "Julie Leroy",
    role: "Juriste spécialisée",
    photo: null,
    linkedin: "",
    twitter: "",
  },
  {
    id: 5,
    name: "Marc Petit",
    role: "Avocat – Accidents du travail",
    photo: null,
    linkedin: "",
    twitter: "",
  },
  {
    id: 6,
    name: "Clara Blanc",
    role: "Avocate – Responsabilité médicale",
    photo: null,
    linkedin: "",
    twitter: "",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

const avatarColors = [
  "from-blue-500 to-indigo-600",
  "from-purple-500 to-pink-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-red-600",
  "from-sky-500 to-blue-600",
  "from-violet-500 to-purple-600",
];

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Team() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    teamAPI
      .list()
      .then((res) => setMembers(res.data.results || res.data))
      .catch(() => setMembers(demoMembers))
      .finally(() => setLoading(false));
  }, []);

  const displayed = members.length > 0 ? members : demoMembers;

  return (
    <>
      <Helmet>
        <title>Notre Équipe — Borgel & Associés</title>
      </Helmet>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header centré */}
          <div className="text-center h-100 ">
            <h1 className="flex justify-center items-center text-4xl font-bold text-white mb-4">
              Rencontrez notre équipe
            </h1>
            <p className="text-white/55 text-base max-w-xl mx-auto leading-relaxed">
              Un groupe d'avocats passionnés, dévoués à obtenir les meilleurs
              résultats pour chacun de nos clients.
            </p>
          </div>

          {/* Grid — 3 colonnes */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/4 rounded-2xl h-72 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20">
              {displayed.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
                  className="bg-[#161b27] border border-white/8 rounded-xl p-2 flex flex-col items-center text-center hover:border-orange-500/30 hover:bg-[#1a2035] transition cursor-pointer group"
                  onClick={() => (window.location.href = `/equipe/${m.id}`)}
                >
                  {/* Photo 1:1 */}
                  <div className="w-full aspect-square rounded-md overflow-hidden mb-5 ring-1 ring-white/10 group-hover:ring-orange-500/20 transition">
                    {m.photo ? (
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div
                        className={`w-full h-full bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-4xl font-bold text-white`}
                      >
                        {initials(m.name)}
                      </div>
                    )}
                  </div>

                  {/* Nom + rôle */}
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-400 transition">
                    {m.name}
                  </h3>
                  <p className="text-xs text-white/45 mb-5">{m.role}</p>

                  {/* Icônes sociales */}
                  <div className="flex items-center gap-3 mt-auto">
                    {(m.twitter || true) && (
                      <a
                        href={m.twitter || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition"
                        aria-label="Twitter / X"
                      >
                        <XIcon size={15} />
                      </a>
                    )}
                    {(m.linkedin || true) && (
                      <a
                        href={m.linkedin || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/30 hover:text-white transition"
                        aria-label="LinkedIn"
                      >
                        <LinkedinIcon size={15} />
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
