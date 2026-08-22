import { Contact, HeaderPage } from "@/components";
import { contactMetaData, contactPage } from "@/data";
import { createPageMetadata } from "@/lib";

import styles from "./page.module.scss";

export const metadata = createPageMetadata("/contact", contactMetaData);

export default function ContactPage() {
  const {
    headerPage: { title, description },
  } = contactPage;

  return (
    <div className={styles.page}>
      <HeaderPage title={title} description={description} />
      <main id="main-content" className={styles.page__container}>
        <Contact />
      </main>
    </div>
  );
}
