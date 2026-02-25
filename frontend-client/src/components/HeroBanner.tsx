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
      className={`relative flex items-center justify-center overflow-hidden ${
        reduced ? 'min-h-[40vh]' : 'min-h-[50vh]'
      } bg-navy`}
    >
      {/* Glows */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] aspect-square rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] aspect-square rounded-full bg-orange-600/10 blur-[100px]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl"
          aria-hidden
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              width: 500,
              aspectRatio: '1155/678',
            }}
            className="bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 py-16">
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-4 font-semibold"
          >
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/60 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
