import type { Metadata } from "next";
import Link from "next/link";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/surface-card";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../conversion-page.module.css";

const brevoFormUrl = "https://4ae90352.sibforms.com/v2/serve/MUIFAF3R0KInBJVk_kmECZkaXzq2_daQViUFZkWFOCEtwGcMkyR0o_4B94Aub0MSG4ZB_Gbj_azBiW2IZk_W0d6sDsAOY9aQCVvxc8sKrG4dKp3cMdtJ-DiFH5PSmDmEW3iO7KURNoxN512-jmOyhkLsMkIzBDHs7g6LCpFiZIceKiHRasW1A5u6abNZ1lD7NsiPHYLqrOdHoIqvRQ==";

// TODO(Brevo): set the successful form submission redirect to /grazie-passo
// and emit passo_form_submit from the Brevo confirmation flow.

export const metadata: Metadata = createPageMetadata({ title: "Dire sempre sì ti sta costando più di quanto pensi", description: "Scarica la guida gratuita in 5 passi per iniziare a mettere confini senza sentirti egoista.", path: "/passo", absoluteTitle: true });

export default function PassoPage() { return <main className={styles.page} id="main-content">
  <section className={styles.hero}><Container className={styles.heroInner}><p className={styles.eyebrow}>Guida gratuita PASSO</p><h1>Dire sempre sì ti sta costando più di quanto pensi</h1><p>Una guida gratuita in 5 passi per iniziare a mettere confini senza sentirti egoista.</p><div className={styles.actions}><TrackedCtaLink eventName="cta_click_passo" external href={brevoFormUrl} location="passo_hero" size="large">Ricevi la guida gratuita</TrackedCtaLink></div></Container></section>
  <section className={`${styles.section} ${styles.muted}`}><Container><div className={styles.copy}><h2>Quando il sì diventa automatico</h2><p>A volte non dici sì perché vuoi davvero. Dici sì perché ti sembra più semplice, perché non vuoi creare problemi, perché hai paura di deludere, perché ormai ti viene automatico.</p><p>Il punto è che ogni sì detto contro di te lascia qualcosa addosso: stanchezza, nervosismo, distanza, pressione, senso di colpa.</p><p>Questa guida non ti chiede di diventare duro o distante. Ti aiuta solo a fermarti un attimo prima di rispondere, per capire se quel sì è davvero tuo.</p></div></Container></section>
  <section className={styles.section}><Container><div className={styles.copy}><h2>Cosa trovi dentro</h2></div><ul className={styles.list}><li>5 passaggi semplici</li><li>Domande pratiche</li><li>Esempi di vita reale</li><li>Uno spazio per riconoscere i sì automatici</li><li>Un primo passo per mettere un confine sostenibile</li></ul><SurfaceCard className={styles.card}><h3>Ricevi la guida gratuita</h3><p>Ti chiedo solo i dati necessari per inviarti la guida. Potrai leggere tutto con calma e decidere tu se restare in contatto.</p><TrackedCtaLink eventName="cta_click_passo" external href={brevoFormUrl} location="passo_form_fallback" size="large">Apri il modulo sicuro Brevo</TrackedCtaLink><p>Il modulo è gestito da Brevo. Leggi la <Link href="/privacy-policy">Privacy Policy</Link>.</p></SurfaceCard></Container></section>
  <section className={styles.closing}><Container className={styles.closingInner}><h2>Dire no non significa smettere di esserci per gli altri.</h2><p>A volte significa solo tornare a esserci anche per te.</p><div className={styles.actions}><ButtonLink href="/confronto" variant="secondary">Scopri il percorso pilota</ButtonLink></div></Container></section>
</main>; }
