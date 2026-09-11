import { ebookDownload } from "@/config/ebook";

import styles from "./ebook-download-link.module.css";

type EbookDownloadLinkProps = {
  className?: string;
  variant?: "primary" | "ghost";
};

export function EbookDownloadLink({
  className,
  variant = "primary",
}: EbookDownloadLinkProps) {
  const classNames = [styles.link, styles[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classNames} href={ebookDownload.href}>
      <span>{ebookDownload.label}</span>
    </a>
  );
}
