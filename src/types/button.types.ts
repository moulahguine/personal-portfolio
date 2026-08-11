import type { Ref } from "react";
import type { ButtonProps as RACButtonProps } from "react-aria-components";
import type { ActionsProps } from "./actions.types";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<RACButtonProps, "children">,
    ActionsProps {
  ref?: Ref<HTMLButtonElement>;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}
