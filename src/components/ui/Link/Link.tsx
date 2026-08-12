"use client";

import NextLink from "next/link";
import { Link as RACLink } from "react-aria-components";
import { Actions } from "@/components";
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
  className = "",
  ...rest
}: LinkProps) {
  const resolvedRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
  const useNextLink = isInternalHref(href) && download === undefined;

  return (
    <Actions
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
          className={shellClassName}
          {...(useNextLink
            ? {
                render: (props) =>
                  "href" in props ? (
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
    </Actions>
  );
}
