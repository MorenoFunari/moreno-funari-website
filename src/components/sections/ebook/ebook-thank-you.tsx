"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

import styles from "./ebook-thank-you.module.css";

const redirectDelaySeconds = 3;

export function EbookThankYou() {
  const [seconds, setSeconds] = useState(redirectDelaySeconds);

  useEffect(() => {
    const countdown = window.setInterval(() => {
      setSeconds((current) => Math.max(0, current - 1));
    }, 1000);
    const redirect = window.setTimeout(() => {
      window.location.assign(siteConfig.ebookPdfPath);
    }, redirectDelaySeconds * 1000);

    return () => {
      window.clearInterval(countdown);
      window.clearTimeout(redirect);
    };
  }, []);

  return (
    <Container as="section" className={styles.section}>
      <div className={styles.panel}>
        <span className={styles.detail} aria-hidden="true" />
        <p className={styles.eyebrow}>Richiesta completata</p>
        <h1 className={styles.title}>Perfetto, la guida è pronta.</h1>
        <p className={styles.text}>
          Grazie per aver richiesto <strong>Un passo possibile</strong>. La
          guida si aprirà automaticamente tra {seconds} secondi.
        </p>
        <ButtonLink href={siteConfig.ebookPdfPath} size="large">
          Apri la guida
        </ButtonLink>
        <p className={styles.note}>
          Se non si apre automaticamente, usa il pulsante qui sopra.
        </p>
      </div>
    </Container>
  );
}
