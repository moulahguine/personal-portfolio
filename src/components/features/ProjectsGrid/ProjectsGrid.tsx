import { Link } from "@/components";
import Image from "next/image";
import type { Project } from "@/data";
import { projectsPage, projectsSections, getProjectActions } from "@/data";

import styles from "./ProjectsGrid.module.scss";

type ProjectsGridVariant = "primary" | "all";
type ProjectsGridLayout = "default" | "modal";

interface ProjectsGridProps {
  variant?: ProjectsGridVariant;
  projects?: Project[];
  layout?: ProjectsGridLayout;
}

// ---- projects data ----
const { primaryProjects } = projectsSections;
const { projects: projectsData } = projectsPage;

// ---- projects grid ----
export default function ProjectsGrid({
  variant = "all",
  projects: projectsProp,
  layout = "default",
}: ProjectsGridProps) {
  const projects =
    projectsProp ??
    (variant === "primary" ? primaryProjects : projectsData);

  const gridClassName = [
    styles.projects__grid,
    layout === "modal" && styles["projects__grid--modal"],
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ul className={gridClassName}>
      {projects.map((project) => (
        <li key={project.id}>
          <article
            className={styles.projects__card}
            style={{ "--card-color": project.color } as React.CSSProperties}
          >
            <div className={styles["projects__card-media"]}>
              <Image
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                width={500}
                height={500}
                sizes="(max-width: 768px) 300px, 500px"
                className={styles["projects__card-image"]}
              />
            </div>

            <div className={styles["projects__card-body"]}>
              <h3 className={styles["projects__card-title"]}>
                {project.title}
              </h3>
              <p className={styles["projects__card-description"]}>
                {project.description}
              </p>

              <div className={styles["projects__card-footer"]}>
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
                        isDisabled={href === "/"}
                        variant={label === "GitHub" ? "primary" : "secondary"}
                        size="sm"
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className={
                          label === "GitHub"
                            ? styles["projects__card-actionLink"]
                            : undefined
                        }
                        aria-label={
                          label === "GitHub"
                            ? `link to ${project.title} project on GitHub`
                            : label === "Demo"
                              ? `link to ${project.title} project demo`
                              : ""
                        }
                        icon={
                          <Icon
                            className={styles["projects__card-actionIcon"]}
                            aria-hidden="true"
                          />
                        }
                        label={label}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}
