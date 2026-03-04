import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  X,
  ChevronDown,
  ShieldCheck,
  Target,
  Gavel,
  Users,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  ShieldQuestion,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/client";

/* ─── Nav links ─────────────────────────────────────────── */
const navLinks = [
  { label: "Accueil", url: "/" },
  { label: "Notre Équipe", url: "/equipe" },
  { label: "À propos", url: "/a-propos" },
  { label: "Actualités", url: "/actualites" },
  { label: "Honoraires", url: "/honoraires" },
  
];

/* ─── Expertises mega menu ──────────────────────────────── */
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

/* ─── Contacts ──────────────────────────────────────────── */
const contactItems = [
  {
    icon: Phone,
    label: "Appeler",
    href: "tel:0491335000",
    color: "bg-green-500/15 text-green-400 border-green-500/20",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:contact@borgel.fr",
    color: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  },
  {
    icon: MessageSquare,
    label: "Formulaire",
    href: "/contact",
    color: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  },
  {
    icon: MapPin,
    label: "Localiser",
    href: "https://maps.google.com/?q=89+Rue+Saint+Jacques+Marseille",
    color: "bg-red-500/15 text-red-400 border-red-500/20",
  },
];

/* ─── Animations ────────────────────────────────────────── */
const dropdownV = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.16 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.12 } },
};
const searchV = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.15 } },
};
const contactV = {
  hidden: { opacity: 0, scale: 0.95, y: -6 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.18 } },
  exit: { opacity: 0, scale: 0.95, y: -6, transition: { duration: 0.12 } },
};

