import { HeaderSection } from "@/components";
import { CONTACT_SECTION_DATA } from "@/data";
import { Contact as ContactFeature } from "@/features";

import styles from "./Contact.module.scss";

export default function Contact() {
  const {
    contactHeadingId,
    headerSection: { id, title },
  } = CONTACT_SECTION_DATA;

  return (
    <section
      className={styles.contact}
      id={id}
      aria-labelledby={contactHeadingId}
    >
      <div className={styles.contact__container}>
        <HeaderSection title={title} id={contactHeadingId} />
        <ContactFeature />
      </div>
    </section>
  );
}
