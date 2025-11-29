import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HeroSection() {
  const { t } = useLanguage();
  
  const scrollToNext = () => {
    const element = document.getElementById('metodo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--blue-dark)' }}
    >
      {/* Subtle pattern overlay (optional) */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 sm:py-44 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 className="text-white mb-12 tracking-tight font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2]">
            {t('hero.title')}
          </h1>
        </motion.div>

        <motion.p
          className="text-white/90 max-w-3xl mx-auto mb-16 text-base sm:text-lg md:text-xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <button
            onClick={scrollToNext}
            className="group px-8 py-4 bg-accent text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl font-medium"
          >
            {t('hero.cta')}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
