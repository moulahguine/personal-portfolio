"use client";

import { useId } from "react";
import { HiXMark } from "react-icons/hi2";
import {
  Dialog,
  DialogTrigger,
  Modal as RACModal,
  ModalOverlay,
} from "react-aria-components";
import { Button } from "@/components";
import type { ModalProps } from "@/types";

import styles from "./Modal.module.scss";

export { DialogTrigger };

// ---- modal ----
export default function Modal({
  children,
  size = "md",
  icon,
  iconColor,
  title,
  description,
  showHeader,
  "aria-label": ariaLabel,
  className = "",
  isDismissable = true,
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const hasHeader = showHeader ?? Boolean(icon || title || description);

  const dialogClassNames = [
    styles.modal__dialog,
    styles[`modal__dialog--size-${size}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <ModalOverlay
      className={styles.modal__overlay}
      isDismissable={isDismissable}
    >
      <RACModal className={styles.modal__shell}>
        <Dialog
          aria-label={!title ? ariaLabel : undefined}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={dialogClassNames}
        >
          {({ close }) => (
            <>
              {hasHeader ? (
                <header className={styles.modal__header}>
                  <div className={styles["modal__header-content"]}>
                    {icon ? (
                      <span
                        className={styles["modal__header-content--icon"]}
                        style={{ color: iconColor }}
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                    ) : null}

                    {title || description ? (
                      <div className={styles["modal__header-content--text"]}>
                        {title ? (
                          <h2
                            id={titleId}
                            className={styles["modal__header-content--title"]}
                          >
                            {title}
                          </h2>
                        ) : null}
                        {description ? (
                          <p
                            id={descriptionId}
                            className={
                              styles["modal__header-content--description"]
                            }
                          >
                            {description}
                          </p>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <Button
                    onPress={close}
                    variant="ghost"
                    size="lg"
                    aria-label="Close"
                    icon={
                      <HiXMark
                        className={styles["modal__header-close--icon"]}
                        aria-hidden="true"
                      />
                    }
                  />
                </header>
              ) : null}

              <div className={styles.modal__body}>
                {typeof children === "function"
                  ? children({ close })
                  : children}
              </div>
            </>
          )}
        </Dialog>
      </RACModal>
    </ModalOverlay>
  );
}
