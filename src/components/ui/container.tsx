import type { ReactNode } from "react";

import styles from "./container.module.css";

type ContainerElement = "div" | "section" | "article" | "nav";

type ContainerProps = {
  as?: ContainerElement;
  children: ReactNode;
  className?: string;
  id?: string;
  size?: "standard" | "wide";
  "aria-labelledby"?: string;
};

export function Container({
  as: Component = "div",
  children,
  className,
  id,
  size = "standard",
  "aria-labelledby": ariaLabelledby,
}: ContainerProps) {
  const classNames = [
    styles.container,
    size === "wide" ? styles.wide : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classNames} id={id} aria-labelledby={ariaLabelledby}>
      {children}
    </Component>
  );
}
