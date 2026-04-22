import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconPhone,
  IconMail,
  IconMessageCircle,
  IconArrowLeft,
  IconCircleCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import { teamAPI } from "../api/client";

/* ── Demo data ─────────────────────────────────────────── */
const demoMember = {
  id: 1,
  name: "Maître Borgel",
  role: "Avocat associé fondateur",
  biography: `<p>Maître Borgel a fondé le cabinet en 2005 après avoir exercé pendant plusieurs années dans des structures renommées. Fort de plus de <strong>20 ans d'expérience dans le domaine du dommage corporel</strong>, il est reconnu pour sa rigueur, son engagement et ses résultats exceptionnels.</p>
<p>Spécialisé en droit du dommage corporel depuis le début de sa carrière, il défend les victimes d'accidents de la circulation, de fautes médicales et d'accidents du travail avec une expertise reconnue par ses pairs et les juridictions.</p>
<p>Au fil des années, il a accompagné des <strong>centaines de victimes</strong> dans l'obtention d'indemnisations justes et complètes, faisant du cabinet une référence incontestable à Marseille et dans toute la région PACA. Sa méthode allie rigueur technique et écoute humaine.</p>`,
  skills: [
    "Dommage corporel",
    "Responsabilité médicale",
    "Accidents de la route",
    "Accidents du travail",
    "Victimes d'attentat",
    "Contentieux assurantiel",
    "Expertise médicale contradictoire",
    "Négociation amiable",
  ],
  phone: "04 91 33 50 00",
  email: "borgel@borgel-avocat.fr",
  whatsapp: "+33491335000",
  facebook: "#",
  instagram: "#",
  linkedin: "#",
  photo: null,
};

const demoOthers = [
  { id: 2, name: "Sophie Durand", role: "Avocate senior", photo: null },
  { id: 3, name: "Thomas Martin", role: "Avocat collaborateur", photo: null },
  { id: 4, name: "Julie Leroy", role: "Juriste spécialisée", photo: null },
  { id: 5, name: "Marc Petit", role: "Avocat – Accidents du travail", photo: null },
];

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").substring(0, 2).toUpperCase();
}

function resolvePhoto(photo: string | null | undefined): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `http://localhost:8000${photo}`;
}

