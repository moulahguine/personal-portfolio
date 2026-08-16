export { NAV_ITEMS } from "./navigation.data";
export { HERO_DATA } from "./hero.data";
export {
  ABOUT_SECTION_DATA,
  ABOUT_METADATA,
  ABOUT_PAGE_DATA,
} from "./about.data";
export type {
  AboutContentItem,
  AboutContentPart,
  AboutPageData,
} from "./about.data";
export {
  metaData as contactMetaData,
  page as contactPage,
  sections as contactSections,
  contactForm,
  getContactServiceOptions,
} from "./contact.data";
export type {
  ContactFormConfig,
  ContactServiceOption,
} from "@/components/ui/Contact/contact.types";
export {
  sections as blogSections,
  metaData as blogMetaData,
  page as blogPage,
} from "./blog.data";
export type { Blog } from "./blog.data";
export { experience } from "./experience.data";
export type {
  ExperienceData,
  ExperienceEntry,
  ExperienceItems,
  ExperiencePeriod,
} from "./experience.data";
export { sections, metaData, page } from "./skills.data";
export type { Skill } from "./skills.data";
export {
  sections as projectsSections,
  metaData as projectsMetaData,
  page as projectsPage,
  getProjectActions,
} from "./projects.data";
export type { Project, ProjectAction } from "./projects.data";
