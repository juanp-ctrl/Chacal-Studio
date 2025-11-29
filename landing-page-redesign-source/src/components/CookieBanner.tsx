import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'cookieConsent',
      JSON.stringify({
        essential: true,
        analytics: true,
        marketing: true,
      })
    );
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem(
      'cookieConsent',
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
      })
    );
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto z-50 max-w-[340px] sm:max-w-sm"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white/95 dark:bg-[#2F2E59]/95 backdrop-blur-md rounded-lg shadow-xl border border-gray-200 dark:border-white/10 p-3">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="w-6 h-6 rounded-full bg-[#FD9A6B]/10 dark:bg-[#FD9A6B]/20 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-3.5 h-3.5 text-[#FD9A6B]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-white/90 text-xs leading-snug">
                  {t('cookies.shortDescription')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-1.5 bg-[#FD9A6B] text-white rounded-full hover:bg-[#FD9A6B]/90 hover:scale-105 transition-all duration-300 text-xs"
              >
                {t('cookies.accept')}
              </button>
              <button
                onClick={handleRejectAll}
                className="px-3 py-1.5 text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-xs whitespace-nowrap"
              >
                {t('cookies.reject')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
