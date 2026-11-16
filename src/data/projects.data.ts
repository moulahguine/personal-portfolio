import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";

// Video files live in /public — Turbopack does not bundle .mp4 imports.
const PORTFOLIO_PREVIEW_VIDEO = "/projects/portfolio.mp4";

const FEATURED_PROJECTS_LIMIT = 4;

// ---- project ----
export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string;
  video: string;
  color: string;
  tagIds: string[];
  details: string;
  demo: string;
  github: string;
  primary: boolean;
}

export interface ProjectAction {
  id: string;
  href: string;
  label: string;
  icon: IconType;
  external: boolean;
}

const PROJECT_ACTIONS = [
  {
    id: "demo",
    label: "Live Demo",
    icon: GoLinkExternal,
    hrefKey: "demo",
  },
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    hrefKey: "github",
    external: true,
  },
] as const;

export function getProjectsBySkillId(skillId: string): Project[] {
  return PROJECTS.filter((project) => project.tagIds.includes(skillId));
}

export function getProjectActions(project: Project): ProjectAction[] {
  return PROJECT_ACTIONS.map(({ id, label, icon, hrefKey, ...rest }) => {
    const href = project[hrefKey];
    const external =
      "external" in rest ? rest.external : href.startsWith("http");

    return { id, href, label, icon, external };
  });
}

// ---- projects ----
const PROJECTS: Project[] = [
  {
    id: "portfolio",
    title: "My portfolio",
    category: "Portfolio Website",
    year: "2026",
    description:
      "It's my website that represents my work as a frontend developer, including the projects I build and the things I learn along the way.",
    video: PORTFOLIO_PREVIEW_VIDEO,
    color: "#ffe023",
    tagIds: ["nextjs", "typescript", "sass", "motion", "mdx"],
    details: "/projects",
    demo: "/",
    github: "https://github.com/mohamedoulahguine/personal-portfolio",
    primary: true,
  },
];

const PRIMARY_PROJECTS = PROJECTS.filter((project) => project.primary).slice(
  0,
  FEATURED_PROJECTS_LIMIT,
);
const REMAINING_PROJECTS_COUNT = PROJECTS.length - PRIMARY_PROJECTS.length;

// ---- sections ----
export const PROJECTS_SECTION_DATA = {
  projectsHeadingId: "projects-heading",

  headerSection: {
    id: "projects",
    title: "Projects",
  },

  primaryProjects: PRIMARY_PROJECTS,
  remainingProjectsCount: REMAINING_PROJECTS_COUNT,
};

// ---- meta data ----
export const PROJECTS_META_DATA = {
  title: "Projects",
  description:
    "Explore projects I've built across frontend development, software engineering, and digital experiences.",
};

// ---- page ----
export const PROJECTS_PAGE_DATA = {
  headerPage: {
    title: "Projects",
    description:
      "A collection of websites, applications, and experiments I’ve built while working with modern web technologies.",
  },

  projects: PROJECTS,
};
