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

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
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
  const phone = normalizeString(payload.phone);
  const privacyConsent = payload.privacyConsent === true;

  if (!name || !email || !phone || !privacyConsent) {
    return jsonError("Missing required fields.", 400);
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listIdValue = process.env.BREVO_LIST_ID_PILOT;
  const listId = listIdValue ? Number.parseInt(listIdValue, 10) : NaN;

  if (!apiKey || !Number.isInteger(listId)) {
    return jsonError("Lead capture is not configured.", 503);
  }

  const response = await fetch(brevoContactsEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      attributes: {
        CONFRONTO_NOTE: note,
        FIRSTNAME: name,
        PILOT_SOURCE: "confronto_landing",
        PILOT_TAG: "CONFRONTO",
        SMS: phone,
      },
      email,
      listIds: [listId],
      updateEnabled: true,
    }),
  });

  if (!response.ok) {
    return jsonError("Brevo rejected the lead capture request.", 502);
  }

  return NextResponse.json({ ok: true });
}
