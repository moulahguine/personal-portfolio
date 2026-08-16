import { createElement, type ReactNode } from "react";

import type { ContactFieldState, FieldStateInput } from "./contact.types";

export function getFieldState({
  error,
  isValid,
  blurred,
  value,
}: FieldStateInput): ContactFieldState {
  if (error && blurred) return "invalid";
  if (isValid && blurred) return "valid-blurred";
  if (isValid && value) return "valid";
  return "idle";
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
