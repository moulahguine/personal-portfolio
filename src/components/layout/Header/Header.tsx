"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, Navigation, Menu } from "@/components";

import styles from "./Header.module.scss";

const MOBILE_NAV_ID = "mobile-navigation";

// ---- header ----
export default function Header() {
  // ---- pathname ----
  const pathname = usePathname();

  // ---- mobile menu state ----
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ---- close menu on navigation ----
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  return (
    <>
      <header className={styles.header}>
        {/* ---- container ---- */}
        <div className={styles.header__container}>
          {/* ---- logo ---- */}
          <Logo />

          {/* ---- mobile menu ---- */}
          <Menu
            isOpen={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            id={MOBILE_NAV_ID}
          />

          {/* ---- desktop navigation ---- */}
          <Navigation className={styles.header__navigation} />
        </div>
      </header>
      {isMenuOpen ? (
        <div
          className={styles.header__overlay}
          onPointerDown={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      ) : null}
    </>
  );
}
