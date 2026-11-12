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
};

export function PassoForm() {
  const router = useRouter();
  const submittingRef = useRef(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;
    submittingRef.current = true;
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmitState("submitting");

    try {
      const response = await fetch("/api/passo-lead", {
        method: "POST",
        body: formData,
      });
      const result = (await response
        .json()
        .catch(() => null)) as PassoLeadResponse | null;

      if (!response.ok || result?.success !== true || result.guideEmailSent !== true) {
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
          Ho letto la <Link href="/privacy-policy">Privacy Policy</Link> e
          acconsento al trattamento dei miei dati per ricevere la guida gratuita
          richiesta e contenuti pratici collegati a consapevolezza, confini e
          primi passi possibili. Potrò cancellarmi in qualsiasi momento.
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
        </p>
      ) : null}
      <p className={styles.formFallback}>
        Userò i dati inseriti per inviarti la guida e, ogni tanto, contenuti
        utili collegati al lavoro di Moreno Funari | Mental Coach. Nessuno spam,
        nessuna pressione.
      </p>
    </form>
  );
}
