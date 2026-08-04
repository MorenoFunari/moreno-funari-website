import { LeadMagnetTrackedLink } from "./lead-magnet-tracked-link";
import styles from "./lead-magnet-banner.module.css";

export type LeadMagnetBannerProps = {
  placement: string;
  sourcePath: string;
  variant?: "blog" | "coaching";
};

const destination = "/guida-dire-sempre-si";

export function LeadMagnetBanner({
  placement,
  sourcePath,
  variant = "blog",
}: LeadMagnetBannerProps) {
  const titleId = `lead-magnet-banner-${placement}`;

  return (
    <aside
      aria-labelledby={titleId}
      className={`${styles.banner} ${styles[variant]}`}
    >
      <span aria-hidden="true" className={styles.accent} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Guida gratuita</p>
        <h2 className={styles.title} id={titleId}>
          Ti capita di dire sì anche quando avresti bisogno di fermarti?
        </h2>
        <p className={styles.description}>
          Ho preparato una guida pratica gratuita per iniziare a mettere piccoli
          confini senza sentirti egoista.
        </p>
      </div>
      <LeadMagnetTrackedLink
        className={styles.cta}
        destination={destination}
        placement={placement}
        sourcePath={sourcePath}
      />
    </aside>
  );
}
