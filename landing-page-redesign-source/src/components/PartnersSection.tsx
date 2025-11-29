import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PartnersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();

  const partners = [
    {
      name: t('partners.animalSave.name'),
      description: t('partners.animalSave.description'),
      url: 'https://thesavemovement.org/',
    },
    {
      name: t('partners.cleanCreatives.name'),
      description: t('partners.cleanCreatives.description'),
      url: 'https://cleancreatives.org/',
    },
    {
      name: t('partners.ati.name'),
      description: t('partners.ati.description'),
      url: 'https://ati.lat/',
    },
    {
      name: t('partners.redCreer.name'),
      description: t('partners.redCreer.description'),
      url: 'https://redcreer.org/',
    },
  ];

  return (
    <section className="py-40 sm:py-48 px-4 sm:px-6 lg:px-8 bg-white dark:bg-blue-dark border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-primary dark:text-white mb-6 tracking-tight capitalize font-serif text-3xl sm:text-4xl">{t('partners.title')}</h2>
          <p className="text-muted-foreground dark:text-white/80 text-xl max-w-3xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="bg-gradient-to-br from-white to-secondary/30 dark:from-primary/40 dark:to-primary/20 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 dark:border-white/10 group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-primary dark:text-white group-hover:text-accent transition-colors duration-300">
                  {partner.name}
                </h3>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground dark:text-white/70 hover:text-accent transition-colors duration-300"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              <p className="text-muted-foreground dark:text-white/80 leading-relaxed mb-4">{partner.description}</p>
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-white hover:text-accent transition-colors duration-300 inline-flex items-center gap-2 group-hover:gap-3"
              >
                {t('partners.learnMore')}
                <ExternalLink size={16} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
