import { HeaderSection } from "@/components";
import { contactSections } from "@/data";
import { Contact as ContactFeature } from "@/features";

import styles from "./Contact.module.scss";

export default function Contact() {
  const { contactHeadingId, headerSection } = contactSections;

  return (
    <section
      className={styles.contact}
      id="contact"
      aria-labelledby={contactHeadingId}
    >
      <div className={styles.contact__container}>
        <HeaderSection title={headerSection.title} id={contactHeadingId} />
        <ContactFeature />
      </div>
    </section>
  );
}
