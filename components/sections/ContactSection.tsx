'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ContactForm } from '@/components/organisms/ContactForm';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations('contact');

  return (
    <section id="contact" className="bg-blue-background px-6 py-24 text-white sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl" ref={ref}>
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display mb-6 text-4xl tracking-tight capitalize sm:text-5xl">
            {t('title')}
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/80">{t('subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="font-display mb-6 text-2xl">{t('connect')}</h3>
              <p className="mb-8 text-lg leading-relaxed text-white/80">{t('connectText')}</p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hola@chacalestudio.ar"
                className="hover:text-accent group flex items-center gap-4 text-white/80 transition-colors duration-300"
              >
                <div className="group-hover:bg-accent flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <span>hola@chacalestudio.ar</span>
              </a>

              <a
                href="https://www.instagram.com/chacal.estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent group flex items-center gap-4 text-white/80 transition-colors duration-300"
              >
                <div className="group-hover:bg-accent flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <Instagram className="h-6 w-6 text-white" />
                </div>
                <span>@chacal.estudio</span>
              </a>

              <a
                href="https://www.linkedin.com/company/chacal-estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent group flex items-center gap-4 text-white/80 transition-colors duration-300"
              >
                <div className="group-hover:bg-accent flex h-12 w-12 items-center justify-center rounded-full bg-white/10 transition-all duration-300 group-hover:scale-110">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <span>Chacal Estudio</span>
              </a>
            </div>

            <div className="mt-8 border-t border-white/20 pt-8">
              <p className="mb-4 text-white/60">{t('bCorp')}</p>
              <p className="text-sm leading-relaxed text-white/80">{t('bCorpText')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
