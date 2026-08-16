"use client";

import ContactForm from "./ContactForm";
import type { ClassNameProps } from "@/types";

import styles from "./Contact.module.scss";

export default function Contact({ className }: ClassNameProps) {
  return (
    <div
      className={[styles.contact__panel, className].filter(Boolean).join(" ")}
    >
      <ContactForm />
    </div>
  );
}
