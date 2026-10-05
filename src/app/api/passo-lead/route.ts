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

function jsonError(status = 502) {
  return NextResponse.json({ success: false }, { status });
}

async function createOrUpdateContact({
  apiKey,
  attributes,
  email,
  listId,
}: {
  apiKey: string;
  attributes: ContactAttributes;
  email: string;
  listId: number;
}) {
  return fetch(brevoContactsEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      attributes,
      listIds: [listId],
      updateEnabled: true,
    }),
    cache: "no-store",
  });
}

async function sendGuideEmail({
  apiKey,
  email,
  name,
  templateId,
}: {
  apiKey: string;
  email: string;
  name: string;
  templateId: number;
}) {
  return fetch(brevoTransactionalEmailEndpoint, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      templateId,
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

  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.error("PASSO lead capture is missing BREVO_API_KEY.");
    return jsonError(503);
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
  let consentAttributesSaved = true;

  try {
    contactResponse = await createOrUpdateContact({
      apiKey,
      attributes: passoAttributes,
      email,
      listId,
    });

    if (!contactResponse.ok) {
      consentAttributesSaved = false;
      console.warn(
        "Brevo rejected PASSO consent attributes; retrying with configured base attributes.",
        { status: contactResponse.status },
      );
      contactResponse = await createOrUpdateContact({
        apiKey,
        attributes: baseAttributes,
        email,
        listId,
      });
    }
  } catch {
    console.error("Brevo PASSO contact request failed.");
    return jsonError();
  }

  if (!contactResponse.ok) {
    console.error("Brevo rejected PASSO contact creation.", {
      status: contactResponse.status,
    });
    return jsonError();
  }

  let emailResponse: Response;

  try {
    emailResponse = await sendGuideEmail({
      apiKey,
      email,
      name,
      templateId,
    });
  } catch {
    console.error("Brevo PASSO guide email request failed.");
    return jsonError();
  }

  if (!emailResponse.ok) {
    console.error("Brevo rejected PASSO guide email.", {
      status: emailResponse.status,
    });
    return jsonError();
  }

  return NextResponse.json({
    consentAttributesSaved,
    guideEmailSent: true,
    success: true,
  });
}
