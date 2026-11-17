import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

const brevoContactsEndpoint = "https://api.brevo.com/v3/contacts";
const brevoTransactionalEmailEndpoint = "https://api.brevo.com/v3/smtp/email";
const defaultPassoListId = 4;
const defaultCommunityListId = 3;
const defaultPassoTemplateId = 2;
const passoRequestText = "Ho letto l’Informativa Privacy e chiedo di ricevere via email la guida gratuita PASSO.";
const marketingConsentText = "Desidero ricevere anche email occasionali da Moreno Funari con riflessioni, contenuti pratici e aggiornamenti sul coaching. Posso disiscrivermi in qualsiasi momento.";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactAttributes = Record<string, boolean | string>;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getPositiveInteger(value: string | undefined, fallback: number) {
  const parsedValue = Number(value);
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback;
}

type FailureStage = "contact" | "email" | "configuration";
const publicProviderCodes = new Set([
  "invalid_parameter", "missing_parameter", "unauthorized", "permission_denied",
  "document_not_found", "duplicate_parameter", "method_not_allowed",
  "not_enough_credits", "account_under_validation", "too_many_requests",
]);
function jsonError(status = 502, stage?: FailureStage, providerCode?: unknown) {
  const code = typeof providerCode === "string" && publicProviderCodes.has(providerCode)
    ? providerCode : "provider_error";
  return NextResponse.json({ success: false, ...(stage ? { error: stage, code } : {}) }, { status });
}

async function providerError(response: Response, stage: string) {
  const error = await response.clone().json().catch(() => null);
  // Never log provider messages: they can contain contact information.
  console.error("Brevo PASSO operation rejected.", {
    stage, status: response.status,
    code: typeof error?.code === "string" ? error.code : "unknown",
  });
  return error;
}

async function createOrUpdateContact({ apiKey, attributes, email, listId, marketing, communityListId }: {
  apiKey: string; attributes: ContactAttributes; email: string; listId: number; marketing: boolean; communityListId: number;
}) {
  const headers = { "api-key": apiKey, "Content-Type": "application/json" };
  const contactUrl = `${brevoContactsEndpoint}/${encodeURIComponent(email)}`;
  const lookup = () => fetch(contactUrl, { headers, cache: "no-store" });
  let existing = await lookup();
  if (existing.status === 404) {
    const created = await fetch(brevoContactsEndpoint, {
      method: "POST", headers, cache: "no-store",
      body: JSON.stringify({ email, attributes, listIds: [listId, communityListId], updateEnabled: false }),
    });
    if (created.ok) return { response: created, name: String(attributes.NOME ?? "") };
    const error = await providerError(created, "create");
    // Only a confirmed identifier conflict can be a concurrent creation.
    if (created.status !== 400 || error?.code !== "duplicate_parameter") return { response: created, name: "" };
    existing = await lookup();
  }
  if (!existing.ok) return { response: existing, name: "" };
  const contact = await existing.json();
  const previous = contact.attributes ?? {};
  // An unchecked optional field is not a withdrawal. Do not reinterpret legacy CONSENSO.
  const update: ContactAttributes = {
    PASSO_REQUEST: attributes.PASSO_REQUEST,
    ...(attributes.NOME ? { NOME: attributes.NOME } : {}),
  };
  if (marketing && !contact.emailBlacklisted) {
    update.MARKETING_CONSENT = true;
    update.MARKETING_EVIDENCE = attributes.MARKETING_EVIDENCE;
  } else if (previous.MARKETING_CONSENT === undefined || previous.MARKETING_CONSENT === null) {
    update.MARKETING_CONSENT = false;
  }
  // Brevo unsubscribe/blocklist remains authoritative: never unblock through this form.
  const listIds = [listId, communityListId];
  const response = await fetch(contactUrl, {
    method: "PUT", headers, cache: "no-store",
    body: JSON.stringify({ attributes: update, listIds }),
  });
  return { response, name: String(attributes.NOME || previous.NOME || "") };
}

async function sendGuideEmail({
  apiKey,
  email,
  name,
  templateId,
  requestId,
}: {
  apiKey: string;
  email: string;
  name: string;
  templateId: number;
  requestId: string;
}) {
  return fetch(brevoTransactionalEmailEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      templateId,
      headers: { idempotencyKey: requestId },
      to: [
        {
          email,
          ...(name ? { name } : {}),
        },
      ],
      params: {
        NOME: name,
      },
    }),
    cache: "no-store",
  });
}

