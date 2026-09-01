import Image from "next/image";
import { Link } from "@/components";
import logoSrc from "@/assets/images/portfolioLogo/logo.png";

import styles from "./Logo.module.scss";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      variant="plain"
      size="md"
      className={`${styles.logo} ${className?.trim()}`}
      aria-label="Home"
    >
      <Image
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={50}
        height={50}
        sizes="80px"
        preload
        fetchPriority="high"
      />
    </Link>
  );
}
