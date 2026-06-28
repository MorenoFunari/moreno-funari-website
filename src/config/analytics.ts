const measurementIdPattern = /^G-[A-Z0-9]+$/;

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const isMeasurementIdValid = measurementIdPattern.test(measurementId);

export const analyticsConfig = {
  enabled: process.env.NEXT_PUBLIC_GA_ENABLED === "true",
  measurementId,
  gaDisableKey: "ga-disable-G-11RJTDXWBS",
  isMeasurementIdValid,
  isConfigured:
    process.env.NEXT_PUBLIC_GA_ENABLED === "true" && isMeasurementIdValid,
} as const;
