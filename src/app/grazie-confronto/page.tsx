import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { createPageMetadata } from "@/lib/seo/metadata";
import styles from "../conversion-page.module.css";

export const metadata: Metadata = createPageMetadata({ title: "Richiesta ricevuta", description: "Conferma di invio della richiesta CONFRONTO.", path: "/grazie-confronto", noIndex: true });
export default function GrazieConfrontoPage() { return <main className={styles.page} id="main-content"><section className={styles.hero}><Container className={styles.heroInner}><p className={styles.eyebrow}>CONFRONTO</p><h1>Richiesta ricevuta. Ora la leggo con attenzione.</h1><p>Grazie per aver lasciato i tuoi dati. La tua richiesta non finisce in un automatismo: la leggerò personalmente per capire se il percorso pilota può essere adatto alla situazione che hai raccontato.</p><p>Se ci sono le condizioni per proseguire, riceverai le informazioni da leggere con calma prima di fissare il primo confronto conoscitivo online.</p><ul className={styles.list}><li>Non hai preso nessun impegno.</li><li>Non parte nessun pagamento.</li><li>Non riceverai pressioni per iniziare.</li></ul><div className={styles.actions}><ButtonLink href="/confronto">Rileggi la pagina CONFRONTO</ButtonLink><ButtonLink href="/inizia-da-qui" variant="secondary">Torna a Inizia da qui</ButtonLink></div></Container></section></main>; }
