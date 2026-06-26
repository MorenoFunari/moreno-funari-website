import type { ReactNode } from "react";

import styles from "./surface-card.module.css";

type SurfaceCardProps = {
  as?: "div" | "article" | "section";
  children: ReactNode;
  className?: string;
  variant?: "default" | "muted" | "outlined" | "dark";
  "aria-labelledby"?: string;
};

export function SurfaceCard({
  as: Component = "div",
  children,
  className,
  variant = "default",
  "aria-labelledby": ariaLabelledby,
}: SurfaceCardProps) {
  const classNames = [styles.card, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} aria-labelledby={ariaLabelledby}>
      {children}
    </Component>
  );
}
