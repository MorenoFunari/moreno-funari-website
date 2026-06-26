import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata: Metadata = {
  title: "Un passo possibile",
  description:
    "Una guida per quando ti senti bloccato e non sai da dove ripartire.",
};

export default function EbookPage() {
  return (
    <PlaceholderPage
      eyebrow="eBook"
      title="Un passo possibile"
      description="Una guida per quando ti senti bloccato e non sai da dove ripartire."
    />
  );
}
