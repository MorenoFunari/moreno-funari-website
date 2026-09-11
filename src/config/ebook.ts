import { siteConfig } from "./site";

const ebookPdfAvailable = true;

export const ebookDownload = {
  isAvailable: ebookPdfAvailable,
  href: ebookPdfAvailable ? "#modulo-guida" : "/contatti",
  label: ebookPdfAvailable ? "Ricevi la guida" : "Scrivimi per riceverla",
  downloadName: "un-passo-possibile-moreno-funari.pdf",
} as const;

export const ebookSituations = [
  "Sai cosa dovresti fare, ma continui a rimandare.",
  "Aspetti di sentirti sicuro prima di iniziare.",
  "Un errore continua a condizionare ciò che fai dopo.",
  "Ti senti sotto pressione e fai fatica a distinguere ciò che conta davvero.",
  "Ti parli in modo molto duro.",
  "Vorresti cambiare qualcosa, ma pensare a tutto insieme ti blocca.",
] as const;

export const ebookContents = [
  {
    title: "Comprendere il blocco",
    description:
      "Riconoscere cosa ti sta fermando senza confondere la difficoltà con una mancanza di capacità.",
  },
  {
    title: "Ridurre il peso del “tutto”",
    description:
      "Separare ciò che richiede tempo da ciò che puoi affrontare oggi.",
  },
  {
    title: "Osservare il dialogo interno",
    description:
      "Accorgerti del modo in cui ti parli quando sbagli, rimandi o ti senti sotto pressione.",
  },
  {
    title: "Ripensare la fiducia",
    description:
      "Comprendere che la sicurezza non arriva sempre prima dell’azione.",
  },
  {
    title: "Tornare al concreto",
    description:
      "Trasformare pensieri generici in una scelta piccola, osservabile e sostenibile.",
  },
  {
    title: "Esercizi pratici",
    description:
      "Domande e spazi di riflessione da utilizzare con i tuoi tempi, senza dover completare tutto in una volta.",
  },
] as const;

export const ebookUseModes = [
  {
    title: "Leggere con calma",
    description:
      "Puoi dedicare pochi minuti a un capitolo e fermarti quando una domanda richiede più tempo.",
  },
  {
    title: "Scrivere",
    description:
      "Annotare pensieri ed esempi concreti può aiutarti a rendere la riflessione meno astratta.",
  },
  {
    title: "Tornare indietro",
    description:
      "Non è un percorso da completare perfettamente. Puoi rileggere una parte quando cambia la situazione.",
  },
  {
    title: "Scegliere un solo passo",
    description:
      "Alla fine non serve avere tutto risolto. Cerca una sola azione che senti possibile.",
  },
] as const;

export const ebookEcosystemItems = [
  {
    title: "Una riflessione guidata",
    description:
      "Quattro domande per fermarti, mettere ordine nei pensieri e individuare un passo concreto da cui ripartire.",
    cta: "Prova la riflessione",
    href: siteConfig.appUrl,
    note: "Non è terapia e non sostituisce il confronto con un professionista.",
  },
  {
    title: "Uno spazio di confronto",
    description:
      "Quando senti che leggere e riflettere da solo non sta facendo chiarezza, puoi conoscere un percorso costruito sulla situazione che stai vivendo.",
    cta: "Scopri il coaching",
    href: "/coaching",
    note: undefined,
  },
] as const;

export const ebookFaqs = [
  {
    question: "L’eBook è gratuito?",
    answer:
      "Sì. Puoi scaricarlo e leggerlo con i tuoi tempi, senza dover acquistare un percorso.",
  },
  {
    question: "Devo leggerlo in ordine?",
    answer:
      "No. Puoi seguire il percorso completo oppure partire dalla parte che senti più vicina alla situazione che stai vivendo.",
  },
  {
    question: "Quanto tempo serve?",
    answer:
      "Non esiste un tempo corretto. Puoi leggere pochi minuti alla volta e fermarti sugli esercizi che richiedono maggiore attenzione.",
  },
  {
    question: "Gli esercizi devono essere completati tutti?",
    answer:
      "No. Gli esercizi sono strumenti, non compiti. Puoi scegliere quelli che senti utili e tornarci in un secondo momento.",
  },
  {
    question: "L’eBook sostituisce una sessione di coaching?",
    answer:
      "No. È una risorsa autonoma di riflessione. Il coaching offre invece uno spazio di confronto costruito sulla situazione specifica della persona.",
  },
  {
    question: "Posso condividerlo?",
    answer:
      "Puoi condividere il link alla pagina ufficiale dell’eBook, così chi è interessato può scaricare la versione aggiornata.",
  },
] as const;
