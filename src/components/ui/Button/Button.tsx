"use client";

import { Button as RACButton } from "react-aria-components";
import { ActionsButton } from "@/components";
import type { ButtonProps } from "@/types";

export default function Button({
  ref,
  icon,
  label,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  iconPosition = "left",
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <ActionsButton
      icon={icon}
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconPosition={iconPosition}
      className={className}
      aria-label={rest["aria-label"]}
      shell={(content, shellClassName) => (
        <RACButton ref={ref} type={type} className={shellClassName} {...rest}>
          {content}
        </RACButton>
      )}
    >
      {children}
    </ActionsButton>
  );
}
