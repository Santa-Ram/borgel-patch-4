import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  Bell,
  X,
  Scale,
  ChevronDown,
  ShieldCheck,
  Target,
  Gavel,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logoblu.png";

const simpleLinks = [
  { label: "Accueil", url: "/" },
  { label: "Notre Équipe", url: "/equipe" },
  { label: "Honoraires", url: "/honoraires" },
  { label: "Actualités", url: "/actualites" },
  { label: "Vidéos", url: "/videos" },
];

const expertisesMenu = {
  col1: {
    title: "Indemnisation du dommage corporel",
    items: [
      {
        icon: ShieldCheck,
        label: "Accident de la Circulation",
        desc: "Conseils essentiels pour protéger vos intérêts",
        slug: "accidents-circulation",
      },
      {
        icon: Target,
        label: "Agressions et Infractions",
        desc: "Comment préparer votre dossier efficacement",
        slug: "agressions",
      },
      {
        icon: Gavel,
        label: "Victimes d'Attentat",
        desc: "Découvrez nos domaines de compétence",
        slug: "victimes-attentat",
      },
      {
        icon: Users,
        label: "Accident Médical",
        desc: "Rencontrez nos avocats expérimentés",
        slug: "accident-medical",
      },
      {
        icon: Users,
        label: "Accident du Travail",
        desc: "Droits et démarches après un accident professionnel",
        slug: "accidents-travail",
      },
    ],
  },
  col2: {
    title: "Présentation",
    items: [
      {
        icon: ShieldCheck,
        label: "Accident de la Vie Courante",
        desc: "Conseils essentiels pour protéger vos intérêts",
        slug: "accident-vie-courante",
      },
      {
        icon: Target,
        label: "Contentieux Droit des Assurances",
        desc: "Comment préparer votre dossier efficacement",
        slug: "assurance-dommage",
      },
      {
        icon: Gavel,
        label: "Réparation du Préjudice Corporel",
        desc: "Découvrez nos domaines de compétence",
        slug: "prejudice-corporel",
      },
      {
        icon: Users,
        label: "Médecin de Recours & Expertise",
        desc: "Rencontrez nos avocats expérimentés",
        slug: "expertise-medicale",
      },
    ],
  },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.14 } },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const isActive = (url: string) =>
    url === "/" ? location.pathname === "/" : location.pathname.startsWith(url);

  // Fermer le menu si clic extérieur
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setExpertisesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Fermer sur changement de route
  useEffect(() => {
    setExpertisesOpen(false);
  }, [location]);

  return (
    <>
      {/* ── Desktop navbar ──────────────────────────────── */}
      <nav className="fixed top-0 w-full z-50 bg-[#0d1117] border-b border-white/10">
        {/* Row 1 : logo · search · actions */}
        <div className="flex items-center justify-between px-6 h-24 gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            {/* <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center">
              <Scale size={15} className="text-blue-400" />
            </div> */}
            <span className="text-sm font-bold text-white tracking-wide">
              <img src={Logo} alt="" className="h-30 w-auto" />
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl mx-auto relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-white/6 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="text-white/50 hover:text-white transition">
              <Bell size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white select-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-shield-question-mark-icon lucide-shield-question-mark"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <button
              className="md:hidden text-white/60 hover:text-white transition"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Row 2 : nav tabs */}
        <div className="hidden md:flex items-center justify-center gap-10 px-6 border-t border-white/6 h-10">
          {/* Liens simples */}
          {simpleLinks.map((link) => (
            <Link
              key={link.url}
              to={link.url}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                isActive(link.url)
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/6"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Expertises — avec mega menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setExpertisesOpen((p) => !p)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition flex items-center gap-1 ${
                isActive("/expertises") || expertisesOpen
                  ? "bg-white/10 text-white"
                  : "text-white/55 hover:text-white hover:bg-white/6"
              }`}
            >
              Expertises
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${expertisesOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {expertisesOpen && (
                <motion.div
                  className="fixed left-0 right-0 top-24 z-40"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="bg-[#0d1117]/95 backdrop-blur-md border-t border-white/10 shadow-2xl">
                    <div className="max-w-7xl mx-auto px-8 py-7 grid grid-cols-3 gap-10">
                      {/* Colonne 1 */}
                      <div>
                        <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                          {expertisesMenu.col1.title}
                        </h4>
                        <ul className="space-y-3">
                          {expertisesMenu.col1.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/expertises/${item.slug}`}
                                onClick={() => setExpertisesOpen(false)}
                                className="flex gap-3 group"
                              >
                                <item.icon
                                  size={15}
                                  className="text-orange-400 mt-0.5 shrink-0 group-hover:text-orange-300 transition"
                                />
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-white/40">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Colonne 2 */}
                      <div>
                        <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                          {expertisesMenu.col2.title}
                        </h4>
                        <ul className="space-y-3">
                          {expertisesMenu.col2.items.map((item) => (
                            <li key={item.slug}>
                              <Link
                                to={`/expertises/${item.slug}`}
                                onClick={() => setExpertisesOpen(false)}
                                className="flex gap-3 group"
                              >
                                <item.icon
                                  size={15}
                                  className="text-orange-400 mt-0.5 shrink-0 group-hover:text-orange-300 transition"
                                />
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">
                                    {item.label}
                                  </p>
                                  <p className="text-xs text-white/40">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Colonne 3 : Actualités */}
                      <div>
                        <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                          Actualités
                        </h4>
                        <div className="space-y-4">
                          {[
                            {
                              label: "Droit et justice",
                              desc: "Les dernières évolutions juridiques",
                              slug: "droit-et-justice",
                            },
                            {
                              label: "Cas de succès",
                              desc: "Comment nous avons gagné vos litiges",
                              slug: "cas-de-succes",
                            },
                          ].map((a) => (
                            <Link
                              key={a.slug}
                              to={`/actualites/${a.slug}`}
                              onClick={() => setExpertisesOpen(false)}
                              className="flex gap-3 group"
                            >
                              <div className="w-24 h-16 bg-white/5 rounded-lg shrink-0 border border-white/8 group-hover:border-orange-500/20 transition" />
                              <div>
                                <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">
                                  {a.label}
                                </p>
                                <p className="text-xs text-white/40 mb-1">
                                  {a.desc}
                                </p>
                                <span className="text-[11px] text-orange-400 underline">
                                  Lire plus
                                </span>
                              </div>
                            </Link>
                          ))}
                          <Link
                            to="/actualites"
                            onClick={() => setExpertisesOpen(false)}
                            className="inline-flex items-center gap-1 text-xs text-white/50 hover:text-white transition mt-1"
                          >
                            Parcourir toutes les actualités{" "}
                            <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <div className="h-24 md:block hidden" />
      <div className="h-14 md:hidden" />

      {/* ── Mobile panel ──────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 h-full w-72 z-50 bg-[#0d1117] border-l border-white/10 flex flex-col"
            >
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
                <span className="text-sm font-bold text-white">BORGEL</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/50 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 pt-4 pb-2">
                <div className="relative">
                  <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="search"
                    placeholder="Rechercher..."
                    className="w-full bg-white/6 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 outline-none"
                  />
                </div>
              </div>

              <nav className="flex-1 px-3 py-2 overflow-y-auto">
                {[
                  ...simpleLinks,
                  { label: "Expertises", url: "/expertises" },
                ].map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition mb-0.5 ${
                      isActive(link.url)
                        ? "bg-white/10 text-white"
                        : "text-white/65 hover:text-white hover:bg-white/6"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shrink-0">
                    B
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Borgel &amp; Associés
                    </p>
                    <p className="text-xs text-white/40">
                      contact@borgel-avocats.fr
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
