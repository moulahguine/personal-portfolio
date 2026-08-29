"use client";

import Image from "next/image";
import type { Project } from "@/data";
import { useResolvedTheme } from "@/hooks";

import styles from "./ProjectsGrid.module.scss";

interface ProjectImageProps {
  project: Project;
}

export default function ProjectImage({ project }: ProjectImageProps) {
  const theme = useResolvedTheme();
  const src = theme === "dark" ? project.images.dark : project.images.light;

  return (
    <figure className={styles["projects__card-media"]}>
      <Image
        src={src}
        alt={`Screenshot of ${project.title}`}
        width={800}
        height={800}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={styles["projects__card-image"]}
      />
    </figure>
  );
}
