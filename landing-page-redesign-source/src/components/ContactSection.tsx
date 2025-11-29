import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, Instagram, Linkedin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    acceptedPolicies: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptedPolicies) {
      toast.error(t('contact.form.error.policies'));
      return;
    }

    if (formData.message.length < 20) {
      toast.error(t('contact.form.error.messageLength'));
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      toast.success(t('contact.form.success'));
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        message: '',
        acceptedPolicies: false,
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <section id="contacto" className="py-40 sm:py-48 px-4 sm:px-6 lg:px-8 bg-primary dark:bg-blue-dark text-white border-t border-transparent dark:border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 tracking-tight capitalize font-serif text-3xl sm:text-4xl">{t('contact.title')}</h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 text-white">
                  {t('contact.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder={t('contact.form.placeholder.name')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-white">
                  {t('contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder={t('contact.form.placeholder.email')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block mb-2 text-white">
                  {t('contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder={t('contact.form.placeholder.phone')}
                />
              </div>

              <div>
                <label htmlFor="organization" className="block mb-2 text-white">
                  {t('contact.form.organization')}
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300"
                  placeholder={t('contact.form.placeholder.organization')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-2 text-white">
                  {t('contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                  placeholder={t('contact.form.placeholder.message')}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="acceptedPolicies"
                  name="acceptedPolicies"
                  checked={formData.acceptedPolicies}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <label htmlFor="acceptedPolicies" className="text-white/80 text-sm">
                  {t('contact.form.policies')} *
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-accent text-white rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? t('contact.form.sending') : t('contact.form.submit')}
                <Send size={20} />
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="mb-6">{t('contact.connect')}</h3>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                {t('contact.connectText')}
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hola@chacalestudio.ar"
                className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <span>hola@chacalestudio.ar</span>
              </a>

              <a
                href="https://www.instagram.com/chacal.estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Instagram className="w-6 h-6" />
                </div>
                <span>@chacal.estudio</span>
              </a>

              <a
                href="https://www.linkedin.com/company/chacalestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span>Chacal Estudio</span>
              </a>
            </div>

            <div className="pt-8 mt-8 border-t border-white/20">
              <p className="text-white/60 mb-4">{t('contact.bCorp')}</p>
              <p className="text-white/80 text-sm leading-relaxed">
                {t('contact.bCorpText')}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
