import type { ReactNode } from "react";
import type { TooltipProps as RACTooltipProps } from "react-aria-components";

export interface TooltipProps extends Omit<RACTooltipProps, "children"> {
  children: ReactNode;
  className?: string;
}
