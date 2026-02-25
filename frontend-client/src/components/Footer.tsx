import { Facebook, Instagram, Linkedin, ArrowRight, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white bg-[#060b18] overflow-hidden">
      {/* Glow blob */}
      <div aria-hidden className="absolute -top-10 left-1/2 -translate-x-1/2 z-0 blur-3xl pointer-events-none">
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            width: 640,
            aspectRatio: '1155/678',
          }}
          className="bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-8">
        {/* Top */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Scale size={16} className="text-orange-400" />
            </div>
            <h2 className="font-poppins text-lg font-bold tracking-widest">BORGEL &amp; ASSOCIÉS</h2>
          </div>
          <div className="flex gap-4 text-white/60">
            <a href="#" aria-label="Facebook" className="hover:text-white transition"><Facebook size={20} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition"><Instagram size={20} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-white/80 mb-3 uppercase tracking-wide">
              Réparation du dommage corporel et défense des victimes
            </h3>
            <p className="text-xs text-white/50 leading-relaxed">
              Cabinet d'avocats dédié à la réparation du préjudice suite à un accident de la circulation,
              médical ou professionnel.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Liens rapides</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                ['Le cabinet', '/'],
                ['Notre équipe', '/equipe'],
                ['Nos expertises', '/expertises'],
                ['Actualités juridiques', '/actualites'],
                ['Nos honoraires', '/honoraires'],
                ['Contact', '/contact'],
              ].map(([label, url]) => (
                <li key={label}>
                  <Link to={url} className="hover:text-white transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Domaines</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {[
                'Accidents de la circulation',
                'Accidents médicaux',
                'Agressions & infractions',
                'Accidents du travail',
              ].map((d) => (
                <li key={d}>{d}</li>
              ))}
              <li>
                <Link
                  to="/expertises"
                  className="inline-flex items-center gap-1 mt-1 px-3 py-1 rounded-xl bg-white/10 text-xs hover:bg-white/20 transition"
                >
                  Voir plus <ArrowRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">Coordonnées</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>89, Rue Saint Jacques – 13006 Marseille</li>
              <li>Tél : 04 91 33 50 00</li>
              <li>contact@borgel-avocat.fr</li>
            </ul>
            <Link
              to="/contact"
              className="inline-block mt-4 px-4 py-2 rounded-full bg-white/10 text-xs hover:bg-white/20 transition"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10 text-xs text-white/40">
          <p>© {year} Cabinet Borgel &amp; Associés – Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white/70 transition">Mentions légales</a>
            <a href="#" className="hover:text-white/70 transition">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
