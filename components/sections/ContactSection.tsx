"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Mail, Instagram, Linkedin } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/organisms/ContactForm";

export function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const t = useTranslations("contact");

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 lg:px-8 bg-primary text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-6 tracking-tight capitalize font-display text-4xl sm:text-5xl">
            {t("title")}
          </h2>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
              <h3 className="mb-6 text-2xl font-display">{t("connect")}</h3>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">
                {t("connectText")}
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hola@chacalestudio.ar"
                className="flex items-center gap-4 text-white/80 hover:text-accent transition-colors duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-6 h-6 text-white" />
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
                  <Instagram className="w-6 h-6 text-white" />
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
                  <Linkedin className="w-6 h-6 text-white" />
                </div>
                <span>Chacal Estudio</span>
              </a>
            </div>

            <div className="pt-8 mt-8 border-t border-white/20">
              <p className="text-white/60 mb-4">{t("bCorp")}</p>
              <p className="text-white/80 text-sm leading-relaxed">
                {t("bCorpText")}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

