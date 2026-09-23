type FbqEventOptions = Record<string, string | number | boolean | null>;

type FbqCommand =
  | ["init", string]
  | ["track", "PageView", FbqEventOptions?]
  | ["trackCustom", string, FbqEventOptions?];

declare global {
  interface Window {
    fbq?: (...command: FbqCommand) => void;
    _fbq?: Window["fbq"];
  }
}

export {};
