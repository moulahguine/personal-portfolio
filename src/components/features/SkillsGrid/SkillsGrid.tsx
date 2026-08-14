import { Button, DialogTrigger, Modal } from "@/components";
import { sections, page } from "@/data";

import styles from "./SkillsGrid.module.scss";

type SkillsGridVariant = "primary" | "all";

interface SkillsGridProps {
  variant?: SkillsGridVariant;
}

const { primarySkills } = sections;
const { skills: skillsData } = page;

// ---- skills grid ----
export default function SkillsGrid({ variant = "all" }: SkillsGridProps) {
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
    </ul>
  );
}
