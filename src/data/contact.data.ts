import { FaCheck } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

import type { ContactFormConfig } from "@/features/Contact/contact.types";

export const contactForm: ContactFormConfig = {
  checkIcon: FaCheck,
  submitIcon: FiSend,
  submitLabel: "Send message",
  sendingLabel: "Sending...",
  successMessage: "Thanks for reaching out. I’ll get back to you soon.",
  errorMessage: "Something went wrong. Please try again.",
  notConfiguredMessage: "Contact form is not configured yet.",
};

export const sections = {
  contactHeadingId: "contact-heading",

  headerSection: {
    title: "Contact",
  },
};

export const metaData = {
  title: "Contact",
  description: "Get in touch about work, collaboration, or a project idea.",
};

export const page = {
  headerPage: {
    title: "Hire Me",
    description:
      "You can reach me directly by email, use the contact form below, or connect with me on LinkedIn.",
  },
};
