import { HERO_DATA } from "@/data";
import { Logo, SocialLinks } from "@/components";
import Image from "next/image";
import footerImage from "@/assets/images/footer/footer.png";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { profileInfo } = HERO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Image
          src={footerImage}
          alt=""
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px"
          className={styles.footer__image}
        />

        <div className={styles.footer__content}>
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
      </div>
    </footer>
  );
}
