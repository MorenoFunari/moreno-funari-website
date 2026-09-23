const measurementIdPattern = /^G-[A-Z0-9]+$/;
const metaPixelIdPattern = /^[0-9]+$/;

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const isMeasurementIdValid = measurementIdPattern.test(measurementId);

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
const isMetaPixelIdValid = metaPixelIdPattern.test(metaPixelId);

export const analyticsConfig = {
  enabled: process.env.NEXT_PUBLIC_GA_ENABLED === "true",
  measurementId,
  gaDisableKey: "ga-disable-G-11RJTDXWBS",
  isMeasurementIdValid,
  isConfigured:
    process.env.NEXT_PUBLIC_GA_ENABLED === "true" && isMeasurementIdValid,
  metaPixel: {
    enabled: process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true",
    pixelId: metaPixelId,
    isPixelIdValid: isMetaPixelIdValid,
    isConfigured:
      process.env.NEXT_PUBLIC_META_PIXEL_ENABLED === "true" &&
      isMetaPixelIdValid,
  },
} as const;
