import { HERO_DATA } from "@/data";
import { SocialLinks } from "@/components";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { profileInfo } = HERO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__copyright}>
          © {year} {profileInfo.name}
        </p>

        <SocialLinks
          orientation="horizontal"
          className={styles.footer__social}
          linkClassName={styles.footer__socialLink}
        />
      </div>
    </footer>
  );
}
