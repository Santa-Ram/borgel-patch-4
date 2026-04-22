import { useEffect, useRef, useState } from "react";

// ─── CONSTANTES COULEURS ───────────────────────────────────────────
const GREEN  = "#00d4b8";
const ORANGE = "#5b72e8";

// ─── DONNÉES ÉQUIPE ────────────────────────────────────────────────
const TEAM = [
  {
    id: 1,
    name: "Maître Alban Borgel",
    role: "Fondatrice & Associée principale",
    badge: "Expert juridique",
    photo: null as string | null,
    initials: "SM",
    top: false,
  },
  {
    id: 2,
    name: "Maître Fabien Busson",
    role: "Répond rapidement aux questions de droit des affaires",
    badge: "Expert juridique",
    photo: null as string | null,
    initials: "TD",
    top: true,
  },
];

// ─── ANIMATION BACKGROUND (SVG + CSS — sans dépendance externe) ────
function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Points flottants via CSS animation */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  `${4 + (i % 4) * 2}px`,
            height: `${4 + (i % 4) * 2}px`,
            background: i % 3 === 0 ? `${ORANGE}55` : `${GREEN}55`,
            left:   `${5 + (i * 17) % 90}%`,
            top:    `${10 + (i * 23) % 80}%`,
            animation: `floatDot ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite alternate`,
          }}
        />
      ))}

      {/* Cercles décoratifs */}
      <div
        className="absolute rounded-full"
        style={{
          width: "280px", height: "280px",
          border: `1.5px solid ${ORANGE}28`,
          right: "5%", top: "10%",
          animation: "spinSlow 25s linear infinite",
        }}
      />
      <div
        className="absolute rounded-full"
        style={{
          width: "160px", height: "160px",
          border: `1.5px solid ${GREEN}35`,
          left: "8%", bottom: "15%",
          animation: "spinSlow 18s linear reverse infinite",
        }}
      />

      {/* Lignes SVG légères */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="35%" y2="60%"  stroke={GREEN}  strokeWidth="0.8" strokeOpacity="0.12" />
        <line x1="65%" y1="15%" x2="90%" y2="55%"  stroke={GREEN}  strokeWidth="0.8" strokeOpacity="0.10" />
        <line x1="25%" y1="80%" x2="55%" y2="40%"  stroke={ORANGE} strokeWidth="0.8" strokeOpacity="0.10" />
        <line x1="70%" y1="70%" x2="95%" y2="30%"  stroke={GREEN}  strokeWidth="0.8" strokeOpacity="0.08" />
      </svg>

      <style>{`
        @keyframes floatDot {
          from { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          to   { transform: translateY(-14px) translateX(6px); opacity: 0.8; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// ─── CARTE MEMBRE ──────────────────────────────────────────────────
interface TeamMember {
  id: number;
  name: string;
  role: string;
  badge: string;
  photo: string | null;
  initials: string;
  top: boolean;
}

function MemberCard({ member, visible, delay }: {
  member: TeamMember;
  visible: boolean;
  delay: number;
}) {
  const [imgSrc, setImgSrc] = useState<string | null>(member.photo);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImgSrc(URL.createObjectURL(file));
  };

  const openPicker = () => {
    document.getElementById(`photo-${member.id}`)?.click();
  };

  return (
    <div
      style={{
        transform:  visible ? "translateY(0) scale(1)"    : "translateY(40px) scale(0.96)",
        opacity:    visible ? 1 : 0,
        transition: `all 0.7s cubic-bezier(.23,1,.32,1) ${delay}ms`,
      }}
      className="flex items-start gap-4"
    >
      {/* Photo circulaire */}
      <div className="relative flex-shrink-0">
        <div
          className="relative overflow-hidden rounded-full border-4"
          style={{
            width:       member.top ? "140px" : "170px",
            height:      member.top ? "140px" : "170px",
            borderColor: member.top ? ORANGE : GREEN,
            boxShadow:   `0 12px 40px ${member.top ? ORANGE : GREEN}33`,
          }}
        >
          {imgSrc ? (
            <img src={imgSrc} alt={member.name} className="w-full h-full object-cover object-top" />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none"
              style={{ background: `${member.top ? ORANGE : GREEN}18` }}
              onClick={openPicker}
              title="Cliquez pour ajouter une photo"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke={member.top ? ORANGE : GREEN} strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span style={{ fontSize: "11px", color: member.top ? ORANGE : GREEN, marginTop: "6px", fontWeight: 600 }}>
                {member.initials}
              </span>
              <span style={{ fontSize: "9px", color: "#999", marginTop: "2px" }}>
                Ajouter photo
              </span>
            </div>
          )}

          {/* Overlay pour changer la photo */}
          {imgSrc && (
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              style={{ background: "rgba(0,0,0,0.45)" }}
              onClick={openPicker}
              title="Changer la photo"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
            </div>
          )}
        </div>

        <input
          id={`photo-${member.id}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-2 pt-2">
        {/* Badge */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-white text-xs font-semibold w-fit"
          style={{ background: member.top ? ORANGE : GREEN, letterSpacing: "0.3px" }}
        >
          {member.badge}
        </span>

        {/* Ligne décorative */}
        <div className="w-10 h-px" style={{ background: member.top ? ORANGE : GREEN, opacity: 0.5 }} />

        {/* Nom */}
        <h3
          className="text-gray-900 leading-tight"
          style={{ fontWeight: 700, fontSize: member.top ? "17px" : "19px" }}
        >
          {member.name}
        </h3>

        {/* Rôle */}
        <p
          className="text-gray-500 leading-snug max-w-[200px]"
          style={{ fontWeight: 400, fontSize: "13px" }}
        >
          {member.role}
        </p>
      </div>
    </div>
  );
}

// ─── COMPOSANT PRINCIPAL ───────────────────────────────────────────
export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.82) setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: "#f4f4f2", minHeight: "560px", padding: "80px 0" }}
    >
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Colonne gauche : Texte ── */}
          <div
            style={{
              transform:  visible ? "translateX(0)"   : "translateX(-50px)",
              opacity:    visible ? 1 : 0,
              transition: "all 0.8s cubic-bezier(.23,1,.32,1) 0ms",
            }}
          >
            <h2
              className="leading-tight mb-6"
              style={{ fontWeight: 800, fontSize: "clamp(20px, 4vw, 40px)", color: "#111" }}
            >
              <span style={{ color: GREEN }}>Notre équipe</span> qui vous accompagnera{" "}
              <span style={{ color: ORANGE }}>dans chaque étape</span> de votre dossier juridique
            </h2>

            {/* Ligne décorative */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 rounded-full" style={{ background: GREEN }} />
              <div className="h-1 w-6 rounded-full" style={{ background: ORANGE }} />
            </div>

            <p
              className="leading-relaxed mb-8 max-w-md"
              style={{ fontWeight: 300, fontSize: "12px", color: "#555" }}
            >
              Notre cabinet se distingue par un haut niveau de professionnalisme, de responsabilité et
              une orientation constante vers les résultats. Chaque dossier est traité avec rigueur et engagement.
            </p>

            {/* Stats rapides */}
            <div className="flex gap-8">
              {[
                { num: "15+",  label: "Ans d'expérience" },
                { num: "500+", label: "Dossiers résolus" },
                { num: "98%",  label: "Satisfaction client" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    transform:  visible ? "translateY(0)" : "translateY(20px)",
                    opacity:    visible ? 1 : 0,
                    transition: `all 0.6s cubic-bezier(.23,1,.32,1) ${300 + i * 100}ms`,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: "26px", color: i % 2 === 0 ? GREEN : ORANGE }}>
                    {s.num}
                  </div>
                  <div style={{ fontWeight: 400, fontSize: "12px", color: "#888" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Colonne droite : Cartes membres ── */}
          <div className="relative flex flex-col gap-10">

            {/* Cercle de fond décoratif */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: "320px", height: "320px",
                background: `radial-gradient(circle, ${GREEN}12 0%, transparent 70%)`,
                top: "-40px", right: "-60px",
                transform: visible ? "scale(1)" : "scale(0)",
                transition: "transform 1s cubic-bezier(.23,1,.32,1) 200ms",
              }}
            />

            {/* Membre 2 — haut droite */}
            <div className="flex justify-end">
              <MemberCard member={TEAM[1]} visible={visible} delay={200} />
            </div>

            {/* Membre 1 — bas gauche décalé */}
            <div className="flex justify-start pl-8">
              <MemberCard member={TEAM[0]} visible={visible} delay={400} />
            </div>

            {/* Ligne de connexion décorative */}
            <svg
              className="absolute pointer-events-none"
              style={{
                top: "110px", left: "80px",
                width: "260px", height: "120px",
                opacity: visible ? 0.25 : 0,
                transition: "opacity 0.8s 600ms",
              }}
              viewBox="0 0 260 120"
            >
              <path
                d="M 200 10 Q 120 60 60 110"
                stroke={GREEN}
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
