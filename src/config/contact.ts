import { siteConfig } from "./site";

const emailSubject = "Primo contatto dal sito";

export const contactLinks = {
  email: siteConfig.email,
  emailHref: `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    emailSubject,
  )}`,
  instagramUrl: siteConfig.instagramUrl,
  instagramAriaLabel: "Instagram di Moreno Funari",
  instagramUsername: new URL(siteConfig.instagramUrl).pathname.replaceAll("/", ""),
} as const;

export const messageStarters = [
  "La situazione che in questo momento sta occupando più spazio.",
  "Il punto in cui ti senti bloccato, sotto pressione o poco sicuro.",
  "Ciò che hai già provato e che non sta portando la chiarezza che cercavi.",
  "Il piccolo cambiamento che vorresti riuscire ad affrontare.",
] as const;

export const contactTopics = [
  {
    title: "Blocco",
    text: "Quando sai che vorresti agire, ma continui a rimandare.",
  },
  {
    title: "Pressione",
    text: "Quando senti di dover dimostrare sempre qualcosa.",
  },
  {
    title: "Fiducia",
    text: "Quando aspetti di sentirti completamente sicuro prima di iniziare.",
  },
  {
    title: "Errore",
    text: "Quando ciò che è andato storto continua a condizionare ciò che fai dopo.",
  },
  {
    title: "Autocritica",
    text: "Quando il modo in cui ti parli rende tutto ancora più pesante.",
  },
  {
    title: "Cambiamento",
    text: "Quando stai attraversando una fase nuova e non sai bene da quale passo ripartire.",
  },
] as const;

export const firstContactSteps = [
  {
    title: "Mi scrivi",
    text: "Puoi partire da poche righe e condividere soltanto ciò che senti utile.",
  },
  {
    title: "Ti rispondo",
    text: "Leggo personalmente il messaggio e ti rispondo chiarendo ciò che può essere utile sapere.",
  },
  {
    title: "Valuti liberamente",
    text: "Se emerge la possibilità di un percorso, ricevi prima le informazioni necessarie e decidi senza obblighi.",
  },
] as const;

export const contactFaqs = [
  {
    question: "Devo avere già un obiettivo chiaro?",
    answer:
      "No. Puoi partire da una situazione, da una difficoltà o dalla sensazione che qualcosa non stia funzionando come vorresti.",
  },
  {
    question: "Posso scriverti anche se non so se il coaching fa per me?",
    answer:
      "Sì. Il primo confronto serve anche a capire se il coaching e il mio modo di lavorare possono essere adatti al momento che stai vivendo.",
  },
  {
    question: "Il primo messaggio mi impegna a iniziare un percorso?",
    answer:
      "No. Scrivere non comporta alcun obbligo. Puoi fare una domanda, ricevere le informazioni necessarie e valutare con libertà.",
  },
  {
    question: "Quando ricevo informazioni su durata, modalità e costi?",
    answer:
      "Queste informazioni vengono chiarite prima di fissare un eventuale incontro, così puoi decidere con trasparenza e senza impegno.",
  },
  {
    question: "È meglio scrivere via email o su Instagram?",
    answer:
      "Per raccontare una situazione con maggiore calma è preferibile l’email. Instagram può essere comodo per un primo messaggio breve o per una domanda semplice.",
  },
  {
    question: "Posso scriverti anche per un problema con l’eBook?",
    answer:
      "Sì. Se hai difficoltà con il download o con l’accesso alla risorsa, puoi indicarlo nel messaggio.",
  },
] as const;
