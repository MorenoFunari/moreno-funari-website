import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";
import { blogPageCopy, blogResourceItems } from "@/config/blog";
import { siteConfig } from "@/config/site";

import styles from "./blog-resources-section.module.css";

export function BlogResourcesSection() {
  return (
    <Container
      as="section"
      aria-labelledby="blog-resources-title"
      className={styles.section}
    >
      <SectionHeading
        description={blogPageCopy.resources.description}
        eyebrow={blogPageCopy.resources.eyebrow}
        id="blog-resources-title"
        title={blogPageCopy.resources.title}
      />
      <div className={styles.grid}>
        {blogResourceItems.map((item) => {
          const href = item.href === "app" ? siteConfig.appUrl : item.href;
          const isExternal = href === siteConfig.appUrl;

          return (
            <SurfaceCard
              as="article"
              className={styles.card}
              key={item.title}
              variant="default"
            >
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardText}>{item.description}</p>
              {"note" in item ? <p className={styles.note}>{item.note}</p> : null}
              <ButtonLink
                className={styles.cardLink}
                external={isExternal}
                href={href}
                variant="text"
              >
                {item.cta}
              </ButtonLink>
            </SurfaceCard>
          );
        })}
      </div>
    </Container>
  );
}
