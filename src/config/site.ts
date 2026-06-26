export const siteConfig = {
  name: "Moreno Funari | Mental Coach",
  shortName: "Moreno Funari",
  description:
    "Uno spazio per chi si sente bloccato, sotto pressione o troppo duro con sé stesso e vuole ritrovare chiarezza attraverso piccoli passi concreti.",
  url: "https://morenofunari.it",
  appUrl: "https://app.morenofunari.it",
  email: "moreno.funari@gmail.com",
  instagramUrl: "https://www.instagram.com/moreno.coach86/",
} as const;

export type SiteConfig = typeof siteConfig;
