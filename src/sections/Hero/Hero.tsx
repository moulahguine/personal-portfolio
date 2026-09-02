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
import { HERO_DATA, SOCIAL_LINKS } from "@/data";

import styles from "./Hero.module.scss";

// ---- hero ----
export default function Hero() {
  const {
    profilePhotoSrc,
    connectIcon: ConnectIcon,
    profileInfo: {
      name,
      role,
      techStack,
      location,
      origin,
      badgeIcon: BadgeIcon,
      locationIcon: LocationIcon,
    },
    resume: { href, fileName, downloadIcon: DownloadIcon },
  } = HERO_DATA;

  return (
    <section className={styles.hero} aria-label="Hero section">
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
                className={styles["hero__avatar-media"]}
                variant="ghost"
                aria-label={`View larger photo of ${name}`}
              >
                <Image
                  src={profilePhotoSrc}
                  alt={`Portrait of ${name}`}
                  preload
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 200px"
                  className={styles["hero__avatar-media--small"]}
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className={styles["hero__avatar-media--large"]}
                />
              </Modal>
            </DialogTrigger>
          </div>

          {/* ---- profile information ---- */}
          <div className={styles.hero__info}>
            <h1 className={styles["hero__info-name"]} aria-label={name}>
              {name}
              <span
                className={styles["hero__info-name--icon"]}
                aria-hidden="true"
              >
                <BadgeIcon
                  className={styles["hero__info-name--icon---badge"]}
                />
              </span>
            </h1>

            <p className={styles["hero__info-role"]}>
              {role}
              <span
                className={styles["hero__info-role--separator"]}
                aria-hidden="true"
              >
                |
              </span>
              {techStack.join(" · ")}
            </p>

            <address className={styles["hero__info-location"]}>
              <span
                className={styles["hero__info-location--icon"]}
                aria-hidden="true"
              >
                <LocationIcon />
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
              className={styles["hero__actions-resume"]}
              aria-label="Download resume (PDF)"
              icon={<DownloadIcon />}
              label="Resume"
            />

            {/* ---- share ---- */}
            <MenuTrigger>
              <Button
                variant="secondary"
                size="lg"
                className={styles["hero__actions-connect--trigger"]}
                aria-label="Connect with me"
                icon={
                  <ConnectIcon
                    className={styles["hero__actions-connect--trigger---icon"]}
                  />
                }
              />

              <DropdownMenu
                aria-label="Connect with me"
                placement="bottom end"
                className={styles["hero__actions-connect--menu"]}
                offset={10}
              >
                {SOCIAL_LINKS.map(
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
                      className={styles["hero__actions-connect--menu---item"]}
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
