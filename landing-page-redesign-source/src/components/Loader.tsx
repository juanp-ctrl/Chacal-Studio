import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

export function Loader() {
  const [isVisible, setIsVisible] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] bg-white dark:bg-primary flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div className="max-w-4xl mx-auto px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-primary dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight mb-6 font-serif">
                {language === 'es' ? 'Comunicando lo humano' : 'Communicating the human'}
              </h1>
            </motion.div>

            <motion.p
              className="text-primary/70 dark:text-white/70 text-lg sm:text-xl md:text-2xl font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {language === 'es' ? 'con un foco socio ambiental' : 'with a socio-environmental focus'}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
