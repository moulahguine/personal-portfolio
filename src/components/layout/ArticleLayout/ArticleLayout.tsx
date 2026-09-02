import type { ReactNode } from "react";
import { TableOfContents } from "@/components";

import styles from "./ArticleLayout.module.scss";

interface ArticleLayoutProps {
  children: ReactNode;
  header?: ReactNode;
}

// ---- article layout ----
export default function ArticleLayout({
  children,
  header,
}: ArticleLayoutProps) {
  return (
    <div className={styles.layout}>
      {/* ---- header ---- */}
      {header ? <>{header}</> : null}

      {/* ---- table of contents ---- */}
      <aside className={styles.layout__aside}>
        <TableOfContents />
      </aside>

      {/* ---- main content ---- */}
      <article id="main-content" className={styles.layout__content}>
        {children}
      </article>
    </div>
  );
}
