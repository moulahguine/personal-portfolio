import { FiDownload } from "react-icons/fi";
import { FaCheckCircle, FaLink, FaMapMarkerAlt } from "react-icons/fa";

import profilePhotoSrc from "@/assets/images/profilePicture/profilePicture.png";

export const HERO_DATA = {
  profilePhotoSrc: profilePhotoSrc,
  connectIcon: FaLink,

  profileInfo: {
    name: "Mohamed Oulahguine",
    role: "Frontend Developer",
    techStack: ["React", "Next.js", "TypeScript"],
    location: "Istanbul, Türkiye",
    origin: "Morocco",
    badgeIcon: FaCheckCircle,
    locationIcon: FaMapMarkerAlt,
  },

  resume: {
    downloadIcon: FiDownload,
    href: "/MOHAMED_OULAHGUINE_RESUME.pdf",
    fileName: "MOHAMED_OULAHGUINE_RESUME.pdf",
  },
};
