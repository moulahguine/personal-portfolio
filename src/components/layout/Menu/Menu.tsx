"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  MenuTrigger,
} from "@/components";
import { NAV_ITEMS } from "@/data";

import styles from "./Menu.module.scss";

interface MenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
}

// ---- mobile menu  ----
export default function Menu({ isOpen, onOpenChange, id }: MenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  // ---- is active ----
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // ---- trigger class names ----
  const triggerClassNames = [
    styles.menu__trigger,
    isOpen ? styles["menu__trigger--active"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <MenuTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={triggerClassNames}
          aria-expanded={isOpen}
          aria-controls={id}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menu__trigger__line} aria-hidden="true" />
          <span className={styles.menu__trigger__line} aria-hidden="true" />
          <span className={styles.menu__trigger__line} aria-hidden="true" />
        </Button>

        <DropdownMenu
          id={id}
          aria-label="Primary"
          placement="bottom end"
          offset={14}
          className={styles.menu__dropdown}
        >
          {NAV_ITEMS.map((item) => (
            <DropdownMenuItem
              key={item.href}
              id={item.href}
              className={[
                styles.menu__item,
                isActive(item.href) ? styles["menu__item--active"] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onAction={() => {
                onOpenChange(false);
                router.push(item.href);
              }}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </MenuTrigger>
    </>
  );
}
