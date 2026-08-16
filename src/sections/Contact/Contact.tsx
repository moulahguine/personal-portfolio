import { Contact, HeaderSection } from "@/components";
import { contactSections } from "@/data";

import styles from "./Contact.module.scss";

export default function ContactSection() {
  const { contactHeadingId, headerSection } = contactSections;

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby={contactHeadingId}
    >
      <div className={styles.contact__container}>
        <Contact />
        <HeaderSection title={headerSection.title} id={contactHeadingId} />
      </div>
    </section>
  );
}
