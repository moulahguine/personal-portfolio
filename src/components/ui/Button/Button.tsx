"use client";

import { Button as RACButton } from "react-aria-components";
import { Actions } from "@/components";
import type { ButtonProps } from "@/types";

export default function Button({
  ref,
  icon,
  label,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  type = "button",
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <Actions
      icon={icon}
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      aria-label={rest["aria-label"]}
      shell={(content, shellClassName) => (
        <RACButton ref={ref} type={type} className={shellClassName} {...rest}>
          {content}
        </RACButton>
      )}
    >
      {children}
    </Actions>
  );
}
