const siteUrl = "https://morenofunari.it";
const instagramUrl = "https://www.instagram.com/moreno.coach86/";

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
  email: "info@morenofunari.it",
  instagramUrl,
  socialLinks: [
    {
      label: "Instagram",
      ariaLabel: "Instagram di Moreno Funari",
      href: instagramUrl,
    },
  ],
  mainNavigation: [
    { label: "Inizia da qui", href: "/inizia-da-qui" },
    { label: "Chi sono", href: "/chi-sono" },
    { label: "Blog", href: "/blog" },
    { label: "eBook", href: "/ebook" },
    { label: "Coaching", href: "/coaching" },
  ],
  footerNavigation: [
    { label: "Home", href: "/" },
    { label: "Inizia da qui", href: "/inizia-da-qui" },
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
export type SocialLinkItem = (typeof siteConfig.socialLinks)[number];
