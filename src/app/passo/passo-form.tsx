"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { analyticsConfig } from "@/config/analytics";
import { readAnalyticsConsent } from "@/lib/analytics/consent";

import styles from "./page.module.css";

type SubmitState = "idle" | "submitting" | "error";

type PassoLeadResponse = {
  success?: boolean;
  guideEmailSent?: boolean;
  error?: "contact" | "email" | "configuration";
  code?: string;
};

export function PassoForm() {
  const router = useRouter();
  const submittingRef = useRef(false);
  const requestRef = useRef<{ id: string; at: number; payload: string } | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorReference, setErrorReference] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitState("submitting");
    setErrorReference("");

    try {
      const payload = JSON.stringify([formData.get("EMAIL"), formData.get("NOME"), formData.get("CONSENSO"), formData.get("MARKETING_CONSENT")]);
      if (!requestRef.current || requestRef.current.payload !== payload) {
        requestRef.current = { id: window.crypto.randomUUID(), at: Date.now(), payload };
      }
      formData.set("requestId", requestRef.current.id);
      formData.set("requestedAt", String(requestRef.current.at));
      const response = await fetch("/api/passo-lead", {
        method: "POST",
        body: formData,
      });
      const result = (await response
        .json()
        .catch(() => null)) as PassoLeadResponse | null;

      if (!response.ok || result?.success !== true || result.guideEmailSent !== true) {
        if (result?.error && ["contact", "email", "configuration"].includes(result.error)
          && result.code && /^[a-z_]{1,40}$/.test(result.code)) {
          setErrorReference(`${result.error}/${result.code}`);
        }
        throw new Error("PASSO submission failed");
      }

      if (analyticsConfig.isConfigured && readAnalyticsConsent()?.status === "granted") {
        try {
          window.gtag?.("event", "passo_lead_created", {
            funnel: "passo", lead_source: "brevo_passo_form", page: "/passo",
          });
        } catch {
          // Delivery success does not depend on Analytics availability.
        }
      }
      form.reset();
      router.push("/grazie-passo");
    } catch {
      submittingRef.current = false;
      setSubmitState("error");
    }
  }

  return (
    <form
      acceptCharset="UTF-8"
      className={styles.brevoForm}
      onSubmit={handleSubmit}
    >
      <div className={styles.field}>
        <label htmlFor="passo-name">
          Nome <span>Facoltativo</span>
        </label>
        <input
          autoComplete="name"
          disabled={submitState === "submitting"}
          id="passo-name"
          maxLength={200}
          name="NOME"
          type="text"
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="passo-email">Email</label>
        <input
          autoComplete="email"
          disabled={submitState === "submitting"}
          id="passo-email"
          name="EMAIL"
          required
          type="email"
        />
        <p>Qui riceverai il link alla guida.</p>
      </div>
      <div className={styles.consentField}>
        <input
          disabled={submitState === "submitting"}
          id="passo-consent"
          name="CONSENSO"
          required
          type="checkbox"
          value="1"
        />
        <label htmlFor="passo-consent">
          Ho letto l’<Link href="/privacy-policy">Informativa Privacy</Link> e
          chiedo di ricevere via email la guida gratuita PASSO.
        </label>
      </div>
      <div className={styles.consentField}>
        <input disabled={submitState === "submitting"} id="passo-marketing"
          name="MARKETING_CONSENT" type="checkbox" value="1" />
        <label htmlFor="passo-marketing">
          Desidero ricevere anche email occasionali da Moreno Funari con riflessioni,
          contenuti pratici e aggiornamenti sul coaching. Posso disiscrivermi in qualsiasi momento.
        </label>
      </div>
      <div aria-hidden="true" className={styles.honeypot}>
        <label htmlFor="passo-email-check">Lascia vuoto</label>
        <input
          autoComplete="off"
          id="passo-email-check"
          name="email_address_check"
          tabIndex={-1}
          type="text"
        />
      </div>
      <input name="locale" type="hidden" value="it" />
      <button
        className={styles.submitButton}
        disabled={submitState === "submitting"}
        type="submit"
      >
        {submitState === "submitting" ? "Invio in corso..." : "Ricevi la guida"}
      </button>
      {submitState === "error" ? (
        <p className={styles.formError} role="alert">
          Qualcosa non è andato. Riprova tra poco o scrivimi a{" "}
          <a href="mailto:info@morenofunari.it">info@morenofunari.it</a>.
          {errorReference ? <> Riferimento: {errorReference}.</> : null}
        </p>
      ) : null}
      <p className={styles.formFallback}>
        La guida arriva anche senza scegliere le email occasionali. La seconda
        casella è facoltativa e non è preselezionata. Se sei già iscritto, lasciarla
        vuota non modifica la tua preferenza: puoi revocarla dal link nelle email
        o scrivendo a info@morenofunari.it.
      </p>
    </form>
  );
}
