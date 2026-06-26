import Image from "next/image";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { resources } from "@/config/home";

import styles from "./resources-section.module.css";

export function ResourcesSection() {
  return (
    <Container
      as="section"
      aria-labelledby="resources-title"
      className={styles.section}
    >
      <SectionHeading
        eyebrow="Strumenti per iniziare"
        id="resources-title"
        title="Puoi partire anche in autonomia."
        description="Due modi diversi per fermarti, riflettere e iniziare a mettere ordine nei pensieri."
      />

      <div className={styles.grid}>
        {resources.map((resource) => (
          <SurfaceCard
            as="article"
            className={styles.card}
            key={resource.title}
            variant="muted"
          >
            <div
              className={`${styles.media} ${
                resource.image.variant === "cover"
                  ? styles.coverMedia
                  : styles.screenMedia
              }`}
            >
              <Image
                alt={resource.image.alt}
                className={`${styles.mediaImage} ${
                  resource.image.variant === "cover"
                    ? styles.coverImage
                    : styles.screenImage
                }`}
                fill
                sizes="(max-width: 759px) calc(100vw - 3rem), 36vw"
                src={resource.image.src}
              />
            </div>
            <h3 className={styles.cardTitle}>{resource.title}</h3>
            <p className={styles.cardText}>{resource.description}</p>
            {resource.note ? <p className={styles.note}>{resource.note}</p> : null}
            <ButtonLink
              className={styles.cardLink}
              external={resource.external}
              href={resource.href}
              variant="text"
            >
              {resource.cta}
            </ButtonLink>
          </SurfaceCard>
        ))}
      </div>
    </Container>
  );
}
