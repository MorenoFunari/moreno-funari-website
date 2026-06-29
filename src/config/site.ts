const siteUrl = "https://morenofunari.it";

export const siteConfig = {
  name: "Moreno Funari | Mental Coach",
  shortName: "Moreno Funari",
  description:
    "Uno spazio per chi si sente bloccato, sotto pressione o troppo duro con sé stesso e vuole ritrovare chiarezza attraverso piccoli passi concreti.",
  siteUrl,
  url: siteUrl,
  appUrl: "https://app.morenofunari.it",
  ebookPath: "/ebook",
  ebookPdfPath: "/documents/un-passo-possibile-moreno-funari.pdf",
  email: "moreno.funari@gmail.com",
  instagramUrl: "https://www.instagram.com/moreno.coach86/",
  mainNavigation: [
    { label: "Chi sono", href: "/chi-sono" },
    { label: "Blog", href: "/blog" },
    { label: "eBook", href: "/ebook" },
    { label: "Coaching", href: "/coaching" },
  ],
  footerNavigation: [
    { label: "Home", href: "/" },
    { label: "Chi sono", href: "/chi-sono" },
    { label: "Blog", href: "/blog" },
    { label: "eBook", href: "/ebook" },
    { label: "Coaching", href: "/coaching" },
    { label: "Contatti", href: "/contatti" },
  ],
  legalNavigation: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
export type MainNavigationItem = (typeof siteConfig.mainNavigation)[number];
export type FooterNavigationItem = (typeof siteConfig.footerNavigation)[number];
export type LegalNavigationItem = (typeof siteConfig.legalNavigation)[number];
