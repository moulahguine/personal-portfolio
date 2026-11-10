"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { Button as RACButton } from "react-aria-components";
import { ActionsButton } from "@/components";
import type { ButtonProps } from "@/types";

const LAYOUT_TRANSITION = { type: "spring", bounce: 0.15, duration: 0.5 } as const;

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
  layoutId,
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
        <RACButton
          ref={ref}
          type={type}
          className={shellClassName}
          render={
            layoutId
              ? (domProps) => (
                  <motion.button
                    {...(domProps as HTMLMotionProps<"button">)}
                    layoutId={layoutId}
                    layoutCrossfade={false}
                    transition={LAYOUT_TRANSITION}
                  />
                )
              : undefined
          }
          {...rest}
        >
          {content}
        </RACButton>
      )}
    >
      {children}
    </ActionsButton>
  );
}
