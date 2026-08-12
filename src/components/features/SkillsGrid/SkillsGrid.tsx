import { Button, Link, DialogTrigger, Modal } from "@/components";
import { sections, page } from "@/data";
import { GoLinkExternal } from "react-icons/go";

import styles from "./SkillsGrid.module.scss";

type SkillsGridVariant = "primary" | "all";

interface SkillsGridProps {
  variant?: SkillsGridVariant;
  showMoreLink?: boolean;
  moreCount?: number;
  moreHref?: string;
}

const { primarySkills, remainingSkillsCount } = sections;
const { skills: skillsData } = page;

// ---- skills grid ----
export default function SkillsGrid({
  variant = "all",
  showMoreLink = false,
  moreCount = remainingSkillsCount,
}: SkillsGridProps) {
  // get skills data based on variant
  const skills = variant === "primary" ? primarySkills : skillsData;

  return (
    <ul className={styles.skills__grid}>
      {skills.map((skill) => (
        <li key={skill.id}>
          <DialogTrigger>
            {/* button to open modal */}
            <Button
              variant="ghost"
              className={styles.skills__item}
              aria-label={`View ${skill.name} details`}
              style={{ "--skill-color": skill.color } as React.CSSProperties}
            >
              <span className={styles.skills__iconWrapper} aria-hidden="true">
                <skill.icon className={styles.skills__icon} />
              </span>
              <span className={styles.skills__name}>{skill.name}</span>
            </Button>

            {/* modal to show skill details */}
            <Modal
              size="md"
              title={`${(<skill.icon />)} ${skill.name} `}
              aria-label={`${skill.name} details`}
            >
              coming soon...
            </Modal>
          </DialogTrigger>
        </li>
      ))}

      {/* link to show more skills */}
      {showMoreLink && moreCount > 0 ? (
        <li>
          <Link
            href="/skills"
            variant="ghost"
            className={styles.skills__item + " " + styles[`skills__item--more`]}
            aria-label={`View ${moreCount} more skills`}
          >
            <GoLinkExternal
              className={styles.skills__iconLink}
              aria-hidden="true"
            />
            +{moreCount} more
          </Link>
        </li>
      ) : null}
    </ul>
  );
}
