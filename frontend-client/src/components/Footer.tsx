import { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconMapPin,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
} from "@tabler/icons-react";
import API from "../api/client";

const CYAN = "#00d4b8";
const LINK_DEFAULT = "#c8d0f8";

const expertisesLinks = [
  { label: "Accident de la Circulation", url: "/expertises/accidents-circulation" },
  { label: "Accident Médical",            url: "/expertises/accident-medical" },
  { label: "Assurance & Dommage",         url: "/expertises/assurance-dommage" },
  { label: "Victimes d'Attentat",         url: "/expertises/victimes-attentat" },
  { label: "Accidents du Travail",        url: "/expertises/accidents-travail" },
];

const quickLinks = [
  { label: "Accueil",        url: "/" },
  { label: "Notre Équipe",   url: "/equipe" },
  { label: "À propos",       url: "/a-propos" },
  { label: "Actualités",     url: "/actualites" },
  { label: "Honoraires",     url: "/honoraires" },
  { label: "Contact",        url: "/contact" },
];

const socialLinks = [
  { icon: IconBrandLinkedin, href: "https://linkedin.com",  label: "LinkedIn"  },
  { icon: IconBrandX,        href: "https://x.com",         label: "X"         },
  { icon: IconBrandFacebook, href: "https://facebook.com",  label: "Facebook"  },
  { icon: IconBrandInstagram,href: "https://instagram.com", label: "Instagram" },
  { icon: IconBrandYoutube,  href: "https://youtube.com",   label: "YouTube"   },
];

export default function Footer() {
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const year = new Date().getFullYear();

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) return;
    setLoading(true);
    try {
      await API.post("/newsletter/subscribe/", { email });
      setSent(true);
      setEmail("");
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #1a0e5c 0%, #2d1b6b 50%, #4f35c2 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: -2, left: 0, width: "100%", lineHeight: 0, pointerEvents: "none" }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: "100%", height: "80px", display: "block" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,0 L0,0 Z" fill="url(#waveGrad1)" opacity="0.7" />
          <path d="M0,55 C480,10 960,70 1440,25 L1440,0 L0,0 Z" fill="url(#waveGrad2)" opacity="0.4" />
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#7c5cfc" />
              <stop offset="50%"  stopColor="#818cf8" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
            <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#93c5fd" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8" style={{ paddingTop: "80px" }}>

        {/* ── 4-column main grid ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
          style={{ paddingBottom: "40px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "16px" }}>
              Coordonnées
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.84rem", color: LINK_DEFAULT }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <IconMapPin size={15} style={{ flexShrink: 0 }} />
                89, Rue Saint Jacques — 13006 Marseille
              </span>
              <a
                href="tel:0491335000"
                style={{ color: LINK_DEFAULT, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = LINK_DEFAULT)}
              >
                04 91 33 50 00
              </a>
              <a
                href="mailto:contact@borgel-avocat.fr"
                style={{ color: LINK_DEFAULT, transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                onMouseLeave={(e) => (e.currentTarget.style.color = LINK_DEFAULT)}
              >
                ✉️ contact@borgel-avocat.fr
              </a>
            </div>
          </div>

          {/* Col 2 — Liens rapides */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "16px" }}>
              Liens rapides
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {quickLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    style={{ color: LINK_DEFAULT, fontSize: "0.84rem", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = LINK_DEFAULT)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Nos Expertises */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "16px" }}>
              Nos Expertises
            </h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {expertisesLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    to={link.url}
                    style={{ color: LINK_DEFAULT, fontSize: "0.84rem", transition: "color 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = LINK_DEFAULT)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Horaires */}
          <div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "0.9rem", marginBottom: "16px" }}>
              Horaires
            </h4>
            <div style={{ color: LINK_DEFAULT, fontSize: "0.84rem", lineHeight: 1.9 }}>
              <div>Lundi — Vendredi</div>
              <div style={{ color: CYAN, fontWeight: 600 }}>09h00 – 18h00</div>
              <div style={{ marginTop: "10px" }}>Samedi</div>
              <div style={{ color: CYAN, fontWeight: 600 }}>09h00 – 13h00</div>
              <div style={{ marginTop: "10px", color: "rgba(200,208,248,0.5)" }}>Dimanche — Fermé</div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar: Logo | Social | Newsletter ── */}
        <div style={{ padding: "24px 0 20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #00d4b8, #00b0f0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "14px" }}>B</span>
              </div>
              <span style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "-0.01em" }}>
                Borgel<span style={{ color: CYAN }}>&nbsp;&amp; Associés</span>
              </span>
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: "8px" }}>
              {socialLinks.map(({ icon: SocialIcon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: LINK_DEFAULT,
                    transition: "background 0.2s, color 0.2s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(0,212,184,0.2)";
                    e.currentTarget.style.color = CYAN;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = LINK_DEFAULT;
                  }}
                >
                  <SocialIcon size={15} />
                </a>
              ))}
            </div>

            {/* Newsletter compact */}
            <div>
              {sent ? (
                <p style={{ color: CYAN, fontWeight: 600, fontSize: "0.88rem" }}>
                  ✓ Merci pour votre inscription !
                </p>
              ) : (
                <>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                      placeholder="Votre email"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1.5px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        color: "#ffffff",
                        padding: "9px 13px",
                        fontSize: "0.82rem",
                        width: "200px",
                        outline: "none",
                        fontFamily: "'Poppins', sans-serif",
                        transition: "border-color 0.2s, box-shadow 0.2s",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "rgba(0,212,184,0.7)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,184,0.15)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <button
                      onClick={handleSubscribe}
                      disabled={loading}
                      style={{
                        background: "linear-gradient(90deg, #00d4b8, #00b0f0)",
                        color: "#fff",
                        fontWeight: 700,
                        border: "none",
                        borderRadius: "8px",
                        padding: "9px 16px",
                        cursor: "pointer",
                        fontSize: "0.82rem",
                        whiteSpace: "nowrap",
                        fontFamily: "'Poppins', sans-serif",
                        opacity: loading ? 0.7 : 1,
                      }}
                    >
                      {loading ? "..." : "S'abonner →"}
                    </button>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.72rem", marginTop: "5px" }}>
                    Aucun spam, promis.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ── Copyright ── */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "16px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.38)",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <span>© {year} Borgel &amp; Associés. Tous droits réservés.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.38)", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
            >
              Mentions légales
            </a>
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.38)", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
            >
              Confidentialité
            </a>
            <a
              href="#"
              style={{ color: "rgba(255,255,255,0.38)", cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
            >
              CGU
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
