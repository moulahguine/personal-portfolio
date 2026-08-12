import type { ClassNameProps } from "@/types";

import styles from "./HeaderPage.module.scss";

interface HeaderPageProps extends ClassNameProps {
  title: string;
  description?: string;
}

// ---- header page ----
export default function HeaderPage({
  title,
  description,
  className,
}: HeaderPageProps) {
  return (
    <header className={`${styles.headerPage} ${className}`.trim()}>
      <h1 className={styles.headerPage__title}>{title}</h1>
      {description ? (
        <p className={styles.headerPage__description}>{description}</p>
      ) : null}
    </header>
  );
}
