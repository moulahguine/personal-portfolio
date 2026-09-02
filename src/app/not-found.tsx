import type { Metadata } from "next";
import { Link } from "@/components";
import { ROUTES } from "@/data";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <div className={styles.page__container}>
        <p className={styles.page__hint}>{metadata.description} </p>
        <Link
          href={ROUTES.home.href}
          variant="primary"
          size="lg"
          label={`Back to ${ROUTES.home.label}`}
        />
      </div>
    </>
  );
}
