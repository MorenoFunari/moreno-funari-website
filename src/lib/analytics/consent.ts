export type AnalyticsConsentStatus = "granted" | "denied";

export type StoredAnalyticsConsent = {
  version: 1;
  status: AnalyticsConsentStatus;
  updatedAt: string;
};

export const analyticsConsentStorageKey = "mf_analytics_consent";
export const analyticsPreferencesEventName = "mf:analytics-preferences";

const consentVersion = 1;
const consentMaxAgeMonths = 6;

function isBrowser() {
  return typeof window !== "undefined";
}

function isAnalyticsConsentStatus(
  status: unknown,
): status is AnalyticsConsentStatus {
  return status === "granted" || status === "denied";
}

function addCalendarMonths(date: Date, months: number) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function isStoredAnalyticsConsent(
  value: unknown,
): value is StoredAnalyticsConsent {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<StoredAnalyticsConsent>;

  return (
    candidate.version === consentVersion &&
    isAnalyticsConsentStatus(candidate.status) &&
    typeof candidate.updatedAt === "string" &&
    !Number.isNaN(Date.parse(candidate.updatedAt))
  );
}

function isExpired(updatedAt: string) {
  const updatedDate = new Date(updatedAt);
  const expiresAt = addCalendarMonths(updatedDate, consentMaxAgeMonths);

  return expiresAt.getTime() <= Date.now();
}

export function readAnalyticsConsent(): StoredAnalyticsConsent | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(analyticsConsentStorageKey);

    if (!storedValue) {
      return null;
    }

    const parsedValue: unknown = JSON.parse(storedValue);

    if (!isStoredAnalyticsConsent(parsedValue) || isExpired(parsedValue.updatedAt)) {
      clearAnalyticsConsent();
      return null;
    }

    return parsedValue;
  } catch {
    clearAnalyticsConsent();
    return null;
  }
}

export function saveAnalyticsConsent(
  status: AnalyticsConsentStatus,
): StoredAnalyticsConsent | null {
  if (!isBrowser()) {
    return null;
  }

  const value: StoredAnalyticsConsent = {
    version: consentVersion,
    status,
    updatedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(
      analyticsConsentStorageKey,
      JSON.stringify(value),
    );
  } catch {
    return null;
  }

  return value;
}

export function clearAnalyticsConsent() {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(analyticsConsentStorageKey);
  } catch {
    return;
  }
}
