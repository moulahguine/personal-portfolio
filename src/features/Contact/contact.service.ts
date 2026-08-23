import {
  contactSchema,
  formatContactSchemaErrors,
  type ContactFormData,
} from "./contact.schema";

type ContactSubmitFailureReason =
  | "not_configured"
  | "validation"
  | "submission_failed";

export type ContactSubmitResult =
  | { ok: true }
  | {
      ok: false;
      reason: ContactSubmitFailureReason;
      errors?: Partial<Record<keyof ContactFormData, string>>;
    };

function parseContactFormData(formData: FormData): ContactFormData {
  return {
    fullName: String(formData.get("fullName") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };
}

export async function submitContactForm(
  formData: FormData,
): Promise<ContactSubmitResult> {
  const honeypot = String(formData.get("_gotcha") ?? "").trim();
  if (honeypot) {
    return { ok: true };
  }

  const values = parseContactFormData(formData);
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      ok: false,
      reason: "validation",
      errors: formatContactSchemaErrors(parsed.error),
    };
  }

  const data = parsed.data;
  const formspreeUrl = process.env.FORMSPREE_FORM_URL?.trim();

  if (!formspreeUrl) {
    return { ok: false, reason: "not_configured" };
  }

  const payload = new FormData();
  payload.append("fullName", data.fullName);
  payload.append("email", data.email);
  payload.append("_replyto", data.email);
  payload.append("message", data.message);

  try {
    const response = await fetch(formspreeUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: payload,
    });

    if (!response.ok) {
      return { ok: false, reason: "submission_failed" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "submission_failed" };
  }
}
