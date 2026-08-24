"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Logo, Navigation, Menu, ThemeSelector } from "@/components";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import styles from "./Header.module.scss";

const MOBILE_NAV_ID = "mobile-navigation";

// ---- header ----
export default function Header() {
  // ---- here only for hide header on scroll ----
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

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
      <motion.header
        className={styles.header}
        animate={{
          y: hidden ? -150 : 0,
        }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* ---- container ---- */}
        <div className={styles.header__container}>
          {/* ---- logo ---- */}
          <Logo />

          {/* ---- desktop navigation ---- */}
          <Navigation className={styles.header__navigation} />

          {/* ---- theme selector ---- */}
          <ThemeSelector />

          {/* ---- mobile menu ---- */}
          <Menu
            isOpen={isMenuOpen}
            onOpenChange={setIsMenuOpen}
            id={MOBILE_NAV_ID}
          />
        </div>
      </motion.header>
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
