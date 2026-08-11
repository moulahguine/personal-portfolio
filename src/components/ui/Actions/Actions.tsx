"use client";

import type { ReactNode } from "react";
import { Tooltip, TooltipTrigger } from "@/components";
import { getActionsKind } from "@/types";
import type { ActionsProps } from "@/types";

import styles from "./Actions.module.scss";

type Props = ActionsProps & {
  className?: string;
  as?: "button" | "link";
  shell: (content: ReactNode, shellClassName: string) => ReactNode;
};

export default function Actions({
  icon,
  label,
  children,
  variant,
  size,
  fullWidth = false,
  className = "",
  as = "button",
  shell,
  "aria-label": ariaLabel,
}: Props) {
  const kind = getActionsKind({ icon, label });
  const tooltipLabel = kind === "icon" ? ariaLabel?.trim() : null;
  const shellSize = variant === "plain" ? undefined : size;

  const shellClassName = [
    styles.shell,
    as === "link" ? styles["shell--link"] : "",
    variant ? styles[`shell--variant-${variant}`] : "",
    kind ? styles[`shell--kind-${kind}`] : "",
    shellSize ? styles[`shell--size-${shellSize}`] : "",
    fullWidth ? styles["shell--full-width"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (children != null) {
    return shell(children, shellClassName);
  }

  const contentClassName = [
    styles.actions,
    kind === "both" ? styles["actions--kind-both"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const body = (
    <span className={contentClassName}>
      {icon ? (
        <span className={styles.actions__icon} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      {label != null && label !== "" ? (
        <span className={styles.actions__label}>{label}</span>
      ) : null}
    </span>
  );

  const control = shell(body, shellClassName);

  if (!tooltipLabel) return control;

  return (
    <TooltipTrigger delay={300} closeDelay={0}>
      {control}
      <Tooltip>{tooltipLabel}</Tooltip>
    </TooltipTrigger>
  );
}
