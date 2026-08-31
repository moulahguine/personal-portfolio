import type { ReactNode } from "react";
import { TableOfContents } from "@/components";

import styles from "./ArticleLayout.module.scss";

interface ArticleLayoutProps {
  children: ReactNode;
}

// ---- article layout ----
export default function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <main className={styles.layout}>
      <aside className={styles.layout__aside}>
        <TableOfContents />
      </aside>

      <article id="main-content" className={styles.layout__content}>
        {children}
      </article>
    </main>
  );
}
