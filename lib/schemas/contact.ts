import { z } from "zod";

export const createContactSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(1, { message: t("nameRequired") })
      .min(2, { message: t("nameMinLength") }),
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => {
          if (!val) return true;
          // Basic phone validation: allows +, spaces, -, and digits, min 7 chars
          return /^[\d\+\-\s]{7,}$/.test(val);
        },
        { message: t("phoneInvalid") }
      ),
    organization: z.string().optional(),
    message: z
      .string()
      .min(1, { message: t("messageRequired") })
      .min(10, { message: t("messageMinLength") }),
    acceptedPolicies: z.literal(true, {
      errorMap: () => ({ message: t("policiesRequired") }),
    }),
  });
};

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;

