"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components";
import { NAV_ITEMS } from "@/data";
import type { ClassNameProps } from "@/types";
import { motion } from "motion/react";

import styles from "./Navigation.module.scss";

interface NavigationProps extends ClassNameProps {
  direction?: "horizontal" | "vertical";
  onNavigate?: () => void;
}

// ---- navigation ----
export default function Navigation({
  className,
  direction = "horizontal",
  onNavigate,
}: NavigationProps) {
  // ---- pathname ----
  const pathname = usePathname();

  // ---- is active ----
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ---- is vertical ----
  const isVertical = direction === "vertical";

  return (
    <nav
      className={`${styles.navigation} ${className}`.trim()}
      aria-label="Primary Navigation"
    >
      <ul
        className={`${styles.navigation__list} ${
          isVertical ? styles["navigation__list--vertical"] : ""
        }`.trim()}
      >
        {/* ---- items ---- */}
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);

          return (
            <li key={item.href} className={styles.navigation__item}>
              {/* ---- link ---- */}
              <Link
                href={item.href}
                variant="ghost"
                size="md"
                className={`${styles.navigation__link} ${
                  active ? styles["navigation__link--active"] : ""
                }`.trim()}
                aria-current={active ? "page" : undefined}
                onPress={onNavigate}
              >
                {item.label}
              </Link>

              {/* ---- indicator ---- */}
              {active ? (
                <motion.span
                  layoutId="indicator"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className={styles["navigation__item--indicator"]}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
