import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function MarqueeSection() {
  const { t } = useLanguage();

  // Duplicamos el texto múltiples veces para crear el efecto de loop continuo
  const marqueeText = t('marquee.text');
  const repeatedText = Array(4).fill(marqueeText).join('   ');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-accent/80 py-12 sm:py-16">
      <div className="relative">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1920], // Ajustar según el ancho del texto
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 40,
              ease: 'linear',
            },
          }}
        >
          <span className="text-white text-2xl md:text-3xl pr-8">
            {repeatedText}
          </span>
          <span className="text-white text-2xl md:text-3xl pr-8">
            {repeatedText}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
