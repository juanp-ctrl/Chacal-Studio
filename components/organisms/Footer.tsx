'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { Instagram, Linkedin, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/atoms/Logo';

export function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-white/10 bg-(--brand-blue) px-6 py-16 text-white sm:px-8 lg:px-12"
      role="contentinfo"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2" id="footer-contact">
          {/* Brand */}
          <div>
            <div className="mb-6 w-32">
              <Logo className="text-white" />
            </div>
            <p className="font-body leading-relaxed font-light text-white/70">{t('tagline')}</p>
          </div>

          {/* Social & Contact */}
          <div className="md:text-right">
            <h4 className="font-body mb-4 font-medium text-white/90">{t('follow')}</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://www.instagram.com/chacal.estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/chacal-estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hola@chacalestudio.ar"
                className="hover:bg-accent flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm font-light text-white/60 md:flex-row">
          <p>
            &copy; {currentYear} {t('copyright')}
          </p>
          <div className="flex w-full justify-between gap-6">
            <Link href="/privacy" className="hover:text-accent transition-colors duration-300">
              {t('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors duration-300">
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
