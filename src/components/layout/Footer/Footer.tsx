import { HERO_DATA } from "@/data";

import styles from "./Footer.module.scss";

export default function Footer() {
  const { profileInfo, socialLinks } = HERO_DATA;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <p className={styles.footer__copyright}>
          © {year} {profileInfo.name}
        </p>

        <ul className={styles.footer__social}>
          {socialLinks.map(({ id, label, href, external, icon: Icon }) => (
            <li key={id}>
              <a
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className={styles.footer__socialLink}
              >
                <Icon aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
