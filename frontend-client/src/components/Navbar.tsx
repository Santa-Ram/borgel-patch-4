import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconSearch,
  IconX,
  IconChevronDown,
  IconShieldCheck,
  IconTarget,
  IconGavel,
  IconUsers,
  IconArrowRight,
  IconPhone,
  IconMail,
  IconMapPin,
  IconMessage,
  IconShieldQuestion,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../api/client";

/* ─── Nav links ─────────────────────────────────────────── */
const navLinks = [
  { label: "Accueil",      url: "/" },
  { label: "Notre Équipe", url: "/equipe" },
  { label: "À propos",     url: "/a-propos" },
  { label: "Actualités",   url: "/actualites" },
  { label: "Honoraires",   url: "/honoraires" },
];

/* ─── Expertises mega menu ──────────────────────────────── */
const expertisesMenu = {
  col1: {
    title: "Indemnisation du dommage corporel",
    items: [
      { icon: IconShieldCheck, label: "Accident de la Circulation",   desc: "Conseils essentiels pour protéger vos intérêts",     slug: "accidents-circulation" },
      { icon: IconTarget,      label: "Agressions et Infractions",    desc: "Comment préparer votre dossier efficacement",        slug: "agressions" },
      { icon: IconGavel,       label: "Victimes d'Attentat",          desc: "Découvrez nos domaines de compétence",               slug: "victimes-attentat" },
      { icon: IconUsers,       label: "Accident Médical",             desc: "Rencontrez nos avocats expérimentés",                slug: "accident-medical" },
      { icon: IconUsers,       label: "Accident du Travail",          desc: "Droits et démarches après un accident professionnel",slug: "accidents-travail" },
    ],
  },
  col2: {
    title: "Présentation",
    items: [
      { icon: IconShieldCheck, label: "Accident de la Vie Courante",        desc: "Conseils essentiels pour protéger vos intérêts",  slug: "accident-vie-courante" },
      { icon: IconTarget,      label: "Contentieux Droit des Assurances",   desc: "Comment préparer votre dossier efficacement",     slug: "assurance-dommage" },
      { icon: IconGavel,       label: "Réparation du Préjudice Corporel",   desc: "Découvrez nos domaines de compétence",            slug: "prejudice-corporel" },
      { icon: IconUsers,       label: "Médecin de Recours & Expertise",     desc: "Rencontrez nos avocats expérimentés",             slug: "expertise-medicale" },
    ],
  },
};

/* ─── Contacts ──────────────────────────────────────────── */
const contactItems = [
  { icon: IconPhone,         label: "Appeler",    href: "tel:0491335000",                    color: "bg-cyan-50 text-[#00b8a0] border-cyan-200" },
  { icon: IconMail,          label: "Email",      href: "mailto:contact@borgel.fr",           color: "bg-blue-50 text-blue-500 border-blue-200" },
  { icon: IconMessage, label: "Formulaire", href: "/contact",                           color: "bg-cyan-50 text-[#00b8a0] border-cyan-200" },
  { icon: IconMapPin,        label: "Localiser",  href: "https://maps.google.com/?q=89+Rue+Saint+Jacques+Marseille", color: "bg-pink-50 text-pink-500 border-pink-200" },
];

/* ─── Animations ────────────────────────────────────────── */
const dropdownV = {
  hidden:  { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.16 } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.12 } },
};
const searchV = {
  hidden:  { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.2 } },
  exit:    { opacity: 0, height: 0,      transition: { duration: 0.15 } },
};

const CYAN = "#00d4b8";

function NavLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <span className="relative inline-block pb-0.5">
      {label}
      <span
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-300 ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
        style={{ background: CYAN }}
      />
    </span>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen]           = useState(false);
  const [expertisesOpen, setExpertisesOpen]   = useState(false);
  const [searchOpen, setSearchOpen]           = useState(false);
  const [contactOpen, setContactOpen]         = useState(false);
  const [searchVal, setSearchVal]             = useState("");
  const [recentPosts, setRecentPosts]         = useState<any[]>([]);

  const expertRef  = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const searchRef  = useRef<HTMLInputElement>(null);
  const location   = useLocation();
  const navigate   = useNavigate();

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
      if (expertRef.current  && !expertRef.current.contains(e.target as Node))  setExpertisesOpen(false);
      if (contactRef.current && !contactRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    API.get("/posts/?page_size=6")
      .then((r) => {
        const posts = r.data.results || r.data;
        setRecentPosts([...posts].sort(() => Math.random() - 0.5).slice(0, 2));
      })
      .catch(() =>
        setRecentPosts([
          { id: 1, title: "Indemnisation : nouvelles règles 2025", slug: "indemnisation-2025", cover_image: null },
          { id: 2, title: "Faute médicale : comment réagir ?",    slug: "faute-medicale",    cover_image: null },
        ])
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
      <nav
        className="fixed top-0 w-full z-50"
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div className="flex items-center h-16 px-6 gap-4 max-w-7xl mx-auto">

          {/* Logo */}
          <Link to="/" className="shrink-0 flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #00d4b8 0%, #00b0f0 100%)" }}
            >
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
            <span className="hidden lg:block text-sm font-bold tracking-wide" style={{ color: "#0f172a" }}>
              BORGEL
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden 891:flex flex-1 items-center justify-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.url}
                to={link.url}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(link.url) ? "text-[#0f172a]" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <NavLabel label={link.label} active={isActive(link.url)} />
              </Link>
            ))}

            {/* Expertises dropdown */}
            <div className="relative" ref={expertRef}>
              <button
                onClick={() => setExpertisesOpen((p) => !p)}
                className={`group relative px-3.5 py-2 text-sm font-medium transition-colors flex items-center gap-1 ${
                  isActive("/expertises") || expertisesOpen
                    ? "text-[#0f172a]"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                <NavLabel label="Expertises" active={isActive("/expertises") || expertisesOpen} />
                <IconChevronDown
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
                    <div
                      style={{
                        background: "#ffffff",
                        borderTop: "1px solid #e2e8f0",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04)",
                      }}
                    >
                      <div className="max-w-6xl mx-auto px-8 py-7 grid grid-cols-3 gap-10">
                        {/* Col 1 */}
                        <div>
                          <h4
                            className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                            style={{ color: "#94a3b8" }}
                          >
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
                                  <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition"
                                    style={{ background: "#f0fdfa" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#ccfbf1")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "#f0fdfa")}
                                  >
                                    <item.icon size={15} style={{ color: "#00b8a0" }} />
                                  </div>
                                  <div>
                                    <p
                                      className="text-sm font-semibold"
                                      style={{ color: "#0f172a", transition: "color 0.15s" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00b8a0")}
                                      onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
                                    >
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
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
                          <h4
                            className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                            style={{ color: "#94a3b8" }}
                          >
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
                                  <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition"
                                    style={{ background: "#f0fdfa" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "#ccfbf1")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "#f0fdfa")}
                                  >
                                    <item.icon size={15} style={{ color: "#00b8a0" }} />
                                  </div>
                                  <div>
                                    <p
                                      className="text-sm font-semibold"
                                      style={{ color: "#0f172a", transition: "color 0.15s" }}
                                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00b8a0")}
                                      onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
                                    >
                                      {item.label}
                                    </p>
                                    <p className="text-[11px] mt-0.5" style={{ color: "#64748b" }}>
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>

                          <div className="py-5 pl-12">
                            <Link
                              to="/expertises"
                              onClick={() => setExpertisesOpen(false)}
                              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition"
                              style={{ border: `1px solid rgba(0,212,184,0.4)`, color: CYAN }}
                              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,184,0.08)")}
                              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                            >
                              Voir toutes nos expertises <IconArrowRight size={12} />
                            </Link>
                          </div>
                        </div>

                        {/* Col 3 — Actualités récentes */}
                        <div>
                          <h4
                            className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                            style={{ color: "#94a3b8" }}
                          >
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
                                <div
                                  className="w-20 h-14 rounded-lg overflow-hidden shrink-0"
                                  style={{ background: "#f1f5f9", border: "1px solid #e2e8f0" }}
                                >
                                  {post.cover_image ? (
                                    <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs" style={{ color: "#94a3b8" }}>
                                      📰
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p
                                    className="text-sm font-medium line-clamp-2 leading-snug"
                                    style={{ color: "#0f172a", transition: "color 0.15s" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "#00b8a0")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "#0f172a")}
                                  >
                                    {post.title}
                                  </p>
                                  <span className="text-[11px] mt-1 inline-block font-medium" style={{ color: CYAN }}>
                                    Lire →
                                  </span>
                                </div>
                              </Link>
                            ))}
                            <Link
                              to="/actualites"
                              onClick={() => setExpertisesOpen(false)}
                              className="inline-flex items-center gap-1 text-xs transition"
                              style={{ color: "#94a3b8" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#0f172a")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                            >
                              Toutes les actualités <IconArrowRight size={11} />
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

          {/* Right actions */}
          <div className="flex items-center gap-1.5 ml-auto shrink-0">
            {/* CTA pill */}
            <Link to="/contact" className="btn-nav-cta hidden 891:inline-flex mr-2">
              Rendez-vous →
            </Link>

            {/* IconSearch */}
            <button
              onClick={() => setSearchOpen((p) => !p)}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              aria-label="Rechercher"
            >
              {searchOpen ? <IconX size={17} /> : <IconSearch size={17} />}
            </button>

            {/* FAQ */}
            <Link
              to="/faq"
              className={`w-9 h-9 flex items-center justify-center rounded-xl transition ${
                isActive("/faq")
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
              aria-label="FAQ"
              title="Questions fréquentes"
            >
              <IconShieldQuestion size={17} />
            </Link>

            {/* Contact FAB */}
            <div className="relative hidden 891:block" ref={contactRef}>
              <button
                onClick={() => setContactOpen((p) => !p)}
                className="w-9 h-9 flex items-center justify-center rounded-xl transition text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                style={contactOpen ? { background: "#f0fdfa", color: "#00b8a0" } : {}}
                aria-label="Nous contacter"
              >
                <motion.div animate={{ rotate: contactOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                  {contactOpen ? <IconX size={17} /> : <IconPhone size={17} />}
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
                        <span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium px-2.5 py-1 rounded-lg whitespace-nowrap shadow-md"
                          style={{
                            color: "#334155",
                            background: "#ffffff",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                          }}
                        >
                          {c.label}
                        </span>
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          onClick={() => setContactOpen(false)}
                          title={c.label}
                          className={`w-9 h-9 rounded-full border flex items-center justify-center shadow-sm hover:scale-110 transition-transform shrink-0 ${c.color}`}
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
              className="891:hidden text-slate-500 hover:text-slate-800 transition w-9 h-9 flex items-center justify-center"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6"  x2="21" y2="6"  />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* IconSearch bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              variants={searchV}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="overflow-hidden"
              style={{ borderTop: "1px solid #e2e8f0", background: "#f8fafc" }}
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 px-6 py-3 max-w-3xl mx-auto"
              >
                <IconSearch size={15} className="shrink-0 text-slate-400" />
                <input
                  ref={searchRef}
                  type="search"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  placeholder="Rechercher une expertise, un article, un avocat..."
                  className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                />
                <AnimatePresence>
                  {searchVal && (
                    <motion.button
                      type="submit"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-xs px-4 py-1.5 rounded-lg transition shrink-0 text-white font-semibold"
                      style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
                    >
                      Rechercher
                    </motion.button>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchVal(""); }}
                  className="transition shrink-0 text-slate-400 hover:text-slate-700"
                >
                  <IconX size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile drawer — white */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 h-full w-72 z-50 flex flex-col"
              style={{
                background: "#ffffff",
                borderLeft: "1px solid #e2e8f0",
                boxShadow: "-8px 0 32px rgba(0,0,0,0.1)",
              }}
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-5 h-16"
                style={{ borderBottom: "1px solid #e2e8f0" }}
              >
                <span className="text-sm font-bold text-slate-900">BORGEL &amp; ASSOCIÉS</span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 hover:text-slate-700 transition">
                  <IconX size={18} />
                </button>
              </div>

              {/* IconSearch */}
              <div className="px-4 pt-3 pb-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchVal.trim()) {
                      navigate(`/actualites?q=${encodeURIComponent(searchVal)}`);
                      setSearchVal("");
                      setMobileOpen(false);
                    }
                  }}
                  className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <IconSearch size={13} className="shrink-0 text-slate-400" />
                  <input
                    type="search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Rechercher..."
                    className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 outline-none"
                  />
                </form>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-3 py-1 overflow-y-auto">
                {[...navLinks, { label: "Expertises", url: "/expertises" }].map((link) => (
                  <Link
                    key={link.url}
                    to={link.url}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm font-medium transition mb-0.5 text-slate-600 hover:text-[#00b8a0] hover:bg-[#f0fdfa]"
                    style={
                      isActive(link.url)
                        ? { color: "#00b8a0", background: "#f0fdfa", fontWeight: 700, borderLeft: "3px solid #00d4b8" }
                        : {}
                    }
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="mt-2 pt-2" style={{ borderTop: "1px solid #f1f5f9" }}>
                  {contactItems.map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-slate-600 hover:text-[#00b8a0] hover:bg-[#f0fdfa] transition"
                    >
                      <c.icon size={14} style={{ color: CYAN }} className="shrink-0" />
                      {c.label}
                    </a>
                  ))}
                </div>

                {/* Mobile CTA */}
                <div className="mx-1 mt-4">
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center text-sm font-bold text-white py-3 rounded-xl"
                    style={{ background: "linear-gradient(90deg, #00d4b8 0%, #00b0f0 100%)" }}
                  >
                    Prendre rendez-vous →
                  </Link>
                </div>
              </nav>

              {/* Drawer footer */}
              <div className="px-5 py-4" style={{ borderTop: "1px solid #f1f5f9" }}>
                <p className="text-xs font-semibold text-slate-900">Borgel &amp; Associés</p>
                <p className="text-xs text-slate-400">contact@borgel-avocat.fr</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
