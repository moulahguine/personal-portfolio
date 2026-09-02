import type { MDXComponents } from "mdx/types";
import Image, { type StaticImageData } from "next/image";
import { Link } from "@/components";

import styles from "./mdx-components.module.scss";

const defaultMdxComponents = {
  section: ({ children, ...props }) => (
    <section {...props} className={styles["mdx__section"]}>
      {children}
    </section>
  ),

  h2: ({ children }) => (
    <h2 className={styles["mdx__heading"]}>{`- ${children}`}</h2>
  ),

  p: ({ children }) => <p className={styles["mdx__paragraph"]}>{children}</p>,

  blockquote: (props) => (
    <blockquote {...props} className={styles["mdx__quote"]} />
  ),

  a: ({ href = "", children, ...props }) => {
    const isExternal = href.startsWith("http");

    return (
      <Link
        href={href}
        className={styles["mdx__link"]}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {children}
      </Link>
    );
  },

  pre: (props) => <pre {...props} className={styles["mdx__pre"]} />,

  code: ({ children, className, ...props }) => {
    const isBlock = Boolean(className?.includes("language-"));

    return (
      <code
        {...props}
        className={isBlock ? styles["mdx__code"] : styles["mdx__code-inline"]}
      >
        {children}
      </code>
    );
  },

  img: ({
    src,
    alt = "",
  }: {
    src?: string | StaticImageData;
    alt?: string;
  }) => {
    if (!src) {
      return null;
    }

    return (
      <figure className={styles["mdx__media"]}>
        <Image
          src={src}
          alt={alt}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw,800px"
          quality={100}
          className={styles["mdx__media-img"]}
        />
        <figcaption className={styles["mdx__media-caption"]}>{alt}</figcaption>
      </figure>
    );
  },
} satisfies MDXComponents;

export function useMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    ...defaultMdxComponents,

    ...components,
  };
}
