'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { ExternalLink, Leaf, Globe2, Sprout } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

export function PlantBasedTreatySection() {
  const t = useTranslations('plantBased');

  const principles = [
    {
      key: 'relinquish',
      icon: Sprout,
    },
    {
      key: 'redirect',
      icon: Globe2,
    },
    {
      key: 'restore',
      icon: Leaf,
    },
  ];

  const actions = [
    {
      key: 'signIndividual',
      url: 'https://plantbasedtreaty.org/sign-as-an-individual',
    },
    {
      key: 'signOrg',
      url: 'https://plantbasedtreaty.org/sign-as-an-organization',
    },
    {
      key: 'signBusiness',
      url: 'https://plantbasedtreaty.org/sign-as-a-business',
    },
  ];

  return (
    <section
      id="plant-based-treaty"
      className="bg-pbt-green-dark relative overflow-hidden border-t border-white/10 px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header with Plant Based Treaty visual cue */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex h-[66px] items-center gap-3 rounded-full border border-white/10 bg-white/90 px-4 py-2 shadow-lg backdrop-blur-sm">
            <div className="relative h-[66px] w-[280px] sm:w-[357px]">
              <Image
                src="/Plant-Based-Treaty-logo.svg"
                alt="Plant Based Treaty"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <Heading
            as="h2"
            className="mb-6 text-3xl font-normal tracking-tight text-white capitalize sm:text-4xl md:text-5xl"
          >
            {t('title')}
          </Heading>
          <Text className="mx-auto max-w-3xl text-lg leading-relaxed font-light text-white/70 sm:text-xl">
            {t('intro')}
          </Text>
        </motion.div>

        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Mission & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Heading as="h3" className="mb-6 text-2xl font-bold text-white">
              {t('mission')}
            </Heading>
            <Text className="mb-4 leading-relaxed font-light text-white/70">
              {t('missionText1')}
            </Text>
            <Text className="mb-8 leading-relaxed font-light text-white/70">
              {t('missionText2')}
            </Text>

            {/* 3Rs Principles */}
            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.key}
                  className="group relative"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="group-hover:border-pbt-green-light/40 flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300">
                    <div className="bg-pbt-green-light text-pbt-green-dark flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all duration-300">
                      <principle.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="mb-1 font-medium text-white">{t(`${principle.key}.title`)}</p>
                      <p className="text-sm leading-relaxed font-light text-white/60">
                        {t(`${principle.key}.description`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Cards */}
          <motion.div
            className="flex flex-col justify-end space-y-6 align-bottom"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Contribution Card */}
            <div className="border-pbt-green/20 bg-pbt-green/[0.08] flex h-1/2 flex-col justify-center rounded-2xl border-2 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]">
              <div className="mb-5 flex items-center">
                <div className="bg-pbt-green mr-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <Heading as="h3" className="text-xl font-bold text-white">
                  {t('contribution.title')}
                </Heading>
              </div>
              <Text className="leading-relaxed font-light text-white/70">
                {t('contribution.text')}
              </Text>
            </div>

            {/* Impact Card */}
            <div className="flex h-1/2 flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]">
              <div className="mb-5 flex items-center">
                <div className="bg-pbt-green mr-4 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Globe2 className="h-6 w-6 text-white" />
                </div>
                <Heading as="h3" className="text-xl font-bold text-white">
                  {t('impact.title')}
                </Heading>
              </div>
              <Text className="leading-relaxed font-light text-white/70">{t('impact.text')}</Text>
            </div>
          </motion.div>
        </div>

        {/* Call to Actions */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <Heading as="h3" className="mb-10 text-3xl font-medium text-white">
              {t('join')}
            </Heading>
            <div className="mb-12 flex flex-wrap justify-center gap-4">
              {actions.map((action, index) => (
                <motion.a
                  key={action.key}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-pbt-green/15 hover:border-pbt-green inline-flex items-center gap-2 rounded-full border-2 border-white/15 bg-white/5 px-7 py-3.5 text-white transition-all duration-300 hover:scale-105"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {t(action.key)}
                  <ExternalLink size={16} />
                </motion.a>
              ))}
            </div>

            {/* Donate CTA - Highlighted */}
            <div
              className="border-pbt-green/30 mx-auto max-w-2xl rounded-3xl border-2 p-10 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:scale-[1.02]"
              style={{
                background:
                  'linear-gradient(135deg, rgba(82, 183, 136, 0.2) 0%, rgba(116, 198, 157, 0.15) 100%)',
              }}
            >
              <div className="bg-pbt-green mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <Heading as="h3" className="mb-4 text-2xl font-bold text-white">
                {t('donate.title')}
              </Heading>
              <Text className="mb-8 text-lg leading-relaxed font-light text-white/80">
                {t('donate.text')}
              </Text>
              <a
                href="https://plantbasedtreaty.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pbt-green text-brand-blue inline-flex items-center gap-3 rounded-full px-8 py-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                {t('donate.cta')}
                <ExternalLink size={20} />
              </a>
            </div>

            <div className="mt-10">
              <a
                href="https://plantbasedtreaty.org"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 font-light text-white/70 transition-all duration-300 hover:text-white"
              >
                {t('learnMore')}
                <ExternalLink
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
