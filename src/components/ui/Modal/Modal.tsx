"use client";

import { useContext, useId } from "react";
import { HiXMark } from "react-icons/hi2";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useIsPresent,
} from "motion/react";
import {
  Dialog,
  DialogTrigger,
  Modal as RACModal,
  ModalOverlay,
  OverlayTriggerStateContext,
} from "react-aria-components";
import { Button } from "@/components";
import type { ModalProps } from "@/types";

import styles from "./Modal.module.scss";

export { DialogTrigger };

// ---- motion components ----
const MotionModalOverlay = motion.create(ModalOverlay);
const MotionDialog = motion.create(Dialog);

// ---- motion transitions ----
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const LAYOUT_TRANSITION = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 1,
} as const;

// ---- this is for the modal content ----
const PANEL_MOTION = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT_EXPO },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
};

const CONTENT_MOTION = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { delay: 0.2, duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// ---- modal ----
export default function Modal(props: ModalProps) {
  const triggerState = useContext(OverlayTriggerStateContext);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {triggerState?.isOpen ? (
          <ModalContent {...props} onClose={triggerState.close} />
        ) : null}
      </AnimatePresence>
    </MotionConfig>
  );
}

// ---- modal content ----
function ModalContent({
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
  layoutId,
  onClose,
}: ModalProps & { onClose: () => void }) {
  const isPresent = useIsPresent();
  const titleId = useId();
  const descriptionId = useId();
  const hasHeader = showHeader ?? Boolean(icon || title || description);
  const isExpanding = Boolean(layoutId);
  const contentMotion = isExpanding ? CONTENT_MOTION : {};

  return (
    <MotionModalOverlay
      isOpen
      isExiting={!isPresent}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
      isDismissable={isDismissable}
      className={styles.modal__overlay}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.3, ease: EASE_OUT_EXPO },
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <RACModal className={styles.modal__shell}>
        <MotionDialog
          aria-label={!title ? ariaLabel : undefined}
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={`${styles.modal__dialog} ${styles[`modal__dialog--size-${size}`]} ${className}`}
          layoutId={layoutId}
          layoutCrossfade={false}
          transition={LAYOUT_TRANSITION}
          {...(isExpanding ? {} : PANEL_MOTION)}
        >
          {hasHeader ? (
            <header className={styles.modal__header}>
              <div className={styles["modal__header-content"]}>
                {icon ? (
                  <motion.span
                    layoutId={layoutId && `${layoutId}-icon`}
                    layoutCrossfade={false}
                    transition={LAYOUT_TRANSITION}
                    className={styles["modal__header-content--icon"]}
                    style={{ color: iconColor }}
                    aria-hidden="true"
                  >
                    {icon}
                  </motion.span>
                ) : null}

                {title || description ? (
                  <div className={styles["modal__header-content--text"]}>
                    {title ? (
                      <motion.h2
                        layoutId={layoutId && `${layoutId}-title`}
                        layoutCrossfade={false}
                        transition={LAYOUT_TRANSITION}
                        id={titleId}
                        className={styles["modal__header-content--title"]}
                      >
                        {title}
                      </motion.h2>
                    ) : null}
                    {description ? (
                      <motion.p
                        id={descriptionId}
                        className={styles["modal__header-content--description"]}
                        {...contentMotion}
                      >
                        {description}
                      </motion.p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <motion.div {...contentMotion}>
                <Button
                  onPress={onClose}
                  variant="secondary"
                  size="sm"
                  aria-label="Close"
                  icon={<HiXMark fontSize={25} aria-hidden="true" />}
                />
              </motion.div>
            </header>
          ) : null}

          <motion.div
            className={styles.modal__body}
            {...(hasHeader ? contentMotion : {})}
          >
            {typeof children === "function"
              ? children({ close: onClose })
              : children}
          </motion.div>
        </MotionDialog>
      </RACModal>
    </MotionModalOverlay>
  );
}
