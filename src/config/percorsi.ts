export const percorsiConfig = {
  name: "Un Passo Possibile",
  launchPrice: 700,
  ordinaryPrice: 1_100,
  currency: "EUR",
  finalPriceNotice: "Importi finali, senza maggiorazioni.",
  launchEnabled: true,
  launchPlacesAvailable: 5,
  fiscalWording: "IVA inclusa",
  // TODO: approve coverage of the paid-path form in /privacy-policy.
  privacyConfirmed: false,
  showOfferSchema: false,
} as const;

export type PercorsiPriceSettings = {
  launchPrice: number;
  ordinaryPrice: number;
  launchEnabled: boolean;
  launchPlacesAvailable: number;
};

export function isPercorsiLaunchAvailable(pricing: PercorsiPriceSettings = percorsiConfig) {
  return pricing.launchEnabled && pricing.launchPlacesAvailable > 0;
}

export function getPercorsiPrice(pricing: PercorsiPriceSettings = percorsiConfig) {
  return isPercorsiLaunchAvailable(pricing) ? pricing.launchPrice : pricing.ordinaryPrice;
}

export const percorsiConfirmation =
  "Grazie, ho ricevuto la tua richiesta. La leggo personalmente e ti rispondo appena possibile.";
