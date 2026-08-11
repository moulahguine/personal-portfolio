"use client";

import { Tooltip as RACTooltip, TooltipTrigger } from "react-aria-components";
import type { TooltipProps } from "@/types";

import styles from "./Tooltip.module.scss";

export { TooltipTrigger };

// ---- tooltip ----
export default function Tooltip({
  children,
  className = "",
  offset = 8,
  placement = "top",
  ...rest
}: TooltipProps) {
  const classNames = [styles.tooltip, className].filter(Boolean).join(" ");

  return (
    <RACTooltip
      className={classNames}
      offset={offset}
      placement={placement}
      {...rest}
    >
      {children}
    </RACTooltip>
  );
}
