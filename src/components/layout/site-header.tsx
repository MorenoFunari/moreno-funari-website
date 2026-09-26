import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";
import { SiteBrand } from "./site-brand";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner} size="wide">
        <SiteBrand />
        <DesktopNavigation />
        <div className={styles.desktopAction}>
          <ButtonLink href="/confronto">CONFRONTO</ButtonLink>
        </div>
        <MobileNavigation />
      </Container>
    </header>
  );
}
