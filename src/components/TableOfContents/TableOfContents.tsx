"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, MotionConfig } from "motion/react";
import { Link } from "@/components";

import styles from "./TableOfContents.module.scss";

type TocItem = {
  id: string;
  title: string;
};

const SECTION_SELECTOR = "#main-content section[id]";
const HEADING_SELECTOR = "h2";

const ACTIVE_OFFSET = 140;
const INDICATOR_TRANSITION = {
  type: "spring",
  bounce: 0.15,
  duration: 0.5,
} as const;

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
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setItems(toTocItems(readSections()));
  }, [pathname]);

  // track the active section by scroll position and drive the indicator
  useEffect(() => {
    if (items.length < 2) return;

    const sections = readSections();
    if (!sections.length) return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;
      let current = sections[0].id;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= ACTIVE_OFFSET) {
          current = section.id;
        } else {
          break;
        }
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  if (items.length < 2) {
    return null;
  }

  return (
    <MotionConfig reducedMotion="user">
      <nav aria-label={title} className={styles.toc}>
        <p className={styles.toc__title}>{title}</p>

        <ol className={styles.toc__list}>
          {items.map(({ id, title: itemTitle }) => {
            const isActive = id === activeId;

            return (
              <li key={id} className={styles.toc__item}>
                <Link
                  href={`#${id}`}
                  className={styles.toc__link}
                  variant="plain"
                  aria-current={isActive ? "location" : undefined}
                >
                  {itemTitle}
                </Link>

                {/* single indicator that swims to the active link */}
                {isActive ? (
                  <motion.span
                    layoutId="toc-indicator"
                    transition={INDICATOR_TRANSITION}
                    className={styles.toc__indicator}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </MotionConfig>
  );
}
