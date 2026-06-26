import type { ReactNode } from "react";

import { Eyebrow } from "./eyebrow";
import styles from "./section-heading.module.css";

type HeadingLevel = "h1" | "h2" | "h3";

type SectionHeadingProps = {
  alignment?: "left" | "center";
  className?: string;
  description?: ReactNode;
  eyebrow?: string;
  id?: string;
  level?: HeadingLevel;
  title: ReactNode;
};

export function SectionHeading({
  alignment = "left",
  className,
  description,
  eyebrow,
  id,
  level: Heading = "h2",
  title,
}: SectionHeadingProps) {
  const classNames = [
    styles.sectionHeading,
    alignment === "center" ? styles.center : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames}>
      {eyebrow ? <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow> : null}
      <Heading className={styles.title} id={id}>
        {title}
      </Heading>
      {description ? (
        <p className={styles.description}>{description}</p>
      ) : null}
    </div>
  );
}
