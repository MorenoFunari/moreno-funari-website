import Link from "next/link";

import styles from "./site-brand.module.css";

type SiteBrandProps = {
  variant?: "header" | "footer";
};

export function SiteBrand({ variant = "header" }: SiteBrandProps) {
  const classNames = [
    styles.brand,
    variant === "footer" ? styles.footer : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={classNames} href="/" aria-label="Moreno Funari homepage">
      <span className={styles.name}>Moreno Funari</span>
      <span className={styles.role}>Mental Coach</span>
    </Link>
  );
}
