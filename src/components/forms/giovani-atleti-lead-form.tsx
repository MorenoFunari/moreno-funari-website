"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { athleteAges, athleteConfirmation, athleteModes, athletePath, athleteRoles } from "@/config/giovani-atleti";
import shared from "./confronto-lead-form.module.css";
import styles from "./giovani-atleti-lead-form.module.css";

export function GiovaniAtletiLeadForm() {
  const id = useId();
  const started = useRef(0);
  const requestId = useRef("");
  const lock = useRef(false);
  const [role, setRole] = useState("");
  const [age, setAge] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const adult = role === "Atleta maggiorenne";
  const guardian = role === "Genitore" || role === "Tutore";
  useEffect(() => { started.current = Date.now(); requestId.current = crypto.randomUUID(); }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || lock.current || status === "success") return;
    lock.current = true;
    setStatus("sending");
    const data = new FormData(form);
    try {
      const response = await fetch("/api/giovani-atleti-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"), email: data.get("email"), phone: data.get("phone"),
          role, age, sport: data.get("sport"), mode: data.get("mode"), note: data.get("note"),
          guardianConfirmed: guardian && data.get("guardianConfirmed") === "on",
          privacyConsent: data.get("privacyConsent") === "on", website: data.get("website"),
          startedAt: started.current, requestId: requestId.current,
          tipo_richiesta: "giovani_atleti", origine: athletePath,
        }),
      });
      if (!response.ok || !(await response.json()).ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch { setStatus("error"); }
    finally { lock.current = false; }
  }
  if (status === "success") return <p role="status" className={styles.success}>{athleteConfirmation}</p>;
  return (
    <form className={`${shared.form} ${styles.form}`} onSubmit={submit} aria-busy={status === "sending"}>
      <div className={shared.honeypot} aria-hidden="true"><label htmlFor={`${id}-website`}>Sito web</label><input id={`${id}-website`} name="website" autoComplete="off" tabIndex={-1} /></div>
      <div className={shared.field}>
        <label htmlFor={`${id}-role`}>Chi compila la richiesta?</label>
        <select id={`${id}-role`} name="role" required value={role} onChange={e => { const next = e.target.value; setRole(next); if (next === "Atleta maggiorenne") setAge("18+"); }}>
          <option value="">Seleziona</option>{athleteRoles.map(v => <option key={v}>{v}</option>)}
        </select>
      </div>
      <div className={styles.pair}>
        <div className={shared.field}><label htmlFor={`${id}-name`}>Il tuo nome</label><input id={`${id}-name`} name="name" autoComplete="name" maxLength={200} required /></div>
        <div className={shared.field}><label htmlFor={`${id}-email`}>La tua email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" maxLength={320} required /></div>
      </div>
      <div className={styles.pair}>
        <div className={shared.field}><label htmlFor={`${id}-phone`}>Telefono <span>Facoltativo</span></label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={45} /></div>
        <div className={shared.field}>
          <label htmlFor={`${id}-age`}>Età dell&apos;atleta</label>
          <select id={`${id}-age`} name="age" required disabled={adult} value={age} onChange={e => setAge(e.target.value)}><option value="">Seleziona</option>{athleteAges.map(v => <option key={v}>{v}</option>)}</select>
        </div>
      </div>
      {guardian && age === "18+" ? <p role="status" className={styles.notice}>Dai 18 anni l’atleta può contattarmi direttamente. Puoi comunque inviare la richiesta.</p> : null}
      <div className={styles.pair}>
        <div className={shared.field}><label htmlFor={`${id}-sport`}>Che sport pratica?</label><input id={`${id}-sport`} name="sport" maxLength={80} required /></div>
        <div className={shared.field}><label htmlFor={`${id}-mode`}>Preferenza per gli incontri <span>Facoltativo</span></label><select id={`${id}-mode`} name="mode"><option value="">Seleziona</option>{athleteModes.map(v => <option key={v}>{v}</option>)}</select></div>
      </div>
      <div className={shared.field}>
        <label htmlFor={`${id}-note`}>Raccontami brevemente cosa hai notato</label>
        <textarea id={`${id}-note`} name="note" rows={4} maxLength={1200} required aria-describedby={`${id}-note-help`} />
        <p id={`${id}-note-help`} className={shared.privacyHelp}>Bastano poche righe. Non serve inserire informazioni sanitarie.</p>
      </div>
      {guardian ? <div className={shared.privacyField}><input id={`${id}-guardian`} name="guardianConfirmed" type="checkbox" required key={role} /><label htmlFor={`${id}-guardian`}>Dichiaro di essere genitore o tutore dell’atleta minorenne</label></div> : null}
      <div className={shared.privacyField}><input id={`${id}-privacy`} name="privacyConsent" type="checkbox" required /><label htmlFor={`${id}-privacy`}>Ho letto l’<a href="/privacy-policy" target="_blank" rel="noopener noreferrer">informativa privacy</a></label></div>
      <button className={shared.submitButton} type="submit" disabled={status === "sending"}>Invia la richiesta</button>
      {status === "error" ? <p role="alert" className={shared.fieldError}>Qualcosa non ha funzionato. Puoi riprovare tra poco.</p> : null}
    </form>
  );
}
