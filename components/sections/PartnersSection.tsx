'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';
import { AnimatedText } from '../atoms/AnimatedText';

export function PartnersSection() {
  const t = useTranslations('partners');

  const partners = [
    {
      key: 'animalSave',
      url: 'https://thesavemovement.org/',
    },
    {
      key: 'cleanCreatives',
      url: 'https://cleancreatives.org/',
    },
    {
      key: 'ati',
      url: 'https://agenciastripleimpacto.org/',
    },
    {
      key: 'redCreer',
      url: 'https://redcreer.com.ar/',
    },
  ];

  return (
    <section id="alianzas" className="bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <AnimatedText
            text={t('title')}
            as="h2"
            className="font-heading text-foreground mb-6 text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl"
          />
          <Text className="text-muted-foreground mx-auto max-w-3xl text-lg leading-relaxed font-light sm:text-xl">
            {t('subtitle')}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.key}
              className="group bg-primary hover:border-accent/20 relative flex h-full flex-col overflow-hidden rounded-2xl border border-transparent p-8 transition-[border-color,box-shadow] duration-300 hover:shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative mb-6 flex h-16 w-full items-center justify-start">
                <div className="relative h-full w-48">
                  <Image
                    src={`/Partners/partner-${index + 1}.png`}
                    alt={t(`${partner.key}.name`)}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-start justify-between">
                <Heading
                  as="h3"
                  className="group-hover:text-accent text-2xl font-bold text-white transition-colors duration-300"
                >
                  {t(`${partner.key}.name`)}
                </Heading>
              </div>

              <Text className="mb-6 flex-grow leading-relaxed font-light text-white/80">
                {t(`${partner.key}.description`)}
              </Text>

              <div className="mt-auto">
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent group/link inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300"
                  aria-label={`${t('learnMore')} ${t(`${partner.key}.name`)}`}
                >
                  <span>
                    {t('learnMore')} <span className="sr-only">{t(`${partner.key}.name`)}</span>
                  </span>
                  <ExternalLink
                    size={14}
                    className="transition-transform duration-300 group-hover/link:translate-x-1"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
