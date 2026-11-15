import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { Link } from "@/components";
import {
  PROJECTS_PAGE_DATA,
  PROJECTS_SECTION_DATA,
  getProjectActions,
  type Project,
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
      {projects.map((project) => {
        const githubAction = getProjectActions(project).find(
          (action) => action.id === "github",
        );
        const demoAction = getProjectActions(project).find(
          (action) => action.id === "demo",
        );

        return (
          <li
            key={project.id}
            className={styles.projects__item}
            style={{ "--project-color": project.color } as React.CSSProperties}
          >
            <div className={styles["projects__item-content"]}>
              <h3 className={styles["projects__item-content--title"]}>
                {project.title}
              </h3>
              <p className={styles["projects__item-content--description"]}>
                {project.description}
              </p>

              <ol
                className={styles["projects__item-content--tags"]}
                aria-label="Technologies used"
              >
                {project.tagIds.map((tag) => (
                  <li
                    key={tag}
                    className={styles["projects__item-content--tag"]}
                  >
                    {tag}
                  </li>
                ))}
              </ol>

              <div className={styles["projects__item-content--actions"]}>
                <Link
                  href={project.details}
                  size="sm"
                  variant="primary"
                  label="View Details"
                  icon={<GoArrowUpRight aria-hidden="true" />}
                  iconPosition="right"
                />

                {githubAction ? (
                  <Link
                    href={githubAction.href}
                    size="sm"
                    variant="secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    icon={<githubAction.icon aria-hidden="true" />}
                  />
                ) : null}

                {demoAction ? (
                  <Link
                    href={demoAction.href}
                    size="sm"
                    variant="secondary"
                    isDisabled={demoAction.href === "/"}
                    target={demoAction.external ? "_blank" : undefined}
                    rel={
                      demoAction.external ? "noopener noreferrer" : undefined
                    }
                    aria-label={`${project.title} live demo`}
                    icon={<demoAction.icon aria-hidden="true" />}
                  />
                ) : null}
              </div>
            </div>

            <figure className={styles["projects__item-media"]}>
              <div className={styles["projects__item-media--preview"]}>
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    sizes="(max-width: 570px) 100vw, 400px"
                    className={styles["projects__item-media--image"]}
                  />
                ) : null}
              </div>
            </figure>
          </li>
        );
      })}
    </ul>
  );
}
