'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Menu, X, Globe } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Logo } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence, Variants } from 'motion/react';

interface HeaderProps {
  className?: string;
}

const menuVariants: Variants = {
  initial: {
    x: '100%',
  },
  animate: {
    x: '0%',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  exit: {
    x: '100%',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: 'afterChildren',
    },
  },
};

const itemVariants: Variants = {
  initial: { x: 50, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: 50,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

export function Header({ className }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    setIsLangMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isLangMenuOpen) setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isLangMenuOpen]);

  const navLinks = [
    { label: t('method'), href: '/#method', type: 'anchor' },
    { label: t('impact'), href: '/#impacto', type: 'anchor' },
    { label: t('services'), href: '/#servicios', type: 'anchor' },
    // { label: t("projects"), href: "/projects", type: "route" },
    { label: t('plantBased'), href: '/#plant-based-treaty', type: 'anchor' },
  ];

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === 'anchor') {
      const targetId = href.split('#')[1];

      if (pathname === '/' && targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setIsMobileMenuOpen(false);
        }
      } else if (targetId) {
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-(--brand-blue)/95 py-3 shadow-md backdrop-blur-sm' : 'bg-transparent py-5',
        className
      )}
      role="banner"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="block w-24 transition-opacity hover:opacity-90 md:w-28"
          aria-label="Chacal Studio - Home"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavigation(e, '/', 'route')}
        >
          <Logo className="text-white" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex" role="navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                handleNavigation(e, link.href, link.type)
              }
              className="hover:text-accent group focus-visible:ring-accent relative rounded-sm text-sm font-medium text-white/90 transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {link.label}
              <span className="bg-accent absolute bottom-[-4px] left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="relative cursor-pointer">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="hover:text-accent focus-visible:ring-accent flex cursor-pointer items-center gap-2 rounded-sm text-sm font-medium text-white/90 uppercase transition-colors focus-visible:ring-2 focus-visible:outline-none"
              aria-expanded={isLangMenuOpen}
              aria-haspopup="true"
              aria-label={`${locale === 'es' ? 'ES' : 'EN'} - ${t('switchLanguage')}`}
            >
              <Globe size={18} />
              {locale === 'es' ? 'ES' : 'EN'}
            </button>
            {isLangMenuOpen && (
              <div className="absolute top-full right-0 mt-2 min-w-[100px] overflow-hidden rounded-lg bg-white py-1 shadow-lg">
                <button
                  onClick={() => switchLocale('es')}
                  className={cn(
                    'block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100',
                    locale === 'es' && 'bg-gray-50 font-bold'
                  )}
                >
                  Español
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-800 hover:bg-gray-100',
                    locale === 'en' && 'bg-gray-50 font-bold'
                  )}
                >
                  English
                </button>
              </div>
            )}
          </div>

          <Button
            variant="default"
            size="sm"
            className="bg-accent text-foreground cursor-pointer rounded-full px-6 hover:bg-(--accent)/90"
            onClick={() => {
              const element = document.getElementById('contact'); // Assuming contact section has id 'contact'
              if (element) element.scrollIntoView({ behavior: 'smooth' });
              else if (pathname !== '/') router.push('/#contact'); // Or logic to scroll to footer contact if distinct
            }}
          >
            {t('contact')}
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="focus-visible:ring-accent cursor-pointer rounded-md p-2 text-white focus-visible:ring-2 focus-visible:outline-none lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            className={cn(
              'fixed inset-0 z-[60] flex h-screen w-screen flex-col bg-(--brand-blue) lg:hidden'
            )}
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={t('menu')}
          >
            {/* Close Button Header */}
            <div
              className={cn(
                'container mx-auto flex w-full shrink-0 items-center justify-end px-4 md:px-6',
                'py-5'
              )}
            >
              <button
                className="focus-visible:ring-accent relative z-[70] cursor-pointer rounded-md p-2 text-white focus-visible:ring-2 focus-visible:outline-none"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="-mt-20 flex w-full flex-1 flex-col items-center justify-center gap-6 px-8">
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={itemVariants} className="w-full text-center">
                  <Link
                    href={link.href}
                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                      handleNavigation(e, link.href, link.type)
                    }
                    className="hover:text-accent block text-xl font-medium text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language Switcher */}
              <motion.div variants={itemVariants} className="mt-4 flex gap-4">
                <button
                  onClick={() => switchLocale('es')}
                  className={cn(
                    'cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors',
                    locale === 'es'
                      ? 'bg-accent border-accent text-white'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  Español
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={cn(
                    'cursor-pointer rounded-full border border-white/20 px-4 py-2 text-sm font-medium transition-colors',
                    locale === 'en'
                      ? 'bg-accent border-accent text-white'
                      : 'text-white hover:bg-white/10'
                  )}
                >
                  English
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-4 w-full max-w-xs">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-accent text-foreground w-full cursor-pointer rounded-full px-8 hover:bg-(--accent)/90"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                    else if (pathname !== '/') router.push('/#contact');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {t('contact')}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
