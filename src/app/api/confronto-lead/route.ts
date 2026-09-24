import { NextResponse } from "next/server";

const brevoContactsEndpoint = "https://api.brevo.com/v3/contacts";

type ConfrontoLeadPayload = {
  email?: unknown;
  name?: unknown;
  note?: unknown;
  phone?: unknown;
  privacyConsent?: unknown;
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeItalianPhone(value: string) {
  const compactPhone = value.replace(/[\s().-]/g, "");

  if (compactPhone.startsWith("+") || compactPhone.startsWith("00")) {
    return compactPhone;
  }

  if (/^3\d{8,10}$/.test(compactPhone)) {
    return `+39${compactPhone}`;
  }

  return compactPhone;
}

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

async function createBrevoContact({
  apiKey,
  body,
}: {
  apiKey: string;
  body: Record<string, unknown>;
}) {
  return fetch(brevoContactsEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

export async function POST(request: Request) {
  let payload: ConfrontoLeadPayload;

  try {
    payload = (await request.json()) as ConfrontoLeadPayload;
  } catch {
    return jsonError("Invalid JSON payload.", 400);
  }

  const email = normalizeString(payload.email).toLowerCase();
  const name = normalizeString(payload.name);
  const note = normalizeString(payload.note);
  const phone = normalizeItalianPhone(normalizeString(payload.phone));
  const privacyConsent = payload.privacyConsent === true;

  if (!name || !email || !phone || !privacyConsent) {
    return jsonError("Missing required fields.", 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listIdValue = process.env.BREVO_LIST_ID_PILOT;
  const listId = listIdValue ? Number.parseInt(listIdValue, 10) : NaN;

  if (!apiKey || !Number.isInteger(listId)) {
    console.error("Confronto lead capture is missing Brevo configuration.", {
      hasApiKey: Boolean(apiKey),
      hasListId: Boolean(listIdValue),
      listIdValueIsInteger: Number.isInteger(listId),
    });

    return jsonError("Lead capture is not configured.", 503);
  }

  const baseContact = {
    email,
    listIds: [listId],
    updateEnabled: true,
  };

  const response = await createBrevoContact({
    apiKey,
    body: {
      ...baseContact,
      attributes: {
        CONFRONTO_NOTE: note,
        NOME: name,
        PILOT_SOURCE: "confronto_landing",
        PILOT_TAG: "CONFRONTO",
        WHATSAPP: phone,
      },
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Brevo rejected confronto lead capture request.", {
      status: response.status,
      body: errorBody,
    });

    const fallbackResponse = await createBrevoContact({
      apiKey,
      body: {
        ...baseContact,
        attributes: {
          NOME: name,
          WHATSAPP: phone,
        },
      },
    });

    if (!fallbackResponse.ok) {
      const fallbackErrorBody = await fallbackResponse.text();

      console.error("Brevo rejected confronto fallback lead capture request.", {
        status: fallbackResponse.status,
        body: fallbackErrorBody,
      });

      return jsonError("Brevo rejected the lead capture request.", 502);
    }

    console.warn(
      "Brevo accepted confronto lead with fallback attributes. Custom Pilot attributes may be missing.",
    );
  }

  return NextResponse.json({ ok: true });
}
