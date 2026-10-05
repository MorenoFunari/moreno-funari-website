"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

type SubmitState = "idle" | "submitting" | "error";

type PassoLeadResponse = {
  success?: boolean;
};

export function PassoForm() {
  const router = useRouter();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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

      if (!response.ok || result?.success !== true) {
        throw new Error("PASSO submission failed");
      }

      form.reset();
      router.push("/grazie-passo");
    } catch {
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
          Desidero ricevere la guida gratuita “Dire sempre sì ti sta costando
          più di quanto pensi” e accetto di ricevere comunicazioni via email da
          Moreno Funari | Mental Coach. Posso revocare il consenso in qualsiasi
          momento.
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
        Il modulo è gestito in modo sicuro da Brevo. Puoi cancellarti quando
        vuoi. Consulta la <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </form>
  );
}
