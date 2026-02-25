import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  id: number;
  imageSrc: string;
  title: string;
  subtitle?: string;
}

function ParallaxImage({ id, imageSrc, title, subtitle }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={ref} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={imageSrc}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d1e]/60 via-navy/40 to-[#080d1e]/80" />
      </div>
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6">
        <p className="text-xs uppercase tracking-[0.3em] text-orange-400 mb-3 font-semibold">
          #{String(id).padStart(2, '0')}
        </p>
        <h2 className="font-poppins text-4xl lg:text-6xl font-bold text-white mb-4">{title}</h2>
        {subtitle && <p className="text-white/70 text-lg max-w-xl mx-auto">{subtitle}</p>}
      </motion.div>
    </section>
  );
}

export function ParallaxSections() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const sections = [
    { id: 1, imageSrc: 'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1600', title: 'Notre Mission', subtitle: 'Défendre vos droits avec rigueur et combativité' },
    { id: 2, imageSrc: 'https://images.unsplash.com/photo-1521791055366-0d553872952f?w=1600', title: 'Nos Expertises', subtitle: 'Dommage corporel & responsabilité médicale' },
    { id: 3, imageSrc: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600', title: 'Notre Équipe', subtitle: 'Des avocats engagés à vos côtés' },
  ];

  return (
    <div>
      {sections.map((s) => (
        <ParallaxImage key={s.id} {...s} />
      ))}
      <motion.div
        className="fixed bottom-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"
        style={{ scaleX }}
      />
    </div>
  );
}

export default ParallaxSections;
