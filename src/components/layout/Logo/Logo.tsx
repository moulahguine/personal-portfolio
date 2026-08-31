import Image from "next/image";
import { Link } from "@/components";
import logoSrc from "@/assets/images/portfolioLogo/logo.png";

import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link
      href="/"
      variant="plain"
      size="md"
      className={styles.logo}
      aria-label="Home"
    >
      <Image
        src={logoSrc}
        alt=""
        aria-hidden="true"
        width={50}
        height={50}
        preload
        fetchPriority="high"
      />
    </Link>
  );
}
