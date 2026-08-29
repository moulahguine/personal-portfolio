import { Link } from "@/components";
import type { Project } from "@/data";
import ProjectImage from "./ProjectImage";
import {
  PROJECTS_PAGE_DATA,
  PROJECTS_SECTION_DATA,
  getProjectActions,
} from "@/data";

import styles from "./ProjectsGrid.module.scss";

type ProjectsGridVariant = "primary" | "all";

interface ProjectsGridProps {
  variant?: ProjectsGridVariant;
  projects?: Project[];
}

// ---- projects data ----
const { primaryProjects } = PROJECTS_SECTION_DATA;
const { projects: projectsData } = PROJECTS_PAGE_DATA;

// ---- projects grid ----
export default function ProjectsGrid({
  variant = "all",
  projects: projectsProp,
}: ProjectsGridProps) {
  const projects =
    projectsProp ?? (variant === "primary" ? primaryProjects : projectsData);

  return (
    <ul className={styles.projects}>
      {projects.map((project) => (
        <article
          key={project.id}
          className={styles.projects__card}
          style={{ "--card-color": project.color } as React.CSSProperties}
        >
          <ProjectImage project={project} />

          <div className={styles["projects__card-body"]}>
            <h3 className={styles["projects__card-title"]}>{project.title}</h3>
            <p className={styles["projects__card-description"]}>
              {project.description}
            </p>

            <ul
              className={styles["projects__card-tags"]}
              aria-label="Technologies used"
            >
              {project.tagIds.map((tag) => (
                <li key={tag} className={styles["projects__card-tag"]}>
                  {tag}
                </li>
              ))}
            </ul>

            <div className={styles["projects__card-actions"]}>
              {getProjectActions(project).map(
                ({ id, href, label, icon: Icon, external }) => (
                  <Link
                    key={id}
                    href={href}
                    size="sm"
                    isDisabled={href === "/"}
                    variant={label === "GitHub" ? "primary" : "secondary"}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={`${styles["projects__card-action"]} ${
                      label === "GitHub"
                        ? styles["projects__card-action--github"]
                        : styles["projects__card-action--demo"]
                    }`}
                    aria-label={
                      label === "GitHub"
                        ? `link to ${project.title} project on GitHub`
                        : label === "Demo"
                          ? `link to ${project.title} project demo`
                          : ""
                    }
                    icon={
                      <Icon
                        className={styles["projects__card-action--icon"]}
                        aria-hidden="true"
                      />
                    }
                    label={label}
                  />
                ),
              )}
            </div>
          </div>
        </article>
      ))}
    </ul>
  );
}
