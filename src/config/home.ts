import { siteConfig } from "./site";

export const recognitionItems = [
  "Sai cosa dovresti fare, ma continui a rimandare.",
  "Fuori sembri gestire tutto, ma dentro senti molta pressione.",
  "Un errore ti rimane addosso più del necessario.",
  "Aspetti di sentirti sicuro prima di iniziare.",
  "Ti parli in un modo che non useresti con una persona a cui vuoi bene.",
] as const;

export const startPaths = [
  {
    title: "Voglio capire meglio",
    description:
      "Leggi riflessioni ed esempi concreti su blocco, fiducia, pressione, errori e vita quotidiana.",
    cta: "Leggi il blog",
    href: "/blog",
    external: false,
  },
  {
    title: "Ho bisogno di fare chiarezza",
    description:
      "Fermati qualche minuto, rispondi a poche domande e prova a individuare un piccolo passo possibile.",
    cta: "Prova la riflessione guidata",
    href: siteConfig.appUrl,
    external: true,
  },
  {
    title: "Sento che parlarne potrebbe aiutarmi",
    description:
      "Scopri uno spazio di coaching umano, concreto e costruito sulla situazione che stai vivendo.",
    cta: "Scopri il coaching",
    href: "/coaching",
    external: false,
  },
] as const;

export const approachSteps = [
  "Fermarsi senza giudicarsi.",
  "Osservare cosa sta accadendo davvero.",
  "Distinguere il problema dalla pressione costruita intorno.",
  "Riconoscere ciò che dipende da te.",
  "Scegliere un passo concreto e sostenibile.",
] as const;

export const resources = [
  {
    title: "Un passo possibile",
    description:
      "Una guida da leggere con calma, pensata per quando ti senti bloccato e non sai da dove ripartire.",
    cta: "Scopri l’eBook",
    href: "/ebook",
    external: false,
    note: undefined,
  },
  {
    title: "Un Passo Possibile AI",
    description:
      "Una riflessione guidata attraverso poche domande, per aiutarti a osservare la situazione e trovare un piccolo passo concreto.",
    cta: "Prova la riflessione",
    href: siteConfig.appUrl,
    external: true,
    note: "Non è terapia e non sostituisce il confronto con un professionista.",
  },
] as const;

export const plannedBlogPosts = [
  {
    category: "Blocco e primo passo",
    title: "Quando ti senti bloccato, non devi risolvere tutto",
    description:
      "Per ripartire non serve sempre una soluzione completa. A volte basta capire qual è la parte più piccola su cui puoi agire.",
  },
  {
    category: "Fiducia",
    title: "La fiducia non arriva sempre prima di iniziare",
    description:
      "Aspettare di sentirti sicuro può tenerti fermo. La fiducia, spesso, cresce dopo che hai iniziato a muoverti.",
  },
  {
    category: "Lavoro e pressione",
    title: "Non tutti i problemi si risolvono insistendo",
    description:
      "Quando continuare a spingere non funziona, fermarti può aiutarti a vedere ciò che la pressione ti stava nascondendo.",
  },
] as const;
