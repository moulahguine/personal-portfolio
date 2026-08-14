import type { IconType } from "react-icons";
import {
  SiCss,
  SiEslint,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiNextdotjs,
  SiNodedotjs,
  SiPnpm,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from "react-icons/si";

// ---- skill interface ----
export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  color: string;
  isPrimary: boolean;
}

// ---- skills ----
const SKILLS: Skill[] = [
  {
    id: "react",
    name: "React",
    icon: SiReact,
    color: "#61DAFB",
    isPrimary: true,
  },
  {
    id: "nextjs",
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    isPrimary: true,
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    isPrimary: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: SiJavascript,
    color: "#F7DF1E",
    isPrimary: true,
  },
  {
    id: "html",
    name: "HTML",
    icon: SiHtml5,
    color: "#E34F26",
    isPrimary: true,
  },
  { id: "css", name: "CSS", icon: SiCss, color: "#1572B6", isPrimary: true },
  { id: "sass", name: "Sass", icon: SiSass, color: "#CC6699", isPrimary: true },
  { id: "git", name: "Git", icon: SiGit, color: "#F05032", isPrimary: true },
  {
    id: "nodejs",
    name: "Node.js",
    icon: SiNodedotjs,
    color: "#339933",
    isPrimary: false,
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#38BDF8",
    isPrimary: false,
  },
  {
    id: "redux",
    name: "Redux",
    icon: SiRedux,
    color: "#764ABC",
    isPrimary: false,
  },
  {
    id: "jest",
    name: "Jest",
    icon: SiJest,
    color: "#C21325",
    isPrimary: false,
  },
  {
    id: "eslint",
    name: "ESLint",
    icon: SiEslint,
    color: "#4B32C3",
    isPrimary: false,
  },
  {
    id: "webpack",
    name: "Webpack",
    icon: SiWebpack,
    color: "#8ED6FB",
    isPrimary: false,
  },
  {
    id: "vite",
    name: "Vite",
    icon: SiVite,
    color: "#FFD700",
    isPrimary: false,
  },
  {
    id: "github",
    name: "GitHub",
    icon: SiGithub,
    color: "#181717",
    isPrimary: false,
  },
  {
    id: "pnpm",
    name: "pnpm",
    icon: SiPnpm,
    color: "#F6003D",
    isPrimary: false,
  },
];

// ---- here are some constants ----
const PRIMARY_SKILLS = SKILLS.filter((skill) => skill.isPrimary);
const REMAINING_SKILLS_COUNT = SKILLS.length - PRIMARY_SKILLS.length;

// ---- sections ----
export const sections = {
  skillsHeadingId: "skills-heading",

  headerSection: {
    id: "skills",
    title: "Tech Stack",
  },

  primarySkills: PRIMARY_SKILLS,
  remainingSkillsCount: REMAINING_SKILLS_COUNT,
  allSkillsCount: SKILLS.length,
};

// ---- meta data ----
export const metaData = {
  title: "My Skills",
  description:
    "Here you'll find the technologies I work with regularly. I’ve left out the ones I rarely use and the ones I’m still learning.",
};

// ---- page ----
export const page = {
  headerPage: {
    title: "Tech Stack",
    description:
      "These are the technologies I work with regularly. I’ve left out tools I rarely use and those I’m still learning.",
  },

  skills: SKILLS,
};
