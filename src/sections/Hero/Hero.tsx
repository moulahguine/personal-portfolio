import Image from "next/image";
import {
  Button,
  Link,
  Modal,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuItem,
  MenuTrigger,
} from "@/components";
import HeroMap from "./HeroMap";
import { HERO_DATA } from "@/data";

import styles from "./Hero.module.scss";

// ---- hero ----
export default function Hero() {
  const {
    headingId,
    profilePhotoSrc,
    shareIcon: ShareIcon,
    profileInfo: {
      name,
      role,
      techStack,
      location,
      origin,
      badgeIcon: BadgeIcon,
      locationIcon: LocationIcon,
    },
    socialLinks,
    resume: { href, fileName, downloadIcon: DownloadIcon },
  } = HERO_DATA;

  return (
    <section className={styles.hero} aria-labelledby={headingId}>
      <div className={styles.hero__container}>
        {/* ---- map banner ---- */}
        <div className={styles.hero__banner}>
          <HeroMap className={styles.hero__map} />
        </div>

        {/* ---- profile information ---- */}
        <div className={styles.hero__content}>
          {/* ---- avatar ---- */}
          <div className={styles["hero__avatar"]}>
            <DialogTrigger>
              <Button
                className={styles["hero__avatar-image"]}
                variant="ghost"
                aria-label={`View larger photo of ${name}`}
              >
                <Image
                  src={profilePhotoSrc}
                  alt={`Portrait of ${name}`}
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 768px) 150px, 200px"
                  className={styles["hero__avatar-image--small"]}
                />
              </Button>

              <Modal
                size="fit"
                showHeader={false}
                className={styles["hero__avatar-modal"]}
                aria-label={`${name} — full-size profile photo`}
              >
                <Image
                  src={profilePhotoSrc}
                  alt={`Portrait of ${name}`}
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 768px) 200px, 300px"
                  className={styles["hero__avatar-image--large"]}
                />
              </Modal>
            </DialogTrigger>
          </div>

          {/* ---- profile information ---- */}
          <div className={styles.hero__info}>
            <h1
              id={headingId}
              className={styles["hero__info-name"]}
              aria-label={name}
            >
              {name}
              <span className={styles["hero__info-icon"]} aria-hidden="true">
                <BadgeIcon className={styles["hero__info-icon__badge"]} />
              </span>
            </h1>

            <p className={styles["hero__info-role"]}>
              {role}
              <span
                className={styles["hero__info-separator"]}
                aria-hidden="true"
              >
                |
              </span>
              {techStack.join(" · ")}
            </p>

            <address className={styles["hero__info-location"]}>
              <span className={styles["hero__info-icon"]} aria-hidden="true">
                <LocationIcon className={styles["hero__info-icon__location"]} />
              </span>
              {`${location} (from ${origin})`}
            </address>
          </div>

          {/* ---- actions ---- */}
          <div className={styles.hero__actions}>
            {/* ---- resume ---- */}
            <Link
              href={href}
              download={fileName}
              variant="primary"
              size="lg"
              className={styles["hero__resume-link"]}
              aria-label="Download resume (PDF)"
              icon={
                <DownloadIcon
                  className={styles.hero__icon__resume}
                  aria-hidden="true"
                />
              }
              label="Resume"
            />

            {/* ---- share ---- */}
            <MenuTrigger>
              <Button
                variant="secondary"
                size="lg"
                className={styles["hero__share-trigger"]}
                aria-label="Connect with me"
                icon={
                  <ShareIcon
                    aria-hidden="true"
                    className={styles["hero__share-trigger-icon"]}
                  />
                }
              />

              <DropdownMenu
                aria-label="Share links"
                placement="bottom end"
                className={styles["hero__share-menu"]}
                offset={10}
              >
                {socialLinks.map(
                  ({
                    id,
                    label,
                    href: socialHref,
                    external,
                    icon: SocialLinkIcon,
                  }) => (
                    <DropdownMenuItem
                      key={id}
                      id={id}
                      href={socialHref}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={styles["hero__share-menu-item"]}
                    >
                      <SocialLinkIcon aria-hidden="true" />
                      {label}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenu>
            </MenuTrigger>
          </div>
        </div>
      </div>
    </section>
  );
}
