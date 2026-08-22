import Image from "next/image";
import { Fragment } from "react";
import { Link } from "@/components";
import type { AboutContentItem, AboutContentPart } from "@/data";

import styles from "./page.module.scss";

// ---- here is the render emphasis function ----
function renderEmphasis(text: string, emphasis?: "strong" | "em") {
  if (emphasis === "strong") {
    return <strong>{text}</strong>;
  }

  if (emphasis === "em") {
    return <em>{text}</em>;
  }

  return text;
}

// ---- here is the render part function ----
function renderPart(part: AboutContentPart, index: number) {
  if (typeof part === "string") {
    return part;
  }

  const content = renderEmphasis(part.text, part.emphasis);

  if (part.link) {
    const isExternal = part.link.startsWith("http");

    return (
      <Link
        key={index}
        href={part.link}
        variant="plain"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={styles.page__link}
      >
        {content}
      </Link>
    );
  }

  return <Fragment key={index}>{content}</Fragment>;
}

// ---- about content item ----
export default function AboutContentItem({ item }: { item: AboutContentItem }) {
  if (item.type === "image") {
    return (
      <figure className={styles.page__figure}>
        <Image
          src={item.content}
          alt={item.alt ?? ""}
          width={300}
          height={300}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
          preload
          fetchPriority="high"
          placeholder="blur"
          className={styles.page__image}
        />
      </figure>
    );
  }

  if (item.type === "quote") {
    return (
      <blockquote className={styles.page__quote}>
        <p>
          <strong>&ldquo;{item.content}&rdquo;</strong>
        </p>
      </blockquote>
    );
  }

  return (
    <p className={styles.page__paragraph}>
      {Array.isArray(item.content)
        ? item.content.map((part, index) => renderPart(part, index))
        : renderPart(item.content, 0)}
    </p>
  );
}
