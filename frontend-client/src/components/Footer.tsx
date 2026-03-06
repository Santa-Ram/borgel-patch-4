import { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Github, Youtube } from "lucide-react";
import API from "../api/client";
import "../index.css";

const footerLinks = {
  Expertises: [
    {
      label: "Accidents de la route",
      url: "/expertises/accidents-circulation",
    },
    { label: "Droit de la santé", url: "/expertises/droit-sante" },
    { label: "Assurance & Dommage", url: "/expertises/assurance-dommage" },
    {
      label: "Responsabilité médicale",
      url: "/expertises/responsabilite-medicale",
    },
    { label: "Accidents du travail", url: "/expertises/accidents-travail" },
  ],
  Support: [
    { label: "Nous contacter", url: "/contact" },
    { label: "Actualités", url: "/actualites" },
    { label: "FAQ", url: "/contact" },
    { label: "Vidéos", url: "/contact" },
  ],
  Cabinet: [
    { label: "Notre équipe", url: "/equipe" },
    { label: "Avis clients", url: "/avis" },
    { label: "Nos honoraires", url: "/honoraires" },
    { label: "Galerie", url: "/galerie" },
  ],
  Coordonnées: [
    {
      label: "89, Rue Saint Jacques - 13006 Marseille",
      url: "https://www.google.com/maps/place/Borgel+%26+Associ%C3%A9s,+sp%C3%A9cialiste+en+r%C3%A9paration+du+dommage+corporel/@43.2876975,5.3760023,2539m/data=!3m1!1e3!4m6!3m5!1s0x12c9c0ba69fa0d1b:0xaeb21a7104014c17!8m2!3d43.2876975!4d5.3760023!16s%2Fg%2F1hc383qyx?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D",
    },
    { label: "Tél : 04 91 33 50 00", url: "/avis" },
    { label: "Contact@borgel-avocat.fr ", url: "/honoraires" },
    { label: "Galerie", url: "/galerie" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  {
    icon: (props: any) => (
      <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: "https://x.com",
    label: "X (Twitter)",
  },
  { icon: Github, href: "https://github.com", label: "Github" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
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
      setSent(true); // demo fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0d1117] border-t border-white/8 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-8">
        {/* ── Links grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-white mb-1">
                {section}
              </h3>
              <ul className="space-y-1">
                {links.map((link) => (
                  <li key={link.url}>
                    <Link
                      to={link.url}
                      className="text-sm text-white/50 hover:text-white transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div className="flex grid-cols-3">
          <div className="mb-5 col-span-2">
            <h3 className="text-sm font-semibold text-white mb-1">
              Abonnez-vous à notre newsletter
            </h3>
            <p className="text-sm text-white/50 mb-4">
              Les dernières actualités juridiques, articles et ressources,
              envoyés chaque semaine.
            </p>
            {sent ? (
              <p className="text-sm text-green-400">
                ✓ Merci pour votre inscription !
              </p>
            ) : (
              <div className="flex gap-3 max-w-xl">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="flex-1 bg-transparent border rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/30 outline-none border-orange-400/50 transition"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-500 transition px-5 py-2 rounded-lg text-sm font-semibold text-white shrink-0"
                >
                  {loading ? "..." : "S'abonner"}
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-white/40 hover:text-white transition"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/8 pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {year} Borgel &amp; Associés. Tous droits réservés.
          </p>
          {/* Social icons */}

          <div className="flex gap-4 text-xs text-white/60">
            <a href="#" className="hover:text-white/80 transition">
              Mentions légales
            </a>
            <a href="#" className="hover:text-white/80 transition">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
