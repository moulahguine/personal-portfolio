import type { ReactNode } from "react";

export function getMdxTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getMdxTextContent).join("");
  }

  if (node && typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return getMdxTextContent(props?.children ?? "");
  }

  return "";
}