type Submission = { fingerprint: string; expiresAt: number; pending: Promise<Response> };
const submissions = new Map<string, Submission>();
const requestWindowMs = 25 * 60 * 1000;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError(400);
  }

  const email = getString(formData, "EMAIL").toLowerCase();
  const name = getString(formData, "NOME");
  const consent = getString(formData, "CONSENSO");
  const marketingValue = getString(formData, "MARKETING_CONSENT");
  const marketing = marketingValue === "1";
  const honeypot = getString(formData, "email_address_check");

  if (honeypot || !emailPattern.test(email) || email.length > 320 || name.length > 200 || consent !== "1" || !["", "1"].includes(marketingValue)) {
    return jsonError(400);
  }

  const suppliedId = getString(formData, "requestId");
  const startedAt = Number(getString(formData, "requestedAt"));
  if (suppliedId && (!uuidPattern.test(suppliedId) || !Number.isFinite(startedAt)
    || startedAt > Date.now() + 5000 || Date.now() - startedAt > requestWindowMs)) {
    return jsonError(400);
  }
  const requestId = suppliedId || randomUUID(); // Compatibility with already-open forms.
  const fingerprint = createHash("sha256").update(JSON.stringify([email, name, consent, marketing])).digest("hex");
  for (const [key, entry] of submissions) if (entry.expiresAt < Date.now()) submissions.delete(key);
  const previous = submissions.get(requestId);
  if (previous) return previous.fingerprint === fingerprint
    ? (await previous.pending).clone() : jsonError(409);
  if (submissions.size >= 1000) return jsonError(503);
  const pending = deliver(email, name, requestId, marketing);
  submissions.set(requestId, { fingerprint, expiresAt: Date.now() + requestWindowMs, pending });
  const response = await pending;
  if (!response.ok) submissions.delete(requestId);
  return response.clone();
}

async function deliver(email: string, name: string, requestId: string, marketing: boolean) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("PASSO lead capture is missing BREVO_API_KEY.");
    return jsonError(503, "configuration");
  }

  const listId = getPositiveInteger(
    process.env.BREVO_LIST_ID_PASSO_GUIDE,
    defaultPassoListId,
  );
  const templateId = getPositiveInteger(
    process.env.BREVO_TEMPLATE_ID_PASSO,
    defaultPassoTemplateId,
  );
  const requestedAt = new Date().toISOString();
  const communityListId = getPositiveInteger(process.env.BREVO_LIST_ID_COMMUNITY ?? process.env.BREVO_LIST_ID_MARKETING, defaultCommunityListId);
  if (listId === communityListId) return jsonError(503, "configuration");
  const passoAttributes: ContactAttributes = {
    ...(name ? { NOME: name } : {}),
    PASSO_REQUEST: JSON.stringify({
      version: "v2", source: "/passo", at: requestedAt, requestId,
      guideRequested: true, requestText: passoRequestText, marketingSelected: marketing,
    }),
    MARKETING_CONSENT: marketing,
    ...(marketing ? { MARKETING_EVIDENCE: JSON.stringify({
      version: "v2", source: "/passo", at: requestedAt, requestId, text: marketingConsentText,
    }) } : {}),
  };

  let contactResponse: Response;
  let deliveryName = name;
  try {
    const contact = await createOrUpdateContact({ apiKey, attributes: passoAttributes, email, listId, marketing, communityListId });
    contactResponse = contact.response;
    deliveryName = contact.name;
  } catch {
    console.error("Brevo PASSO contact request failed.");
    return jsonError(502, "contact");
  }

  if (!contactResponse.ok) {
    console.error("Brevo rejected PASSO contact creation.", {
      status: contactResponse.status,
    });
    const error = await providerError(contactResponse, "contact");
    return jsonError(502, "contact", error?.code);
  }

  let emailResponse: Response;

  try {
    emailResponse = await sendGuideEmail({
      apiKey,
      email,
      name: deliveryName,
      templateId,
      requestId,
    });
  } catch {
    console.error("Brevo PASSO guide email request failed.");
    return jsonError(502, "email");
  }

  if (!emailResponse.ok) {
    const error = await providerError(emailResponse, "email");
    // Brevo persists this UUID across instances for 30 minutes. Only its
    // explicit idempotency rejection confirms a previously accepted send.
    if (!(emailResponse.status === 400 && error?.code === "duplicate_parameter"
      && typeof error?.message === "string" && /idempotenc/i.test(error.message))) {
      return jsonError(502, "email", error?.code);
    }
  }

  return NextResponse.json({ consentAttributesSaved: true, guideEmailSent: true, success: true });
}
