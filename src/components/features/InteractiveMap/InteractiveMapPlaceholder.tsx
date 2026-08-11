import type { ClassNameProps } from "@/types";

import "./InteractiveMap.scss";

export function InteractiveMapPlaceholder({ className }: ClassNameProps) {
  const classNames = [
    "interactive-map",
    "interactive-map-placeholder",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classNames} />;
}
