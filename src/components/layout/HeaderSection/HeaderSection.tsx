import type { ClassNameProps } from "@/types";

import styles from "./HeaderSection.module.scss";

interface HeaderSectionProps extends ClassNameProps {
  title: string;
  id?: string;
  tag?: "h2" | "h3";
}

// ---- header section ----
export default function HeaderSection({
  title,
  id,
  className,
  tag: Tag = "h2",
}: HeaderSectionProps) {
  return (
    <div className={`${styles.headerSection} ${className}`.trim()}>
      <Tag className={styles.headerSection__title} id={id}>
        {title}
      </Tag>
    </div>
  );
}
