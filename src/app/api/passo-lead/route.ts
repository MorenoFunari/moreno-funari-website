import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

const brevoContactsEndpoint = "https://api.brevo.com/v3/contacts";
const brevoTransactionalEmailEndpoint = "https://api.brevo.com/v3/smtp/email";
const defaultPassoListId = 3;
const defaultPassoTemplateId = 2;
const passoConsentText =
  "Ho letto la Privacy Policy e acconsento al trattamento dei miei dati per ricevere la guida gratuita richiesta e contenuti pratici collegati a consapevolezza, confini e primi passi possibili. Potrò cancellarmi in qualsiasi momento.";
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

async function createOrUpdateContact({ apiKey, attributes, email, listId }: {
  apiKey: string; attributes: ContactAttributes; email: string; listId: number;
}) {
  const headers = { "api-key": apiKey, "Content-Type": "application/json" };
  const contactUrl = `${brevoContactsEndpoint}/${encodeURIComponent(email)}`;
  const lookup = () => fetch(contactUrl, { headers, cache: "no-store" });
  let existing = await lookup();
  if (existing.status === 404) {
    const created = await fetch(brevoContactsEndpoint, {
      method: "POST", headers, cache: "no-store",
      body: JSON.stringify({ email, attributes, listIds: [listId], updateEnabled: false }),
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
  const update: ContactAttributes = {};
  for (const [key, value] of Object.entries(attributes)) {
    // Preserve the original consent evidence and unrelated contact attributes.
    if (key === "NOME" || previous[key] === undefined || previous[key] === null) {
      update[key] = value;
    }
  }
  const response = await fetch(contactUrl, {
    method: "PUT", headers, cache: "no-store",
    body: JSON.stringify({ attributes: update, listIds: [listId] }),
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
  const honeypot = getString(formData, "email_address_check");

  if (honeypot || !emailPattern.test(email) || consent !== "1") {
    return jsonError(400);
  }

  const suppliedId = getString(formData, "requestId");
  const startedAt = Number(getString(formData, "requestedAt"));
  if (suppliedId && (!uuidPattern.test(suppliedId) || !Number.isFinite(startedAt)
    || startedAt > Date.now() + 5000 || Date.now() - startedAt > requestWindowMs)) {
    return jsonError(400);
  }
  const requestId = suppliedId || randomUUID(); // Compatibility with already-open forms.
  const fingerprint = createHash("sha256").update(JSON.stringify([email, name, consent])).digest("hex");
  for (const [key, entry] of submissions) if (entry.expiresAt < Date.now()) submissions.delete(key);
  const previous = submissions.get(requestId);
  if (previous) return previous.fingerprint === fingerprint
    ? (await previous.pending).clone() : jsonError(409);
  if (submissions.size >= 1000) return jsonError(503);
  const pending = deliver(email, name, requestId);
  submissions.set(requestId, { fingerprint, expiresAt: Date.now() + requestWindowMs, pending });
  const response = await pending;
  if (!response.ok) submissions.delete(requestId);
  return response.clone();
}

async function deliver(email: string, name: string, requestId: string) {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("PASSO lead capture is missing BREVO_API_KEY.");
    return jsonError(503, "configuration");
  }

  const listId = getPositiveInteger(
    process.env.BREVO_LIST_ID_PASSO,
    defaultPassoListId,
  );
  const templateId = getPositiveInteger(
    process.env.BREVO_TEMPLATE_ID_PASSO,
    defaultPassoTemplateId,
  );
  const requestedAt = new Date().toISOString();
  const baseAttributes: ContactAttributes = {
    CONSENSO: true,
    ...(name ? { NOME: name } : {}),
  };
  const passoAttributes: ContactAttributes = {
    ...baseAttributes,
    PASSO_REQUESTED: true,
    PASSO_SOURCE: "/passo",
    PASSO_REQUESTED_AT: requestedAt,
    PASSO_PRIVACY_ACCEPTED: true,
    PASSO_CONSENT_TEXT: passoConsentText,
    PASSO_FORM_VERSION: "v1",
  };

  let contactResponse: Response;
  let deliveryName = name;
  try {
    const contact = await createOrUpdateContact({ apiKey, attributes: passoAttributes, email, listId });
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
