"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import type { Project } from "@/data";

import styles from "./ProjectsGrid.module.scss";

interface ProjectImageProps {
  project: Project;
}

export default function ProjectImage({ project }: ProjectImageProps) {
  const { resolvedTheme } = useTheme();
  const src =
    resolvedTheme === "dark" ? project.images.dark : project.images.light;

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
