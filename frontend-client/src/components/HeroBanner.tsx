import { motion } from 'framer-motion';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  badge?: string;
  reduced?: boolean;
}

export default function HeroBanner({ title, subtitle, badge, reduced = false }: HeroBannerProps) {
  return (
    <section
      className={`dark-zone relative flex items-center justify-center overflow-hidden ${
        reduced ? 'min-h-[32vh]' : 'min-h-[40vh]'
      } bg-gradient-to-br from-[#1a0e5c] via-[#2d1b6b] to-[#4f35c2]`}
    >
      {/* Subtle glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[400px] aspect-square rounded-full bg-teal-400/12 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] aspect-square rounded-full bg-teal-300/8 blur-[80px]" />
      </div>

      <div className="relative z-10 text-center px-8 lg:px-20 py-14">
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.28em] text-teal-400 mb-4 font-semibold"
          >
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="font-sans text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-base text-white/60 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
