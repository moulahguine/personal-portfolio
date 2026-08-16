"use client";

import { Button } from "@/components";
import { contactForm } from "@/data";
import {
  Button as AriaButton,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  TextArea,
  TextField,
} from "react-aria-components";
import { formatErrorMessage } from "./contact.helpers";
import type { ContactFieldProps } from "./contact.types";
import { MESSAGE_MAX_LENGTH, MESSAGE_MIN_LENGTH } from "./contact.validation";
import { useContactForm } from "./useContactForm";

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
  const {
    checkIcon: CheckIcon,
    selectCaretIcon: SelectCaretIcon,
    submitIcon: SubmitIcon,
  } = contactForm;

  const {
    formRef,
    isSending,
    values,
    serviceOptions,
    errors,
    fieldStates: {
      fullName: fullNameState,
      email: emailState,
      message: messageState,
    },
    setFieldValue,
    markBlurred,
    handleSubmit,
  } = useContactForm();

  return (
    <Form
      ref={formRef}
      className={styles.contact__form}
      onSubmit={handleSubmit}
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
        <TextField
          name="fullName"
          autoComplete="name"
          isRequired
          isDisabled={isSending}
          value={values.fullName}
          onChange={(value) => setFieldValue("fullName", value)}
          isInvalid={fullNameState === "invalid"}
          aria-label="Full name"
        >
          <Label className={styles["contact__visually-hidden"]}>
            Full name
          </Label>
          <Input
            className={styles.contact__input}
            placeholder="Your full name*"
            onBlur={() => markBlurred("fullName")}
          />
          <FieldError className={styles["contact__field-error"]}>
            {formatErrorMessage(errors.fullName)}
          </FieldError>
        </TextField>
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
        <TextField
          name="email"
          type="email"
          autoComplete="email"
          isRequired
          isDisabled={isSending}
          value={values.email}
          onChange={(value) => setFieldValue("email", value)}
          isInvalid={emailState === "invalid"}
          aria-label="Email"
        >
          <Label className={styles["contact__visually-hidden"]}>Email</Label>
          <Input
            className={styles.contact__input}
            placeholder="you@example.com*"
            onBlur={() => markBlurred("email")}
          />
          <FieldError className={styles["contact__field-error"]}>
            {formatErrorMessage(errors.email)}
          </FieldError>
        </TextField>
      </ContactField>

      <ContactField name="service" state="idle">
        <Select
          className={styles.contact__select}
          name="service"
          isDisabled={isSending}
          placeholder={contactForm.servicePlaceholder}
          selectedKey={values.service || null}
          onSelectionChange={(key) =>
            setFieldValue("service", key ? String(key) : "")
          }
          aria-label="Service (optional)"
        >
          <Label className={styles["contact__visually-hidden"]}>
            Service (optional)
          </Label>
          <AriaButton className={styles["contact__select-trigger"]}>
            <SelectValue className={styles["contact__select-value"]} />
            <span className={styles["contact__select-icon"]} aria-hidden="true">
              <SelectCaretIcon />
            </span>
          </AriaButton>

          <Popover className={styles["contact__select-popover"]} offset={8}>
            <ListBox className={styles["contact__select-list"]}>
              {serviceOptions.map((option) => (
                <ListBoxItem
                  key={option.value}
                  id={option.value}
                  textValue={option.label}
                  className={styles["contact__select-option"]}
                >
                  {option.label}
                </ListBoxItem>
              ))}
            </ListBox>
          </Popover>
        </Select>
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
        <TextField
          name="message"
          isRequired
          isDisabled={isSending}
          value={values.message}
          onChange={(value) => setFieldValue("message", value)}
          isInvalid={messageState === "invalid"}
          aria-label="Message"
          minLength={MESSAGE_MIN_LENGTH}
          maxLength={MESSAGE_MAX_LENGTH}
        >
          <Label className={styles["contact__visually-hidden"]}>Message</Label>
          <TextArea
            className={styles.contact__textarea}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="I'd love to hear about your project. Share the details here...*"
            onBlur={() => markBlurred("message")}
          />
          <FieldError className={styles["contact__field-error"]}>
            {formatErrorMessage(errors.message)}
          </FieldError>
        </TextField>
      </ContactField>

      <Button
        type="submit"
        variant="primary"
        size="md"
        fullWidth
        className={styles.contact__submit}
        icon={<SubmitIcon />}
        iconPosition="left"
        isDisabled={isSending}
      >
        {isSending ? contactForm.sendingLabel : contactForm.submitLabel}
      </Button>
    </Form>
  );
}
