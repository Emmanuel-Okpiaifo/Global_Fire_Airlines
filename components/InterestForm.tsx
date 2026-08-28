"use client";

import { FormEvent, useMemo, useState } from "react";

type Kind = "founding" | "corporate" | "counsel";

const foundingTypes = [
  { value: "business", label: "Business traveller" },
  { value: "government", label: "Government / public service" },
  { value: "personal", label: "Personal" },
];

const frequencies = [
  "Weekly or more",
  "A few times a month",
  "Monthly",
  "Occasionally",
];

export function InterestForm({ initialKind = "founding" }: { initialKind?: Kind }) {
  const [kind, setKind] = useState<Kind>(initialKind);
  const [status, setStatus] = useState<"idle" | "saving" | "ok" | "err">("idle");
  const [message, setMessage] = useState("");

  const tabs = useMemo(
    () =>
      [
        ["founding", "Founding member"],
        ["corporate", "Corporate"],
        ["counsel", "Counsel"],
      ] as const,
    [],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, kind }),
      });

      const raw = await res.text();
      let data: { error?: string; sheet?: string } = {};
      try {
        data = raw ? (JSON.parse(raw) as typeof data) : {};
      } catch {
        setStatus("err");
        setMessage(
          res.ok
            ? "Unexpected server response. Please try again."
            : `Server error (${res.status}). Please try again in a moment.`,
        );
        return;
      }

      if (!res.ok) {
        setStatus("err");
        const errText = data.error || "Something went wrong. Please try again.";
        setMessage(
          /<!DOCTYPE|<html[\s>]|ppConfig/i.test(errText)
            ? "Google Sheets is blocking the form. In Apps Script set Who has access to Anyone, update the webhook URL in Netlify, then redeploy."
            : errText,
        );
        return;
      }
      setStatus("ok");
      setMessage(
        kind === "founding"
          ? "You are on the founding list. We will reach out before anything goes public — no seat reserved yet, but your place is recorded."
          : kind === "corporate"
            ? "Your organisation is registered. We will be in touch about corporate block seats."
            : "Thank you — your note is recorded. We will follow up privately.",
      );
      event.currentTarget.reset();
    } catch (err) {
      setStatus("err");
      const detail = err instanceof Error ? err.message : "";
      setMessage(
        detail
          ? `Connection failed: ${detail}. Check your network and try again.`
          : "We could not reach the server. Please try again in a moment.",
      );
    }
  }

  const field =
    "mt-1.5 w-full rounded-[6px] border border-stone bg-ivory px-3 py-3 text-sm text-navy outline-none ring-copper/30 focus:ring-2";

  return (
    <div className="interest-form">
      <div className="interest-form__tabs">
        {tabs.map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setKind(value);
              setStatus("idle");
              setMessage("");
            }}
            className={`interest-form__tab px-4 py-2 text-[0.8rem] font-semibold tracking-[0.04em] rounded-[6px] ${
              kind === value
                ? "bg-navy text-ivory"
                : "border border-stone bg-ivory text-navy hover:border-copper"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
          Full name
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
          Email
          <input
            name="email"
            type="email"
            required
            className={field}
            autoComplete="email"
          />
        </label>

        {kind === "founding" && (
          <>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
              City you travel from
              <input name="city" required className={field} placeholder="Lagos, Abuja…" />
            </label>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
              Traveller type
              <select name="travellerType" className={field} defaultValue="business">
                {foundingTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70 sm:col-span-2">
              How often do you fly Lagos–Abuja?
              <select name="frequency" className={field} defaultValue={frequencies[1]}>
                {frequencies.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70 sm:col-span-2">
              Membership interest
              <select name="membershipInterest" className={field} defaultValue="ember">
                <option value="flame">Flame — pay per seat</option>
                <option value="ember">Ember Elite — subscription</option>
                <option value="unsure">Not sure yet</option>
              </select>
            </label>
          </>
        )}

        {kind === "corporate" && (
          <>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
              Organisation
              <input name="company" required className={field} />
            </label>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70">
              Estimated monthly LOS–ABV seats
              <input name="monthlySeats" className={field} placeholder="e.g. 8–12" />
            </label>
            <label className="text-xs tracking-[0.12em] uppercase text-ink/70 sm:col-span-2">
              Notes
              <textarea name="message" rows={4} className={field} />
            </label>
          </>
        )}

        {kind === "counsel" && (
          <label className="text-xs tracking-[0.12em] uppercase text-ink/70 sm:col-span-2">
            How you might help, or what you would like to discuss
            <textarea
              name="message"
              rows={5}
              className={field}
              placeholder="A conversation, an introduction, or an honest perspective — not a commitment."
            />
          </label>
        )}

        <p className="sm:col-span-2 text-xs leading-5 text-ink/55">
          Interest only — not a ticket or payment. We will email you when founding
          membership opens.
        </p>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === "saving"}
            className="btn btn--primary w-full disabled:opacity-60"
          >
            {status === "saving" ? "Joining…" : "Join the founding circle"}
          </button>
        </div>
        {message && (
          <p
            className={`sm:col-span-2 text-sm ${
              status === "ok" ? "text-navy" : "text-copper"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
