import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/atoms/Logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--brand-blue)] text-white py-16 px-6 sm:px-8 lg:px-12 border-t border-white/10" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6 w-32">
              <Logo className="text-white" />
            </div>
            <p className="text-white/70 leading-relaxed font-light max-w-md">
              Strategic design and technology for a regenerative future.
            </p>
          </div>

          {/* Social & Contact */}
          <div className="md:text-right">
            <h4 className="mb-4 text-white/90 font-medium">Follow Us</h4>
            <div className="flex gap-3 md:justify-end">
              <a
                href="https://www.instagram.com/chacal.estudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:scale-110 transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/company/chacalestudio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:scale-110 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:hola@chacalestudio.ar"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] hover:scale-110 transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60 text-sm font-light">
          <p>&copy; {currentYear} Chacal Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-[var(--accent)] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[var(--accent)] transition-colors duration-300">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

