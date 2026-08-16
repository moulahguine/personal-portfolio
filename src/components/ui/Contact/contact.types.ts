import type { ReactNode } from "react";
import type { IconType } from "react-icons";

export type ContactFieldName = "fullName" | "email" | "message";

export type ContactFieldState = "idle" | "valid" | "valid-blurred" | "invalid";

export interface ContactFormValues {
  fullName: string;
  email: string;
  service: string;
  message: string;
}

export interface ContactServiceOption {
  value: string;
  label: string;
}

export interface ContactFormConfig {
  checkIcon: IconType;
  selectCaretIcon: IconType;
  submitIcon: IconType;
  servicePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  notConfiguredMessage: string;
}

export interface ContactFieldProps {
  name: string;
  state: ContactFieldState;
  children: ReactNode;
  trailing?: ReactNode;
  multiline?: boolean;
}

export interface FieldStateInput {
  error: string;
  isValid: boolean;
  blurred?: boolean;
  value: string;
}

export interface VisibleErrorContext {
  touched: Partial<Record<keyof ContactFormValues, boolean>>;
  blurred: Partial<Record<keyof ContactFormValues, boolean>>;
  submitAttempted: boolean;
  submitErrorField: ContactFieldName | null;
}
