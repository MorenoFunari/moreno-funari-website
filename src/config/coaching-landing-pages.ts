import { siteConfig } from "./site";

export type CoachingLandingPage = {
  path: "/coaching/stress-lavorativo" | "/coaching/overthinking";
  title: string;
  metaTitle: string;
  description: string;
  eyebrow: string;
  heroTitle: string;
  heroText: string[];
  primaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  secondaryCta: {
    label: string;
    href: string;
    external?: boolean;
  };
  situations: {
    eyebrow: string;
    title: string;
    description: string;
    items: string[];
  };
  shift: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    points: string[];
  };
  coaching: {
    title: string;
    canHelp: string[];
    cannotHelp: string[];
  };
  exercise: {
    title: string;
    description: string;
    steps: string[];
  };
  articles: {
    title: string;
    description: string;
    href: string;
  }[];
  resources: {
    title: string;
    description: string;
    cta: string;
    href: string;
    external?: boolean;
    note?: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  closing: {
    title: string;
    text: string;
    primaryCta: string;
  };
};

export const coachingLandingPages = {
  stressLavorativo: {
    path: "/coaching/stress-lavorativo",
    title: "Coaching per stress lavorativo e sovraccarico mentale",
    metaTitle: "Coaching per stress lavorativo",
    description:
      "Ti senti sotto pressione al lavoro o con troppe cose da gestire? Scopri come il mental coaching può aiutarti a ritrovare chiarezza, priorità e un primo passo sostenibile.",
    eyebrow: "Stress lavorativo",
    heroTitle: "Coaching per stress lavorativo e sovraccarico mentale",
    heroText: [
      "Quando hai troppe cose da gestire, non sempre serve accelerare. A volte serve ritrovare chiarezza, distinguere le priorità e scegliere un passo sostenibile.",
      "Il mental coaching può aiutarti a osservare la situazione con più ordine, senza trasformare la pressione in un giudizio su di te.",
    ],
    primaryCta: {
      label: "Raccontami cosa stai vivendo",
      href: "/contatti",
    },
    secondaryCta: {
      label: "Scarica l'eBook",
      href: "/ebook",
    },
    situations: {
      eyebrow: "Situazioni reali",
      title: "Se ti senti sotto pressione al lavoro.",
      description:
        "Non serve riconoscersi in tutto. Può bastare accorgersi che il lavoro sta occupando più spazio mentale del necessario.",
      items: [
        "Hai molte attività aperte e sembrano tutte urgenti.",
        "Fai fatica a distinguere cosa conta davvero da cosa sta solo facendo rumore.",
        "Vieni interrotto spesso e senti di non riuscire a chiudere nulla.",
        "Ti porti a casa pensieri, responsabilità o decisioni rimaste sospese.",
        "Ti sembra che, se non controlli tu ogni dettaglio, qualcosa possa andare storto.",
      ],
    },
    shift: {
      eyebrow: "Sovraccarico",
      title: "Una giornata piena non è sempre sovraccarico.",
      paragraphs: [
        "Avere molto da fare può essere faticoso, ma non sempre crea confusione. Il sovraccarico arriva quando attività, urgenze e responsabilità restano tutte presenti nello stesso momento.",
        "In quel punto puoi continuare a lavorare, ma con meno lucidità: passi da una cosa all'altra, fai fatica a scegliere, controlli più del necessario e senti che fermarti sarebbe una perdita di tempo.",
      ],
      points: [
        "continui a cambiare priorità senza sceglierne davvero una;",
        "usi energia per ricordare tutto invece che per agire su qualcosa;",
        "rimandi pause, confini o richieste di confronto;",
        "confondi responsabilità con controllo continuo.",
      ],
    },
    coaching: {
      title: "Cosa può fare il mental coaching",
      canHelp: [
        "Mettere ordine tra attività, pressioni e pensieri ricorrenti.",
        "Distinguere ciò che dipende da te da ciò che non puoi controllare.",
        "Riconoscere priorità, confini e responsabilità sostenibili.",
        "Trasformare una situazione ampia in un primo passo concreto.",
      ],
      cannotHelp: [
        "Non formula diagnosi.",
        "Non è psicoterapia.",
        "Non sostituisce supporto medico, psicologico o sanitario.",
        "Non promette di eliminare ogni pressione dal lavoro.",
      ],
    },
    exercise: {
      title: "Un primo esercizio pratico",
      description:
        "Quando senti la testa piena, prova a creare un piccolo spazio di ordine prima di decidere cosa fare.",
      steps: [
        "Scrivi tutto ciò che stai cercando di tenere a mente, senza ordinare subito.",
        "Scegli una sola cosa che, se affrontata, ridurrebbe la pressione di oggi.",
        "Trasformala in un'azione da 15 minuti, concreta e osservabile.",
        "Decidi consapevolmente una cosa che oggi non farai.",
      ],
    },
    articles: [
      {
        title: "Quando hai troppe cose in testa",
        description:
          "Cinque azioni concrete per ritrovare lucidità quando tutto sembra urgente.",
        href: "/blog/quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita",
      },
      {
        title: "Responsabilità non significa controllo",
        description:
          "Una riflessione su cosa succede quando provi a gestire tutto da solo.",
        href: "/blog/responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto",
      },
    ],
    resources: [
      {
        title: "Un passo possibile",
        description:
          "Una guida gratuita per fare chiarezza quando ti senti bloccato e vuoi individuare un passo sostenibile.",
        cta: "Scopri l'eBook",
        href: "/ebook",
      },
      {
        title: "Un Passo Possibile AI",
        description:
          "Una riflessione guidata per fermarti qualche minuto, mettere ordine e scegliere da dove ripartire.",
        cta: "Prova la riflessione guidata",
        href: siteConfig.appUrl,
        external: true,
        note: "Non è terapia e non sostituisce il confronto con un professionista.",
      },
    ],
    faqs: [
      {
        question: "Quando può servire un percorso?",
        answer:
          "Può servire quando senti che pressione, confusione o responsabilità stanno occupando troppo spazio e hai bisogno di osservare la situazione con maggiore chiarezza.",
      },
      {
        question: "E se il problema è l'ambiente di lavoro?",
        answer:
          "Il coaching non cambia direttamente l'ambiente intorno a te. Può però aiutarti a distinguere ciò che dipende da te, quali confini comunicare e quali scelte valutare con più lucidità.",
      },
      {
        question: "Devo cambiare lavoro?",
        answer:
          "Non è una decisione da forzare. Prima può essere utile capire cosa sta pesando davvero, quali possibilità hai già provato e quale passo concreto può darti nuove informazioni.",
      },
      {
        question: "Che differenza c'è tra coaching e terapia?",
        answer:
          "Il coaching lavora su consapevolezza, obiettivi, responsabilità e azioni sostenibili. Non tratta disturbi, non fa diagnosi e non sostituisce un percorso psicologico o sanitario.",
      },
    ],
    closing: {
      title: "Se senti che parlarne potrebbe aiutarti, puoi partire da poche righe.",
      text: "Non devi arrivare con tutto già chiaro. Puoi raccontarmi la situazione e valutare con calma se un primo confronto ha senso per te.",
      primaryCta: "Raccontami cosa stai vivendo",
    },
  },
  overthinking: {
    path: "/coaching/overthinking",
    title: "Coaching per overthinking e pensieri continui",
    metaTitle: "Coaching per overthinking",
    description:
      "Pensi troppo e fai fatica a fermare la testa? Scopri come il mental coaching può aiutarti a distinguere pensieri, azioni possibili e primo passo concreto.",
    eyebrow: "Overthinking",
    heroTitle: "Coaching per overthinking e pensieri continui",
    heroText: [
      "Quando pensi troppo, il punto non è smettere di pensare a forza. Può essere più utile capire quali pensieri ti stanno aiutando e quali ti stanno tenendo fermo.",
      "Il mental coaching può offrire uno spazio per distinguere fatti, interpretazioni e azioni possibili, senza cercare risposte perfette.",
    ],
    primaryCta: {
      label: "Parliamone con calma",
      href: "/contatti",
    },
    secondaryCta: {
      label: "Prova una riflessione guidata",
      href: siteConfig.appUrl,
      external: true,
    },
    situations: {
      eyebrow: "Quando succede",
      title: "Quando pensare troppo non aiuta più.",
      description:
        "Pensare è una risorsa. Diventa pesante quando resta sempre nello stesso punto e sostituisce l'azione possibile.",
      items: [
        "Ripensi a conversazioni, scelte o errori già accaduti.",
        "Anticipi problemi che forse non si presenteranno.",
        "Cerchi la decisione perfetta e nel frattempo rimandi.",
        "Aspetti di sentirti sicuro prima di fare anche un piccolo passo.",
        "Ti senti stanco senza avere davvero agito sulla situazione.",
      ],
    },
    shift: {
      eyebrow: "Distinguere",
      title: "Il problema non è pensare.",
      paragraphs: [
        "Pensare può aiutarti a capire, prepararti e scegliere. Il punto cambia quando il pensiero continua a girare senza produrre informazioni nuove.",
        "In quei momenti non serve forzarti a essere positivo. Può essere più utile rendere il pensiero più concreto e chiederti cosa puoi osservare, verificare o fare adesso.",
      ],
      points: [
        "rivedi la stessa situazione senza arrivare a un passaggio successivo;",
        "confondi possibilità, paure e fatti accaduti;",
        "trasformi una scelta in una prova del tuo valore;",
        "rimandi perché nessuna risposta sembra abbastanza sicura.",
      ],
    },
    coaching: {
      title: "Cosa può fare il mental coaching",
      canHelp: [
        "Separare fatti, interpretazioni e azioni possibili.",
        "Ridurre la grandezza del passo quando tutto sembra troppo.",
        "Tornare a ciò che dipende da te nel momento presente.",
        "Osservare il dialogo interno senza trasformarlo in un giudizio.",
      ],
      cannotHelp: [
        "Non formula diagnosi.",
        "Non è terapia.",
        "Non tratta disturbi o condizioni cliniche.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
      ],
    },
    exercise: {
      title: "Un esercizio per rendere il pensiero più concreto",
      description:
        "Quando un pensiero ritorna spesso, prova a scriverlo e separarlo in parti più osservabili.",
      steps: [
        "Scrivi il pensiero ricorrente in una frase semplice.",
        "Indica quale parte è un fatto e quale parte è una tua interpretazione.",
        "Chiediti cosa dipende da te adesso, anche in modo minimo.",
        "Scegli una micro-azione che possa darti una nuova informazione.",
      ],
    },
    articles: [
      {
        title: "La fiducia non arriva sempre prima",
        description:
          "Un modo concreto per scegliere un piccolo passo anche quando non ti senti completamente sicuro.",
        href: "/blog/la-fiducia-arriva-dopo-il-primo-passo",
      },
      {
        title: "Quando hai troppe cose in testa",
        description:
          "Cinque azioni concrete per ridurre confusione e ritrovare lucidità.",
        href: "/blog/quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita",
      },
      {
        title: "Ti parleresti così se fossi una persona a cui vuoi bene?",
        description:
          "Una riflessione su autocritica, dialogo interno e responsabilità.",
        href: "/blog/ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene",
      },
    ],
    resources: [
      {
        title: "Un passo possibile",
        description:
          "Una guida gratuita con domande ed esercizi per osservare blocco, fiducia e dialogo interno.",
        cta: "Scopri l'eBook",
        href: "/ebook",
      },
      {
        title: "Un Passo Possibile AI",
        description:
          "Quattro domande per fermarti, distinguere cosa sta succedendo e individuare un passo concreto.",
        cta: "Prova la riflessione guidata",
        href: siteConfig.appUrl,
        external: true,
        note: "Non è terapia e non sostituisce il confronto con un professionista.",
      },
    ],
    faqs: [
      {
        question: "Overthinking significa avere un problema?",
        answer:
          "Non necessariamente. Pensare molto può capitare in periodi di pressione, scelta o cambiamento. Se però la sofferenza è intensa, persistente o limita in modo importante la vita quotidiana, è importante rivolgersi a un professionista sanitario o psicologico.",
      },
      {
        question: "Il coaching può aiutarmi se penso troppo?",
        answer:
          "Può aiutarti a osservare meglio i pensieri, distinguere fatti e interpretazioni, ridurre il passo e tornare a una scelta concreta. Non sostituisce un percorso clinico o terapeutico.",
      },
      {
        question: "Cosa posso fare quando non riesco a spegnere la testa?",
        answer:
          "Puoi iniziare scrivendo il pensiero ricorrente, separando ciò che sai da ciò che immagini e scegliendo una micro-azione sostenibile. Non serve risolvere tutto in una volta.",
      },
      {
        question: "Quando è meglio rivolgersi a uno psicologo?",
        answer:
          "Quando il disagio è intenso, persistente, legato a sintomi importanti o interferisce in modo significativo con sonno, lavoro, relazioni o vita quotidiana, è più adatto un supporto psicologico o sanitario.",
      },
    ],
    closing: {
      title: "Se i pensieri continuano a girare, possiamo guardarli con più ordine.",
      text: "Puoi scrivermi senza preparare un racconto perfetto. Bastano poche righe sulla situazione che in questo momento occupa più spazio.",
      primaryCta: "Parliamone con calma",
    },
  },
} as const satisfies Record<string, CoachingLandingPage>;

export const coachingFocusAreas = [
  {
    title: "Stress lavorativo e sovraccarico",
    description:
      "Quando attività, responsabilità e urgenze sembrano tutte presenti nello stesso momento.",
    href: coachingLandingPages.stressLavorativo.path,
  },
  {
    title: "Overthinking e pensieri continui",
    description:
      "Quando pensare serve sempre meno a chiarire e sempre più a restare fermi.",
    href: coachingLandingPages.overthinking.path,
  },
] as const;
