import { FaCheck } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";

import type {
  ContactFormConfig,
  ContactServiceOption,
} from "@/components/ui/Contact/contact.types";

const CONTACT_SERVICES: ContactServiceOption[] = [
  { value: "frontend", label: "Frontend development" },
  { value: "website", label: "Website build" },
  { value: "collaboration", label: "Collaboration" },
  { value: "other", label: "Other" },
];

export const contactForm: ContactFormConfig = {
  checkIcon: FaCheck,
  selectCaretIcon: HiChevronDown,
  submitIcon: FiSend,
  servicePlaceholder: "What can I help you with? (optional)",
  submitLabel: "Send message",
  sendingLabel: "Sending...",
  successMessage: "Thanks for reaching out. I’ll get back to you soon.",
  errorMessage: "Something went wrong. Please try again.",
  notConfiguredMessage: "Contact form is not configured yet.",
};

export function getContactServiceOptions(): ContactServiceOption[] {
  return CONTACT_SERVICES;
}

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
    title: "Contact",
    description:
      "Have a project in mind or want to collaborate? Send me a message and I’ll get back to you.",
  },
};
