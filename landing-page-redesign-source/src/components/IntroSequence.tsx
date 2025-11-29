import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const fontStyles = [
  // Estilo 1: Georgia serif
  {
    className: 'font-normal tracking-tight lowercase',
    style: { fontFamily: 'Georgia, serif' }
  },
  // Estilo 2: Alex Brush - Script descontracturada
  {
    className: 'font-normal tracking-wide lowercase',
    style: { 
      fontFamily: '"Alex Brush", cursive',
      letterSpacing: '0.02em'
    }
  },
  // Estilo 3: Helvetica sans-serif
  {
    className: 'font-light tracking-tight lowercase',
    style: { fontFamily: 'Helvetica, Arial, sans-serif' }
  }
];

export function IntroSequence() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const { language } = useLanguage();

  // Bloquear scroll durante la intro
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add('intro-active');
    } else {
      document.body.classList.remove('intro-active');
    }

    return () => {
      document.body.classList.remove('intro-active');
    };
  }, [isVisible]);

  // Ciclar entre estilos tipográficos
  useEffect(() => {
    const styleInterval = setInterval(() => {
      setCurrentStyleIndex((prev) => (prev + 1) % fontStyles.length);
    }, 1200); // Cambia cada 1.2 segundos

    return () => clearInterval(styleInterval);
  }, []);

  // Mostrar frase y luego ocultarla
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5500); // 5.5 segundos para ver los cambios de tipografía

    return () => clearTimeout(timer);
  }, []);

  const currentStyle = fontStyles[currentStyleIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: '#2F2E59' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="flex flex-col items-center">
              <motion.div
                className="text-white tracking-tight font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.2]"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.3,
                  ease: 'easeOut'
                }}
              >
                {language === 'es' ? 'Comunicando lo humano' : 'Communicating the human'}
              </motion.div>
              <motion.div
                className="text-white font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.2] mt-2 sm:mt-4 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem] xl:min-h-[7rem] flex items-start justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 1.6,
                  ease: 'easeOut'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentStyleIndex}
                    className={currentStyle.className}
                    style={currentStyle.style}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  >
                    {language === 'es' ? 'con un foco socio ambiental' : 'with a socio-environmental focus'}
                  </motion.span>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
