import type { ReactNode } from "react";

import styles from "./callout.module.css";

type CalloutProps = {
  children: ReactNode;
  title?: string;
};

export function Callout({ children, title }: CalloutProps) {
  return (
    <aside className={styles.callout}>
      {title ? <p className={styles.title}>{title}</p> : null}
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
