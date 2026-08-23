"use client";

import dynamic from "next/dynamic";
import type { ClassNameProps } from "@/types";

import styles from "./Hero.module.scss";

const InteractiveMap = dynamic(
  () => import("@/features/InteractiveMap/InteractiveMap"),
  {
    ssr: false,
    loading: () => (
      <div
        className={`${styles.hero__map} ${styles.hero__mapPlaceholder}`}
        aria-hidden="true"
      />
    ),
  },
);

export default function HeroMap({ className }: ClassNameProps) {
  return <InteractiveMap className={className} />;
}
