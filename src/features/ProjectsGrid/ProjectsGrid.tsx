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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const actions = getProjectActions(project);
  const demoAction = actions.find((action) => action.id === "demo");
  const githubAction = actions.find((action) => action.id === "github");

  return (
    <li
      className={styles.projects__card}
      style={{ "--project-color": project.color } as React.CSSProperties}
    >
      <header className={styles["projects__card-meta"]}>
        <p className={styles["projects__card-meta-kind"]}>
          <span className={styles["projects__card-meta-number"]}>
            {projectNumber}
          </span>
          <span
            className={styles["projects__card-meta-sep"]}
            aria-hidden="true"
          >
            /
          </span>
          <span className={styles["projects__card-meta-category"]}>
            {project.category}
          </span>
        </p>
        <time
          className={styles["projects__card-meta-year"]}
          dateTime={project.year}
        >
          {project.year}
        </time>
      </header>

      <figure className={styles["projects__card-preview"]}>
        <div className={styles["projects__card-stage"]}>
          {project.video ? (
            <video
              className={styles["projects__card-video"]}
              src={project.video}
              role="img"
              aria-label={`Preview of ${project.title}`}
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
            />
          ) : null}
        </div>
      </figure>

      <div className={styles["projects__card-body"]}>
        <h3 className={styles["projects__card-title"]}>{project.title}</h3>
        <p className={styles["projects__card-description"]}>
          {project.description}
        </p>

        <ol
          className={styles["projects__card-tags"]}
          aria-label="Technologies used"
        >
          {project.tagIds.map((tag) => (
            <li key={tag} className={styles["projects__card-tag"]}>
              {tag}
            </li>
          ))}
        </ol>

        <div className={styles["projects__card-actions"]}>
          <Link
            href={project.details}
            size="sm"
            variant="primary"
            label="View Details"
            icon={<GoArrowUpRight aria-hidden="true" />}
            iconPosition="right"
            aria-label={`View details for ${project.title}`}
          />

          <div className={styles["projects__card-actions-secondary"]}>
            {demoAction ? (
              <Link
                href={demoAction.href}
                size="sm"
                variant="secondary"
                icon={<demoAction.icon aria-hidden="true" />}
                isDisabled={demoAction.href === "/"}
                target={demoAction.external ? "_blank" : undefined}
                rel={demoAction.external ? "noopener noreferrer" : undefined}
                aria-label={`${project.title} — ${demoAction.label}`}
              />
            ) : null}

            {githubAction ? (
              <Link
                href={githubAction.href}
                size="sm"
                variant="secondary"
                icon={<githubAction.icon aria-hidden="true" />}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} — ${githubAction.label}`}
              />
            ) : null}
          </div>
        </div>
      </div>
    </li>
  );
}

// ---- projects grid ----
export default function ProjectsGrid({
  variant = "all",
  projects: projectsProp,
}: ProjectsGridProps) {
  const projects =
    projectsProp ?? (variant === "primary" ? primaryProjects : projectsData);

  return (
    <ul className={styles.projects}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </ul>
  );
}
