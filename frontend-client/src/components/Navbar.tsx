import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Scale, Shield, Briefcase, Heart, Car, Stethoscope, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { label: 'Accueil', url: '/' },
  { label: 'Notre Équipe', url: '/equipe' },
  { label: 'Actualités', url: '/actualites' },
  { label: 'Expertises', url: '/expertises', hasMegaMenu: true },
  { label: 'Nos Honoraires', url: '/honoraires' },
  { label: 'Vidéos', url: '/videos' },
  { label: 'Avis Clients', url: '/avis' },
  { label: 'Contact', url: '/contact' },
];

const expertiseItems = [
  { icon: Car, label: 'Accidents de la circulation', url: '/expertises/accidents-circulation' },
  { icon: Stethoscope, label: 'Droit de la santé', url: '/expertises/droit-sante' },
  { icon: Shield, label: 'Assurance & Dommage corporel', url: '/expertises/assurance-dommage' },
  { icon: Scale, label: 'Responsabilité médicale', url: '/expertises/responsabilite-medicale' },
  { icon: Briefcase, label: 'Accidents du travail', url: '/expertises/accidents-travail' },
  { icon: Heart, label: 'Préjudice moral', url: '/expertises/prejudice-moral' },
];

const megaMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2,} },
  exit: { opacity: 0, y: -8, scale: 0.97, transition: { duration: 0.15 } },
};

export default function Navbar() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (url: string) => location.pathname === url;

  return (
    <nav className="fixed top-0 w-full z-50 bg-navy/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-bold text-lg text-white tracking-wide flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
            <Scale size={16} className="text-orange-400" />
          </div>
          <span className="hidden sm:block">BORGEL &amp; ASSOCIÉS</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-0.5">
          {navItems.map((item) =>
            item.hasMegaMenu ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-lg transition ${
                    isActive(item.url) ? 'text-orange-400 bg-orange-500/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  <motion.span animate={{ rotate: megaOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} />
                  </motion.span>
                </button>

                <AnimatePresence>
                  {megaOpen && (
                    <motion.div
                      variants={megaMenuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-[#0d1435]/98 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl"
                    >
                      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-semibold">
                        Nos Domaines d'Expertise
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {expertiseItems.map((exp) => (
                          <Link
                            key={exp.url}
                            to={exp.url}
                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/40 hover:bg-orange-500/10 transition group"
                            onClick={() => setMegaOpen(false)}
                          >
                            <exp.icon size={16} className="text-orange-400 group-hover:scale-110 transition flex-shrink-0" />
                            <span className="text-sm text-white/80 group-hover:text-white">{exp.label}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <Link
                          to="/expertises"
                          className="text-xs text-orange-400 hover:text-orange-300 transition font-medium"
                          onClick={() => setMegaOpen(false)}
                        >
                          Voir toutes nos expertises →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.label}
                to={item.url}
                className={`px-3 py-2 text-sm rounded-lg transition ${
                  isActive(item.url) ? 'text-orange-400 bg-orange-500/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-white/60 hover:text-white transition"
            aria-label="Rechercher"
          >
            <Search size={18} />
          </button>
          <button
            className="xl:hidden p-2 text-white/60 hover:text-white transition"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/10 bg-navy/95 px-4 py-3 overflow-hidden"
          >
            <input
              type="search"
              placeholder="Rechercher une actualité, expertise, membre..."
              className="input-dark text-sm"
              autoFocus
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden border-t border-white/10 bg-navy/98 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.url}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm transition ${
                    isActive(item.url) ? 'text-orange-400 bg-orange-500/10' : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
