import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import LogoChacalHorizontal from '../imports/LogoChacalHorizontal';

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Mostrar nav solo después de scrollear más allá del video hero (100vh)
      const videoHeroHeight = window.innerHeight;
      setIsVisible(window.scrollY > videoHeroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'metodo', label: t('nav.method') },
    { id: 'proyectos', label: t('projects.title') },
    { id: 'impacto', label: t('nav.impact') },
    { id: 'servicios', label: t('nav.services') },
    { id: 'plant-based', label: t('nav.plantBased') },
  ];

  // No mostramos la nav si no es visible
  if (!isVisible) {
    return null;
  }

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{ backgroundColor: '#2F2E59' }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={() => scrollToSection('video-hero')}
            className="z-50 transition-opacity duration-300 hover:opacity-80 w-16 sm:w-20 lg:w-24"
            aria-label="Volver al inicio"
          >
            <LogoChacalHorizontal />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="relative text-white transition-colors duration-300 hover:text-accent group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 text-white transition-colors duration-300 hover:text-accent"
              >
                <Globe size={20} />
                <span className="uppercase">{language}</span>
              </button>
              {showLangMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setShowLangMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-accent hover:text-white transition-colors"
                  >
                    Español
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setShowLangMenu(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-accent hover:text-white transition-colors"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="text-white transition-colors duration-300 hover:text-accent"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Contact CTA */}
            <button
              onClick={() => scrollToSection('contacto')}
              className="px-6 py-2 bg-accent text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {t('nav.contact')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden fixed inset-0 z-40"
            style={{ backgroundColor: '#2F2E59' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-white hover:text-accent transition-colors duration-300 text-xl"
                >
                  {link.label}
                </button>
              ))}

              {/* Mobile Language Selector */}
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setLanguage('es');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    language === 'es'
                      ? 'bg-accent text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-accent text-white'
                      : 'bg-white/20 text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="flex items-center gap-2 text-white hover:text-accent transition-colors duration-300"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              <button
                onClick={() => scrollToSection('contacto')}
                className="px-8 py-3 bg-accent text-white rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                {t('nav.contact')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}