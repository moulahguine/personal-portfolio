import type { ReactNode } from "react";

import type { ButtonSize } from "./button.types";

export type ActionVariant = "plain" | "primary" | "secondary" | "ghost";
export type ActionsKind = "icon" | "label" | "both";
export type IconPosition = "left" | "right";

export interface ActionsProps {
  icon?: ReactNode;
  label?: ReactNode;
  children?: ReactNode;
  variant?: ActionVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  iconPosition?: IconPosition;
  "aria-label"?: string;
}

export function getActionsKind({
  icon,
  label,
  children,
}: Pick<ActionsProps, "icon" | "label" | "children">): ActionsKind | null {
  if (children != null) return null;

  const hasIcon = Boolean(icon);
  const hasLabel = label != null && label !== "";

  if (hasIcon && hasLabel) return "both";
  if (hasIcon) return "icon";
  if (hasLabel) return "label";

  return null;
}
