import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import styles from "../conversion-page.module.css";

export const metadata: Metadata = createPageMetadata({ title: "Guida in arrivo", description: "Conferma di richiesta della guida gratuita PASSO.", path: "/grazie-passo", noIndex: true });
export default function GraziePassoPage() { return <main className={styles.page} id="main-content"><section className={styles.hero}><Container className={styles.heroInner}><p className={styles.eyebrow}>PASSO</p><h1>Controlla la tua email: la guida sta arrivando.</h1><p>Ti ho inviato la guida “Dire sempre sì ti sta costando più di quanto pensi”. Prendila con calma: non è un manuale per diventare rigido, ma uno spazio per osservare dove stai dicendo sì anche quando dentro senti altro.</p><p>Se mentre la leggi ti accorgi che c’è una situazione concreta che vuoi guardare meglio, puoi tornare qui e scrivere CONFRONTO.</p><div className={styles.actions}><ButtonLink href="/confronto">Scopri il percorso pilota</ButtonLink><ButtonLink href="/inizia-da-qui" variant="secondary">Torna a Inizia da qui</ButtonLink></div></Container></section></main>; }
