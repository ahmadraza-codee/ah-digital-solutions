"use client";
import { useState } from "react";
import { site, services } from "@/lib/content";

export default function QuoteForm({ defaultService = "" }) {
  const [form, setForm] = useState({
    name: "", email: "", service: defaultService || services[0].name,
    budget: "Not sure yet", timeline: "Flexible", message: "",
  });
  const [saved, setSaved] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const mailto = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n\nProject details:\n${form.message}`;
    return `mailto:${site.email}?subject=${encodeURIComponent("Project inquiry: " + form.service)}&body=${encodeURIComponent(body)}`;
  };

  const submit = (e) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem("ah_inquiries") || "[]");
      existing.unshift({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem("ah_inquiries", JSON.stringify(existing));
    } catch {}
    setSaved(true);
  };

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
      <label htmlFor="timeline">Ideal timeline</label>
      <select id="timeline" name="timeline" value={form.timeline} onChange={update}>
        <option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–2 months</option><option>Flexible</option>
      </select>
      <label htmlFor="message">Tell us about your project</label>
      <textarea id="message" name="message" rows={5} required value={form.message} onChange={update} placeholder="What are you building, who is it for, and what should it do?" />
      <p className="mt-5"><button className="btn" type="submit">Save Inquiry</button></p>
      {saved && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
          <strong>Saved in this browser.</strong> Your inquiry has been saved locally (localStorage, key <code>ah_inquiries</code>) and can be reviewed in the <a href="/admin/">admin panel</a>. It has <strong>not</strong> been sent to a server or database. To actually send it, use the email link below.
          <p className="mt-2"><a className="btn no-underline" href={mailto()}>Send via email to {site.email}</a></p>
        </div>
      )}
      <p className="mt-4 text-sm text-muted">This form does not submit to a server. It saves locally in your browser and offers a pre-filled email to {site.email}. No payment is requested through this form.</p>
    </form>
  );
}
