import Link from "next/link";

import { AnalyticsPreferencesButton } from "@/components/analytics/analytics-preferences-button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import { SiteBrand } from "./site-brand";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container size="wide">
        <div className={styles.inner}>
          <div className={styles.identity}>
            <SiteBrand variant="footer" />
            <p className={styles.tagline}>
              Piccoli passi concreti per fare chiarezza.
            </p>
          </div>

          <div className={styles.columns}>
            <nav aria-labelledby="footer-navigation-title">
              <h2 className={styles.columnTitle} id="footer-navigation-title">
                Navigazione
              </h2>
              <ul className={styles.list}>
                {siteConfig.footerNavigation.map((item) => (
                  <li key={item.href}>
                    <Link className={styles.link} href={item.href}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <section aria-labelledby="footer-resources-title">
              <h2 className={styles.columnTitle} id="footer-resources-title">
                Risorse
              </h2>
              <ul className={styles.list}>
                <li>
                  <a className={styles.link} href={siteConfig.appUrl}>
                    Un Passo Possibile AI
                  </a>
                </li>
                <li>
                  <a
                    className={styles.link}
                    href={`mailto:${siteConfig.email}`}
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a className={styles.link} href={siteConfig.instagramUrl}>
                    Instagram
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>

        <div className={styles.legal}>
          <p>© {year} Moreno Funari. Tutti i diritti riservati.</p>
          <nav aria-label="Link legali e preferenze">
            <ul className={styles.legalLinks}>
              {siteConfig.legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link className={styles.legalLink} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <AnalyticsPreferencesButton />
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
