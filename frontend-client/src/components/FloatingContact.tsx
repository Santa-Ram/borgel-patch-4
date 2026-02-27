import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageSquare, MapPin, X } from 'lucide-react';

const contacts = [
  { icon: Phone,        label: 'Appeler',    href: 'tel:0491335000',             color: 'bg-green-500',  angle: 90 },
  { icon: Mail,         label: 'Email',      href: 'mailto:contact@borgel.fr',   color: 'bg-blue-500',   angle: 60 },
  { icon: MessageSquare,label: 'Contact',    href: '/contact',                    color: 'bg-purple-500', angle: 30 },
  { icon: MapPin,       label: 'Localiser',  href: 'https://maps.google.com/?q=89+Rue+Saint+Jacques+Marseille', color: 'bg-red-500', angle: 0 },
];

export default function FloatingContact() {
  const [open, setOpen] = useState(false);

  const radius = 80; // px

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Child buttons */}
      <AnimatePresence>
        {open && contacts.map((c, i) => {
          // spread from 90° to 0° (quarter circle, top-right direction)
          const angleDeg = 90 - (90 / (contacts.length - 1)) * i; // 90° to 0°
          const angleRad = (angleDeg * Math.PI) / 180;
          const x = Math.cos(angleRad) * radius;
          const y = -Math.sin(angleRad) * radius;

          return (
            <motion.div
              key={c.label}
              initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, x, y }}
              exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
              className="absolute bottom-0 right-0"
            >
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`group flex flex-col items-center gap-1`}
                onClick={() => setOpen(false)}
              >
                <div className={`w-12 h-12 ${c.color} rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform`}>
                  <c.icon size={20} className="text-white"/>
                </div>
                <span className="text-[10px] font-medium text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                  {c.label}
                </span>
              </a>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Main FAB button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 bg-orange-500 rounded-full shadow-lg shadow-orange-500/40 flex items-center justify-center"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {open
            ? <X size={22} className="text-white"/>
            : <Phone size={22} className="text-white"/>
          }
        </motion.div>

        {/* Pulse ring */}
        {!open && (
          <span className="absolute inset-0 rounded-full animate-ping bg-orange-400 opacity-25"/>
        )}
      </motion.button>

      {/* Backdrop to close */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[-1]"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
