import Link from "next/link";

import styles from "./placeholder-page.module.css";

type PlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PlaceholderPage({
  eyebrow,
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <article className={styles.card} aria-labelledby="placeholder-title">
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.title} id="placeholder-title">
            {title}
          </h1>
          <p className={styles.description}>{description}</p>
          <Link className={styles.homeLink} href="/">
            Torna alla homepage
          </Link>
        </article>
      </div>
    </main>
  );
}
