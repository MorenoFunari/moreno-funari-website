import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogPageCopy, blogTopics } from "@/config/blog";

import styles from "./blog-topics-section.module.css";

export function BlogTopicsSection() {
  return (
    <section className={styles.band} aria-labelledby="blog-topics-title">
      <Container className={styles.inner}>
        <SectionHeading
          description={blogPageCopy.topics.description}
          eyebrow={blogPageCopy.topics.eyebrow}
          id="blog-topics-title"
          title={blogPageCopy.topics.title}
        />
        <div className={styles.grid}>
          {blogTopics.map((topic) => (
            <article className={styles.topic} key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
