import type { Metadata } from "next";
import { Lora, Source_Sans_3 } from "next/font/google";

import { SiteShell } from "@/components/layout/site-shell";
import { siteConfig } from "@/config/site";

import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  authors: [{ name: "Moreno Funari" }],
  creator: "Moreno Funari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${sourceSans3.variable} ${lora.variable}`}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
