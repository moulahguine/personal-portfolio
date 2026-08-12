import { Link } from "@/components";
import { MdOutlineArrowOutward } from "react-icons/md";
import Image from "next/image";
import { projectsPage, projectsSections, getProjectActions } from "@/data";

import styles from "./ProjectsGrid.module.scss";

type ProjectsGridVariant = "primary" | "all";

interface ProjectsGridProps {
  variant?: ProjectsGridVariant;
  showAllLink?: boolean;
}

// ---- projects data ----
const { primaryProjects } = projectsSections;
const { projects: projectsData } = projectsPage;

// ---- projects grid ----
export default function ProjectsGrid({
  variant = "all",
  showAllLink = false,
}: ProjectsGridProps) {
  // ---- here we get the projects data based on the variant ----
  const projects = variant === "primary" ? primaryProjects : projectsData;

  return (
    <div className={styles.projects}>
      {/* ---- projects list ---- */}
      <ul className={styles.projects__grid}>
        {projects.map((project) => (
          <li key={project.id}>
            {/* ---- project card ---- */}
            <article
              className={styles.projects__card}
              style={{ "--card-color": project.color } as React.CSSProperties}
            >
              {/* ---- media ---- */}
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

              {/* ---- body ---- */}
              <div className={styles["projects__card-body"]}>
                <h3 className={styles["projects__card-title"]}>
                  {project.title}
                </h3>
                <p className={styles["projects__card-description"]}>
                  {project.description}
                </p>

                <div className={styles["projects__card-footer"]}>
                  {/* ---- tags ---- */}
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

                  {/* ---- actions ---- */}
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

      {/* ---- show all link ---- */}
      {showAllLink ? (
        <Link
          href="/projects"
          variant="plain"
          iconPosition="right"
          size="sm"
          className={styles.projects__allLink}
          aria-label="View all projects"
          icon={
            <MdOutlineArrowOutward
              className={styles.projects__allLinkIcon}
              aria-hidden="true"
            />
          }
          label="View all projects"
        />
      ) : null}
    </div>
  );
}
