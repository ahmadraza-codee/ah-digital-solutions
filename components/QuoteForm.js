"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { site, services } from "@/lib/content";

export default function QuoteForm({ defaultService = "" }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", service: defaultService || services[0].name,
    budget: "Not sure yet", timeline: "Flexible", message: "",
    website_url: "", reference_sites: "",
  });
  const [state, setState] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailto = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nWebsite URL: ${form.website_url || "-"}\nReference websites: ${form.reference_sites || "-"}\n\nProject details:\n${form.message}`;
    return `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry: " + form.service)}&body=${encodeURIComponent(body)}`;
  };

  const submit = async (e) => {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      // When NEXT_PUBLIC_API_URL is set (Vercel env var), the quote goes to
      // the Express backend on Render; otherwise it uses the Next.js
      // /api/quote fallback route on the same site. Mailto is only used
      // when the API call itself fails (see the error box below).
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
      const endpoint = apiBase ? `${apiBase}/api/quote` : "/api/quote/";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Honeypot value is read from the form itself, not from state.
        body: JSON.stringify({ ...form, website: new FormData(e.target).get("website") || "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        // Success: go to the thank-you page (kept in sync with /thank-you/).
        router.push("/thank-you/");
        setState("sent");
      } else {
        setError(data.error || "Could not send your inquiry. Please try email instead.");
        setState("error");
      }
    } catch {
      setError("Could not reach the server. Please try email instead.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
        <strong>Thank you — your inquiry was received.</strong>
        <p className="mt-1">We will review your requirements and reply by email to <strong>{form.email}</strong>. If you do not hear back within a few working days, please email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <label htmlFor="name">Your name</label>
      <input id="name" name="name" required value={form.name} onChange={update} />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required value={form.email} onChange={update} />
      <label htmlFor="service">Service you need</label>
      <select id="service" name="service" value={form.service} onChange={update}>
        {services.map((s) => <option key={s.slug} value={s.name}>{s.name}</option>)}
        <option>Not sure yet — please advise</option>
      </select>
      <label htmlFor="budget">Budget range</label>
      <select id="budget" name="budget" value={form.budget} onChange={update}>
        <option>Under $250</option><option>$250 – $500</option><option>$500 – $1,000</option><option>$1,000+</option><option>Not sure yet</option>
      </select>
      <label htmlFor="timeline">Ideal timeline / deadline</label>
      <select id="timeline" name="timeline" value={form.timeline} onChange={update}>
        <option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–2 months</option><option>Flexible</option>
      </select>
      <label htmlFor="website_url">Your website URL <span className="font-normal text-muted">(optional)</span></label>
      <input id="website_url" name="website_url" type="text" inputMode="url" value={form.website_url} onChange={update} placeholder="https://yourwebsite.com" />
      <label htmlFor="reference_sites">Reference websites <span className="font-normal text-muted">(optional)</span></label>
      <textarea id="reference_sites" name="reference_sites" rows={2} value={form.reference_sites} onChange={update} placeholder="Websites you like, one per line (optional)" />
      <label htmlFor="message">Tell us about your project</label>
      <textarea id="message" name="message" rows={5} required value={form.message} onChange={update} placeholder="What are you building, who is it for, and what should it do?" />
      {/* Honeypot: hidden from real users, filled by spam bots. */}
      <div aria-hidden="true" style={{ display: "none" }}>
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <p className="mt-5"><button className="btn" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Inquiry"}</button></p>
      {state === "error" && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
          <strong>Could not send the form.</strong> {error}
          <p className="mt-2"><a className="btn no-underline" href={mailto()}>Send via email to {site.email}</a></p>
        </div>
      )}
      <p className="mt-4 text-sm text-muted">Submitting sends your inquiry to AH Digital Solutions. We reply by email — no payment is requested through this form. File attachments are not supported on this form yet; you can include links to files or references in the project details instead.</p>
    </form>
  );
}
