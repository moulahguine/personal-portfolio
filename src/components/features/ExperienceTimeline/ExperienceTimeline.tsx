import Image from "next/image";
import { HiChevronDown } from "react-icons/hi";
import {
  DisclosureAccordion,
  DisclosureAccordionButton,
  DisclosureAccordionHeading,
  DisclosureAccordionItem,
  DisclosureAccordionPanel,
} from "@/components";
import { experience } from "@/data";
import type { ExperienceEntry } from "@/data";

import styles from "./ExperienceTimeline.module.scss";

const { upwork, atlasUniversity, nisantasi } = experience.items;

const entries: ExperienceEntry[] = [upwork, atlasUniversity, nisantasi];

export default function ExperienceTimeline() {
  return (
    <DisclosureAccordion
      className={styles.timeline}
      defaultExpandedKeys={[upwork.id]}
      allowsMultipleExpanded={false}
    >
      {entries.map((entry) => {
        const canExpand = Boolean(entry.details?.length);

        // ---- Track is the line that connects the dots ----
        const track = (
          <div className={styles.timeline__track} aria-hidden="true">
            <span className={styles.timeline__dot} />
          </div>
        );

        // ---- Header is used in both static and expandable cards ----
        const header = (
          <>
            {/* --- logo of the organization --- */}
            <div className={styles.timeline__media}>
              <Image
                src={entry.logo}
                alt=""
                width={50}
                height={50}
                preload
                className={styles["timeline__media-logo"]}
              />
            </div>

            <div className={styles.timeline__content}>
              {/* --- role and major of the entry --- */}
              <div className={styles.timeline__info}>
                <h3
                  className={styles.timeline__role}
                  id={`${entry.id}-role`}
                  aria-label={`${entry.role} ${entry.major ? `major in ${entry.major}` : ""}, at ${entry.organization}`}
                >
                  {entry.role}
                  {entry.role && entry.major && ", "}
                  {entry.major && (
                    <span className={styles.timeline__major}>
                      {entry.major}
                    </span>
                  )}
                </h3>

                {entry.organization && (
                  <span className={styles.timeline__organization}>
                    {entry.organization}
                  </span>
                )}
              </div>

              {/* --- period and location of the entry --- */}
              <div
                className={styles.timeline__meta}
                aria-label={`${entry.period.start} - ${entry.period.end} in ${entry.location}`}
              >
                <span className={styles.timeline__period}>
                  {entry.period.start} - {entry.period.end}
                </span>
                <span className={styles.timeline__location}>
                  {entry.location}
                </span>
              </div>
            </div>

            {/* --- chevron icon --- */}
            {canExpand ? (
              <HiChevronDown
                className={styles.timeline__chevron}
                aria-hidden="true"
              />
            ) : null}
          </>
        );

        // ---- if the entry is not expandable, show the static card ----
        if (!canExpand) {
          return (
            <div key={entry.id} className={styles.timeline__item}>
              {track}

              <article
                className={`${styles.timeline__card} ${styles["timeline__card--static"]}`}
              >
                <div
                  className={`${styles.timeline__trigger} ${styles["timeline__trigger--static"]}`}
                >
                  {header}
                </div>
              </article>
            </div>
          );
        }

        // ---- if the entry is expandable, show the expandable card ----
        return (
          <DisclosureAccordionItem
            key={entry.id}
            id={entry.id}
            className={styles.timeline__item}
          >
            {track}

            <article className={styles.timeline__card}>
              <DisclosureAccordionHeading className={styles.timeline__heading}>
                <DisclosureAccordionButton
                  className={styles.timeline__trigger}
                  aria-labelledby={`${entry.id}-role`}
                >
                  {header}
                </DisclosureAccordionButton>
              </DisclosureAccordionHeading>

              <DisclosureAccordionPanel className={styles.timeline__panel}>
                <ul className={styles.timeline__details}>
                  {entry.details!.map((detail) => (
                    <li key={detail} className={styles.timeline__detail}>
                      {detail}
                    </li>
                  ))}
                </ul>
              </DisclosureAccordionPanel>
            </article>
          </DisclosureAccordionItem>
        );
      })}
    </DisclosureAccordion>
  );
}
