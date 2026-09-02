import { FaCheck } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import type { ContactFormConfig } from "@/features/Contact/contact.types";

export const CONTACT_FORM_DATA: ContactFormConfig = {
  checkIcon: FaCheck,
  submitIcon: FiSend,
  submitLabel: "Send message",
  sendingLabel: "Sending...",
  successMessage: "Thanks for reaching out. I’ll get back to you soon.",
  errorMessage: "Something went wrong while sending your message. Please try again.",
  validationMessage: "Please fix the highlighted fields and try again.",
  networkErrorMessage:
    "Could not reach the server. Check your connection or disable ad blockers for this site, then try again.",
  notConfiguredMessage: "Contact form is not configured yet.",
};

export const CONTACT_SECTION_DATA = {
  contactHeadingId: "contact-heading",

  headerSection: {
    id: "contact",
    title: "Contact",
  },
};

export const CONTACT_META_DATA = {
  title: "Contact",
  description: "Get in touch about work, collaboration, or a project idea.",
};

export const CONTACT_PAGE_DATA = {
  headerPage: {
    title: "Hire Me",
    description:
      "You can reach me directly by email, use the contact form below, or connect with me on LinkedIn.",
  },
};
