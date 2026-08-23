import type { ReactNode } from "react";
import type { IconType } from "react-icons";

import type { ContactFormData } from "./contact.schema";

export type ContactFieldName = "fullName" | "email" | "message";

export type ContactFieldState = "idle" | "valid" | "valid-blurred" | "invalid";

export interface ContactFormConfig {
  checkIcon: IconType;
  submitIcon: IconType;
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

export interface VisibleFieldErrorContext {
  isTouched: boolean;
  isSubmitted: boolean;
  firstSubmitErrorField: ContactFieldName | null;
}

export interface FieldStateInput {
  error: string;
  isValid: boolean;
  isTouched: boolean;
  value: string;
}

export type { ContactFormData };
