"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Link } from "@/components";

import styles from "./TableOfContents.module.scss";

type TocItem = {
  id: string;
  title: string;
};

const SECTION_SELECTOR = "#main-content section[id]";
const HEADING_SELECTOR = "h2";

// this function is used to read the sections from the document
function readSections() {
  return Array.from(document.querySelectorAll<HTMLElement>(SECTION_SELECTOR));
}

// this function is used to convert the sections to toc items
function toTocItems(sections: HTMLElement[]): TocItem[] {
  return sections
    .map((section) => ({
      id: section.id,
      title: section.querySelector(HEADING_SELECTOR)?.textContent?.trim() ?? "",
    }))
    .filter(({ title }) => title);
}

// ---- table of contents ----
export default function TableOfContents({
  title = "On this page",
}: {
  title?: string;
}) {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    setItems(toTocItems(readSections()));
  }, [pathname]);

  if (items.length < 2) {
    return null;
  }

  return (
    <nav aria-label={title} className={styles.toc}>
      <p className={styles.toc__title}>{title}</p>

      <ol className={styles.toc__list}>
        {items.map(({ id, title: itemTitle }) => (
          <li key={id}>
            <Link href={`#${id}`} className={styles.toc__link} variant="plain">
              {itemTitle}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
