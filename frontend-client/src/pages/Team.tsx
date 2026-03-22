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

      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Photo de fond */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(/src/assets/team-meeting.jpg)` }}
        />

        {/* Overlay dégradé */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2e]/96 via-[#0d1b2e]/80 to-[#0d1b2e]/30" />

        {/* Blobs flous décoratifs */}
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-amber-400/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-blue-500/8 rounded-full blur-3xl pointer-events-none" />

        {/* Contenu */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-28 grid md:grid-cols-2 gap-16 items-center w-full">
          {/* Colonne gauche */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-amber-400 border border-amber-400/30 px-4 py-1.5 rounded-full mb-6">
              Cabinet Borgel & Associés
            </span>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Notre
              <br />
              <span className="text-amber-400">Équipe</span>
            </h1>

            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-md">
              Des avocats spécialisés, engagés aux côtés des victimes depuis
              plus de 20 ans. Chaque membre du cabinet partage une même
              conviction : la défense des victimes mérite une expertise sans
              compromis.
            </p>

            <div className="h-px w-24 bg-amber-400/40 mb-8" />

            {/* Deux catégories */}
            <div className="flex flex-col gap-4">
              {[
                {
                  label: "Les associés",
                  desc: "Maîtres fondateurs & certifiés dommage corporel",
                },
                {
                  label: "Les collaborateurs",
                  desc: "Avocats, juristes & assistants dédiés à vos dossiers",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {item.label}
                    </p>
                    <p className="text-white/45 text-xs">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Colonne droite : carte stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex flex-col gap-5"
          >
            {/* Carte principale */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-7">
              <p className="text-white/50 text-xs tracking-widest uppercase mb-4">
                Notre cabinet en chiffres
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { value: "20+", label: "Ans d'expérience" },
                  { value: "2", label: "Avocats associés" },
                  { value: "7", label: "Collaborateurs" },
                  { value: "2", label: "Certifications spécialisation" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="text-center p-4 rounded-xl bg-white/5 border border-white/8"
                  >
                    <p className="text-2xl font-bold text-amber-400 mb-1">
                      {s.value}
                    </p>
                    <p className="text-white/45 text-xs leading-snug">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte certif */}
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-400/15 flex items-center justify-center shrink-0">
                <span className="text-amber-400 text-lg">✦</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">
                  Certificat de spécialisation
                </p>
                <p className="text-white/40 text-xs">
                  Droit du dommage corporel · Seul reconnu par la loi
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dégradé bas */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d1b2e] to-transparent" />
      </section>

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center h-100 ">
            {/* <div className="absolute -top-4 -left-4 w-20 h-20 bg-orange-500/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl" /> */}
            <h1 className="flex justify-center items-center text-4xl font-bold text-white mb-4">
              Rencontrez notre équipe
            </h1>
            <p className="text-white/55 text-base max-w-xl mx-auto leading-relaxed">
              Un groupe d'avocats passionnés, dévoués à obtenir les meilleurs
              résultats pour chacun de nos clients.
            </p>
          </div>

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

                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-orange-400 transition">
                    {m.name}
                  </h3>
                  <p className="text-xs text-white/45 mb-5">{m.role}</p>

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
