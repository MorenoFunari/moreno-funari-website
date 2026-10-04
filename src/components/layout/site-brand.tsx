import Image from "next/image";
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
      <Image
        aria-hidden="true"
        className={styles.mark}
        src="/images/brand/logo-mf-icon.png"
        alt=""
        width={64}
        height={64}
      />
      <span className={styles.wordmark}>
        <span className={styles.name}>Moreno Funari</span>
        <span className={styles.role}>Mental Coach</span>
      </span>
    </Link>
  );
}
