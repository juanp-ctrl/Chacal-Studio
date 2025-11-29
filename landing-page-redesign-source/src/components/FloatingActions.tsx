import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, MessageCircle } from 'lucide-react';

export function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar después de 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    // Número de WhatsApp de Chacal Estudio (reemplazar con el número real)
    const phoneNumber = '5492944000000'; // Formato internacional sin +
    const message = encodeURIComponent('¡Hola! Me gustaría consultar sobre sus servicios.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          {/* WhatsApp Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            onClick={openWhatsApp}
            className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-[#2F2E59] hover:bg-[#FD9A6B] text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
            aria-label="Volver arriba"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
