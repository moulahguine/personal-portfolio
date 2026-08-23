import { z } from "zod";

export const MESSAGE_MIN_LENGTH = 150;
export const MESSAGE_MAX_LENGTH = 350;
export const NAME_MIN_LENGTH = 2;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_TYPING_ERROR_PATTERN = /@@|\.@|@\./;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your name.")
    .min(
      NAME_MIN_LENGTH,
      `Please enter at least <strong>${NAME_MIN_LENGTH}</strong> characters.`,
    ),
  email: z
    .string()
    .min(1, "Please enter your email.")
    .superRefine((value, context) => {
      if (
        EMAIL_TYPING_ERROR_PATTERN.test(value) ||
        value.split("@").length > 2
      ) {
        context.addIssue({
          code: "custom",
          message: "Please enter a valid email address.",
        });
        return;
      }

      if (!EMAIL_PATTERN.test(value.trim())) {
        context.addIssue({
          code: "custom",
          message: "Please enter a valid email address.",
        });
      }
    }),
  message: z
    .string()
    .min(1, "Please enter a message.")
    .min(
      MESSAGE_MIN_LENGTH,
      `Message must be at least <strong>${MESSAGE_MIN_LENGTH}</strong> characters.`,
    )
    .max(
      MESSAGE_MAX_LENGTH,
      `Message must be no more than <strong>${MESSAGE_MAX_LENGTH}</strong> characters.`,
    ),
});

export type ContactFormData = z.infer<typeof contactSchema>;

const fieldSchemas = {
  fullName: contactSchema.shape.fullName,
  email: contactSchema.shape.email,
  message: contactSchema.shape.message,
} as const;

export function isContactFieldValid(
  field: keyof typeof fieldSchemas,
  value: string,
): boolean {
  return fieldSchemas[field].safeParse(value).success;
}

export function formatContactSchemaErrors(error: z.ZodError<ContactFormData>) {
  const errors: Partial<Record<keyof ContactFormData, string>> = {};

  for (const issue of error.issues) {
    const field = issue.path[0];

    if (
      typeof field === "string" &&
      !(field in errors) &&
      field in contactSchema.shape
    ) {
      errors[field as keyof ContactFormData] = issue.message;
    }
  }

  return errors;
}
