import type { IconType } from "react-icons";
import {
  SiAstro,
  SiCss,
  SiCssmodules,
  SiEslint,
  SiGit,
  SiGithub,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiMui,
  SiNetlify,
  SiNextdotjs,
  SiPnpm,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiSass,
  SiShadcnui,
  SiStorybook,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
  SiZod,
  SiMdx,
} from "react-icons/si";
import {
  TbSeo,
  TbAccessible,
  TbBrandFramerMotion,
  TbBrandAdobe,
  TbApi,
} from "react-icons/tb";
import { CgPerformance, CgSmartphone } from "react-icons/cg";
import { FaMasksTheater } from "react-icons/fa6";

// ---- skill interface ----
export interface Skill {
  id: string;
  name: string;
  description: string;
  icon: IconType;
  color: string;
  isPrimary: boolean;
  overview: string;
}

// ---- skills ----
const SKILLS: Skill[] = [
  {
    id: "html",
    name: "HTML",
    description: "The standard markup language for structuring web content.",
    icon: SiHtml5,
    color: "#E34F26",
    isPrimary: false,
    overview:
      "HTML is the foundation of everything I build on the web. I focus on writing semantic markup that gives the interface a clear structure before styling or JavaScript comes into the picture. I use elements according to their meaning rather than choosing them only for their default appearance, especially when building accessible navigation, forms, sections, and interactive interfaces. For me, good HTML is also part of accessibility and SEO, not just the starting point of a page.",
  },
  {
    id: "css4",
    name: "CSS",
    description: "The language used to style and lay out web interfaces.",
    icon: SiCss,
    color: "#663399",
    isPrimary: false,
    overview:
      "I work with modern CSS features rather than relying only on older patterns, and I care about maintainable styles, responsive layouts, spacing, typography, states, and motion. I try to keep the styling close to the platform whenever CSS already provides a good solution instead of adding unnecessary abstractions.",
  },
  {
    id: "sass",
    name: "Sass",
    description:
      "A CSS preprocessor that adds powerful features for writing maintainable styles.",
    icon: SiSass,
    color: "#CC6699",
    isPrimary: false,
    overview:
      "I started using Sass before modern CSS had many of the features we have today, and it was incredibly helpful for keeping larger stylesheets organized and maintainable. Even though CSS has evolved a lot since then with native nesting, custom properties, functions, and other powerful features, I still enjoy using Sass when a project benefits from an additional layer of structure. Sass modules, variables, functions, and mixins can make certain patterns easier to organize and reuse. At the same time, I don't use Sass just because I can; when native CSS is the better or simpler solution, I prefer using it.",
  },
  {
    id: "css-modules",
    name: "CSS Modules",
    description:
      "Locally scoped CSS for styling components without global naming conflicts.",
    icon: SiCssmodules,
    color: "var(--color-interaction)",
    isPrimary: false,
    overview:
      "CSS Modules give me locally scoped styles without requiring a large styling system. I like them for components where styles should stay close to the component while avoiding accidental global naming conflicts. They fit especially well with the component architecture I use in React and Next.js projects.",
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework for rapidly building custom interfaces.",
    icon: SiTailwindcss,
    color: "#38BDF8",
    isPrimary: true,
    overview:
      "Tailwind gives me a fast way to build interfaces directly from a consistent set of utility classes. I find it particularly useful when working with responsive layouts and design systems where spacing, typography, and visual decisions need to stay consistent. I don't see it as a replacement for understanding CSS; I use it because it can make repetitive styling decisions faster and more predictable.",
  },

  {
    id: "javascript",
    name: "JavaScript",
    description:
      "A programming language that powers interactive behavior on the web.",
    icon: SiJavascript,
    color: "#F7DF1E",
    isPrimary: true,
    overview:
      "JavaScript is the language underneath most of the frontend work I do, so I care about understanding it beyond simply making React components work. I work with modern syntax, asynchronous code, modules, browser APIs, events, objects, arrays, and the patterns needed to build interactive applications. A strong understanding of JavaScript also helps me make better decisions when working with React rather than treating the framework as a replacement for the language.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    description:
      "A typed superset of JavaScript for building safer, maintainable applications.",
    icon: SiTypescript,
    color: "#3178C6",
    isPrimary: true,
    overview:
      "TypeScript is my default choice for application code. I use it to make component APIs, application logic, forms, configuration, and API data easier to reason about as a project grows. I prefer useful types that describe the actual domain rather than adding types everywhere just for the sake of satisfying the compiler. It gives me better feedback while developing and makes refactoring much safer.",
  },

  {
    id: "react",
    name: "React",
    description:
      "A JavaScript library for building component-based user interfaces.",
    icon: SiReact,
    color: "#61DAFB",
    isPrimary: true,
    overview:
      "React is the main UI library I use for building interactive interfaces. I enjoy its component model because it encourages me to think about interfaces as reusable pieces that can be composed rather than as one large page. I work with hooks, state, component composition, controlled inputs, reusable UI patterns, and performance considerations, while keeping components as simple as possible. I also care about accessibility and maintainability rather than treating React as only a way to make things interactive.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    description:
      "A React framework for building full-stack, performant web applications.",
    icon: SiNextdotjs,
    color: "var(--color-interaction)",
    isPrimary: true,
    overview:
      "Next.js is my main framework for building complete React applications. I use it when a project needs more than a client-side UI, particularly for routing, server-side capabilities, metadata, SEO, data handling, and performance. I'm interested in understanding where code should run and choosing between server and client functionality deliberately instead of making everything a Client Component by default.",
  },
  {
    id: "mdx",
    name: "MDX",
    description:
      "A format that lets you write JSX inside Markdown for content-rich pages.",
    icon: SiMdx,
    color: "#F9AC00",
    isPrimary: false,
    overview:
      "MDX lets me keep written content in Markdown while still using React components where they actually add value, such as images, links, or interactive elements. I use it with Next.js through the official @next/mdx setup when a page is mostly prose but still needs the flexibility of components. I prefer this over building custom content objects and renderers, because MDX already gives me a clear separation between page structure, styling, and the content itself.",
  },
  {
    id: "astro",
    name: "Astro",
    description:
      "A web framework focused on content-driven sites and minimal client-side JavaScript.",
    icon: SiAstro,
    color: "#BC52EE",
    isPrimary: true,
    overview:
      "Astro is something I use when a project benefits from a content-focused architecture and doesn't need an entire application to be driven by JavaScript. I like its approach to sending less JavaScript to the browser while still allowing interactive components where they are actually needed. It gives me another perspective on performance and reinforces the idea that not every part of a website needs to be interactive.",
  },

  {
    id: "motion",
    name: "Motion",
    description:
      "A React animation library for creating expressive, interactive interfaces.",
    icon: TbBrandFramerMotion,
    color: "#0055FF",
    isPrimary: true,
    overview:
      "Motion is what I use when an interface needs movement that communicates something rather than animation just for decoration. I work with layout transitions, presence animations, hover and interaction states, and page or component transitions. I'm particularly interested in making motion feel connected to the user's action, while respecting reduced-motion preferences and avoiding animations that slow the interface down.",
  },
  {
    id: "gsap",
    name: "GSAP",
    description:
      "A powerful animation library for creating precise, high-performance web animations.",
    icon: SiGsap,
    color: "#0ae448",
    isPrimary: false,
    overview:
      "GSAP gives me a different level of control when an animation goes beyond what I would normally build with CSS or Motion. I use it for more timeline-driven and highly controlled animations where sequencing and precise timing matter. I don't reach for it automatically; if a simple CSS transition or Motion animation solves the problem well, I prefer the simpler solution.",
  },

  {
    id: "react-aria-components",
    name: "React Aria Components",
    description:
      "Accessible, unstyled React components for building custom interfaces.",
    icon: TbBrandAdobe,
    color: "#7f57ff",
    isPrimary: false,
    overview:
      "React Aria Components is useful to me when I need accessible interactive components without having to implement all of the complicated interaction behavior myself. I use it as a foundation for things such as dialogs, menus, buttons, and other accessible patterns while keeping control over the visual design. It fits the way I approach UI: accessibility and behavior should be reliable while the design can still be completely my own.",
  },
  {
    id: "mui3",
    name: "Material UI",
    description:
      "A React component library implementing Google's Material Design system.",
    icon: SiMui,
    color: "#007FFF",
    isPrimary: false,
    overview:
      "Material UI gives me a mature set of ready-made React components when a project needs a consistent interface without building every common pattern from scratch. I understand its value for productivity and established design systems, while still preferring to use custom styling when a project has a strong visual identity that doesn't fit the library's defaults.",
  },
  {
    id: "shadcn-ui",
    name: "shadcn/ui",
    description:
      "A collection of customizable React components built to be owned by your project.",
    icon: SiShadcnui,
    color: "var(--color-interaction)",
    isPrimary: true,
    overview:
      "I like shadcn/ui because it takes a different approach from traditional component libraries: instead of treating the components as a black box dependency, it gives me components that I can own and adapt inside the project. That fits my preference for having control over the UI while still starting from well-designed patterns rather than rebuilding every primitive from zero.",
  },

  {
    id: "react-hook-form",
    name: "React Hook Form",
    description:
      "A performant library for managing forms and validation in React.",
    icon: SiReacthookform,
    color: "#EC5990",
    isPrimary: false,
    overview:
      "I use React Hook Form when a form has enough complexity that managing every field manually would create unnecessary state and re-rendering. It gives me a clean way to handle form state, validation, errors, and submission while keeping the components relatively straightforward. I usually pair it with a schema validation library when the form has more involved validation rules.",
  },
  {
    id: "zod",
    name: "Zod",
    description:
      "A TypeScript-first schema validation library for validating data at runtime.",
    icon: SiZod,
    color: "#b450b1",
    isPrimary: false,
    overview:
      "Zod lets me validate data at runtime while keeping the TypeScript types connected to those schemas. I find that particularly useful at application boundaries where TypeScript alone cannot guarantee what the browser actually receives from an API or user input. I commonly see it working well alongside forms and API data because validation becomes explicit instead of being assumed from static types.",
  },
  {
    id: "redux",
    name: "Redux",
    description:
      "A predictable state management library for JavaScript applications.",
    icon: SiRedux,
    color: "#764ABC",
    isPrimary: false,
    overview:
      "Redux is useful when application state becomes shared and complex enough that keeping it distributed across individual components becomes difficult to reason about. I understand the value of having predictable state updates and a central model, but I don't consider Redux the default answer for every application. For simpler state or server state, I prefer solutions that match the actual problem rather than adding global state unnecessarily.",
  },
  {
    id: "tanstack-query",
    name: "TanStack Query",
    description:
      "A library for fetching, caching, and synchronizing server state.",
    icon: SiReactquery,
    color: "#cd6543",
    isPrimary: true,
    overview:
      "TanStack Query is what I reach for when the application needs to deal with server state. It gives me a better model for caching, synchronization, loading and error states, mutations, and invalidating data than trying to manage all of that manually with component state and useEffect. Understanding the difference between server state and client state is one of the reasons I find it particularly useful in larger React applications.",
  },
  {
    id: "react-router",
    name: "React Router",
    description:
      "A routing library for navigating and managing routes in React applications.",
    icon: SiReactrouter,
    color: "#CA4245",
    isPrimary: false,
    overview:
      "React Router gives me explicit control over client-side navigation and route-driven UI in React applications. I use it when routing itself is part of the application's client-side architecture, including nested routes, route parameters, and navigation state. When working in Next.js, I use Next's routing system instead because the framework already provides that responsibility.",
  },
  {
    id: "rest-api",
    name: "REST API",
    description:
      "A standard approach for communicating with web services over HTTP.",
    icon: TbApi,
    color: "var(--color-interaction)",
    isPrimary: false,
    overview:
      "REST APIs are how I commonly connect frontend applications to backend data and services. I work with HTTP requests, resources, responses, status codes, loading states, errors, and the transformation of API data into something the UI can actually use. I also think about how the API's shape affects the frontend architecture rather than treating fetching data as simply calling fetch().",
  },

  {
    id: "responsive-design",
    name: "Responsive Design",
    description:
      "An approach to building interfaces that adapt to different screens and devices.",
    icon: CgSmartphone,
    color: "var(--color-interaction)",
    isPrimary: false,
    overview:
      "I build interfaces with the assumption that they will be used across different screen sizes, input methods, and environments. I prefer layouts that adapt naturally rather than designing one desktop version and adding a few media queries afterward. I pay attention to content, spacing, typography, interaction targets, and how components behave as the available space changes.",
  },
  {
    id: "accessibility",
    name: "Accessibility",
    description:
      "The practice of making web interfaces usable by people with different abilities.",
    icon: TbAccessible,
    color: "#009900",
    isPrimary: false,
    overview:
      "Accessibility is one of the things I want to be intentional about in every interface I build. I focus on semantic HTML first and then consider keyboard navigation, focus management, accessible names, contrast, reduced motion, forms, and screen-reader behavior. I don't want accessibility to be a collection of fixes added after the UI is finished; it should influence how the component is designed from the beginning.",
  },
  {
    id: "seo",
    name: "SEO",
    description:
      "The practice of improving a website's visibility and discoverability in search engines.",
    icon: TbSeo,
    color: "#0056B3",
    isPrimary: false,
    overview:
      "I treat SEO as part of building a good web application rather than something added at the end. I pay attention to semantic HTML, metadata, document structure, URLs, content, performance, and the way pages are rendered. With Next.js in particular, I can make SEO part of the application's architecture instead of treating it as a separate task.",
  },
  {
    id: "web-performance",
    name: "Web Performance",
    description:
      "The practice of making websites load, render, and respond efficiently.",
    icon: CgPerformance,
    color: "#FF4081",
    isPrimary: false,
    overview:
      "Performance is something I think about from the browser's perspective rather than treating it as a score on a report. I care about the amount of JavaScript sent to the client, rendering, images, fonts, network requests, caching, and how quickly the user can actually interact with the page. I also try to measure problems before optimizing them instead of adding optimizations that don't solve a real bottleneck.",
  },

  {
    id: "jest",
    name: "Jest",
    description:
      "A JavaScript testing framework for verifying application behavior.",
    icon: SiJest,
    color: "#C21325",
    isPrimary: false,
    overview:
      "I use Jest for testing JavaScript and TypeScript code where automated tests can give me confidence that important behavior continues to work. I'm interested in tests that verify meaningful behavior rather than tests that simply mirror the implementation. For frontend applications, I see testing as part of making refactoring safer, especially as components and business logic become more complex.",
  },
  {
    id: "playwright",
    name: "Playwright",
    description:
      "A browser automation framework for reliable end-to-end testing.",
    icon: FaMasksTheater,
    color: "#45ba49",
    isPrimary: false,
    overview:
      "Playwright lets me test the application from the perspective of an actual browser rather than only testing individual functions or components. I use it for end-to-end scenarios where navigation, interactions, forms, and multiple pieces of the application need to work together. This type of testing is valuable because it can catch problems that isolated component tests cannot.",
  },
  {
    id: "storybook",
    name: "Storybook",
    description:
      "A development environment for building and testing UI components in isolation.",
    icon: SiStorybook,
    color: "#FF4081",
    isPrimary: false,
    overview:
      "Storybook is useful when UI components need to be developed and reviewed independently from the rest of the application. It gives me a place to work through different component states, edge cases, and visual variations without having to navigate through the entire application to reach them. I see it as especially useful when building a reusable component system where consistency matters.",
  },

  {
    id: "git",
    name: "Git",
    description:
      "A distributed version control system for tracking and managing code changes.",
    icon: SiGit,
    color: "#F05032",
    isPrimary: false,
    overview:
      "Git is part of my everyday development workflow rather than something I consider a separate technology. I use it to track changes, experiment safely, work through features, and keep a project history that makes development easier to manage. I also care about keeping commits and branches understandable so that the history remains useful when returning to a project later.",
  },
  {
    id: "github",
    name: "GitHub",
    description: "A platform for hosting code and collaborating through Git.",
    icon: SiGithub,
    color: "#181717",
    isPrimary: false,
    overview:
      "GitHub is where I keep my code, collaborate, review changes, and make projects accessible to others. I use it not only as a place to store repositories but also as part of the development workflow around branches, commits, pull requests, and project history. For my portfolio, it also gives recruiters and other developers a way to look beyond the final UI and see how I actually build things.",
  },
  {
    id: "eslint",
    name: "ESLint",
    description:
      "A tool for finding problems and enforcing consistency in JavaScript and TypeScript code.",
    icon: SiEslint,
    color: "#4B32C3",
    isPrimary: false,
    overview:
      "ESLint helps me catch problems and enforce consistency before they become part of the codebase. I use it as a development tool rather than relying on it to make architectural decisions for me. A good linting setup should reduce noise, catch real mistakes, and make the codebase easier to maintain without becoming a collection of arbitrary rules.",
  },
  {
    id: "webpack",
    name: "Webpack",
    description:
      "A module bundler that builds and optimizes web application assets.",
    icon: SiWebpack,
    color: "#8ED6FB",
    isPrimary: false,
    overview:
      "Webpack is useful to understand because it exposes many of the concepts behind modern frontend builds: modules, dependencies, loaders, plugins, bundling, and optimization. I don't reach for it for every new project because newer tools can provide a simpler development experience, but understanding Webpack helps me understand what actually happens between source code and the assets delivered to the browser.",
  },
  {
    id: "vite",
    name: "Vite",
    description:
      "A fast frontend build tool with a lightweight development experience.",
    icon: SiVite,
    color: "#FFD700",
    isPrimary: false,
    overview:
      "Vite is one of the tools I like for quickly developing modern frontend applications. Its development experience makes it easy to start working without waiting for a large bundle to be rebuilt after every change. I particularly appreciate how simple it is for React and TypeScript projects while still providing the configuration and build capabilities needed when a project grows.",
  },
  {
    id: "pnpm",
    name: "pnpm",
    description:
      "A fast and efficient package manager for JavaScript projects.",
    icon: SiPnpm,
    color: "#F6003D",
    isPrimary: false,
    overview:
      "pnpm is my preferred package manager. I like its efficient dependency management, workspace support, and the way it keeps projects fast without unnecessarily duplicating packages. It has become part of my normal workflow for installing dependencies, running scripts, and managing JavaScript projects.",
  },

  {
    id: "netlify",
    name: "Netlify",
    description:
      "A platform for building, deploying, and hosting modern web applications.",
    icon: SiNetlify,
    color: "#00C7B7",
    isPrimary: false,
    overview:
      "Netlify is one of the platforms I use to deploy frontend projects and make them accessible on the web. I like the simplicity of connecting a repository, configuring the build, and getting a deployment without having to manage infrastructure manually. It also gives me a practical environment for thinking about builds, environment variables, deployment previews, and production behavior.",
  },
];

// ---- here are some constants ----
const PRIMARY_SKILLS = SKILLS.filter((skill) => skill.isPrimary);
const REMAINING_SKILLS_COUNT = SKILLS.length - PRIMARY_SKILLS.length;

// ---- sections ----
export const SKILLS_SECTION_DATA = {
  skillsHeadingId: "skills-heading",

  headerSection: {
    id: "skills",
    title: "Tech Stack",
  },

  primarySkills: PRIMARY_SKILLS,
  remainingSkillsCount: REMAINING_SKILLS_COUNT,
};

// ---- meta data ----
export const SKILLS_META_DATA = {
  title: "Skills",
  description:
    "Here you'll find the technologies I work with regularly. I’ve left out the ones I rarely use and the ones I’m still learning.",
};

// ---- page ----
export const SKILLS_PAGE_DATA = {
  headerPage: {
    title: "Skills",
    description:
      "These are the technologies I work with regularly. I’ve left out tools I rarely use and those I’m still learning.",
  },

  skills: SKILLS,
};
