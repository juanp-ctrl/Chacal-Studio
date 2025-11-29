import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ExternalLink, Leaf, Globe2, Sprout } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function PlantBasedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { t } = useLanguage();

  const principles = [
    {
      title: t('plantBased.relinquish.title'),
      description: t('plantBased.relinquish.description'),
      icon: <Sprout className="w-5 h-5" />,
    },
    {
      title: t('plantBased.redirect.title'),
      description: t('plantBased.redirect.description'),
      icon: <Globe2 className="w-5 h-5" />,
    },
    {
      title: t('plantBased.restore.title'),
      description: t('plantBased.restore.description'),
      icon: <Leaf className="w-5 h-5" />,
    },
  ];

  const actions = [
    {
      title: t('plantBased.signIndividual'),
      url: 'https://plantbasedtreaty.org/sign-as-an-individual',
    },
    {
      title: t('plantBased.signOrg'),
      url: 'https://plantbasedtreaty.org/sign-as-an-organization',
    },
    {
      title: t('plantBased.signBusiness'),
      url: 'https://plantbasedtreaty.org/sign-as-a-business',
    },
  ];

  return (
    <section 
      id="plant-based" 
      className="relative py-44 sm:py-52 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-white/10"
      style={{ 
        backgroundColor: '#251e4a',
      }}
    >
      {/* Subtle decorative patterns */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: '#52B788' }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: '#74C69D' }} />
      </div>

      {/* Subtle leaf pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-5 0-10 5-10 15 0 10 10 15 10 15s10-5 10-15c0-10-5-15-10-15z' fill='%2352B788' fill-opacity='1'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }} />

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header with Plant Based Treaty visual cue */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#52B788' }}>
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/70 uppercase tracking-wider text-sm">Alianza Estratégica</span>
          </div>
          
          <h2 className="text-white mb-6 tracking-tight capitalize font-serif text-3xl sm:text-4xl">
            {t('plantBased.title')}
          </h2>
          <p className="text-white/70 text-xl max-w-3xl mx-auto leading-relaxed">
            {t('plantBased.intro')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Mission & Principles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-white mb-6 text-2xl">{t('plantBased.mission')}</h3>
            <p className="text-white/70 mb-4 leading-relaxed">
              {t('plantBased.missionText1')}
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              {t('plantBased.missionText2')}
            </p>
            
            {/* 3Rs Principles */}
            <div className="space-y-4">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex gap-4 p-5 rounded-xl backdrop-blur-sm border transition-all duration-300 group-hover:border-[#52B788]/40"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      borderColor: 'rgba(255, 255, 255, 0.08)'
                    }}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300" 
                      style={{ 
                        backgroundColor: 'rgba(82, 183, 136, 0.15)',
                        color: '#74C69D'
                      }}
                    >
                      {principle.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium mb-1">{principle.title}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{principle.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Impact Cards */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Contribution Card */}
            <div className="p-8 rounded-2xl backdrop-blur-sm border-2 transition-all duration-500 hover:scale-[1.02]" 
              style={{ 
                backgroundColor: 'rgba(82, 183, 136, 0.08)',
                borderColor: 'rgba(82, 183, 136, 0.2)'
              }}
            >
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" 
                  style={{ backgroundColor: '#52B788' }}
                >
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-xl">{t('plantBased.contribution.title')}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t('plantBased.contribution.text')}
              </p>
            </div>

            {/* Impact Card */}
            <div className="p-8 rounded-2xl backdrop-blur-sm border transition-all duration-500 hover:scale-[1.02]" 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderColor: 'rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" 
                  style={{ backgroundColor: '#3d3c6e' }}
                >
                  <Globe2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white text-xl">{t('plantBased.impact.title')}</h3>
              </div>
              <p className="text-white/70 leading-relaxed">
                {t('plantBased.impact.text')}
              </p>
            </div>

            {/* Decorative element */}
            <div className="relative h-32 rounded-2xl overflow-hidden opacity-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <Leaf className="w-24 h-24" style={{ color: '#52B788' }} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Actions */}
        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center">
            <h3 className="text-white mb-10 text-3xl">{t('plantBased.join')}</h3>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {actions.map((action, index) => (
                <motion.a
                  key={action.title}
                  href={action.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 border-2"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#ffffff'
                  }}
                  whileHover={{
                    backgroundColor: 'rgba(82, 183, 136, 0.15)',
                    borderColor: '#52B788'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  {action.title}
                  <ExternalLink size={16} />
                </motion.a>
              ))}
            </div>

            {/* Donate CTA - Highlighted */}
            <div className="max-w-2xl mx-auto rounded-3xl shadow-2xl p-10 backdrop-blur-sm border-2 transition-all duration-500 hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, rgba(82, 183, 136, 0.2) 0%, rgba(116, 198, 157, 0.15) 100%)',
                borderColor: 'rgba(82, 183, 136, 0.3)'
              }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" 
                style={{ backgroundColor: '#52B788' }}
              >
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white mb-4 text-2xl">{t('plantBased.donate.title')}</h3>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                {t('plantBased.donate.text')}
              </p>
              <a
                href="https://plantbasedtreaty.org/donate"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                style={{
                  backgroundColor: '#52B788',
                  color: '#ffffff'
                }}
              >
                {t('plantBased.donate.cta')}
                <ExternalLink size={20} />
              </a>
            </div>

            <div className="mt-10">
              <a
                href="https://plantbasedtreaty.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
              >
                {t('plantBased.learnMore')}
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
