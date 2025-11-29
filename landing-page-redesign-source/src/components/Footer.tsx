import { Instagram, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LogoChacalHorizontal from '../imports/LogoChacalHorizontal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-primary/95 dark:bg-blue-darkest text-white py-16 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6 w-24 sm:w-28 lg:w-32">
              <LogoChacalHorizontal />
            </div>
            <p className="text-white/70 leading-relaxed font-light max-w-md">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <h4 className="mb-4 text-white/90 font-medium">{t('footer.follow')}</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://www.instagram.com/chacal.estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/chacalestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hola@chacalestudio.ar"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm font-light">
          <p>&copy; {currentYear} {t('footer.copyright')}</p>
          <div className="flex gap-6">
            <button className="hover:text-accent transition-colors duration-300">
              {t('footer.privacy')}
            </button>
            <button className="hover:text-accent transition-colors duration-300">
              {t('footer.terms')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
