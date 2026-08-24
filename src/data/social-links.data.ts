import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type SocialLinkId = "linkedin" | "bluesky" | "github" | "email";

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
  external: boolean;
  icon: IconType;
}

export const SOCIAL_LINKS = [
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/moulahguine",
    external: true,
    icon: FaLinkedin,
  },
  {
    id: "bluesky",
    label: "BlueSky",
    href: "https://bsky.app/profile/mohamedoulahguine.dev",
    external: true,
    icon: FaBluesky,
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/moulahguine",
    external: true,
    icon: FaGithub,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:hello@mohamedoulahguine.com",
    external: false,
    icon: FaEnvelope,
  },
] satisfies SocialLink[];
