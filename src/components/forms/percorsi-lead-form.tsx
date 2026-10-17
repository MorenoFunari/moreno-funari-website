"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { percorsiConfirmation } from "@/config/percorsi";
import { readAnalyticsConsent } from "@/lib/analytics/consent";
import styles from "./confronto-lead-form.module.css";

type Props = {
  // Required from the approved B.9 copy; do not invent the missing placeholder.
  notePlaceholder: string;
};

export function PercorsiLeadForm({ notePlaceholder }: Props) {
  const id = useId();
  const startedAt = useRef(0);
  const requestId = useRef("");
  const submitting = useRef(false);
  const tracked = useRef(false);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  useEffect(() => { startedAt.current = Date.now(); requestId.current = crypto.randomUUID(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || state === "success") return;
    submitting.current = true;
    setState("sending");
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/percorsi-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
          note: data.get("note"), website: data.get("website"),
          privacyConsent: data.get("privacyConsent") === "on",
          tipo_richiesta: data.get("tipo_richiesta"), origine: data.get("origine"),
          startedAt: startedAt.current, requestId: requestId.current,
        }),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error("Submission failed");
      setState("success");
      if (!tracked.current && readAnalyticsConsent()?.status === "granted") {
        tracked.current = true;
        window.gtag?.("event", "submit_percorsi", { tipo_richiesta: "percorso_pagamento", origine: "/percorsi" });
      }
      form.reset();
    } catch { setState("error"); }
    finally { submitting.current = false; }
  }

  if (state === "success") return <p role="status">{percorsiConfirmation}</p>;
  return (
    <form className={styles.form} onSubmit={submit} aria-busy={state === "sending"}>
      <input type="hidden" name="tipo_richiesta" value="percorso_pagamento" />
      <input type="hidden" name="origine" value="/percorsi" />
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={`${id}-website`}>Sito web</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-name`}>Nome</label>
        <input id={`${id}-name`} name="name" autoComplete="name" maxLength={200} required />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-email`}>Email</label>
        <input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={320} required />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-note`}>Situazione</label>
        <textarea id={`${id}-note`} name="note" placeholder={notePlaceholder} rows={5} maxLength={3_000} required />
      </div>
      <div className={styles.field}>
        <label htmlFor={`${id}-phone`}>Telefono <span>Facoltativo</span></label>
        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className={styles.privacyField}>
        <input id={`${id}-privacy`} name="privacyConsent" type="checkbox" required />
        <label htmlFor={`${id}-privacy`}>Ho letto l’<a href="/privacy-policy">informativa privacy</a> e acconsento a essere ricontattato in merito alla richiesta inviata.</label>
      </div>
      <button type="submit" className={styles.submitButton} disabled={state === "sending"}>Invia la richiesta</button>
      {state === "error" ? <p className={styles.fieldError} role="alert">Qualcosa non ha funzionato. Puoi riprovare tra poco.</p> : null}
    </form>
  );
}
