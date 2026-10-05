"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { TrackedWhatsAppButton } from "@/components/analytics/tracked-whatsapp-button";
import { pilotWhatsAppUrl } from "@/config/pilot";
import { readAnalyticsConsent } from "@/lib/analytics/consent";
import { trackLeadConfrontoSubmitted } from "@/lib/analytics/meta-pixel";

import styles from "./confronto-lead-form.module.css";

type FieldErrors = Partial<
  Record<"name" | "email" | "phone" | "note" | "privacyConsent", string>
>;

type SubmitState = "idle" | "submitting" | "success" | "error";

export type ConfrontoLeadSource =
  | "confronto_landing"
  | "home_pilot_form"
  | "contatti_form"
  | "coaching_form"
  | "percorso_pilota_form";

type ConfrontoLeadFormProps = {
  ctaLabel?: string;
  introText?: string;
  noteLabel?: string;
  notePlaceholder?: string;
  noteRequired?: boolean;
  page: string;
  phoneRequired?: boolean;
  source: ConfrontoLeadSource;
  title?: string;
  variant?: "full" | "compact" | "embedded";
};

const requiredFieldMessage = "Compila questo campo per continuare.";
const privacyMessage =
  "Per inviarmi la richiesta devo avere il tuo consenso a essere ricontattato.";
const analyticsRedirectTimeoutMs = 800;

type ConfrontoLeadResponse = {
  leadCreated?: boolean;
  notificationSent?: boolean;
  ok?: boolean;
};

function getFormValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function trackGaEvent(
  eventName: string,
  eventParameters: Record<string, string | boolean>,
) {
  if (
    typeof window === "undefined" ||
    readAnalyticsConsent()?.status !== "granted"
  ) {
    return;
  }

  window.gtag?.("event", eventName, eventParameters);
}

function trackGaEventBeforeRedirect(
  eventName: string,
  eventParameters: Record<string, string | boolean>,
) {
  if (
    typeof window === "undefined" ||
    readAnalyticsConsent()?.status !== "granted" ||
    typeof window.gtag !== "function"
  ) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    let completed = false;
    const finish = () => {
      if (completed) return;
      completed = true;
      window.clearTimeout(timeoutId);
      resolve();
    };
    const timeoutId = window.setTimeout(finish, analyticsRedirectTimeoutMs);

    window.gtag?.("event", eventName, {
      ...eventParameters,
      event_callback: finish,
      event_timeout: analyticsRedirectTimeoutMs,
    });
  });
}

