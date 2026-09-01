import { FaEnvelope, FaGithub, FaGlobe, FaLinkedin } from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import type { IconType } from "react-icons";

// ---- types ----
export type SocialLinkId =
  | "linkedin"
  | "bluesky"
  | "github"
  | "email"
  | "website";

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
  external: boolean;
  icon: IconType;
}

interface SocialProfileConfig {
  label: string;
  icon: IconType;
  external: boolean;
}

const SOCIAL_PROFILES: Record<SocialLinkId, SocialProfileConfig> = {
  linkedin: { label: "LinkedIn", icon: FaLinkedin, external: true },
  bluesky: { label: "BlueSky", icon: FaBluesky, external: true },
  github: { label: "GitHub", icon: FaGithub, external: true },
  email: { label: "Email", icon: FaEnvelope, external: false },
  website: { label: "Website", icon: FaGlobe, external: true },
};

// ---- factory ----
export function createSocialLink(
  id: SocialLinkId,
  href: string,
  label?: string,
): SocialLink {
  const profile = SOCIAL_PROFILES[id];

  return {
    id,
    href,
    label: label ?? profile.label,
    icon: profile.icon,
    external: profile.external,
  };
}

// ---- site-owner social links ----
export const SOCIAL_LINKS: SocialLink[] = [
  createSocialLink("linkedin", "https://linkedin.com/in/moulahguine"),
  createSocialLink("bluesky", "https://bsky.app/profile/mohamedoulahguine.dev"),
  createSocialLink("github", "https://github.com/moulahguine"),
  createSocialLink("email", "mailto:hello@mohamedoulahguine.com"),
];
