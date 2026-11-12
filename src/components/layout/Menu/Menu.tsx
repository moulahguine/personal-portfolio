"use client";

import { usePathname } from "next/navigation";
import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownTriggerIcon,
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

  // ---- is active ----
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleNavigate = () => {
    onOpenChange(false);
  };

  return (
    <>
      <MenuTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className={styles.menu__trigger}
          aria-expanded={isOpen}
          aria-controls={id}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <DropdownTriggerIcon
            icon={
              <span className={styles.menu__trigger__lines}>
                <span className={styles.menu__trigger__line} />
                <span className={styles.menu__trigger__line} />
                <span className={styles.menu__trigger__line} />
              </span>
            }
          />
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
              href={item.href}
              isActive={isActive(item.href)}
              onAction={handleNavigate}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      </MenuTrigger>
    </>
  );
}
