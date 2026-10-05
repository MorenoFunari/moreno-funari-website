import { NextResponse } from "next/server";

const brevoFormUrl =
  "https://4ae90352.sibforms.com/v2/serve/MUIFAF3R0KInBJVk_kmECZkaXzq2_daQViUFZkWFOCEtwGcMkyR0o_4B94Aub0MSG4ZB_Gbj_azBiW2IZk_W0d6sDsAOY9aQCVvxc8sKrG4dKp3cMdtJ-DiFH5PSmDmEW3iO7KURNoxN512-jmOyhkLsMkIzBDHs7g6LCpFiZIceKiHRasW1A5u6abNZ1lD7NsiPHYLqrOdHoIqvRQ==";

type BrevoFormResponse = {
  message?: unknown;
  success?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function jsonError(status = 502) {
  return NextResponse.json({ success: false }, { status });
}

export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return jsonError(400);
  }

  const email = getString(formData, "EMAIL");
  const consent = getString(formData, "CONSENSO");
  const honeypot = getString(formData, "email_address_check");

  if (honeypot || !emailPattern.test(email) || consent !== "1") {
    return jsonError(400);
  }

  const brevoPayload = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      brevoPayload.append(key, value);
    }
  }

  let brevoResponse: Response;

  try {
    brevoResponse = await fetch(brevoFormUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: brevoPayload,
      cache: "no-store",
    });
  } catch {
    console.error("Brevo PASSO form request failed.");
    return jsonError();
  }

  const result = (await brevoResponse
    .json()
    .catch(() => null)) as BrevoFormResponse | null;

  if (!brevoResponse.ok || result?.success !== true) {
    console.error("Brevo rejected PASSO form submission.", {
      status: brevoResponse.status,
    });
    return jsonError();
  }

  return NextResponse.json({ success: true });
}
