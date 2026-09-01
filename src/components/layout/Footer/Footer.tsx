import { HERO_DATA } from "@/data";
import { Logo, SocialLinks } from "@/components";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { profileInfo } = HERO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Logo className={styles.footer__logo} />

        <SocialLinks
          orientation="horizontal"
          className={styles.footer__socials}
          linkClassName={styles.footer__socialLink}
          iconClassName={styles.footer__socialIcon}
        />

        <p className={styles.footer__copyright}>
          © {year} {profileInfo.name}
        </p>
      </div>
    </footer>
  );
}
