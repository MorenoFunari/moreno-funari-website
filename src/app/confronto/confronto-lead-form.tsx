"use client";

import { FormEvent, useState } from "react";

import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { pilotWhatsAppUrl } from "@/config/pilot";
import { trackLeadConfronto } from "@/lib/analytics/meta-pixel";

import styles from "./page.module.css";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "privacyConsent", string>
>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const requiredFieldMessage = "Compila questo campo per continuare.";
const privacyMessage =
  "Per inviarmi la richiesta devo avere il tuo consenso a essere ricontattato.";

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export function ConfrontoLeadForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors: FieldErrors = {};
    const name = getFormValue(formData, "name");
    const email = getFormValue(formData, "email");
    const phone = getFormValue(formData, "phone");
    const note = getFormValue(formData, "note");
    const privacyConsent = formData.get("privacyConsent") === "on";

    if (!name) nextErrors.name = requiredFieldMessage;
    if (!email) nextErrors.email = requiredFieldMessage;
    if (!phone) nextErrors.phone = requiredFieldMessage;
    if (!privacyConsent) nextErrors.privacyConsent = privacyMessage;

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitState("idle");
      return;
    }

    setSubmitState("submitting");

    try {
      const response = await fetch("/api/confronto-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          note,
          phone,
          privacyConsent,
        }),
      });

      if (!response.ok) throw new Error("Lead submission failed");

      trackLeadConfronto({
        funnel: "pilot",
        page: "/confronto",
        source: "confronto_landing",
      });

      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className={styles.finalPanel} id="lascia-dati">
        <h2>Grazie, ho ricevuto la tua richiesta.</h2>
        <p className={styles.confirmationText}>
          Ora puoi proseguire su WhatsApp scrivendomi CONFRONTO. Così tengo il
          filo della conversazione e posso risponderti personalmente.
        </p>
        <div className={styles.actions}>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location="confronto_success_whatsapp_cta"
            size="large"
          >
            Prosegui su WhatsApp
          </TrackedWhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formPanel} id="lascia-dati">
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>Richiesta di contatto</p>
        <h2>Lascia i tuoi dati</h2>
        <p>
          Ti ricontatterò solo per capire se il percorso pilota può essere
          adatto alla situazione che stai vivendo.
        </p>
        <p>
          Dopo l’invio potrai proseguire direttamente su WhatsApp con la parola
          CONFRONTO.
        </p>
      </div>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="confronto-name">Nome</label>
          <input
            aria-describedby={errors.name ? "confronto-name-error" : undefined}
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id="confronto-name"
            name="name"
            type="text"
          />
          {errors.name ? (
            <p className={styles.fieldError} id="confronto-name-error">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="confronto-email">Email</label>
          <input
            aria-describedby={
              errors.email ? "confronto-email-error" : undefined
            }
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id="confronto-email"
            name="email"
            type="email"
          />
          {errors.email ? (
            <p className={styles.fieldError} id="confronto-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="confronto-phone">Telefono</label>
          <input
            aria-describedby={
              errors.phone ? "confronto-phone-error" : undefined
            }
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            id="confronto-phone"
            name="phone"
            type="tel"
          />
          {errors.phone ? (
            <p className={styles.fieldError} id="confronto-phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor="confronto-note">
            In una frase, su cosa vorresti fare chiarezza?
            <span> Facoltativo</span>
          </label>
          <textarea id="confronto-note" name="note" rows={4} />
        </div>

        <div className={styles.privacyField}>
          <input
            aria-describedby={
              errors.privacyConsent
                ? "confronto-privacy-error"
                : "confronto-privacy-help"
            }
            aria-invalid={Boolean(errors.privacyConsent)}
            id="confronto-privacy"
            name="privacyConsent"
            type="checkbox"
          />
          <label htmlFor="confronto-privacy">
            Ho letto l’
            <a href="/privacy-policy" target="_blank">
              informativa privacy
            </a>{" "}
            e acconsento a essere ricontattato in merito alla richiesta inviata.
          </label>
        </div>
        <p className={styles.privacyHelp} id="confronto-privacy-help">
          Il consenso riguarda questa richiesta di contatto, non l’iscrizione a
          una newsletter.
        </p>
        {errors.privacyConsent ? (
          <p className={styles.fieldError} id="confronto-privacy-error">
            {errors.privacyConsent}
          </p>
        ) : null}

        <button
          className={styles.submitButton}
          disabled={submitState === "submitting"}
          type="submit"
        >
          {submitState === "submitting" ? "Invio in corso..." : "Invia i dati"}
        </button>

        {submitState === "error" ? (
          <div className={styles.formError} role="alert">
            <p>
              Qualcosa non ha funzionato. Puoi riprovare tra poco oppure
              scrivermi direttamente su WhatsApp con la parola CONFRONTO.
            </p>
            <TrackedWhatsAppButton
              href={pilotWhatsAppUrl}
              location="confronto_error_whatsapp_fallback"
            >
              Scrivimi su WhatsApp
            </TrackedWhatsAppButton>
          </div>
        ) : null}
      </form>
    </div>
  );
}
