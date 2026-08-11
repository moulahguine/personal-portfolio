import type { Ref } from "react";
import type { LinkProps as RACLinkProps } from "react-aria-components";
import type { ActionsProps } from "./actions.types";

export type LinkVariant = "plain" | "primary" | "secondary" | "ghost";
export type LinkSize = "sm" | "md" | "lg";

export interface LinkProps
  extends Omit<RACLinkProps, "children" | "href">,
    ActionsProps {
  ref?: Ref<HTMLAnchorElement>;
  href: string;
  variant?: LinkVariant;
  size?: LinkSize;
  className?: string;
}
