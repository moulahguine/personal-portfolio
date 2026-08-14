import { Link } from "@/components";
import type { ClassNameProps } from "@/types";
import { MdOutlineArrowOutward } from "react-icons/md";

import styles from "./HeaderSection.module.scss";

interface HeaderSectionLink {
  href: string;
  label: string;
  ariaLabel: string;
}

interface HeaderSectionProps extends ClassNameProps {
  title: string;
  id?: string;
  tag?: "h2" | "h3";
  link?: HeaderSectionLink;
}

// ---- header section ----
export default function HeaderSection({
  title,
  id,
  className,
  tag: Tag = "h2",
  link,
}: HeaderSectionProps) {
  return (
    <div
      className={[styles.headerSection, className].filter(Boolean).join(" ")}
    >
      <Tag className={styles.headerSection__title} id={id}>
        {title}
      </Tag>

      {link ? (
        <Link
          href={link.href}
          variant="ghost"
          iconPosition="right"
          size="sm"
          className={styles.headerSection__link}
          aria-label={link.ariaLabel}
          icon={
            <MdOutlineArrowOutward
              className={styles.headerSection__linkIcon}
              aria-hidden="true"
            />
          }
          label={link.label}
        />
      ) : null}
    </div>
  );
}
