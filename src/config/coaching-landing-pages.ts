import { siteConfig } from "./site";

export type CoachingLandingPage = {
  path:
    | "/coaching/stress-lavorativo"
    | "/coaching/overthinking"
    | "/coaching/autostima-e-fiducia"
    | "/coaching/blocco-e-primo-passo"
    | "/coaching/responsabilita-e-controllo"
    | "/coaching/mental-coaching-sportivo"
    | "/coaching/cosa-fa-un-mental-coach";
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
  relatedContent?: {
    eyebrow: string;
    title: string;
    cta: string;
  };
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
  autostimaEFiducia: {
    path: "/coaching/autostima-e-fiducia",
    title: "Coaching per autostima e fiducia in se stessi",
    metaTitle: "Coaching per autostima e fiducia in se stessi",
    description:
      "Ti manca fiducia in te stesso o senti un’autocritica costante? Scopri come il mental coaching può aiutarti a trattarti con più rispetto e scegliere piccoli passi concreti.",
    eyebrow: "Autostima e fiducia",
    heroTitle: "Coaching per autostima e fiducia in se stessi",
    heroText: [
      "La fiducia non nasce sempre prima di agire. A volte cresce quando inizi a trattarti con più rispetto e scegli un passo sostenibile anche in mezzo ai dubbi.",
      "Il mental coaching può aiutarti a distinguere ciò che è successo dai giudizi su di te e a costruire fiducia attraverso esperienze concrete.",
    ],
    primaryCta: { label: "Raccontami cosa stai vivendo", href: "/contatti" },
    secondaryCta: { label: "Scarica l'eBook", href: "/ebook" },
    situations: {
      eyebrow: "Quando la fiducia manca",
      title: "Quando non ti senti mai abbastanza pronto.",
      description:
        "La poca fiducia può comparire in gesti quotidiani, senza definire il tuo valore o chi sei.",
      items: [
        "Rimandi una scelta perché temi di non essere all’altezza.",
        "Ti confronti con gli altri e noti soprattutto ciò che a te manca.",
        "Hai paura di sbagliare e trasformi ogni errore in un giudizio personale.",
        "Cerchi conferme prima di fidarti di una tua decisione.",
        "Aspetti di sentirti completamente pronto prima di iniziare.",
      ],
    },
    shift: {
      eyebrow: "Fiducia ed esperienza",
      title: "Fiducia non significa sentirsi sempre sicuri.",
      paragraphs: [
        "Avere fiducia non vuol dire eliminare i dubbi o sapere che andrà tutto bene. Può voler dire riconoscere di poter affrontare ciò che accadrà, anche senza controllare il risultato.",
        "Spesso la fiducia cresce dopo l’azione: un passo piccolo produce esperienza, l’esperienza porta informazioni reali e quelle informazioni rendono più consapevole il passo successivo.",
        "L’autocritica eccessiva interrompe questo processo quando confonde responsabilità e attacco personale. Osservare un comportamento aiuta a correggerlo; definirti incapace ti lascia meno spazio per agire.",
      ],
      points: [
        "«Ho sbagliato questa scelta» descrive un fatto; «sbaglio sempre tutto» giudica la persona;",
        "parlarti con rispetto non significa giustificarti o negare le conseguenze;",
        "un passo sostenibile può essere fatto anche quando il dubbio è ancora presente;",
        "riconoscere ciò che hai affrontato rende visibili capacità che l’autocritica nasconde.",
      ],
    },
    coaching: {
      title: "Cosa può fare il mental coaching",
      canHelp: [
        "Osservare il dialogo interno e riconoscere quando aggiunge giudizio senza chiarezza.",
        "Distinguere fatti, interpretazioni e definizioni personali.",
        "Scegliere piccoli passi sostenibili anche senza sentirti completamente pronto.",
        "Allenare presenza, responsabilità e fiducia attraverso l’esperienza.",
      ],
      cannotHelp: [
        "Non formula diagnosi e non tratta disturbi.",
        "Non è terapia o psicologia clinica.",
        "Non promette di eliminare insicurezza e dubbi.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
      ],
    },
    exercise: {
      title: "Riscrivi una frase dura in modo utile",
      description:
        "Non serve trasformarla in una frase positiva: prova a renderla più rispettosa, precisa e concreta.",
      steps: [
        "Scrivi una frase dura che ti ripeti quando qualcosa non va.",
        "Chiediti: la direi così a una persona a cui voglio bene?",
        "Riscrivila separando il fatto dal giudizio su di te.",
        "Scegli un passo piccolo che puoi fare anche con il dubbio.",
      ],
    },
    articles: [
      { title: "La fiducia non arriva sempre prima", description: "Come costruire fiducia attraverso un passo piccolo e un’esperienza reale.", href: "/blog/la-fiducia-arriva-dopo-il-primo-passo" },
      { title: "Ti parleresti così se fossi una persona a cui vuoi bene?", description: "La differenza tra assumersi una responsabilità e attaccare la propria persona.", href: "/blog/ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene" },
      { title: "Dopo un errore, torna all’azione successiva", description: "Un modo concreto per non portare il giudizio sull’errore nel momento successivo.", href: "/blog/dopo-un-errore-torna-all-azione-successiva" },
    ],
    resources: [
      { title: "Un passo possibile", description: "Una guida gratuita per osservare blocco, fiducia e dialogo interno con domande concrete.", cta: "Scopri l'eBook", href: "/ebook" },
      { title: "Un Passo Possibile AI", description: "Una riflessione guidata per mettere ordine e individuare un’azione sostenibile.", cta: "Prova la riflessione guidata", href: siteConfig.appUrl, external: true, note: "Non è terapia e non sostituisce il confronto con un professionista." },
    ],
    faqs: [
      { question: "Perché non riesco a fidarmi di me?", answer: "La fiducia può risentire di esperienze, confronti, aspettative e di un dialogo interno molto duro. Invece di cercare una spiegazione unica, può essere utile osservare quando manca, quali giudizi compaiono e quale esperienza piccola potrebbe darti informazioni nuove." },
      { question: "La fiducia si può allenare?", answer: "Può crescere attraverso azioni sostenibili, osservazione dell’esperienza e un dialogo interno più preciso. Non significa diventare sempre sicuri, ma imparare ad agire anche quando una parte di dubbio resta." },
      { question: "Il coaching lavora sull’autostima?", answer: "Può lavorare su consapevolezza, dialogo interno, scelte, responsabilità e azioni concrete collegate alla fiducia. Non cura l’autostima bassa e non sostituisce un percorso psicologico." },
      { question: "Quando è meglio rivolgersi a uno psicologo?", answer: "Quando il disagio è intenso o persistente, interferisce in modo importante con la vita quotidiana oppure è legato a sintomi o sofferenza significativa, è più adatto rivolgersi a un professionista psicologico o sanitario." },
    ],
    closing: { title: "Non devi dimostrare di avere già fiducia per chiedere un confronto.", text: "Puoi raccontarmi in poche righe dove ti senti fermo e valutare con calma se il mental coaching è uno spazio adatto alla situazione che stai vivendo.", primaryCta: "Raccontami cosa stai vivendo" },
  },
  bloccoEPrimoPasso: {
    path: "/coaching/blocco-e-primo-passo",
    title: "Coaching per blocco, procrastinazione e primo passo",
    metaTitle: "Coaching per blocco, procrastinazione e primo passo",
    description: "Ti senti bloccato e rimandi continuamente? Scopri come il mental coaching può aiutarti a ridurre il passo, ritrovare chiarezza e iniziare in modo sostenibile.",
    eyebrow: "Blocco e primo passo",
    heroTitle: "Coaching per blocco, procrastinazione e primo passo",
    heroText: [
      "Quando ti senti fermo, non sempre serve forzarti di più. A volte serve capire cosa rende il passo troppo pesante e trasformarlo in qualcosa che puoi davvero iniziare.",
      "Rimandare non dimostra che sei pigro: il passo può essere troppo grande, confuso o carico di pressione.",
    ],
    primaryCta: { label: "Parliamone con calma", href: "/contatti" },
    secondaryCta: { label: "Prova Un Passo Possibile AI", href: siteConfig.appUrl, external: true },
    situations: {
      eyebrow: "Quando ti senti bloccato",
      title: "Sai cosa vorresti fare, ma non riesci a partire.",
      description: "Il blocco può presentarsi in modi molto concreti e non è una definizione della tua volontà.",
      items: [
        "Sai cosa dovresti fare, ma continui a spostare l’inizio.",
        "Aspetti il momento giusto o di sentirti finalmente pronto.",
        "Apri molte possibilità senza riuscire a sceglierne una.",
        "Ti senti in ritardo e provi a recuperare chiedendoti un cambiamento enorme.",
        "Ti giudichi per aver rimandato e il giudizio rende ancora più pesante ripartire.",
      ],
    },
    shift: {
      eyebrow: "Ridurre il passo",
      title: "Il blocco non è sempre mancanza di volontà.",
      paragraphs: [
        "Dietro un’attività rimandata possono esserci paura di sbagliare, pressione, confusione o un obiettivo ancora troppo ampio. Capire quale elemento pesa permette di intervenire in modo più utile del semplice «devo impegnarmi di più».",
        "Quando il pensiero è «devo risolvere tutto», anche iniziare sembra richiedere tutte le risposte. Ma partire non significa avere chiaro l’intero percorso: significa rendere osservabile il primo passaggio.",
      ],
      points: [
        "un obiettivo generico rende difficile capire da dove iniziare;",
        "più il passo è grande e carico di significato, più può aumentare la resistenza;",
        "la paura di sbagliare può trasformare una prova in un giudizio sul proprio valore;",
        "una micro-azione serve a produrre informazioni, non a risolvere già tutto.",
      ],
    },
    coaching: {
      title: "Cosa può fare il mental coaching",
      canHelp: [
        "Chiarire cosa rende difficile iniziare, senza ridurlo a mancanza di volontà.",
        "Distinguere ciò che dipende da te da ciò che non puoi controllare.",
        "Ridurre un obiettivo ampio a un primo passaggio osservabile.",
        "Passare dal pensiero a una micro-azione e allenare continuità senza perfezionismo.",
      ],
      cannotHelp: [
        "Non formula diagnosi e non tratta disturbi.",
        "Non è terapia o psicologia clinica.",
        "Non impone soluzioni e non promette di eliminare ogni blocco.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
      ],
    },
    exercise: {
      title: "Trasforma il problema nel primo passaggio osservabile",
      description: "L’obiettivo non è completare tutto: è creare abbastanza movimento da vedere meglio cosa viene dopo.",
      steps: [
        "Scrivi in una frase ciò che stai rimandando.",
        "Sostituisci «devo risolvere tutto» con «qual è il primo passaggio osservabile?».",
        "Riduci quel passaggio a un’attività di 10–15 minuti.",
        "Decidi quando farla e, dopo, osserva cosa è cambiato.",
      ],
    },
    articles: [
      { title: "La fiducia non arriva sempre prima", description: "Perché un passo piccolo può venire prima della sicurezza che stai aspettando.", href: "/blog/la-fiducia-arriva-dopo-il-primo-passo" },
      { title: "Quando hai troppe cose in testa", description: "Cinque azioni per ridurre la confusione e rendere visibile il passo successivo.", href: "/blog/quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita" },
      { title: "Responsabilità non significa controllo", description: "Come tornare a ciò che dipende da te senza provare a gestire tutto.", href: "/blog/responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto" },
    ],
    resources: [
      { title: "Un passo possibile", description: "La guida gratuita al cuore di questo approccio: non risolvere tutto, individuare da dove puoi iniziare.", cta: "Scopri l'eBook", href: "/ebook" },
      { title: "Un Passo Possibile AI", description: "Quattro domande guidate per fermarti, mettere ordine e scegliere una micro-azione concreta.", cta: "Prova Un Passo Possibile AI", href: siteConfig.appUrl, external: true, note: "Non è terapia e non sostituisce il confronto con un professionista." },
    ],
    faqs: [
      { question: "Perché rimando anche cose importanti?", answer: "L’importanza può aumentare pressione e paura di sbagliare. A volte rimandi perché il compito è ancora troppo grande o confuso, non perché non ti interessi. Osservare l’ostacolo concreto aiuta a scegliere un passaggio più sostenibile." },
      { question: "Come faccio il primo passo se non mi sento pronto?", answer: "Puoi cercare un’azione abbastanza piccola da sostenere anche con il dubbio. Non deve dimostrare che riuscirai in tutto: deve solo essere concreta e darti una nuova informazione." },
      { question: "Il coaching può aiutarmi con la procrastinazione?", answer: "Può aiutarti a osservare cosa alimenta il rimando, chiarire priorità e trasformare un obiettivo in azioni possibili. Non tratta cause cliniche e non sostituisce un supporto psicologico o sanitario." },
      { question: "Quando il blocco richiede un altro tipo di supporto?", answer: "Se il blocco è intenso o persistente, causa sofferenza significativa, limita in modo importante la vita quotidiana o si accompagna a sintomi rilevanti, è opportuno rivolgersi a un professionista psicologico o sanitario." },
    ],
    closing: { title: "Per iniziare non devi avere già tutto chiaro.", text: "Puoi raccontarmi cosa continui a rimandare e valutare con calma se un confronto può aiutarti a rendere il primo passo più concreto e sostenibile.", primaryCta: "Parliamone con calma" },
  },
  responsabilitaEControllo: {
    path: "/coaching/responsabilita-e-controllo",
    title: "Coaching per responsabilità, controllo e delega",
    metaTitle: "Coaching per responsabilità, controllo e delega",
    description: "Ti senti responsabile di tutto e fai fatica a delegare? Scopri come il mental coaching può aiutarti a distinguere responsabilità, controllo e confini sostenibili.",
    eyebrow: "Responsabilità e controllo",
    heroTitle: "Coaching per responsabilità, controllo e delega",
    heroText: [
      "Essere responsabile non significa dover controllare tutto. A volte il passo più utile è distinguere cosa dipende davvero da te, cosa puoi condividere e dove puoi lasciare spazio senza perdere presenza.",
      "Il mental coaching può aiutarti a osservare quando l’affidabilità diventa sovraccarico e a costruire una responsabilità più sostenibile, nel lavoro e nella vita quotidiana.",
    ],
    primaryCta: { label: "Raccontami cosa stai vivendo", href: "/contatti" },
    secondaryCta: { label: "Leggi l'approfondimento", href: "/blog/responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto" },
    situations: {
      eyebrow: "Quando si confondono",
      title: "Quando responsabilità e controllo diventano la stessa cosa.",
      description: "Essere competenti e affidabili è una risorsa. Il peso aumenta quando senti che ogni dettaglio deve passare da te.",
      items: [
        "Controlli ogni passaggio perché temi che qualcosa possa sfuggire.",
        "Pensi che spiegare richieda più tempo e finisci per fare tutto da solo.",
        "Correggi subito gli altri, anche quando potrebbero trovare una soluzione propria.",
        "Fai fatica a staccare perché continui a sentirti necessario.",
        "Ogni errore del gruppo ti sembra una responsabilità esclusivamente tua.",
      ],
    },
    shift: {
      eyebrow: "Sicurezza immediata",
      title: "Perché controllare tutto sembra più sicuro.",
      paragraphs: [
        "Quando hai esperienza, riconosci rapidamente problemi e possibili soluzioni. Nel mio lavoro da sviluppatore senior ho visto quanto possa essere naturale intervenire: nel breve periodo riduce il rischio e dà il sollievo del «faccio prima io».",
        "Ma ciò che funziona oggi può avere un prezzo nascosto domani. Ogni decisione torna da te, gli altri hanno meno spazio per crescere e staccare diventa sempre più difficile.",
        "Lasciare spazio non significa perdere responsabilità. Significa chiarire obiettivo, confini e momenti di confronto, accettando che un metodo diverso possa essere comunque adeguato al risultato.",
      ],
      points: [
        "il sovraccarico aumenta quando ogni decisione deve passare da te;",
        "risolvere sempre può creare dipendenza invece di autonomia;",
        "controllare ogni dettaglio rende difficile distinguere rischio reale e abitudine;",
        "una responsabilità sostenibile include anche confini, fiducia e spazio per gli altri.",
      ],
    },
    coaching: {
      title: "Cosa può fare il mental coaching",
      canHelp: [
        "Distinguere responsabilità, controllo e bisogno di intervenire.",
        "Chiarire cosa dipende davvero da te e quali confini puoi comunicare.",
        "Osservare dove la paura dell’errore riduce lo spazio lasciato agli altri.",
        "Allenare delega, fiducia e una responsabilità più sostenibile attraverso passi concreti.",
      ],
      cannotHelp: [
        "Non formula diagnosi e non tratta disturbi.",
        "Non è terapia o psicologia clinica.",
        "Non è consulenza aziendale tecnica o organizzativa.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
      ],
    },
    exercise: {
      title: "Lascia un micro-spazio senza perdere responsabilità",
      description: "Scegli una situazione concreta che stai controllando più del necessario e osservala prima di intervenire.",
      steps: [
        "Chiediti: è davvero necessario che lo faccia io?",
        "Osserva se stai aiutando o togliendo all’altra persona lo spazio per imparare.",
        "Distingui ciò che deve essere identico al tuo metodo da ciò che deve solo essere adeguato all’obiettivo.",
        "Scegli un piccolo spazio da lasciare, chiarendo risultato, confini e momento di confronto.",
      ],
    },
    articles: [
      { title: "Responsabilità non significa controllo", description: "Cosa succede quando provi a gestire tutto e diventi indispensabile per gli altri.", href: "/blog/responsabilita-non-significa-controllo-cosa-succede-quando-provi-a-gestire-tutto" },
      { title: "Quando hai troppe cose in testa", description: "Cinque azioni concrete per ridurre il sovraccarico e ritrovare priorità.", href: "/blog/quando-hai-troppe-cose-in-testa-5-azioni-per-ritrovare-lucidita" },
      { title: "La fiducia non arriva sempre prima", description: "Perché anche lasciare spazio può richiedere un passo prima di sentirsi completamente sicuri.", href: "/blog/la-fiducia-arriva-dopo-il-primo-passo" },
    ],
    resources: [
      { title: "Un passo possibile", description: "Una guida gratuita per mettere ordine, distinguere ciò che dipende da te e scegliere un passaggio sostenibile.", cta: "Scopri l'eBook", href: "/ebook" },
      { title: "Un Passo Possibile AI", description: "Una riflessione guidata per osservare una situazione concreta e individuare un primo passo.", cta: "Prova la riflessione guidata", href: siteConfig.appUrl, external: true, note: "Non è terapia e non sostituisce il confronto con un professionista." },
    ],
    faqs: [
      { question: "Perché faccio fatica a delegare?", answer: "Delegare può sembrare più rischioso o lento, soprattutto quando hai esperienza e sai intervenire rapidamente. Può essere utile distinguere il rischio reale dal bisogno abituale di controllare e chiarire quali condizioni renderebbero sostenibile lasciare spazio." },
      { question: "Delegare significa disinteressarsi?", answer: "No. Può significare chiarire l’obiettivo, condividere informazioni e confini, concordare un confronto e lasciare autonomia sul metodo. La responsabilità resta, ma non richiede controllo continuo." },
      { question: "Come faccio a fidarmi se gli altri sbagliano?", answer: "La fiducia non richiede di ignorare gli errori. Puoi iniziare da uno spazio limitato, definire ciò che è davvero essenziale e usare l’errore come informazione, invece di riprendere immediatamente tutto sotto il tuo controllo." },
      { question: "Il coaching può aiutarmi con il controllo?", answer: "Può aiutarti a osservare quando intervieni, cosa temi possa accadere, quali responsabilità sono davvero tue e quale piccolo esperimento puoi fare. Non tratta cause cliniche e non sostituisce un percorso psicologico." },
      { question: "Quando serve un supporto diverso?", answer: "Quando il bisogno di controllo o il disagio sono intensi, persistenti, causano sofferenza significativa o interferiscono in modo importante con la vita quotidiana, è più adatto rivolgersi a un professionista psicologico o sanitario." },
    ],
    closing: { title: "Puoi essere presente senza dover essere indispensabile.", text: "Se responsabilità e controllo stanno occupando troppo spazio, puoi raccontarmi la situazione e valutare con calma se un confronto può aiutarti a distinguere un confine o un primo passo sostenibile.", primaryCta: "Raccontami cosa stai vivendo" },
  },
  mentalCoachingSportivo: {
    path: "/coaching/mental-coaching-sportivo",
    title: "Mental coaching sportivo per errore, pressione e presenza mentale",
    metaTitle: "Mental coaching sportivo per errore e pressione",
    description: "Errore, pressione e fiducia nello sport: scopri come il mental coaching sportivo può aiutarti a restare presente e tornare all’azione successiva.",
    eyebrow: "Mental coaching sportivo",
    heroTitle: "Mental coaching sportivo per errore, pressione e presenza mentale",
    heroText: [
      "Nello sport non conta solo evitare l’errore. Conta anche imparare a rientrare nell’azione successiva, restare presenti e costruire fiducia senza dipendere soltanto dal risultato.",
      "Il percorso può offrire strumenti concreti a sportivi, atleti amatoriali e allenatori, senza promettere prestazioni o cancellare pressione e agitazione.",
    ],
    primaryCta: { label: "Parliamone con calma", href: "/contatti" },
    secondaryCta: { label: "Leggi l'articolo sull'errore", href: "/blog/dopo-un-errore-torna-all-azione-successiva" },
    situations: {
      eyebrow: "Pressione nello sport",
      title: "Quando una prestazione occupa più spazio del gioco.",
      description: "Pressione e aspettative fanno parte dell’esperienza sportiva. Il punto è riconoscere quando tolgono attenzione al compito presente.",
      items: [
        "Un errore resta nella mente e condiziona l’azione successiva.",
        "Prima di una partita importante senti crescere aspettative e agitazione.",
        "La paura di sbagliare rende più difficile scegliere con libertà.",
        "Il giudizio sul risultato prende il posto delle informazioni del momento.",
        "Dopo una prestazione continui a definirti attraverso ciò che non ha funzionato.",
      ],
    },
    shift: {
      eyebrow: "Errore e presenza",
      title: "Il problema non è sbagliare.",
      paragraphs: [
        "L’errore fa parte della prestazione. Una battuta, una scelta o una giocata finiscono in pochi secondi, ma il pensiero può restare molto più a lungo.",
        "Quando provi a cancellare subito ciò che è successo, rischi di forzare l’azione seguente o di perderne le informazioni. Tornare presente non significa ignorare l’errore: significa rimandare l’analisi a quando sarà davvero utile.",
        "La fiducia sportiva non dipende soltanto dal risultato. Può crescere anche dalla capacità di riconoscere ciò che sta accadendo, scegliere un compito concreto e restare disponibile per il momento successivo.",
      ],
      points: [
        "l’attenzione può tornare a posizione, respiro, palla, gesto o comunicazione;",
        "una parola-ancora o una routine semplice segnala che inizia una nuova azione;",
        "il dialogo interno è più utile quando descrive il compito invece di giudicare la persona;",
        "analizzare dopo permette di imparare senza sottrarre presenza durante l’azione.",
      ],
    },
    coaching: {
      title: "Cosa allena il mental coaching sportivo",
      canHelp: [
        "Allenare attenzione e presenza nel compito concreto.",
        "Osservare il dialogo interno prima, durante e dopo la prestazione.",
        "Costruire routine semplici per rientrare dopo un errore.",
        "Lavorare su pressione, scelte e fiducia attraverso l’esperienza.",
      ],
      cannotHelp: [
        "Non garantisce risultati o prestazioni.",
        "Non sostituisce allenamento tecnico, tattico o fisico.",
        "Non è terapia, non fa diagnosi e non tratta disturbi.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
      ],
    },
    exercise: {
      title: "Crea un segnale per tornare all’azione successiva",
      description: "Prova questa sequenza in allenamento, così che possa diventare più riconoscibile anche sotto pressione.",
      steps: [
        "Dopo un errore, nota il primo pensiero automatico senza discuterci a lungo.",
        "Fai un respiro e riconosci che quell’azione è finita.",
        "Scegli una parola-ancora o un gesto semplice collegato al tuo compito.",
        "Torna all’azione successiva e valuta l’errore dopo, non mentre il gioco continua.",
      ],
    },
    articles: [
      { title: "Dopo un errore, torna all’azione successiva", description: "Una sequenza concreta per rientrare nel presente senza ignorare ciò che è successo.", href: "/blog/dopo-un-errore-torna-all-azione-successiva" },
      { title: "La fiducia non arriva sempre prima", description: "Come fare esperienza anche quando non ti senti completamente sicuro.", href: "/blog/la-fiducia-arriva-dopo-il-primo-passo" },
      { title: "Ti parleresti così se fossi una persona a cui vuoi bene?", description: "Un modo più preciso e rispettoso di osservare errore e autocritica.", href: "/blog/ti-parleresti-cosi-se-fossi-una-persona-a-cui-vuoi-bene" },
    ],
    resources: [
      { title: "Un passo possibile", description: "Una guida gratuita con domande ed esercizi su blocco, fiducia, dialogo interno e azione concreta.", cta: "Scopri l'eBook", href: "/ebook" },
      { title: "Un Passo Possibile AI", description: "Una pausa guidata per osservare cosa è successo e individuare un passaggio concreto.", cta: "Prova la riflessione guidata", href: siteConfig.appUrl, external: true, note: "Non è terapia e non sostituisce il confronto con un professionista." },
    ],
    faqs: [
      { question: "Cosa fa un mental coach sportivo?", answer: "Lavora con domande, osservazione ed esercizi su attenzione, presenza, dialogo interno, gestione del momento, responsabilità e azioni concrete. Non garantisce risultati e non sostituisce preparazione tecnica, fisica o supporto clinico." },
      { question: "Il mental coaching serve solo agli atleti professionisti?", answer: "No. Può essere utile anche nello sport amatoriale quando vuoi osservare meglio pressione, errore, concentrazione e rapporto con il risultato, nel rispetto del tuo contesto e dei tuoi obiettivi." },
      { question: "Come si lavora sulla paura di sbagliare?", answer: "Si può osservare cosa accade prima e dopo l’errore, rendere il dialogo interno più concreto e allenare un riferimento per tornare al compito. L’obiettivo non è eliminare la paura, ma gestire il momento con maggiore presenza." },
      { question: "Può aiutare anche nello sport amatoriale?", answer: "Sì, quando il tema riguarda consapevolezza, fiducia, pressione e azioni allenabili. Il percorso viene adattato all’esperienza reale della persona, non a uno standard di prestazione professionistica." },
      { question: "Quando serve uno psicologo dello sport?", answer: "Quando il disagio è intenso o persistente, coinvolge sintomi o sofferenza significativa oppure interferisce in modo importante con sport e vita quotidiana, è più appropriato rivolgersi a uno psicologo dello sport o a un professionista sanitario qualificato." },
    ],
    closing: { title: "L’azione successiva non deve cancellare quella precedente.", text: "Può essere il momento in cui torni disponibile al compito. Se vuoi lavorare su errore, pressione o presenza nello sport, puoi raccontarmi la situazione con poche righe.", primaryCta: "Parliamone con calma" },
  },
  cosaFaUnMentalCoach: {
    path: "/coaching/cosa-fa-un-mental-coach",
    title: "Cosa fa un mental coach e quando può esserti utile",
    metaTitle: "Cosa fa un mental coach e quando può aiutarti",
    description: "Scopri cosa fa un mental coach, quando può esserti utile e quali sono i confini rispetto a psicologia e terapia. Un approccio concreto per fare chiarezza e scegliere un primo passo.",
    eyebrow: "Mental coaching",
    heroTitle: "Cosa fa un mental coach e quando può esserti utile",
    heroText: [
      "Il mental coaching può aiutarti a fare chiarezza, osservare ciò che ti blocca e trasformare un problema confuso in un passo concreto. Senza formule magiche, senza giudizio e con confini professionali chiari.",
      "Non devi essere già pronto o avere un obiettivo perfetto: puoi partire da una situazione reale che oggi occupa troppo spazio.",
    ],
    primaryCta: { label: "Raccontami cosa stai vivendo", href: "/contatti" },
    secondaryCta: { label: "Scopri le aree di lavoro", href: "#aree-di-lavoro" },
    situations: {
      eyebrow: "Quando può essere utile",
      title: "Puoi partire da ciò che stai vivendo adesso.",
      description: "Il mental coaching non richiede una categoria o una diagnosi. Può essere utile quando vuoi osservare meglio una situazione e tornare a ciò che puoi scegliere o fare.",
      items: [
        "Stress lavorativo, sovraccarico e difficoltà a riconoscere le priorità.",
        "Pensieri continui che producono poca chiarezza e rendono difficile decidere.",
        "Poca fiducia, autocritica o paura di non essere abbastanza.",
        "Blocco, procrastinazione o difficoltà a individuare da dove iniziare.",
        "Responsabilità, bisogno di controllo e fatica nel lasciare spazio agli altri.",
        "Pressione, errore e presenza mentale nello sport.",
      ],
    },
    shift: {
      eyebrow: "Come funziona un percorso",
      title: "Dalla situazione concreta a un passo osservabile.",
      paragraphs: [
        "Un percorso parte dall’ascolto della situazione e dalla definizione del tema su cui vuoi lavorare. Attraverso domande ed esercizi pratici osserviamo pensieri, scelte, pressioni e possibilità, senza decidere al posto tuo.",
        "Non cerchiamo una formula universale. Trasformiamo ciò che appare ampio o confuso in piccoli passi osservabili, verifichiamo cosa funziona e costruiamo una continuità che sia sostenibile nella tua vita reale.",
        "Il mio approccio è umano, concreto e non giudicante. Porto anche l’esperienza quotidiana di padre, sportivo amatoriale e sviluppatore senior, senza trasformarla in una risposta pronta per la storia di un’altra persona.",
      ],
      points: [
        "ascoltare la situazione e chiarire il tema del confronto;",
        "distinguere fatti, interpretazioni e ciò che dipende da te;",
        "usare domande ed esercizi per rendere visibili scelte e priorità;",
        "scegliere un passo concreto e osservare cosa produce;",
        "adattare il percorso a ciò che emerge, senza promesse o frasi motivazionali vuote.",
      ],
    },
    coaching: {
      title: "Cosa fa un mental coach, con confini chiari",
      canHelp: [
        "Fare chiarezza su pensieri, obiettivi, blocchi, pressione e decisioni.",
        "Allenare consapevolezza, presenza, responsabilità e fiducia.",
        "Trasformare un problema confuso in priorità e azioni concrete.",
        "Osservare cosa funziona e costruire continuità attraverso piccoli passi.",
        "Creare uno spazio di confronto senza giudizio e senza decidere al posto tuo.",
      ],
      cannotHelp: [
        "Non è terapia o psicologia clinica.",
        "Non formula diagnosi e non tratta disturbi.",
        "Non sostituisce supporto psicologico, medico o sanitario.",
        "Non offre formule magiche e non promette risultati garantiti.",
        "Quando il disagio è intenso o persistente, è importante rivolgersi a un professionista sanitario qualificato.",
      ],
    },
    exercise: {
      title: "Individua il tema da cui potresti partire",
      description: "Non serve definire l’intero percorso. Puoi iniziare rendendo più leggibile una sola situazione.",
      steps: [
        "Scrivi in una frase ciò che in questo momento pesa o ti tiene fermo.",
        "Distingui ciò che è accaduto dai giudizi e dalle previsioni che lo accompagnano.",
        "Chiediti quale parte dipende almeno in parte da te.",
        "Scegli una micro-azione osservabile e valuta se parlarne in un percorso potrebbe esserti utile.",
      ],
    },
    relatedContent: {
      eyebrow: "Aree di lavoro",
      title: "Esplora la situazione più vicina a ciò che stai vivendo.",
      cta: "Approfondisci l'area",
    },
    articles: [
      { title: "Stress lavorativo e sovraccarico", description: "Quando attività, urgenze e responsabilità occupano tutte lo stesso spazio mentale.", href: "/coaching/stress-lavorativo" },
      { title: "Overthinking e pensieri continui", description: "Quando pensare non porta più chiarezza e rende difficile scegliere un’azione.", href: "/coaching/overthinking" },
      { title: "Autostima e fiducia", description: "Quando autocritica e paura di sbagliare rendono difficile fidarti delle tue possibilità.", href: "/coaching/autostima-e-fiducia" },
      { title: "Blocco e primo passo", description: "Quando rimandi, aspetti di sentirti pronto o non riesci a individuare da dove iniziare.", href: "/coaching/blocco-e-primo-passo" },
      { title: "Responsabilità e controllo", description: "Quando essere affidabile diventa bisogno di gestire tutto e difficoltà a delegare.", href: "/coaching/responsabilita-e-controllo" },
      { title: "Mental coaching sportivo", description: "Quando errore, pressione e giudizio sottraggono presenza all’azione sportiva.", href: "/coaching/mental-coaching-sportivo" },
    ],
    resources: [
      { title: "Un passo possibile", description: "Una guida gratuita con domande ed esercizi per fare chiarezza e individuare un passaggio sostenibile.", cta: "Scopri l'eBook", href: "/ebook" },
      { title: "Un Passo Possibile AI", description: "Una riflessione guidata per fermarti, distinguere ciò che sta succedendo e scegliere un passo concreto.", cta: "Prova la riflessione guidata", href: siteConfig.appUrl, external: true, note: "Non è terapia e non sostituisce il confronto con un professionista." },
      { title: "Articoli e riflessioni", description: "Approfondimenti evergreen su fiducia, pressione, errore, responsabilità e vita quotidiana.", cta: "Esplora il blog", href: "/blog" },
    ],
    faqs: [
      { question: "Cosa fa concretamente un mental coach?", answer: "Ascolta la situazione, pone domande, propone esercizi e aiuta a distinguere fatti, pensieri, priorità e azioni possibili. Non decide al posto tuo: il lavoro serve a rendere più consapevoli e concreti i tuoi passaggi." },
      { question: "Il mental coaching è terapia?", answer: "No. Il mental coaching lavora su obiettivi, consapevolezza, scelte e azioni concrete. Psicologi e psicoterapeuti operano, secondo le rispettive competenze, anche in ambiti psicologici, sanitari, clinici o terapeutici. Il coaching non fa diagnosi e non tratta disturbi." },
      { question: "Devo avere un obiettivo preciso?", answer: "No. Puoi arrivare con una situazione confusa, una scelta o qualcosa che continua a pesare. Il primo lavoro può essere proprio chiarire il tema e capire quale parte è utile osservare." },
      { question: "Quanto dura un percorso?", answer: "Non esiste una durata valida per tutti. Dipende dal tema, dal contesto e da ciò che emerge. Prima di iniziare vengono chiarite modalità e aspettative, senza creare un impegno indefinito." },
      { question: "Di cosa si parla in una sessione?", answer: "Si parte da episodi, decisioni, pensieri o comportamenti concreti. Il confronto può riguardare lavoro, fiducia, blocco, responsabilità, pressione, sport o un altro obiettivo compatibile con i confini del coaching." },
      { question: "Quando è meglio rivolgersi a uno psicologo?", answer: "Quando il disagio è intenso o persistente, coinvolge sintomi o sofferenza significativa oppure interferisce in modo importante con la vita quotidiana, è più appropriato rivolgersi a uno psicologo o a un professionista sanitario qualificato." },
      { question: "Il mental coaching è utile anche nello sport?", answer: "Può essere utile per lavorare su attenzione, presenza, dialogo interno, pressione e gestione dell’errore. Non sostituisce allenamento tecnico o fisico e non garantisce prestazioni o risultati." },
      { question: "Il mental coaching è utile anche nel lavoro?", answer: "Può aiutare a fare chiarezza su priorità, pressione, responsabilità, controllo, confini e decisioni. Non è consulenza aziendale tecnica e non interviene direttamente sull’organizzazione in cui lavori." },
    ],
    closing: { title: "Puoi partire da una situazione, non da una risposta perfetta.", text: "Se vuoi capire se il mental coaching può essere uno spazio adatto a ciò che stai vivendo, puoi raccontarmi il tema in poche righe e valutarlo con calma.", primaryCta: "Raccontami cosa stai vivendo" },
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
  {
    title: "Autostima e fiducia",
    description:
      "Quando l’autocritica pesa e aspetti di sentirti sicuro prima di fare un passo.",
    href: coachingLandingPages.autostimaEFiducia.path,
  },
  {
    title: "Blocco e primo passo",
    description:
      "Quando continui a rimandare e hai bisogno di rendere l’inizio più chiaro e sostenibile.",
    href: coachingLandingPages.bloccoEPrimoPasso.path,
  },
  {
    title: "Responsabilità e controllo",
    description: "Quando essere affidabile significa sentirti necessario, controllare ogni dettaglio e fare fatica a delegare.",
    href: coachingLandingPages.responsabilitaEControllo.path,
  },
  {
    title: "Mental coaching sportivo",
    description: "Quando errore, pressione e giudizio rendono più difficile restare presente nell’azione.",
    href: coachingLandingPages.mentalCoachingSportivo.path,
  },
  {
    title: "Cosa fa un mental coach",
    description: "Una guida al percorso, agli strumenti e ai confini professionali del mental coaching.",
    href: coachingLandingPages.cosaFaUnMentalCoach.path,
  },
] as const;
