import type { Metadata } from "next";

import { seoConfig, toAbsoluteUrl } from "@/config/seo";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: `/${string}`;
  noIndex?: boolean;
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  noIndex = false,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const canonical = toAbsoluteUrl(path);
  const socialImageUrl = toAbsoluteUrl(seoConfig.defaultSocialImagePath);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      images: [
        {
          url: socialImageUrl,
          width: 1200,
          height: 630,
          alt: seoConfig.defaultSocialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}