/* ── Mini teammate card ─────────────────────────────────── */
function TeammateThumb({ member }: { member: any }) {
  const photo = resolvePhoto(member.photo);
  return (
    <Link
      to={`/equipe/${member.id}`}
      className="flex flex-col items-center gap-2 group"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 ring-2 ring-transparent group-hover:ring-[#00d4b8]/40 transition">
        {photo ? (
          <img src={photo} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1e40af] to-[#00b8a0] flex items-center justify-center text-white text-sm font-bold">
            {initials(member.name)}
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-slate-800 group-hover:text-[#00b8a0] transition leading-tight">
          {member.name}
        </p>
        <p className="text-[10px] text-slate-400 leading-tight">{member.role}</p>
      </div>
    </Link>
  );
}

/* ── Main page ──────────────────────────────────────────── */
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
            .map((m: any) => ({ ...m, photo: resolvePhoto(m.photo) }))
            .slice(0, 6),
        ),
      )
      .catch(() => {});
  }, [id]);

  const m = member || demoMember;
  const photo = resolvePhoto(m.photo);
  const skills: string[] = m.skills || m.expertises_detail?.map((e: any) => e.name) || demoMember.skills;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl h-80 bg-slate-100 animate-pulse rounded-3xl" />
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

      {/* ── Main content ── */}
      <div className="min-h-screen bg-[#f7f7f7] pt-8 pb-20 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto">

          {/* Back link */}
          <Link
            to="/equipe"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-[#00b8a0] transition mb-8"
          >
            <IconArrowLeft size={13} />
            Retour à l'équipe
          </Link>

          {/* ── Two-column layout ── */}
          <div className="grid lg:grid-cols-[1fr_320px] gap-14 items-start">

            {/* ── Left: Bio content ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Greeting heading */}
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-2 leading-tight">
                Bonjour <span className="inline-block">👋</span>
              </h1>
              <p className="text-lg text-slate-500 mb-8">
                Je m'appelle <strong className="text-slate-800">{m.name}</strong>, {m.role} au cabinet Borgel & Associés.
              </p>

              {/* Biography */}
              <div
                className="prose prose-slate prose-base max-w-none leading-relaxed
                  prose-p:text-slate-600 prose-p:mb-5
                  prose-strong:text-slate-900 prose-strong:font-semibold"
                dangerouslySetInnerHTML={{ __html: m.biography || demoMember.biography }}
              />

              {/* Expertises list (if from API) */}
              {m.expertises_detail?.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-base font-bold text-slate-900 mb-4">Domaines d'intervention</h2>
                  <div className="flex flex-wrap gap-2">
                    {m.expertises_detail.map((exp: any) => (
                      <Link
                        key={exp.id}
                        to={`/expertises/${exp.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-[#00b8a0] bg-[#f0fdfa] border border-[#e0f7fa] px-3 py-1.5 rounded-full hover:bg-[#ccfbf1] hover:text-[#00b8a0] transition"
                      >
                        {exp.icon && <span>{exp.icon}</span>}
                        {exp.name}
                        <IconArrowRight size={10} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* ── Right: Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:sticky lg:top-24 space-y-5"
            >
              {/* Photo */}
              <div className="rounded-2xl overflow-hidden bg-slate-200 aspect-[1/1.15] shadow-sm">
                {photo ? (
                  <img
                    src={photo}
                    alt={m.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1e40af] to-[#00b8a0] flex items-center justify-center">
                    <span className="text-7xl font-bold text-white/80">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
              </div>

              {/* Social links */}
              <div className="flex items-center gap-4">
                <p className="text-xs text-slate-500 whitespace-nowrap font-medium">Nous contacter :</p>
                <div className="flex items-center gap-2">
                  {m.linkedin && (
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#1e40af] hover:text-[#00b8a0] hover:bg-[#ccfbf1] hover:border-[#00d4b8]/50 transition"
                      aria-label="LinkedIn">
                      <IconBrandLinkedin size={14} />
                    </a>
                  )}
                  {m.facebook && (
                    <a href={m.facebook} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#1e40af] hover:text-[#00b8a0] hover:bg-[#ccfbf1] hover:border-[#00d4b8]/50 transition"
                      aria-label="IconBrandFacebook">
                      <IconBrandFacebook size={14} />
                    </a>
                  )}
                  {m.instagram && (
                    <a href={m.instagram} target="_blank" rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#1e40af] hover:text-[#00b8a0] hover:bg-[#ccfbf1] hover:border-[#00d4b8]/50 transition"
                      aria-label="IconBrandInstagram">
                      <IconBrandInstagram size={14} />
                    </a>
                  )}
                  {m.email && (
                    <a href={`mailto:${m.email}`}
                      className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#1e40af] hover:text-[#00b8a0] hover:bg-[#ccfbf1] hover:border-[#00d4b8]/50 transition"
                      aria-label="Email">
                      <IconMail size={14} />
                    </a>
                  )}
                  {m.phone && (
                    <a href={`tel:${m.phone}`}
                      className="w-8 h-8 rounded-full border border-[#e0f7fa] bg-[#f0fdfa] flex items-center justify-center text-[#1e40af] hover:text-[#00b8a0] hover:bg-[#ccfbf1] hover:border-[#00d4b8]/50 transition"
                      aria-label="Téléphone">
                      <IconPhone size={14} />
                    </a>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-slate-200" />

              {/* Skills / Expertise box */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <h3 className="text-base font-bold text-slate-900 mb-4">
                  Domaines d'expertise
                </h3>
                <ul className="space-y-2.5 mb-5">
                  {skills.map((skill: string) => (
                    <li key={skill} className="flex items-center gap-2.5">
                      <IconCircleCheck size={15} className="text-[#1e40af] shrink-0" />
                      <span className="text-sm text-slate-700">{skill}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="btn-primary w-full justify-center"
                >
                  Prendre rendez-vous
                </Link>

                {m.whatsapp && (
                  <a
                    href={`https://wa.me/${m.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-400 hover:text-[#00b8a0] transition"
                  >
                    <IconMessageCircle size={13} />
                    WhatsApp
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* ── Other team members ── */}
          {others.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 pt-10 border-t border-slate-200"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-lg font-bold text-slate-900">
                  Autres membres de l'équipe
                </h2>
                <Link
                  to="/equipe"
                  className="text-xs text-slate-400 hover:text-[#00b8a0] flex items-center gap-1 transition"
                >
                  Voir tous <IconArrowRight size={11} />
                </Link>
              </div>
              <div className="flex flex-wrap gap-8">
                {others.map((teammate) => (
                  <TeammateThumb key={teammate.id} member={teammate} />
                ))}
              </div>
            </motion.section>
          )}

        </div>
      </div>
    </>
  );
}
