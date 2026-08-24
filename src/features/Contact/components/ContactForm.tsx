"use client";

import { Button } from "@/components";
import { CONTACT_FORM_DATA } from "@/data";
import { Controller } from "react-hook-form";
import {
  FieldError,
  Form,
  Input,
  TextArea,
  TextField,
} from "react-aria-components";

import {
  formatErrorMessage,
  getContactFieldState,
  getVisibleFieldError,
} from "../contact.helpers";
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from "../contact.schema";
import type { ContactFieldProps } from "../contact.types";
import { useContactForm } from "../useContactForm";

import styles from "./Contact.module.scss";

function ContactField({
  name,
  state,
  children,
  trailing,
  multiline = false,
}: ContactFieldProps) {
  return (
    <div
      className={[
        styles.contact__field,
        styles[`contact__field--${state}`],
        multiline ? styles["contact__field--multiline"] : "",
      ]
        .filter(Boolean)
        .join(" ")}
      data-field={name}
    >
      {children}
      {trailing}
    </div>
  );
}

export default function ContactForm() {
  const { checkIcon: CheckIcon, submitIcon: SubmitIcon } = CONTACT_FORM_DATA;

  const {
    formRef,
    control,
    values,
    errors,
    touchedFields,
    isSubmitting,
    isSubmitted,
    firstSubmitErrorField,
    submit,
  } = useContactForm();

  const fullNameError = getVisibleFieldError(
    "fullName",
    errors.fullName?.message,
    {
      isTouched: !!touchedFields.fullName,
      isSubmitted,
      firstSubmitErrorField,
    },
  );
  const fullNameState = getContactFieldState(
    "fullName",
    values.fullName,
    fullNameError,
    !!touchedFields.fullName,
  );

  const emailError = getVisibleFieldError("email", errors.email?.message, {
    isTouched: !!touchedFields.email,
    isSubmitted,
    firstSubmitErrorField,
  });

  const emailState = getContactFieldState(
    "email",
    values.email,
    emailError,
    !!touchedFields.email,
  );

  const messageError = getVisibleFieldError(
    "message",
    errors.message?.message,
    {
      isTouched: !!touchedFields.message,
      isSubmitted,
      firstSubmitErrorField,
    },
  );
  const messageState = getContactFieldState(
    "message",
    values.message,
    messageError,
    !!touchedFields.message,
  );

  return (
    <Form
      ref={formRef}
      className={styles.contact__form}
      onSubmit={submit}
      validationBehavior="aria"
    >
      <p className={styles.contact__honeypot} aria-hidden="true">
        <label>
          Do not fill this out
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <ContactField
        name="fullName"
        state={fullNameState}
        trailing={
          fullNameState === "valid-blurred" ? (
            <span className={styles["contact__field-check"]} aria-hidden="true">
              <CheckIcon />
            </span>
          ) : null
        }
      >
        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              autoComplete="name"
              isRequired
              isDisabled={isSubmitting}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={fullNameState === "invalid"}
              aria-label="Full name"
            >
              <Input
                className={styles.contact__input}
                placeholder="Your full name*"
              />
              <FieldError className={styles["contact__field-error"]}>
                {formatErrorMessage(fullNameError)}
              </FieldError>
            </TextField>
          )}
        />
      </ContactField>

      <ContactField
        name="email"
        state={emailState}
        trailing={
          emailState === "valid-blurred" ? (
            <span className={styles["contact__field-check"]} aria-hidden="true">
              <CheckIcon />
            </span>
          ) : null
        }
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              type="email"
              autoComplete="email"
              isRequired
              isDisabled={isSubmitting}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={emailState === "invalid"}
              aria-label="Email"
            >
              <Input
                className={styles.contact__input}
                placeholder="your@email.com*"
              />
              <FieldError className={styles["contact__field-error"]}>
                {formatErrorMessage(emailError)}
              </FieldError>
            </TextField>
          )}
        />
      </ContactField>

      <ContactField
        name="message"
        multiline
        state={messageState}
        trailing={
          <>
            {messageState === "valid-blurred" ? (
              <span
                className={styles["contact__field-check"]}
                aria-hidden="true"
              >
                <CheckIcon />
              </span>
            ) : null}
            <span className={styles["contact__field-count"]} aria-live="polite">
              {values.message.length}/{MESSAGE_MAX_LENGTH}
            </span>
          </>
        }
      >
        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <TextField
              name={field.name}
              isRequired
              isDisabled={isSubmitting}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              isInvalid={messageState === "invalid"}
              aria-label="Message"
              minLength={MESSAGE_MIN_LENGTH}
              maxLength={MESSAGE_MAX_LENGTH}
            >
              <TextArea
                className={styles.contact__textarea}
                maxLength={MESSAGE_MAX_LENGTH}
                placeholder="Tell me more about the opportunity or project...*"
              />
              <FieldError className={styles["contact__field-error"]}>
                {formatErrorMessage(messageError)}
              </FieldError>
            </TextField>
          )}
        />
      </ContactField>

      <Button
        type="submit"
        variant="primary"
        className={styles.contact__submit}
        icon={<SubmitIcon />}
        iconPosition="left"
        isDisabled={isSubmitting}
      >
        {isSubmitting
          ? CONTACT_FORM_DATA.sendingLabel
          : CONTACT_FORM_DATA.submitLabel}
      </Button>
    </Form>
  );
}
