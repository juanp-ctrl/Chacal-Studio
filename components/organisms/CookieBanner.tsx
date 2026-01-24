'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/atoms/Button';
import { Text } from '@/components/atoms/Text';
import { cn } from '@/lib/utils';
import { Cookie } from 'lucide-react';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage on mount
    const consent = localStorage.getItem('chacal-cookie-consent');
    if (!consent) {
      // Delay slightly for entrance animation
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('chacal-cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('chacal-cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t('title')}
      className={cn(
        'fixed right-4 bottom-4 left-4 z-60 p-4 md:right-auto md:max-w-[75%] md:p-6',
        'rounded-2xl bg-(--brand-blue) text-white shadow-2xl',
        'border border-white/10',
        'transform transition-transform duration-500 ease-in-out',
        isVisible ? 'translate-y-0' : 'translate-y-[calc(100%+1rem)]'
      )}
    >
      <div className="container mx-auto flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-6">
        <div className="flex w-full items-start gap-4">
          <div className="mt-1 shrink-0 rounded-full bg-white/10 p-2">
            <Cookie className="text-accent h-5 w-5" />
          </div>
          <div className="space-y-2">
            <Text size="sm" className="text-white/90">
              {t('message')}{' '}
              <Link
                href="/terms"
                className="text-accent hover:text-accent/80 focus-visible:ring-accent rounded-sm font-medium underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
              >
                {t('link')}
              </Link>
            </Text>
          </div>
        </div>

        <div className="flex w-full shrink-0 flex-row items-center gap-3 md:w-auto md:flex-nowrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDecline}
            className="focus-visible:ring-accent flex-1 border-white/20 bg-transparent whitespace-nowrap text-white hover:bg-white/10 hover:text-white md:flex-none"
          >
            {t('decline')}
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleAccept}
            className="bg-accent hover:bg-accent/90 flex-1 whitespace-nowrap text-white focus-visible:ring-white md:flex-none"
          >
            {t('accept')}
          </Button>
        </div>
      </div>
    </div>
  );
}
