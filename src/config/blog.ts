export const blogPageCopy = {
  hero: {
    eyebrow: "Blog",
    title: "Riflessioni per fare chiarezza nella vita reale.",
    paragraphs: [
      "Qui raccolgo pensieri, esempi ed esercizi su fiducia, pressione, errore, lavoro, sport e piccoli passi concreti.",
      "Scrivo quando c’è qualcosa che merita di essere approfondito, non per riempire un calendario.",
    ],
  },
  emptyState: {
    eyebrow: "Uno spazio che crescerà con calma",
    title: "Preferisco pubblicare quando c’è qualcosa di utile da approfondire.",
    paragraphs: [
      "Non troverai articoli scritti soltanto per riempire una pagina. Questo spazio raccoglierà esperienze, riflessioni ed esercizi legati alla vita reale.",
      "Nel frattempo puoi partire dall’eBook oppure usare la riflessione guidata di Un Passo Possibile AI.",
    ],
  },
  topics: {
    eyebrow: "Temi",
    title: "Argomenti che attraversano lavoro, sport e vita quotidiana.",
    description:
      "Situazioni diverse, spesso collegate dalle stesse domande: come gestire la pressione, ritrovare fiducia e tornare a ciò che puoi fare nel presente.",
  },
  resources: {
    eyebrow: "Da dove puoi iniziare",
    title: "Leggere è una possibilità. Confrontarti è un’altra.",
    description:
      "Puoi scegliere lo strumento più adatto al momento che stai vivendo, senza dover seguire un percorso obbligatorio.",
  },
} as const;

export const blogTopics = [
  {
    title: "Fiducia",
    description: "Quando aspetti di sentirti completamente sicuro prima di agire.",
  },
  {
    title: "Blocco",
    description:
      "Quando continui a rimandare anche se sai che vorresti cambiare qualcosa.",
  },
  {
    title: "Pressione",
    description: "Quando senti di dover dimostrare sempre qualcosa.",
  },
  {
    title: "Errore",
    description:
      "Quando ciò che è successo continua a condizionare l’azione successiva.",
  },
  {
    title: "Lavoro e responsabilità",
    description:
      "Decisioni, delega, aspettative e difficoltà di restare lucidi nei momenti intensi.",
  },
  {
    title: "Sport e presenza",
    description:
      "Lo sport come spazio per osservare fiducia, rispetto, concentrazione e capacità di ripartire.",
  },
] as const;

export const blogResourceItems = [
  {
    title: "Un passo possibile",
    description:
      "Una guida gratuita con riflessioni ed esercizi per fare chiarezza e individuare un piccolo passo concreto.",
    cta: "Scopri l’eBook",
    href: "/ebook",
  },
  {
    title: "Un Passo Possibile AI",
    description:
      "Quattro domande per fermarti, mettere ordine nei pensieri e scegliere da dove ripartire.",
    cta: "Prova la riflessione",
    href: "app",
    note: "Non è terapia e non sostituisce il confronto con un professionista.",
  },
  {
    title: "Uno spazio di confronto",
    description:
      "Quando leggere e riflettere da solo non sta facendo chiarezza, puoi conoscere il mio modo di lavorare.",
    cta: "Scopri il coaching",
    href: "/coaching",
  },
] as const;
