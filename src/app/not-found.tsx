import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page} id="main-content">
      <section className={styles.content} aria-labelledby="not-found-title">
        <p className={styles.code}>404</p>
        <h1 className={styles.title} id="not-found-title">
          Questa strada non porta da nessuna parte.
        </h1>
        <p className={styles.description}>
          Può succedere di prendere una direzione che non era quella giusta.
          Torniamo a un punto conosciuto e ripartiamo da lì.
        </p>
        <Link className={styles.homeLink} href="/">
          Torna alla homepage
        </Link>
      </section>
    </main>
  );
}
