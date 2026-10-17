export const percorsiConfig = {
  name: "Un Passo Possibile",
  launchPrice: 700,
  ordinaryPrice: 1_100,
  currency: "EUR",
  launchEnabled: true,
  launchPlacesAvailable: 5,
  // TODO: obtain and approve the exact fiscal wording before publication.
  fiscalWording: null as string | null,
  // TODO: approve coverage of the paid-path form in /privacy-policy.
  privacyConfirmed: false,
  showOfferSchema: false,
} as const;

export function getPercorsiPrice() {
  return percorsiConfig.launchEnabled && percorsiConfig.launchPlacesAvailable > 0
    ? percorsiConfig.launchPrice
    : percorsiConfig.ordinaryPrice;
}

export const percorsiConfirmation =
  "Grazie, ho ricevuto la tua richiesta. La leggo personalmente e ti rispondo appena possibile.";
