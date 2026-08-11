import {
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { MdShare } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import type { IconType } from "react-icons";

import profilePhotoSrc from "@/assets/images/profilePicture/profilePicture.png";

// ---- social links ----
export type SocialLinkId = "linkedin" | "github" | "email";

export interface SocialLink {
  id: SocialLinkId;
  label: string;
  href: string;
  external: boolean;
  icon: IconType;
}

export const HERO_DATA = {
  headingId: "hero-heading",
  profilePhotoSrc: profilePhotoSrc,
  shareIcon: MdShare,

  profileInfo: {
    name: "Mohamed Oulahguine",
    role: "Frontend Developer",
    techStack: ["React", "Next.js", "TypeScript"],
    location: "Istanbul, Türkiye",
    origin: "Morocco",
    badgeIcon: FaCheckCircle,
    locationIcon: FaMapMarkerAlt,
  },

  socialLinks: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/moulahguine",
      external: true,
      icon: FaLinkedin,
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
  ] satisfies SocialLink[],

  resume: {
    downloadIcon: FiDownload,
    href: "/MOHAMED_OULAHGUINE_RESUME.pdf",
    fileName: "MOHAMED_OULAHGUINE_RESUME.pdf",
  },
};
