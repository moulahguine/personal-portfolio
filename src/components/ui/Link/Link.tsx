"use client";

import NextLink from "next/link";
import { Link as RACLink } from "react-aria-components";
import { ActionsButton } from "@/components";
import type { LinkProps } from "@/types";

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export default function Link({
  ref,
  icon,
  label,
  children,
  href,
  variant = "plain",
  size = "md",
  fullWidth = false,
  iconPosition = "left",
  download,
  target,
  rel,
  isDisabled,
  className = "",
  ...rest
}: LinkProps) {
  const resolvedRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
  const useNextLink =
    isInternalHref(href) && download === undefined && !isDisabled;

  return (
    <ActionsButton
      as="link"
      icon={icon}
      label={label}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      iconPosition={iconPosition}
      className={className}
      aria-label={rest["aria-label"]}
      shell={(content, shellClassName) => (
        <RACLink
          ref={ref}
          href={href}
          download={download}
          target={target}
          rel={resolvedRel}
          isDisabled={isDisabled}
          className={shellClassName}
          {...(useNextLink
            ? {
                render: (props) =>
                  !isDisabled && "href" in props ? (
                    <NextLink {...props} />
                  ) : (
                    <span {...props} />
                  ),
              }
            : null)}
          {...rest}
        >
          {content}
        </RACLink>
      )}
    >
      {children}
    </ActionsButton>
  );
}
