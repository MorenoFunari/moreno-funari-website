import type { ReactNode } from "react";

import styles from "./eyebrow.module.css";

type EyebrowProps = {
  as?: "p" | "span";
  children: ReactNode;
  className?: string;
  variant?: "default" | "light";
};

export function Eyebrow({
  as: Component = "p",
  children,
  className,
  variant = "default",
}: EyebrowProps) {
  const classNames = [
    styles.eyebrow,
    variant === "light" ? styles.light : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classNames}>{children}</Component>;
}
