import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "fit";

export interface ModalRenderProps {
  close: () => void;
}

export interface ModalProps {
  children: ReactNode | ((props: ModalRenderProps) => ReactNode);
  size?: ModalSize;
  title?: ReactNode;
  description?: ReactNode;
  /** When omitted, the header shows if `title` or `description` is set. */
  showHeader?: boolean;
  "aria-label"?: string;
  className?: string;
  isDismissable?: boolean;
}
