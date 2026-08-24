import { SOCIAL_LINKS, type SocialLink } from "@/data";
import type { ClassNameProps } from "@/types";
import { Link } from "@/components";

import styles from "./SocialLinks.module.scss";

type SocialLinksOrientation = "horizontal" | "vertical";

interface SocialLinksProps extends ClassNameProps {
  links?: SocialLink[];
  orientation?: SocialLinksOrientation;
  showLabel?: boolean;
  linkClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
}

export default function SocialLinks({
  links = SOCIAL_LINKS,
  orientation = "horizontal",
  showLabel = false,
  className = "",
  linkClassName = "",
  iconClassName = "",
  labelClassName = "",
}: SocialLinksProps) {
  const listClassName = [
    styles.socialLinks,
    styles[`socialLinks--${orientation}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const linkClassNames = [styles.socialLinks__link, linkClassName]
    .filter(Boolean)
    .join(" ");

  const iconClassNames = [styles.socialLinks__icon, iconClassName]
    .filter(Boolean)
    .join(" ");

  const labelClassNames = [styles.socialLinks__label, labelClassName]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={listClassName}>
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <li key={link.id} className={styles.socialLinks__item}>
            <Link
              className={linkClassNames}
              href={link.href}
              aria-label={showLabel ? undefined : link.label}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
            >
              <Icon className={iconClassNames} aria-hidden="true" />
              {showLabel ? (
                <span className={labelClassNames}>{link.label}</span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
