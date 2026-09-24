import { NextResponse } from "next/server";

const brevoContactsEndpoint = "https://api.brevo.com/v3/contacts";
const brevoTransactionalEmailEndpoint = "https://api.brevo.com/v3/smtp/email";
const leadSource = "confronto_landing";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendLeadNotification({
  apiKey,
  email,
  name,
  note,
  phone,
}: {
  apiKey: string;
  email: string;
  name: string;
  note: string;
  phone: string;
}) {
  const notificationTo =
    process.env.LEAD_NOTIFICATION_TO || "info@morenofunari.it";
  const senderEmail =
    process.env.BREVO_SENDER_EMAIL || "info@morenofunari.it";
  const senderName =
    process.env.BREVO_SENDER_NAME || "Moreno Funari | Mental Coach";

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeNote = escapeHtml(note || "Non indicata");

  const response = await fetch(brevoTransactionalEmailEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: [
        {
          email: notificationTo,
        },
      ],
      subject: `Nuovo lead CONFRONTO — ${name}`,
      htmlContent: `
        <p>È arrivata una nuova richiesta dal form /confronto.</p>
        <p><strong>Nome:</strong><br>${safeName}</p>
        <p><strong>Email:</strong><br>${safeEmail}</p>
        <p><strong>Telefono:</strong><br>${safePhone}</p>
        <p><strong>Situazione indicata:</strong><br>${safeNote}</p>
        <p><strong>Fonte:</strong><br>${leadSource}</p>
        <p><strong>Azione consigliata:</strong><br>Rispondere entro 24 ore.</p>
      `,
      textContent: [
        "È arrivata una nuova richiesta dal form /confronto.",
        "",
        `Nome: ${name}`,
        `Email: ${email}`,
        `Telefono: ${phone}`,
        `Situazione indicata: ${note || "Non indicata"}`,
        `Fonte: ${leadSource}`,
        "Azione consigliata: Rispondere entro 24 ore.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error("Brevo lead notification failed.", {
      status: response.status,
    });
  }
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
        PILOT_SOURCE: leadSource,
        PILOT_TAG: "CONFRONTO",
        WHATSAPP: phone,
      },
    },
  });

  if (!response.ok) {
    console.error("Brevo rejected confronto lead capture request.", {
      status: response.status,
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
      console.error("Brevo rejected confronto fallback lead capture request.", {
        status: fallbackResponse.status,
      });

      const minimalFallbackResponse = await createBrevoContact({
        apiKey,
        body: baseContact,
      });

      if (!minimalFallbackResponse.ok) {
        console.error(
          "Brevo rejected confronto minimal fallback lead capture request.",
          {
            status: minimalFallbackResponse.status,
          },
        );

        return jsonError("Brevo rejected the lead capture request.", 502);
      }

      console.warn(
        "Brevo accepted confronto lead with minimal fallback. Contact attributes may be missing.",
      );

      await sendLeadNotification({ apiKey, email, name, note, phone }).catch(
        () => {
          console.error("Brevo lead notification failed.");
        },
      );

      return NextResponse.json({ ok: true });
    }

    console.warn(
      "Brevo accepted confronto lead with fallback attributes. Custom Pilot attributes may be missing.",
    );
  }

  await sendLeadNotification({ apiKey, email, name, note, phone }).catch(() => {
    console.error("Brevo lead notification failed.");
  });

  return NextResponse.json({ ok: true });
}
