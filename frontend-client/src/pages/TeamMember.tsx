import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
  Mail,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { teamAPI } from "../api/client";
import { CardTeam } from "../components/Cards";

const demoMember = {
  id: 1,
  name: "Maître Borgel",
  role: "Avocat associé fondateur",
  biography: `<p>Maître Borgel a fondé le cabinet en 2005 après avoir exercé pendant plusieurs années dans des structures renommées. Fort de plus de 20 ans d'expérience dans le domaine du dommage corporel, il est reconnu pour sa rigueur, son engagement et ses résultats.</p><p>Spécialisé en droit du dommage corporel depuis le début de sa carrière, il défend les victimes d'accidents de la circulation, de fautes médicales et d'accidents du travail avec une expertise reconnue par ses pairs et les juridictions.</p>`,
  skills: [
    "Dommage corporel",
    "Responsabilité médicale",
    "Accidents de la route",
    "Contentieux",
    "Négociation",
  ],
  phone: "04 91 33 50 00",
  email: "borgel@borgel-avocat.fr",
  whatsapp: "+33491335000",
  facebook: "#",
  instagram: "#",
  twitter: "#",
  linkedin: "#",
};

const demoOthers = [
  { id: 2, name: "Sophie Durand", role: "Avocate senior" },
  { id: 3, name: "Thomas Martin", role: "Avocat collaborateur" },
  { id: 4, name: "Julie Leroy", role: "Juriste spécialisée" },
];

export default function TeamMemberPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<any>(null);
  const [others, setOthers] = useState<any[]>(demoOthers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    teamAPI
      .detail(Number(id))
      .then((res) => setMember(res.data))
      .catch(() => setMember(demoMember))
      .finally(() => setLoading(false));
    teamAPI
      .list()
      .then((res) =>
        setOthers(
          (res.data.results || res.data)
            .filter((m: any) => m.id !== Number(id))
            .slice(0, 3),
        ),
      )
      .catch(() => {});
  }, [id]);

  const m = member || demoMember;

  if (loading) {
    return (
      <div className=" min-h-screenflex items-center justify-center">
        <div className="glass-card animate-pulse w-full max-w-4xl h-96 rounded-3xl" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{m.name} — Borgel & Associés</title>
        <meta
          name="description"
          content={`Profil de ${m.name}, ${m.role} au cabinet Borgel & Associés à Marseille.`}
        />
      </Helmet>

      <div className="min-h-screen py-10 px-10">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white mb-5 transition"
          >
            <ArrowLeft size={16} />{" "}
            <p className="underline underline-offset-3">Retour à l'équipe</p>
          </Link>

          <div className="grid lg:grid-cols-3 lg:grid-rows-3 gap-5 mb-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card p-2 sticky top-16">
                <div className="aspect-[4/4] rounded-2xl border border-orange-500 overflow-hidden mb-6 bg-gradient-to-br from-blue-deep to-navy flex items-center justify-center">
                  {m.photo ? (
                    <img
                      src={m.photo}
                      alt={m.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-7xl font-bold text-orange-400">
                      {m.name[0]}
                    </span>
                  )}
                </div>

                <div className="flex justify-center mb-5 gap-3">
                  {m.facebook && (
                    <a
                      href={m.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 glass-card flex items-center justify-center text-white/60 hover:text-white transition"
                      aria-label="Facebook"
                    >
                      <Facebook size={16} />
                    </a>
                  )}
                  {m.instagram && (
                    <a
                      href={m.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 glass-card flex items-center justify-center text-white/60 hover:text-white transition"
                      aria-label="Instagram"
                    >
                      <Instagram size={16} />
                    </a>
                  )}
                  {m.twitter && (
                    <a
                      href={m.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 glass-card flex items-center justify-center text-white/60 hover:text-white transition"
                      aria-label="Twitter"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 glass-card flex items-center justify-center text-white/60 hover:text-white transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <section className="glass-card p-8 mb-6">
                <div className="flex justify-start items-center content-center gap-6">
                  <h1 className="text-2xl font-bold text-white mb-1">
                    {m.name}
                  </h1>
                  <p className="text-xs border rounded-full px-2 border-orange-400 text-orange-400">
                    {m.role}
                  </p>
                </div>
                <h2 className="text-sm font-bold text-white underline mt-5 mb-2">
                  Biographie
                </h2>
                <div
                  className="prose text-xs prose-invert prose-sm max-w-none text-white/70 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: m.biography }}
                />
              </section>

              {m.expertises_detail?.length > 0 && (
                <section className="glass-card p-8">
                  <h2 className="text-xl font-bold text-white mb-5">
                    Expertises
                  </h2>
                  <div className="space-y-2">
                    {m.expertises_detail.map((exp: any) => (
                      <Link
                        key={exp.id}
                        to={`/expertises/${exp.slug}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition group"
                      >
                        <span className="text-orange-400 group-hover:scale-110 transition">
                          {exp.icon}
                        </span>
                        <span className="text-sm text-white/80 group-hover:text-white">
                          {exp.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </motion.div>
          </div>

          {others.length > 0 && (
            <section className="">
              <h2 className="text-2xl font-bold text-white mb-8">
                Autres membres de l'équipe
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {others.map((m) => (
                  <div key={m.id} className="scale-90 origin-top">
                    <CardTeam member={m} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
