import type { StaticImageData } from "next/image";
import type { IconType } from "react-icons";
import { FaGithub } from "react-icons/fa";
import { GoLinkExternal } from "react-icons/go";

import portfolioImage from "@/assets/images/projects/myportfolio.png";

// ---- project ----
export interface Project {
  id: string;
  title: string;
  description: string;
  image: StaticImageData;
  color: string;
  tagIds: string[];
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
    label: "Demo",
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
    description:
      "It's my website that represents my work as a frontend developer, including the projects I build and the things I learn along the way.",
    image: portfolioImage,
    color: "#ffe023",
    tagIds: ["react", "nextjs", "typescript", "sass", "motion"],
    demo: "/",
    github: "https://github.com/moulahguine/personal-portfolio",
    primary: true,
  },
];

const PRIMARY_PROJECTS = PROJECTS.filter((project) => project.primary).slice(
  0,
  4,
);

const REMAINING_PROJECTS_COUNT = PROJECTS.length - PRIMARY_PROJECTS.length;

// ---- sections ----
export const sections = {
  projectsHeadingId: "projects-heading",

  headerSection: {
    title: "Projects",
  },

  primaryProjects: PRIMARY_PROJECTS,
  remainingProjectsCount: REMAINING_PROJECTS_COUNT,
};

// ---- meta data ----
export const metaData = {
  title: "Projects",
  description:
    "Explore projects I've built across frontend development, software engineering, and digital experiences.",
};

// ---- page ----
export const page = {
  headerPage: {
    title: "Projects",
    description:
      "A collection of websites, applications, and experiments I’ve built while working with modern web technologies.",
  },

  projects: PROJECTS,
};
