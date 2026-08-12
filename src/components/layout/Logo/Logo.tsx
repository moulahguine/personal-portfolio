import Image from "next/image";
import { Link } from "@/components";
import logoSrc from "@/assets/images/portfolioLogo/logo.png";
import type { ClassNameProps } from "@/types";

import styles from "./Logo.module.scss";

export default function Logo({ className }: ClassNameProps) {
  return (
    <Link
      href="/"
      variant="ghost"
      size="md"
      className={`${styles.logo} ${className ?? ""}`.trim()}
      aria-label="Home"
    >
      <Image
        src={logoSrc}
        alt="logo"
        width={100}
        height={50}
        sizes="(max-width: 768px) 50px, 50px"
        preload
        loading="eager"
        fetchPriority="high"
        className={styles.logo__image}
      />
    </Link>
  );
}
