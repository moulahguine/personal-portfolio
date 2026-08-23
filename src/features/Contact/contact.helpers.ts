import { createElement, type ReactNode } from "react";
import { isContactFieldValid } from "./contact.schema";
import type {
  ContactFieldName,
  ContactFieldState,
  FieldStateInput,
  VisibleFieldErrorContext,
} from "./contact.types";

export function getFieldState({
  error,
  isValid,
  isTouched,
  value,
}: FieldStateInput): ContactFieldState {
  if (error && isTouched) return "invalid";
  if (isValid && isTouched) return "valid-blurred";
  if (isValid && value) return "valid";
  return "idle";
}

export function getVisibleFieldError(
  field: ContactFieldName,
  message: string | undefined,
  { isTouched, isSubmitted, firstSubmitErrorField }: VisibleFieldErrorContext,
): string {
  if (!message) return "";

  if (isSubmitted) {
    return firstSubmitErrorField === field ? message : "";
  }

  if (isTouched) {
    return message;
  }

  return "";
}

export function getContactFieldState(
  field: ContactFieldName,
  value: string,
  visibleError: string,
  isTouched: boolean,
): ContactFieldState {
  return getFieldState({
    value,
    error: visibleError,
    isValid: isContactFieldValid(field, value),
    isTouched,
  });
}

const STRONG_TAG_PATTERN = /(<strong>.*?<\/strong>)/;

export function formatErrorMessage(message: string): ReactNode {
  if (!message || !STRONG_TAG_PATTERN.test(message)) {
    return message;
  }

  return message.split(STRONG_TAG_PATTERN).map((part, index) => {
    if (part.startsWith("<strong>")) {
      return createElement("strong", { key: index }, part.slice(8, -9));
    }

    return part;
  });
}
