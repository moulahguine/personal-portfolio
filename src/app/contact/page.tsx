import { Contact } from "@/features";
import { HeaderPage } from "@/components";
import {
  createPageMetadata,
  getContactPageJsonLd,
  getRouteBreadcrumbJsonLd,
  JsonLd,
} from "@/lib";
import { CONTACT_META_DATA, CONTACT_PAGE_DATA, ROUTES } from "@/data";

import styles from "./page.module.scss";

export const metadata = createPageMetadata(
  ROUTES.contact.href,
  CONTACT_META_DATA,
);

export default function ContactPage() {
  const {
    headerPage: { title, description },
  } = CONTACT_PAGE_DATA;

  const jsonLd = [
    getContactPageJsonLd("contact"),
    getRouteBreadcrumbJsonLd("contact"),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeaderPage title={title} description={description} />
      <div className={styles.page__container}>
        <Contact />
      </div>
    </>
  );
}
