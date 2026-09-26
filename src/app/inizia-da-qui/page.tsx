import type { Metadata } from "next";

import { TrackedCtaLink } from "@/components/analytics/tracked-cta-link";
import { Container } from "@/components/ui/container";
import { SurfaceCard } from "@/components/ui/surface-card";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo/metadata";

import styles from "../conversion-page.module.css";

const paths = [
  { title: "Se vuoi leggere con calma", text: "Parti dagli articoli del blog. Trovi riflessioni semplici su blocco, pressione, fiducia, autocritica, lavoro, sport e vita quotidiana.", cta: "Leggi gli articoli", href: "/blog" },
  { title: "Se vuoi fare un esercizio da solo", text: "Usa Un Passo Possibile AI: una riflessione guidata per mettere ordine in una situazione concreta, senza dover risolvere tutto insieme.", cta: "Fai una riflessione guidata", href: siteConfig.appUrl, external: true },
  { title: "Se fai fatica a mettere confini", text: "Scarica la guida gratuita “Dire sempre sì ti sta costando più di quanto pensi”. È pensata per chi dice sì automaticamente e poi si ritrova stanco, pieno o in colpa.", cta: "Scarica la guida PASSO", href: "/passo" },
  { title: "Se vuoi portare una situazione reale", text: "Puoi candidarti al percorso pilota gratuito scrivendo o lasciando i tuoi dati. Moreno leggerà personalmente la richiesta e valuterà se il percorso può essere adatto.", cta: "Vai a CONFRONTO", href: "/confronto" },
] as const;

export const metadata: Metadata = createPageMetadata({ title: "Inizia da qui", description: "Uno spazio per orientarti tra articoli, risorse gratuite, riflessioni guidate e percorso pilota CONFRONTO.", path: "/inizia-da-qui" });

export default function IniziaDaQuiPage() {
  return <main className={styles.page} id="main-content">
    <section className={styles.hero}><Container className={styles.heroInner}>
      <p className={styles.eyebrow}>Inizia da qui</p>
      <h1>Non devi capire tutto subito. Parti dal punto in cui sei.</h1>
      <p>Questo spazio nasce per chi si sente bloccato, sotto pressione o confuso davanti a una situazione concreta. Non trovi promesse facili, ma strumenti semplici per fare chiarezza e scegliere un primo passo possibile.</p>
    </Container></section>
    <section className={`${styles.section} ${styles.muted}`} aria-labelledby="paths-title"><Container>
      <div className={styles.copy}><h2 id="paths-title">Scegli il punto di partenza più sostenibile</h2></div>
      <div className={styles.grid}>{paths.map((path) => <SurfaceCard className={styles.card} key={path.title}>
        <h3>{path.title}</h3><p>{path.text}</p><TrackedCtaLink eventName={path.href === "/confronto" ? "cta_click_confronto" : path.href === "/passo" ? "cta_click_passo" : "cta_click_inizia_da_qui"} external={"external" in path} href={path.href} location={`start_hub_${path.href}`}>{path.cta}</TrackedCtaLink>
      </SurfaceCard>)}</div>
    </Container></section>
    <section className={styles.closing}><Container className={styles.closingInner}><h2>Non serve scegliere il percorso perfetto.</h2><p>Scegli quello più sostenibile per te adesso. Anche questo è già un primo passo.</p></Container></section>
  </main>;
}
