import type { ContactFieldName, ContactFormValues } from "./contact.types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMAIL_TYPING_ERROR_PATTERN = /@@|\.@|@\./;

export const MESSAGE_MIN_LENGTH = 50;
export const MESSAGE_MAX_LENGTH = 200;
export const NAME_MIN_LENGTH = 2;

export function getFullNameError(value: string): string {
  if (!value) {
    return "Please enter your name.";
  }

  if (value.trim().length < NAME_MIN_LENGTH) {
    return `Please enter at least <strong>${NAME_MIN_LENGTH}</strong> characters.`;
  }

  return "";
}

export function isFullNameValid(value: string): boolean {
  return value.trim().length >= NAME_MIN_LENGTH;
}

export function getEmailError(value: string): string {
  if (!value) {
    return "Please enter your email.";
  }

  if (EMAIL_TYPING_ERROR_PATTERN.test(value) || value.split("@").length > 2) {
    return "Please enter a valid email address.";
  }

  if (!EMAIL_PATTERN.test(value.trim())) {
    return "Please enter a valid email address.";
  }

  return "";
}

export function isEmailValid(value: string): boolean {
  if (!value) return false;
  if (EMAIL_TYPING_ERROR_PATTERN.test(value) || value.split("@").length > 2) {
    return false;
  }

  return EMAIL_PATTERN.test(value.trim());
}

export function getMessageError(value: string): string {
  if (!value) {
    return "Please enter a message.";
  }

  if (value.length < MESSAGE_MIN_LENGTH) {
    return `Message must be at least <strong>${MESSAGE_MIN_LENGTH}</strong> characters.`;
  }

  if (value.length > MESSAGE_MAX_LENGTH) {
    return `Message must be no more than <strong>${MESSAGE_MAX_LENGTH}</strong> characters.`;
  }

  return "";
}

export function isMessageValid(value: string): boolean {
  return (
    value.length >= MESSAGE_MIN_LENGTH && value.length <= MESSAGE_MAX_LENGTH
  );
}

const FIELD_ERROR_GETTERS: Record<
  ContactFieldName,
  (value: string) => string
> = {
  fullName: getFullNameError,
  email: getEmailError,
  message: getMessageError,
};

export function getFieldError(field: ContactFieldName, value: string): string {
  return FIELD_ERROR_GETTERS[field](value);
}

export function validateContactForm(values: ContactFormValues) {
  return {
    fullName: getFullNameError(values.fullName),
    email: getEmailError(values.email),
    message: getMessageError(values.message),
  };
}
