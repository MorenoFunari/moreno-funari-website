import type { ReactNode } from "react";

import styles from "./reflection-prompt.module.css";

type ReflectionPromptProps = {
  children: ReactNode;
  title: string;
};

export function ReflectionPrompt({ children, title }: ReflectionPromptProps) {
  return (
    <aside className={styles.prompt}>
      <p className={styles.title}>{title}</p>
      <div className={styles.body}>{children}</div>
    </aside>
  );
}
