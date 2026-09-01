import type { Metadata } from "next";

import { HeaderPage, Link } from "@/components";
import { ROUTES } from "@/data";

import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you're looking for doesn't exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <HeaderPage
        title="404"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <main id="main-content" className={styles.page__container}>
        <p className={styles.page__hint}>
          Try going back to the homepage — the rest of the site is right there.
        </p>
        <Link
          href={ROUTES.home.href}
          variant="primary"
          size="lg"
          label={`Back to ${ROUTES.home.label}`}
        />
      </main>
    </div>
  );
}
