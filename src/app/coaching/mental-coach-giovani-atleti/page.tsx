import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { GiovaniAtletiLeadForm } from "@/components/forms/giovani-atleti-lead-form";
import { athleteSections, athleteFaqs } from "@/config/giovani-atleti-content";
import { athleteTitle, athleteDescription, athletePath, athletePublicationReady } from "@/config/giovani-atleti";
import { createPageMetadata } from "@/lib/seo/metadata";
import { createAthleteJsonLd } from "@/lib/seo/giovani-atleti";
import { toAbsoluteUrl } from "@/config/seo";
import faq from "@/components/sections/coaching/coaching-faq-section.module.css";
import styles from "./page.module.css";

const base = createPageMetadata({ title: athleteTitle, absoluteTitle: true, description: athleteDescription, path: athletePath, noIndex: !athletePublicationReady || process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development" });
export const metadata: Metadata = {
  ...base,
  openGraph: { ...base.openGraph, images: [{ url: toAbsoluteUrl(`${athletePath}/opengraph-image`), width: 1200, height: 630, alt: "Mental coaching sportivo per giovani atleti | Moreno Funari" }] },
  twitter: { ...base.twitter, card: "summary_large_image", images: [toAbsoluteUrl(`${athletePath}/opengraph-image`)] },
};

type Block = { readonly type: string; readonly text?: string; readonly items?: readonly string[] };
function Blocks({ blocks, cards = false }: { blocks: readonly Block[]; cards?: boolean }) {
  return <div className={styles.copy}>{blocks.map((b, i) => {
    if (b.type === "heading") return <h3 key={i}>{b.text}</h3>;
    if (b.items) { const Tag = b.type === "ordered" ? "ol" : "ul"; return <Tag key={i} className={cards ? styles.cards : styles.list}>{b.items.map(t => <li key={t}>{t}</li>)}</Tag>; }
    return <p key={i}>{b.text}</p>;
  })}</div>;
}
export default function GiovaniAtletiPage() {
  const hero = athleteSections[0];
  return <main id="main-content" className={styles.page}>
    <JsonLd data={createAthleteJsonLd()} />
    <Container as="section" className={styles.hero} aria-labelledby="athlete-title">
      <div><h1 id="athlete-title">{hero.title}</h1><Blocks blocks={hero.blocks} /><ButtonLink href="#richiesta" size="large">Richiedi informazioni</ButtonLink></div>
      <div className={styles.portrait}><Image src="/images/moreno/moreno-about-outdoor.webp" alt="Moreno Funari all’aperto" fill priority sizes="(min-width: 900px) 32vw, 90vw" /></div>
    </Container>
    {athleteSections.slice(1).map(section => <Container as="section" key={section.number} id={section.number === 9 ? "richiesta" : undefined} className={`${styles.section} ${section.number === 11 ? styles.closing : ""}`} aria-labelledby={`section-${section.number}`}>
      <SectionHeading id={`section-${section.number}`} title={section.title} />
      {section.number === 4 ? <>
        <Blocks blocks={section.blocks.slice(0, 3)} />
        <div className={styles.ages}>{[3, 5, 7, 9].map(i => <article key={i}><Blocks blocks={section.blocks.slice(i, i + 2)} /></article>)}</div>
      </> : <Blocks blocks={section.blocks} cards={section.number === 2} />}
      {section.number === 7 ? <p><Link href="/chi-sono">chi sono</Link></p> : null}
      {section.number === 9 ? <><ButtonLink href="#richiesta">Richiedi informazioni</ButtonLink><div className={styles.form}><GiovaniAtletiLeadForm /></div></> : null}
      {section.number === 10 ? <div className={faq.list}>{athleteFaqs.map(x => <details className={faq.item} key={x.question}><summary className={faq.summary}>{x.question}</summary><p className={faq.answer}>{x.answer}</p></details>)}</div> : null}
      {section.number === 11 ? <><ButtonLink href="#richiesta" size="large">Richiedi informazioni</ButtonLink><p>Moreno Funari | Mental Coach</p></> : null}
    </Container>)}
  </main>;
}