export function ConfrontoLeadForm({
  ctaLabel = "Invia i dati",
  introText = "Ti ricontatterò solo per capire se il percorso pilota può essere adatto alla situazione che stai vivendo.",
  noteLabel = "In una frase, su cosa vorresti fare chiarezza?",
  notePlaceholder = "Es. Mi sento bloccato davanti a una scelta lavorativa / continuo a rimandare / sento molta pressione dopo un errore / faccio fatica a mettere un confine.",
  noteRequired = false,
  page,
  phoneRequired = true,
  source,
  title = "Lascia i tuoi dati",
  variant = "full",
}: ConfrontoLeadFormProps) {
  const formId = useId().replace(/:/g, "");
  const router = useRouter();
  const startedAtRef = useRef(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

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
    const website = getFormValue(formData, "website");

    if (!name) nextErrors.name = requiredFieldMessage;
    if (!email) nextErrors.email = requiredFieldMessage;
    if (phoneRequired && !phone) nextErrors.phone = requiredFieldMessage;
    if (noteRequired && !note) nextErrors.note = requiredFieldMessage;
    if (!privacyConsent) nextErrors.privacyConsent = privacyMessage;

    setErrors(nextErrors);

    const eventParameters = {
      funnel: "pilot",
      page,
      source,
    };

    trackGaEvent("confronto_form_submit_attempt", {
      ...eventParameters,
      validation_passed: Object.keys(nextErrors).length === 0,
    });

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
          source,
          startedAt: startedAtRef.current,
          website,
        }),
      });

      const result = (await response
        .json()
        .catch(() => null)) as ConfrontoLeadResponse | null;

      if (!response.ok || !result?.leadCreated) {
        throw new Error("Lead submission failed");
      }

      trackLeadConfrontoSubmitted(eventParameters);

      trackGaEvent("confronto_lead_created", eventParameters);
      trackGaEvent(
        result.notificationSent
          ? "confronto_notification_sent"
          : "confronto_notification_failed",
        eventParameters,
      );

      await trackGaEventBeforeRedirect("generate_lead", {
        ...eventParameters,
        lead_source: "confronto_form",
      });

      form.reset();
      router.push("/grazie-confronto");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className={styles.finalPanel}>
        <h2>Grazie, ho ricevuto la tua richiesta.</h2>
        <p className={styles.confirmationText}>
          Ora puoi proseguire su WhatsApp scrivendomi CONFRONTO. Così tengo il
          filo della conversazione e posso risponderti personalmente.
        </p>
        <div className={styles.actions}>
          <TrackedWhatsAppButton
            href={pilotWhatsAppUrl}
            location={`${source}_success_whatsapp_cta`}
            size="large"
          >
            Prosegui su WhatsApp
          </TrackedWhatsAppButton>
        </div>
      </div>
    );
  }

  return (
    <div
      className={[
        styles.formPanel,
        variant === "compact" ? styles.compact : "",
        variant === "embedded" ? styles.embedded : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.formIntro}>
        <p className={styles.eyebrow}>Richiesta di contatto</p>
        <h2>{title}</h2>
        <p>{introText}</p>
        {variant === "full" ? (
          <p>
            Dopo l’invio potrai proseguire direttamente su WhatsApp con la
            parola CONFRONTO.
          </p>
        ) : null}
      </div>

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <div aria-hidden="true" className={styles.honeypot}>
          <label htmlFor={`${formId}-website`}>Sito web</label>
          <input
            autoComplete="off"
            id={`${formId}-website`}
            name="website"
            tabIndex={-1}
            type="text"
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={`${formId}-name`}>Nome</label>
          <input
            aria-describedby={
              errors.name ? `${formId}-name-error` : undefined
            }
            aria-invalid={Boolean(errors.name)}
            autoComplete="name"
            id={`${formId}-name`}
            name="name"
            type="text"
          />
          {errors.name ? (
            <p className={styles.fieldError} id={`${formId}-name-error`}>
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-email`}>Email</label>
          <input
            aria-describedby={
              errors.email ? `${formId}-email-error` : undefined
            }
            aria-invalid={Boolean(errors.email)}
            autoComplete="email"
            id={`${formId}-email`}
            name="email"
            type="email"
          />
          {errors.email ? (
            <p className={styles.fieldError} id={`${formId}-email-error`}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-phone`}>
            Telefono
            {!phoneRequired ? <span> Facoltativo</span> : null}
          </label>
          <input
            aria-describedby={
              errors.phone ? `${formId}-phone-error` : undefined
            }
            aria-invalid={Boolean(errors.phone)}
            autoComplete="tel"
            id={`${formId}-phone`}
            name="phone"
            required={phoneRequired}
            type="tel"
          />
          {errors.phone ? (
            <p className={styles.fieldError} id={`${formId}-phone-error`}>
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className={styles.field}>
          <label htmlFor={`${formId}-note`}>
            {noteLabel}
            {!noteRequired ? <span> Facoltativo</span> : null}
          </label>
          <textarea
            aria-describedby={
              errors.note ? `${formId}-note-error` : undefined
            }
            aria-invalid={Boolean(errors.note)}
            id={`${formId}-note`}
            name="note"
            placeholder={notePlaceholder}
            required={noteRequired}
            rows={5}
          />
          {errors.note ? (
            <p className={styles.fieldError} id={`${formId}-note-error`}>
              {errors.note}
            </p>
          ) : null}
        </div>

        <div className={styles.privacyField}>
          <input
            aria-describedby={
              errors.privacyConsent
                ? `${formId}-privacy-error`
                : `${formId}-privacy-help`
            }
            aria-invalid={Boolean(errors.privacyConsent)}
            id={`${formId}-privacy`}
            name="privacyConsent"
            type="checkbox"
          />
          <label htmlFor={`${formId}-privacy`}>
            Ho letto l’
            <a href="/privacy-policy" target="_blank">
              informativa privacy
            </a>{" "}
            e acconsento a essere ricontattato in merito alla richiesta inviata.
          </label>
        </div>
        <p className={styles.privacyHelp} id={`${formId}-privacy-help`}>
          I dati inseriti saranno utilizzati per valutare la richiesta e
          ricontattarti in merito al percorso o al confronto conoscitivo. Non
          inserire informazioni sanitarie, cliniche o dati particolarmente
          sensibili non necessari. Il consenso non comporta l’iscrizione a una
          newsletter.
        </p>
        {errors.privacyConsent ? (
          <p className={styles.fieldError} id={`${formId}-privacy-error`}>
            {errors.privacyConsent}
          </p>
        ) : null}

        <button
          className={styles.submitButton}
          disabled={submitState === "submitting"}
          type="submit"
        >
          {submitState === "submitting" ? "Invio in corso..." : ctaLabel}
        </button>
        <p className={styles.privacyHelp}>Inviare la richiesta non significa entrare automaticamente nel percorso. La candidatura viene letta e valutata manualmente.</p>

        {submitState === "error" ? (
          <div className={styles.formError} role="alert">
            <p>
              Qualcosa non ha funzionato. Puoi riprovare tra poco oppure
              scrivermi direttamente su WhatsApp con la parola CONFRONTO.
            </p>
            <TrackedWhatsAppButton
              href={pilotWhatsAppUrl}
              location={`${source}_error_whatsapp_fallback`}
            >
              Scrivimi su WhatsApp
            </TrackedWhatsAppButton>
          </div>
        ) : null}
      </form>
    </div>
  );
}
