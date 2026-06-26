import Link from "next/link";
import type { MouseEventHandler, ReactNode } from "react";

import styles from "./button-link.module.css";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
  external?: boolean;
  fullWidth?: boolean;
  iconAfter?: ReactNode;
  iconBefore?: ReactNode;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLAnchorElement | HTMLSpanElement>;
  size?: "medium" | "large";
  target?: "_blank" | "_self";
  variant?: "primary" | "secondary" | "ghost" | "text";
};

export function ButtonLink({
  href,
  children,
  ariaLabel,
  className,
  external = false,
  fullWidth = false,
  iconAfter,
  iconBefore,
  isDisabled = false,
  onClick,
  size = "medium",
  target,
  variant = "primary",
}: ButtonLinkProps) {
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : undefined,
    isDisabled ? styles.disabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {iconBefore ? <span className={styles.icon}>{iconBefore}</span> : null}
      <span>{children}</span>
      {iconAfter ? <span className={styles.icon}>{iconAfter}</span> : null}
    </>
  );

  if (isDisabled) {
    return (
      <span
        aria-disabled="true"
        aria-label={ariaLabel}
        className={classNames}
        onClick={onClick}
        role="link"
        tabIndex={-1}
      >
        {content}
      </span>
    );
  }

  const rel = external && target === "_blank" ? "noopener noreferrer" : undefined;

  if (external) {
    return (
      <a
        aria-label={ariaLabel}
        className={classNames}
        href={href}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
        rel={rel}
        target={target}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      aria-label={ariaLabel}
      className={classNames}
      href={href}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
    >
      {content}
    </Link>
  );
}
