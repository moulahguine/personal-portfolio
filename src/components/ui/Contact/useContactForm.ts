"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { contactForm, getContactServiceOptions } from "@/data";
import { addToast } from "@/utils";
import {
  CONTACT_SUBMIT_ROUTE,
  INITIAL_VALUES,
  REQUIRED_FIELDS,
} from "./contact.constants";
import { getFieldState } from "./contact.helpers";
import type {
  ContactFieldName,
  ContactFormValues,
  VisibleErrorContext,
} from "./contact.types";
import {
  getEmailError,
  getFieldError,
  getFullNameError,
  getMessageError,
  isEmailValid,
  isFullNameValid,
  isMessageValid,
  validateContactForm,
} from "./contact.validation";

function getFirstInvalidField(
  values: ContactFormValues,
): ContactFieldName | undefined {
  return REQUIRED_FIELDS.find((field) => getFieldError(field, values[field]));
}

function getVisibleError(
  field: ContactFieldName,
  rawError: string,
  { touched, blurred, submitAttempted, submitErrorField }: VisibleErrorContext,
): string {
  if (!rawError) return "";

  if (submitAttempted) {
    return submitErrorField === field ? rawError : "";
  }

  if (touched[field] && blurred[field]) {
    return rawError;
  }

  return "";
}

export function useContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [blurred, setBlurred] = useState<
    Partial<Record<keyof ContactFormValues, boolean>>
  >({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [submitErrorField, setSubmitErrorField] =
    useState<ContactFieldName | null>(null);

  const serviceOptions = useMemo(() => getContactServiceOptions(), []);

  const rawErrors = useMemo(
    () => ({
      fullName: getFullNameError(values.fullName),
      email: getEmailError(values.email),
      message: getMessageError(values.message),
    }),
    [values.fullName, values.email, values.message],
  );

  const errors = useMemo(() => {
    const context: VisibleErrorContext = {
      touched,
      blurred,
      submitAttempted,
      submitErrorField,
    };

    return {
      fullName: getVisibleError("fullName", rawErrors.fullName, context),
      email: getVisibleError("email", rawErrors.email, context),
      message: getVisibleError("message", rawErrors.message, context),
    };
  }, [rawErrors, touched, blurred, submitAttempted, submitErrorField]);

  const valid = useMemo(
    () => ({
      fullName: isFullNameValid(values.fullName),
      email: isEmailValid(values.email),
      message: isMessageValid(values.message),
    }),
    [values.fullName, values.email, values.message],
  );

  const fieldStates = useMemo(
    () => ({
      fullName: getFieldState({
        value: values.fullName,
        error: errors.fullName,
        isValid: valid.fullName,
        blurred: blurred.fullName,
      }),
      email: getFieldState({
        value: values.email,
        error: errors.email,
        isValid: valid.email,
        blurred: blurred.email,
      }),
      message: getFieldState({
        value: values.message,
        error: errors.message,
        isValid: valid.message,
        blurred: blurred.message,
      }),
    }),
    [values, errors, valid, blurred],
  );

  useEffect(() => {
    if (!submitAttempted || !submitErrorField) return;

    const currentError = getFieldError(
      submitErrorField,
      values[submitErrorField],
    );
    if (currentError) return;

    const nextInvalid = getFirstInvalidField(values);
    setSubmitErrorField(nextInvalid ?? null);

    if (nextInvalid) {
      setBlurred((prev) => ({ ...prev, [nextInvalid]: true }));
    }
  }, [values, submitAttempted, submitErrorField]);

  const setFieldValue = useCallback(
    (name: keyof ContactFormValues, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      setTouched((prev) => ({ ...prev, [name]: true }));
    },
    [],
  );

  const markBlurred = useCallback((name: keyof ContactFormValues) => {
    setBlurred((prev) => ({ ...prev, [name]: true }));
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      setSubmitAttempted(true);

      const validationErrors = validateContactForm(values);
      const hasErrors = Object.values(validationErrors).some(Boolean);

      if (hasErrors) {
        const firstInvalid = getFirstInvalidField(values);
        setSubmitErrorField(firstInvalid ?? null);

        if (firstInvalid) {
          setBlurred((prev) => ({ ...prev, [firstInvalid]: true }));
          formRef.current
            ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
            ?.focus();
        }

        return;
      }

      setIsSending(true);

      try {
        const response = await fetch(CONTACT_SUBMIT_ROUTE, {
          method: "POST",
          body: new FormData(formRef.current!),
        });

        if (response.status === 503) {
          addToast(contactForm.notConfiguredMessage, "error");
          return;
        }

        if (!response.ok) {
          throw new Error("Contact submission failed");
        }

        formRef.current?.reset();
        setValues(INITIAL_VALUES);
        setTouched({});
        setBlurred({});
        setSubmitAttempted(false);
        setSubmitErrorField(null);
        addToast(contactForm.successMessage, "success");
      } catch {
        addToast(contactForm.errorMessage, "error");
      } finally {
        setIsSending(false);
      }
    },
    [values],
  );

  return {
    formRef,
    isSending,
    values,
    serviceOptions,
    errors,
    fieldStates,
    setFieldValue,
    markBlurred,
    handleSubmit,
  };
}
