import { createHash } from "node:crypto";

export const runtime = "nodejs";

const emailEndpoint = "https://api.brevo.com/v3/smtp/email";
const maximumBodyBytes = 16_384;
const windowMs = 10 * 60 * 1_000;
// Best-effort per-instance protection; no raw IPs or form content are retained.
const attempts = new Map<string, { count: number; expires: number }>();
const requests = new Map<string, { sent: boolean; expires: number }>();

function reply(status: number) {
  return Response.json({ ok: status === 200 }, {
    status,
    headers: { "Cache-Control": "no-store", ...(status === 429 ? { "Retry-After": "600" } : {}) },
  });
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]!);
}

export async function POST(request: Request) {
  // Enable only after the young-athlete privacy disclosure is validated.
  if (process.env.GIOVANI_ATLETI_LEADS_ENABLED !== "true") return reply(503);
  if (request.headers.get("origin") !== new URL(request.url).origin) return reply(403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) return reply(415);
  if (Number(request.headers.get("content-length")) > maximumBodyBytes) return reply(413);

  let payload: Record<string, unknown>;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.length;
      if (size > maximumBodyBytes) { await reader.cancel(); return reply(413); }
      chunks.push(value);
    }
    const value: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!value || typeof value !== "object" || Array.isArray(value)) return reply(400);
    payload = value as Record<string, unknown>;
  } catch { return reply(400); }

  const text = (key: string) => typeof payload[key] === "string" ? (payload[key] as string).trim() : "";
  const name = text("name");
  const email = text("email").toLowerCase();
  const note = text("note");
  const phone = text("phone").replace(/[\s().-]/g, "");
  const requestId = text("requestId");
  const role = text("role");
  const age = text("age");
  const sport = text("sport");
  const mode = text("mode");
  const adult = role === "Atleta maggiorenne";
  const allowed = new Set(["name", "email", "phone", "note", "website", "startedAt", "requestId", "privacyConsent", "role", "age", "sport", "mode", "guardianConfirmed", "tipo_richiesta", "origine"]);
  const elapsed = Date.now() - Number(payload.startedAt);
  if (
    !name || name.length > 200 || /[\r\n]/.test(name) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320 ||
    !note || note.length > 1_200 ||
    !["Genitore", "Tutore", "Atleta maggiorenne"].includes(role) ||
    !["7–10", "11–13", "14–17", "18+"].includes(age) ||
    (adult && age !== "18+") || (!adult && payload.guardianConfirmed !== true) ||
    !sport || sport.length > 80 || /[\r\n]/.test(sport) ||
    !["", "Online", "In presenza (Castelli Romani)", "Da valutare"].includes(mode) ||
    Object.keys(payload).some((key) => !allowed.has(key)) ||
    (phone && !/^\+?\d{8,15}$/.test(phone)) ||
    payload.privacyConsent !== true || text("website") ||
    typeof payload.startedAt !== "number" || !Number.isFinite(elapsed) || elapsed < 1_200 || elapsed > 86_400_000 ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId) ||
    payload.tipo_richiesta !== "giovani_atleti" || payload.origine !== "/coaching/mental-coach-giovani-atleti"
  ) return reply(400);

  const apiKey = process.env.BREVO_API_KEY;
  const recipient = process.env.GIOVANI_ATLETI_NOTIFICATION_TO || process.env.PERCORSI_NOTIFICATION_TO || process.env.LEAD_NOTIFICATION_TO || "info@morenofunari.it";
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !sender) return reply(503);

  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.expires <= now) attempts.delete(key);
  for (const [key, entry] of requests) if (entry.expires <= now) requests.delete(key);
  const cached = requests.get(requestId);
  if (cached) return reply(cached.sent ? 200 : 409);
  const ip = request.headers.get("x-real-ip") || "unknown";
  const key = createHash("sha256").update(ip).digest("hex");
  const count = attempts.get(key) || { count: 0, expires: now + windowMs };
  if (count.count >= 5 || attempts.size >= 1_000 || requests.size >= 1_000) return reply(429);
  count.count += 1;
  attempts.set(key, count);
  requests.set(requestId, { sent: false, expires: now + windowMs });

  try {
    // Notification only: NEVER create contacts, set listIds or call /v3/contacts.
    const response = await fetch(emailEndpoint, {
      method: "POST",
      headers: { "api-key": apiKey, "Content-Type": "application/json" },
      signal: AbortSignal.timeout(8_000),
      body: JSON.stringify({
        sender: { email: sender, name: process.env.BREVO_SENDER_NAME || "Moreno Funari | Mental Coach" },
        to: [{ email: recipient }],
        replyTo: { email, name },
        subject: "Giovani atleti — richiesta informazioni",
        textContent: `Giovani atleti — richiesta informazioni\n\nNome: ${name}\nEmail: ${email}\nTelefono: ${phone || "Non indicato"}\nRuolo: ${role}\nFascia d’età: ${age}\nSport: ${sport}\nModalità: ${mode || "Non indicata"}\nSituazione: ${note}\n\nTipo richiesta: giovani_atleti\nOrigine: /coaching/mental-coach-giovani-atleti\nInformativa privacy letta: sì\nLa richiesta non autorizza sessioni con il minore.`,
        htmlContent: `<h1>Giovani atleti — richiesta informazioni</h1>${[
          ["Nome", name], ["Email", email], ["Telefono", phone || "Non indicato"],
          ["Ruolo", role], ["Fascia d’età", age], ["Sport", sport],
          ["Modalità", mode || "Non indicata"], ["Situazione", note],
        ].map(([label, value]) => `<p>${label}: ${escapeHtml(value).replace(/\n/g, "<br>")}</p>`).join("")}<p>Tipo richiesta: giovani_atleti<br>Origine: /coaching/mental-coach-giovani-atleti<br>Informativa privacy letta: sì</p><p>La richiesta non autorizza sessioni con il minore.</p>`,
      }),
    });
    const result = response.ok ? await response.json() as { messageId?: unknown } : null;
    if (!response.ok || typeof result?.messageId !== "string" || !result.messageId) throw new Error("Notification rejected");
    requests.set(requestId, { sent: true, expires: now + windowMs });
    return reply(200);
  } catch {
    requests.delete(requestId);
    // No personal content, credentials or provider responses in logs/client errors.
    console.error("Young athlete notification failed.");
    return reply(502);
  }
}
