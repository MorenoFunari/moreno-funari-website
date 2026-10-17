import { createElement } from "react";
import Link from "next/link";

export const coachingSituations = [
  "Ti senti bloccato e continui a rimandare una scelta o un’azione.",
  "Vivi pressione nel lavoro, nello sport o nella vita personale.",
  "Sai cosa vorresti fare, ma aspetti di sentirti completamente sicuro.",
  "Un errore continua a condizionare ciò che fai dopo.",
  "Ti parli in modo molto più duro di quanto faresti con un’altra persona.",
  "Stai affrontando un cambiamento e non sai bene da dove ripartire.",
] as const;

export const coachingCanOffer = [
  "Ascolto senza giudizio.",
  "Domande che aiutano a cambiare prospettiva.",
  "Uno spazio per definire ciò che per te è importante.",
  "Azioni concrete da osservare e verificare.",
] as const;

export const coachingDoesNotOffer = [
  "Soluzioni universali.",
  "Consigli imposti dall’alto.",
  "Motivazione costante.",
  "La garanzia che dubbi e difficoltà scompaiano.",
] as const;

export const coachingProcessSteps = [
  {
    title: "Raccontare il punto di partenza",
    description:
      "Osserviamo ciò che sta accadendo e il modo in cui lo stai vivendo.",
  },
  {
    title: "Capire su cosa lavorare",
    description:
      "Distinguiamo il problema centrale da tutto ciò che si è accumulato intorno.",
  },
  {
    title: "Riconoscere ostacoli e risorse",
    description:
      "Esploriamo pensieri, abitudini, capacità e possibilità già presenti.",
  },
  {
    title: "Scegliere un passo concreto",
    description:
      "Individuiamo un’azione realistica, coerente con la tua situazione e con i tuoi tempi.",
  },
  {
    title: "Osservare ciò che impari",
    description:
      "Verifichiamo cosa sta funzionando, cosa va adattato e cosa stai comprendendo di te.",
  },
] as const;

export const coachingExpectations = [
  {
    title: "Ascolto",
    description:
      "Uno spazio in cui poter parlare senza dover dimostrare di avere già le risposte.",
  },
  {
    title: "Domande",
    description:
      "Domande utili a osservare la situazione da prospettive che da soli facciamo fatica a vedere.",
  },
  {
    title: "Concretezza",
    description:
      "Le riflessioni devono poter diventare azioni comprensibili e sostenibili.",
  },
  {
    title: "Responsabilità",
    description:
      "Le decisioni restano tue. Il percorso serve a sceglierle con maggiore consapevolezza.",
  },
  {
    title: "Rispetto dei tempi",
    description: "Non esiste una velocità corretta uguale per tutti.",
  },
  {
    title: "Riservatezza",
    description:
      "Il confronto viene trattato con attenzione e rispetto per ciò che scegli di condividere.",
  },
] as const;

export const firstContactSteps = [
  {
    title: "Mi scrivi",
    description: "Puoi partire da poche righe, senza dover raccontare tutto.",
  },
  {
    title: "Ci confrontiamo",
    description:
      "Chiarisco eventuali dubbi e ascolto ciò su cui vorresti lavorare.",
  },
  {
    title: "Valuti con libertà",
    description:
      "Decidi se proseguire soltanto dopo aver capito meglio cosa aspettarti.",
  },
] as const;

export const coachingFaqs = [
  {
    question: "Devo avere già un obiettivo chiaro?",
    answer:
      "No. Possiamo partire da una situazione, da una difficoltà o dalla sensazione che qualcosa non stia funzionando come vorresti. La chiarezza può essere parte del percorso.",
  },
  {
    question: "Il coaching è adatto anche al lavoro e allo sport?",
    answer:
      "Sì. Pressione, errore, fiducia, responsabilità e capacità di restare presenti attraversano il lavoro, lo sport e la vita personale. Il punto di partenza resta sempre la situazione concreta della persona.",
  },
  {
    question: "Quante sessioni servono?",
    answer:
      createElement(
        "span", null,
        "Il percorso individuale ",
        createElement(Link, { href: "/percorsi" }, "Un Passo Possibile"),
        " prevede 6 incontri online di circa 60 minuti, uno a settimana. Prima di iniziare verifichiamo insieme se è adatto alla situazione che vuoi affrontare.",
      ),
  },
  {
    question: "Posso iniziare con un solo confronto?",
    answer:
      "Sì. Un primo confronto può servire a fare chiarezza e a capire se desideri proseguire. Non comporta l’obbligo di iniziare un percorso.",
  },
  {
    question: "Qual è la differenza rispetto alla psicoterapia?",
    answer:
      "Il coaching lavora su obiettivi, consapevolezza, risorse e azioni concrete. Non tratta disturbi psicologici, non formula diagnosi e non sostituisce un percorso terapeutico o sanitario.",
  },
  {
    question: "Dove trovo durata, modalità e costi?",
    answer:
      createElement(
        "span", null,
        "Durata, modalità e prezzi del percorso individuale sono indicati nella pagina ",
        createElement(Link, { href: "/percorsi" }, "Un Passo Possibile"),
        ". Il percorso pilota gratuito ha condizioni e accesso separati.",
      ),
  },
] as const;
