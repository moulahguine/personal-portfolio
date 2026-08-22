import type { ReactNode } from "react";

export type ModalSize = "sm" | "md" | "lg" | "fit";

export interface ModalRenderProps {
  close: () => void;
}

export interface ModalProps {
  children: ReactNode | ((props: ModalRenderProps) => ReactNode);
  size: ModalSize;
  icon?: ReactNode;
  iconColor?: string;
  title?: ReactNode;
  description?: ReactNode;
  showHeader?: boolean;
  "aria-label"?: string;
  className?: string;
  isDismissable?: boolean;
}
