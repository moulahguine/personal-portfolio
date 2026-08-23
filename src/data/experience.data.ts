import type { StaticImageData } from "next/image";

import upworkLogo from "@/assets/images/experience/upwork.png";
import atlasLogo from "@/assets/images/experience/altlasuni.png";
import nisantasiLogo from "@/assets/images/experience/nisantasi.png";

export interface ExperiencePeriod {
  start: string;
  end: string;
}

export interface ExperienceEntry {
  id: string;
  role: string;
  type?: "freelance" | "full-time" | "part-time";
  major: string;
  organization: string;
  period: ExperiencePeriod;
  location: string;
  logo: StaticImageData;
  details?: string[];
}

export interface ExperienceItems {
  upwork: ExperienceEntry;
  atlasUniversity: ExperienceEntry;
  nisantasi: ExperienceEntry;
}

export interface ExperienceData {
  headingId: string;
  headerSection: {
    title: string;
  };
  items: ExperienceItems;
}

export const experience = {
  headingId: "experience-heading",

  headerSection: {
    title: "Experience",
  },

  items: {
    upwork: {
      id: "upwork",
      role: "Frontend Developer",
      type: "freelance",
      organization: "Upwork",
      major: "",
      period: {
        start: "Mar 2023",
        end: "Present",
      },
      location: "Remote, Worldwide",
      logo: upworkLogo,
      details: [],
    },

    atlasUniversity: {
      id: "atlas-istanbul",
      role: "Bachelor of Engineering",
      major: "Software Engineering",
      organization: "Istanbul Atlas University",
      period: {
        start: "Sep 2023",
        end: "Jul 2028",
      },
      location: "Istanbul, Türkiye",
      logo: atlasLogo,
    },

    nisantasi: {
      id: "nisantasi",
      role: "English Preparatory Program",
      major: "Academic English",
      organization: "Istanbul Nisantasi University",
      period: {
        start: "Sep 2021",
        end: "Jul 2022",
      },
      location: "Istanbul, Türkiye",
      logo: nisantasiLogo,
    },
  },
} satisfies ExperienceData;
