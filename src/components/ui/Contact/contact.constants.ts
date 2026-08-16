import type { ContactFieldName, ContactFormValues } from "./contact.types";

export const CONTACT_SUBMIT_ROUTE = "/api/contact";

export const INITIAL_VALUES: ContactFormValues = {
  fullName: "",
  email: "",
  service: "",
  message: "",
};

export const REQUIRED_FIELDS: ContactFieldName[] = [
  "fullName",
  "email",
  "message",
];
