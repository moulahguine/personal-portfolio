import type { StaticImageData } from "next/image";
import moulahguineAvatar from "@/assets/images/authors/moulahguine.png";
import { createSocialLink, type SocialLink } from "./social-links.data";

// ---- author ----
export const AUTHOR_IDS = ["moulahguine"] as const;
export type AuthorId = (typeof AUTHOR_IDS)[number];

export interface Author {
  id: AuthorId;
  name: string;
  role: string;
  avatar: StaticImageData;
  socials: SocialLink[];
}

export const AUTHORS: Record<AuthorId, Author> = {
  moulahguine: {
    id: "moulahguine",
    name: "Mohamed Oulahguine",
    role: "Frontend Developer",
    avatar: moulahguineAvatar,
    socials: [
      createSocialLink("linkedin", "https://linkedin.com/in/moulahguine"),
      createSocialLink(
        "bluesky",
        "https://bsky.app/profile/mohamedoulahguine.dev",
      ),
      createSocialLink("github", "https://github.com/moulahguine"),
    ],
  },
};

export const DEFAULT_AUTHOR_ID: AuthorId = "moulahguine";

// ---- helpers ----
export function isAuthorId(value: string): value is AuthorId {
  return (AUTHOR_IDS as readonly string[]).includes(value);
}

export function getAuthor(id: AuthorId): Author {
  const author = AUTHORS[id];

  if (!author) {
    throw new Error(`Unknown author id: "${id}"`);
  }

  return author;
}
