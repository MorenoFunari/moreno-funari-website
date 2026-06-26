import type { ReactNode } from "react";

import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import styles from "./site-shell.module.css";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main-content">
        Salta al contenuto
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}
