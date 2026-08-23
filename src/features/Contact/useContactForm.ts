"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { addToast } from "@/utils";
import { contactForm } from "@/data";
import { contactSchema, type ContactFormData } from "./contact.schema";
import type { ContactFieldName } from "./contact.types";

const CONTACT_SUBMIT_ROUTE = "/api/contact";

const INITIAL_VALUES: ContactFormData = {
  fullName: "",
  email: "",
  message: "",
};

const REQUIRED_FIELDS: ContactFieldName[] = ["fullName", "email", "message"];

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: INITIAL_VALUES,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setFocus,
    formState: { errors, touchedFields, isSubmitting, isSubmitted },
  } = form;

  const values = watch();

  const firstSubmitErrorField = useMemo((): ContactFieldName | null => {
    if (!isSubmitted) return null;

    return REQUIRED_FIELDS.find((field) => errors[field]) ?? null;
  }, [isSubmitted, errors]);

  const submit = handleSubmit(
    async (data) => {
      try {
        const payload = new FormData();
        payload.append("fullName", data.fullName);
        payload.append("email", data.email);
        payload.append("message", data.message);

        const honeypot = formRef.current?.querySelector<HTMLInputElement>(
          'input[name="_gotcha"]',
        )?.value;

        if (honeypot) {
          payload.append("_gotcha", honeypot);
        }

        const response = await fetch(CONTACT_SUBMIT_ROUTE, {
          method: "POST",
          body: payload,
        });

        if (response.status === 503) {
          addToast(contactForm.notConfiguredMessage, "error");
          return;
        }

        if (!response.ok) {
          throw new Error("Contact submission failed");
        }

        reset(INITIAL_VALUES);
        formRef.current?.reset();
        addToast(contactForm.successMessage, "success");
      } catch {
        addToast(contactForm.errorMessage, "error");
      }
    },
    (fieldErrors) => {
      const firstInvalid = REQUIRED_FIELDS.find((field) => fieldErrors[field]);

      if (firstInvalid) {
        setFocus(firstInvalid);
      }
    },
  );

  return {
    formRef,
    control,
    values,
    errors,
    touchedFields,
    isSubmitting,
    isSubmitted,
    firstSubmitErrorField,
    submit,
  };
}
