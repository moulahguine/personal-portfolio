"use client";

import { HiArrowRight, HiPlus } from "react-icons/hi2";
import { Button } from "@/components";
import type { ButtonSize, ButtonVariant } from "@/types";

import styles from "./page.module.scss";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

export default function DevButtonsPage() {
  return (
    <div className={styles.page}>
      <header className={styles.page__header}>
        <h1 className={styles.page__title}>Button styles</h1>
        <p className={styles.page__description}>
          Dev playground for all Button variants, sizes, and compositions.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Variants × sizes</h2>
        <div className={styles.matrix}>
          {VARIANTS.map((variant) => (
            <div className={styles.matrix__column} key={variant}>
              <h3 className={styles.matrix__label}>{variant}</h3>
              {SIZES.map((size) => (
                <Button key={size} variant={variant} size={size} label={size} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Label + icon</h2>
        <div className={styles.row}>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="md"
              label="Continue"
              icon={<HiArrowRight aria-hidden />}
            />
          ))}
        </div>
        <div className={styles.row}>
          {VARIANTS.map((variant) => (
            <Button
              key={`${variant}-right`}
              variant={variant}
              size="md"
              label="Add item"
              icon={<HiPlus aria-hidden />}
              iconPosition="right"
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Icon only</h2>
        <div className={styles.row}>
          {SIZES.map((size) => (
            <Button
              key={size}
              variant="ghost"
              size={size}
              aria-label={`Icon button ${size}`}
              icon={<HiPlus aria-hidden />}
            />
          ))}
        </div>
        <div className={styles.row}>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="md"
              aria-label={`${variant} icon button`}
              icon={<HiArrowRight aria-hidden />}
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Full width</h2>
        <div className={styles.stack}>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="md"
              label={`Full width ${variant}`}
              fullWidth
            />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section__title}>Disabled</h2>
        <div className={styles.row}>
          {VARIANTS.map((variant) => (
            <Button
              key={variant}
              variant={variant}
              size="md"
              label="Disabled"
              isDisabled
            />
          ))}
        </div>
        <div className={styles.row}>
          {VARIANTS.map((variant) => (
            <Button
              key={`${variant}-icon`}
              variant={variant}
              size="md"
              aria-label="Disabled icon button"
              icon={<HiPlus aria-hidden />}
              isDisabled
            />
          ))}
        </div>
      </section>
    </div>
  );
}
