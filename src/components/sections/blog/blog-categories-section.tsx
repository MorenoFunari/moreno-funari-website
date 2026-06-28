import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogCategories } from "@/config/blog-categories";
import { blogPageCopy } from "@/config/blog";

import styles from "./blog-categories-section.module.css";

export function BlogCategoriesSection() {
  return (
    <section className={styles.band} aria-labelledby="blog-categories-title">
      <Container className={styles.inner}>
        <SectionHeading
          description={blogPageCopy.categories.description}
          eyebrow={blogPageCopy.categories.eyebrow}
          id="blog-categories-title"
          title={blogPageCopy.categories.title}
        />
        <ul className={styles.grid}>
          {blogCategories.map((category) => (
            <li className={styles.category} key={category.slug}>
              <h3>{category.label}</h3>
              <p>{category.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