/* ─── NavLabel — underline centre→extérieur ─────────────── */
function NavLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="relative inline-block pb-0.5">
      {label}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
          active ? "w-full bg-orange-400" : "w-0 bg-white/60 group-hover:w-full"
        }`}
      />
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expertisesOpen, setExpertisesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [recentPosts, setRecentPosts] = useState<any[]>([]);

  const expertRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (url: string) =>
    url === "/" ? location.pathname === "/" : location.pathname.startsWith(url);

  useEffect(() => {
    setExpertisesOpen(false);
    setContactOpen(false);
    setSearchOpen(false);
  }, [location]);
  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 60);
  }, [searchOpen]);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (expertRef.current && !expertRef.current.contains(e.target as Node))
        setExpertisesOpen(false);
      if (contactRef.current && !contactRef.current.contains(e.target as Node))
        setContactOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Articles récents pour mega menu
  useEffect(() => {
    API.get("/posts/?page_size=6")
      .then((r) => {
        const posts = r.data.results || r.data;
        const shuffled = [...posts].sort(() => Math.random() - 0.5).slice(0, 2);
        setRecentPosts(shuffled);
      })
      .catch(() =>
        setRecentPosts([
          {
            id: 1,
            title: "Indemnisation : nouvelles règles 2025",
            slug: "indemnisation-2025",
            cover_image: null,
          },
          {
            id: 2,
            title: "Faute médicale : comment réagir ?",
            slug: "faute-medicale",
            cover_image: null,
          },
        ]),
      );
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate(`/actualites?q=${encodeURIComponent(searchVal.trim())}`);
    setSearchVal("");
    setSearchOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-white/8">
        {/* ── Single row h-16 ───────────────────────────── */}
        <div className="flex items-center h-16 px-6 gap-4">
          {/* Logo — gauche */}
          <Link to="/" className="shrink-0 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Borgel"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                  (e.target as HTMLImageElement).parentElement!.innerHTML =
                    '<span style="font-size:13px;font-weight:800;color:white;letter-spacing:-0.5px">B&A</span>';
                }}
              />
            </div>
            <span className="hidden lg:block text-sm font-bold text-white tracking-wide">
              BORGEL &amp; ASSOCIÉS
            </span>
          </Link>

          {/* Nav links — centrés (flex-1 + justify-center) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.url)
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                <NavLabel label={link.label} active={isActive(link.url)} />
              </Link>
            ))}

            {/* Expertises */}
            <div className="relative" ref={expertRef}>
              <button
                onClick={() => setExpertisesOpen((p) => !p)}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive("/expertises") || expertisesOpen
                    ? "text-white"
                    : "text-white/55 hover:text-white"
                }`}
              >
                <NavLabel
                  label="Expertises"
                  active={isActive("/expertises") || expertisesOpen}
                />
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 mt-0.5 ${expertisesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {expertisesOpen && (
                  <motion.div
                    className="fixed left-0 right-0 top-16 z-40"
                    variants={dropdownV}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="bg-[#0d1117]/97 backdrop-blur-md border-t border-white/10 shadow-2xl">
                      <div className="max-w-6xl mx-auto px-8 py-7 grid grid-cols-3 gap-10">
                        {/* Col 1 */}
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
                                    size={14}
                                    className="text-orange-400 mt-0.5 shrink-0 group-hover:text-orange-300 transition"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] text-white/35">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* Col 2 */}
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
                                    size={14}
                                    className="text-orange-400 mt-0.5 shrink-0 group-hover:text-orange-300 transition"
                                  />
                                  <div>
                                    <p className="text-sm font-medium text-white group-hover:text-orange-400 transition">
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] text-white/35">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <div className="py-5 pl-7 flex items-center justify-between">
                            <Link
                              to="/expertises"
                              onClick={() => setExpertisesOpen(false)}
                              className="inline-flex items-center gap-2 border text-xs font-semibold text-orange-400 hover:bg-orange-500/25  px-4 py-1.5 rounded-full transition"
                            >
                              Voir toutes nos expertises{" "}
                              <ArrowRight size={12} />
                            </Link>
                          </div>
                        </div>
                        {/* Col 3 — Actualités récentes */}
                        <div>
                          <h4 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-4">
                            Actualités récentes
                          </h4>
                          <div className="space-y-4">
                            {recentPosts.map((post) => (
                              <Link
                                key={post.id}
                                to={`/actualites/${post.slug}`}
                                onClick={() => setExpertisesOpen(false)}
                                className="flex gap-3 group"
                              >
                                <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 bg-white/5 border border-white/8 group-hover:border-orange-500/20 transition">
                                  {post.cover_image ? (
                                    <img
                                      src={post.cover_image}
                                      alt={post.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-orange-500/10 to-blue-500/10 flex items-center justify-center text-white/20 text-xs">
                                      📰
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-white group-hover:text-orange-400 transition line-clamp-2 leading-snug">
                                    {post.title}
                                  </p>
                                  <span className="text-[11px] text-orange-400 mt-1 inline-block">
                                    Lire →
                                  </span>
                                </div>
                              </Link>
                            ))}
                            <Link
                              to="/actualites"
                              onClick={() => setExpertisesOpen(false)}
                              className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white transition"
                            >
                              Toutes les actualités <ArrowRight size={11} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Bande bas — CTA */}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {/* Search */}
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition ${
                searchOpen
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              }`}
              aria-label="Rechercher"
            >
              {searchOpen ? <X size={17} /> : <Search size={17} />}
            </button>

            {/* FAQ */}
            <Link
              to="/faq"
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition ${
                isActive("/faq")
                  ? "bg-white/10 text-white"
                  : "text-white/50 hover:text-white hover:bg-white/6"
              }`}
              aria-label="FAQ"
              title="Questions fréquentes"
            >
              <ShieldQuestion size={17} />
            </Link>

            {/* Contact — FAB flower */}
            <div className="relative hidden md:block" ref={contactRef}>
              <button
                onClick={() => setContactOpen((p) => !p)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl transition ${
                  contactOpen
                    ? "bg-orange-500 text-white"
                    : "bg-orange-500/15 text-orange-400 hover:bg-orange-500/25"
                }`}
                aria-label="Nous contacter"
              >
                <motion.div
                  animate={{ rotate: contactOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {contactOpen ? <X size={17} /> : <Phone size={17} />}
                </motion.div>
              </button>

              <AnimatePresence>
                {contactOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-13 right-0 z-50 flex flex-col gap-2"
                  >
                    {contactItems.map((c, i) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center justify-end gap-2 group"
                      >
                        {/* Label au survol — apparaît à gauche */}
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium text-white bg-[#131822] border border-white/10 px-2.5 py-1 rounded-lg whitespace-nowrap shadow-lg">
                          {c.label}
                        </span>

                        <a
                          href={c.href}
                          target={
                            c.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel="noopener noreferrer"
                          onClick={() => setContactOpen(false)}
                          title={c.label}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-lg hover:scale-110 transition-transform shrink-0 ${c.color}`}
                        >
                          <c.icon size={15} />
                        </a>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile burger */}
            <button
              className="md:hidden text-white/60 hover:text-white transition w-9 h-9 flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
            >
              <svg
                width="18"
                height="18"
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

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              variants={searchV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden border-t border-white/8 bg-[#0d1117]"
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 px-6 py-3 max-w-3xl mx-auto"
              >
                <Search size={15} className="text-white/35 shrink-0" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Rechercher une expertise, un article, un avocat..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
                <AnimatePresence>
                  {searchVal && (
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg transition shrink-0"
                    >
                      Rechercher
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchVal("");
                  }}
                  className="text-white/30 hover:text-white transition shrink-0"
                >
                  <X size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
                <span className="text-sm font-bold text-white">
                  BORGEL &amp; ASSOCIÉS
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-white/50 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-4 pt-3 pb-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchVal.trim()) {
                      navigate(
                        `/actualites?q=${encodeURIComponent(searchVal)}`,
                      );
                      setSearchVal("");
                      setMobileOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 bg-white/6 border border-white/10 rounded-xl px-3 py-2"
                >
                  <Search size={13} className="text-white/40 shrink-0" />
                  <input
                    type="search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                  />
                </form>
              </div>

              <nav className="flex-1 px-3 py-1 overflow-y-auto">
                {[...navLinks, { label: "Expertises", url: "/expertises" }].map(
                  (link) => (
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
                  ),
                )}
                <div className="border-t border-white/8 mt-2 pt-2">
                  {contactItems.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition"
                    >
                      <c.icon size={14} className="text-orange-400 shrink-0" />
                      {c.label}
                    </a>
                  ))}
                </div>
              </nav>

              <div className="border-t border-white/10 px-5 py-4">
                <p className="text-xs font-semibold text-white">
                  Borgel &amp; Associés
                </p>
                <p className="text-xs text-white/40">
                  contact@borgel-avocats.fr
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
