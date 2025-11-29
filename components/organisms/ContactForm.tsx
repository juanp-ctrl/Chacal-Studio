"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Turnstile } from "@marsidev/react-turnstile";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    message: "",
    acceptedPolicies: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptedPolicies) {
      toast.error(t("error.policies"));
      return;
    }

    if (formData.message.length < 20) {
      toast.error(t("error.messageLength"));
      return;
    }
    
    // Task 6.2 will handle real submission and validation logic
    setIsSubmitting(true);
    
    // Simulate submission for UI testing
    setTimeout(() => {
        toast.success(t("success"));
        setFormData({
            name: "",
            email: "",
            phone: "",
            organization: "",
            message: "",
            acceptedPolicies: false,
        });
        setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-white">
          {t("name")} *
        </label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12"
          placeholder={t("placeholder.name")}
        />
      </div>

      <div>
        <label htmlFor="email" className="block mb-2 text-white">
          {t("email")} *
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12"
          placeholder={t("placeholder.email")}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2 text-white">
          {t("phone")}
        </label>
        <Input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12"
          placeholder={t("placeholder.phone")}
        />
      </div>

      <div>
        <label htmlFor="organization" className="block mb-2 text-white">
          {t("organization")}
        </label>
        <Input
          type="text"
          id="organization"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-accent h-12"
          placeholder={t("placeholder.organization")}
        />
      </div>

      <div>
        <label htmlFor="message" className="block mb-2 text-white">
          {t("message")} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="flex min-h-[80px] w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
          placeholder={t("placeholder.message")}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="acceptedPolicies"
          name="acceptedPolicies"
          checked={formData.acceptedPolicies}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-white/30 bg-white/10 text-accent focus:ring-accent"
          required
        />
        <label htmlFor="acceptedPolicies" className="text-white/80 text-sm">
          {t("policies")} *
        </label>
      </div>
      
      <div className="flex justify-center sm:justify-start">
         <Turnstile 
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onSuccess={(token) => setTurnstileToken(token)}
         />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        variant="accent"
        size="lg"
        className="w-full rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl"
      >
        {isSubmitting ? t("sending") : t("submit")}
        <Send size={20} />
      </Button>
    </form>
  );
}

