"use client";
import { useEffect, useState } from "react";
import { site, services as defaultServices, projects as defaultProjects, articles as defaultArticles } from "@/lib/content";

const TABS = ["Overview", "Services & Pricing", "Portfolio", "Insights", "Inquiries", "Settings"];
const SEO_CHECKLIST = [
  "Unique page titles and meta descriptions — set per page in this Next.js app (see each page's metadata).",
  "One clear H1 per page — the Hero title on each page.",
  "Canonical URLs and sitemap — sitemap is generated at /sitemap.xml; set the real domain in lib/content.js (site.baseUrl) before launch.",
  "Google Search Console — submit the sitemap after deployment; not configured in this build.",
  "Mobile performance — responsive Tailwind layout, system fonts, no heavy images in this build.",
  "Structured data — Organization schema is in the root layout metadata area via the sitemap/content; add Service/FAQ schema per page as a later step if required.",
  "Internal linking — home → service pages → related case studies and articles.",
  "Conversion tracking — quote submissions are saved in the database and emailed to the site owner; no analytics is wired up in this build.",
];

async function api(path, opts) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...(opts || {}),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Request failed (${res.status}).`);
  }
  return data;
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  const [tab, setTab] = useState("Overview");
  const [inquiries, setInquiries] = useState([]);
  const [svc, setSvc] = useState(defaultServices);
  const [proj, setProj] = useState(defaultProjects);
  const [arts, setArts] = useState(defaultArticles);
  const [settings, setSettings] = useState({ brand: site.brand, tagline: site.tagline, email: site.email });
  const [newProj, setNewProj] = useState({ name: "", category: "", description: "" });
  const [newArt, setNewArt] = useState({ title: "", summary: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  const loadAll = async () => {
    setLoading(true);
    setErr("");
    try {
      const [inq, content] = await Promise.all([
        api("/api/admin/inquiries/"),
        api("/api/admin/content/"),
      ]);
      setInquiries(inq.inquiries || []);
      const ov = content.overrides || {};
      if (Array.isArray(ov.services)) setSvc(ov.services);
      if (Array.isArray(ov.projects)) setProj(ov.projects);
      if (Array.isArray(ov.articles)) setArts(ov.articles);
      if (ov.settings) setSettings({ brand: site.brand, tagline: site.tagline, email: site.email, ...ov.settings });
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const me = await api("/api/admin/me/");
        setLoggedIn(!!me.loggedIn);
        if (me.loggedIn) await loadAll();
      } catch {
        setLoggedIn(false);
      } finally {
        setChecking(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoginBusy(true);
    setLoginError("");
    try {
      await api("/api/admin/login/", { method: "POST", body: JSON.stringify({ password }) });
      setPassword("");
      setLoggedIn(true);
      await loadAll();
    } catch (e2) {
      setLoginError(e2.message);
    } finally {
      setLoginBusy(false);
    }
  };

  const logout = async () => {
    try { await api("/api/admin/logout/", { method: "POST" }); } catch {}
    setLoggedIn(false);
    setInquiries([]);
  };

  const saveContent = async (key, value, doneMsg) => {
    setMsg("");
    setErr("");
    try {
      await api("/api/admin/content/", { method: "POST", body: JSON.stringify({ key, value }) });
      setMsg(doneMsg || "Saved. Public pages were revalidated.");
    } catch (e) {
      setErr(e.message);
    }
  };

  const setStatus = async (id, status) => {
    setErr("");
    try {
      await api(`/api/admin/inquiries/${id}/`, { method: "PATCH", body: JSON.stringify({ status }) });
      setInquiries((list) => list.map((q) => (q.id === id ? { ...q, status } : q)));
    } catch (e) {
      setErr(e.message);
    }
  };

  const deleteInquiry = async (id) => {
    setErr("");
    try {
      await api(`/api/admin/inquiries/${id}/`, { method: "DELETE" });
      setInquiries((list) => list.filter((q) => q.id !== id));
    } catch (e) {
      setErr(e.message);
    }
  };

  if (checking) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12">
        <p className="text-muted">Checking session…</p>
      </div>
    );
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-12">
        <h1 className="text-4xl font-black text-navy">Admin Panel</h1>
        <div className="card mt-6 max-w-md">
          <h2 className="text-xl font-bold text-navy">Sign in</h2>
          <p className="mt-1 text-muted">The admin panel is password-protected. Inquiries and content are stored in the database, not in this browser.</p>
          <form onSubmit={login}>
            <label htmlFor="admin-password">Admin password</label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <p className="mt-4"><button className="btn" type="submit" disabled={loginBusy}>{loginBusy ? "Signing in…" : "Sign in"}</button></p>
          </form>
          {loginError && <p className="mt-3 font-bold text-red-700">{loginError}</p>}
        </div>
      </div>
    );
  }

  const newCount = inquiries.filter((q) => q.status === "new").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-4xl font-black text-navy">Admin Panel</h1>
        <button className="btn-ghost" onClick={logout}>Sign out</button>
      </div>
      <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-900">
        <strong>Real admin panel.</strong> You are signed in. Inquiries are stored in the database, and content changes saved here update the public site (pages are revalidated on save). Do not store client secrets or payment data here.
      </div>
      {loading && <p className="mt-4 text-muted">Loading…</p>}
      {err && <p className="mt-4 font-bold text-red-700">{err}</p>}
      {msg && <p className="mt-4 font-bold text-green-700">{msg}</p>}

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "btn" : "btn-ghost"}>
            {t}{t === "Inquiries" && newCount > 0 ? ` (${newCount} new)` : ""}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[["Services", svc.length], ["Projects", proj.length], ["Articles", arts.length], ["Inquiries", inquiries.length]].map(([label, n]) => (
            <div key={label} className="card"><p className="text-4xl font-black text-navy">{n}</p><p className="text-muted">{label}</p></div>
          ))}
          <div className="card md:col-span-4">
            <h3 className="text-xl font-bold text-navy">SEO checklist</h3>
            <ul className="mt-3 list-disc space-y-2 pl-6">{SEO_CHECKLIST.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
      )}

      {tab === "Services & Pricing" && (
        <div className="mt-6 space-y-4">
          {svc.map((s, i) => (
            <div key={s.slug} className="card grid gap-3 md:grid-cols-3">
              <div><label>Service name</label><input value={s.name} onChange={(e) => { const v = [...svc]; v[i] = { ...v[i], name: e.target.value }; setSvc(v); }} /></div>
              <div><label>Starting price</label><input value={s.price} onChange={(e) => { const v = [...svc]; v[i] = { ...v[i], price: e.target.value }; setSvc(v); }} /></div>
              <div><label>Slug (read-only)</label><input value={s.slug} readOnly /></div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <button className="btn-ghost" onClick={() => { setSvc(defaultServices); setMsg("Services reset to file defaults (not saved yet)."); }}>Reset to defaults</button>
            <button className="btn" onClick={() => saveContent("services", svc, "Services saved and public pages revalidated.")}>Save services</button>
          </div>
          <p className="text-muted">Saving writes to the database and revalidates the public pages. Pricing tiers are edited in lib/content.js for now.</p>
        </div>
      )}

      {tab === "Portfolio" && (
        <div className="mt-6 space-y-4">
          {proj.map((p) => (
            <div key={p.slug} className="card flex flex-wrap items-center justify-between gap-3">
              <div><strong className="text-navy">{p.name}</strong> — {p.category}<p className="text-muted">{p.status}</p></div>
              {p.link && <a href={p.link} target="_blank" rel="noopener">Live site ↗</a>}
            </div>
          ))}
          <div className="card">
            <h3 className="text-xl font-bold text-navy">Add a project</h3>
            <label>Title</label><input value={newProj.name} onChange={(e) => setNewProj({ ...newProj, name: e.target.value })} />
            <label>Category</label><input value={newProj.category} onChange={(e) => setNewProj({ ...newProj, category: e.target.value })} />
            <label>Description</label><textarea rows={3} value={newProj.description} onChange={(e) => setNewProj({ ...newProj, description: e.target.value })} />
            <p className="mt-4"><button className="btn" onClick={() => {
              if (!newProj.name.trim()) return;
              const slug = newProj.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-project";
              const next = [...proj, { slug, name: newProj.name, category: newProj.category || "Project", status: "Self-initiated / owned project", description: newProj.description, stack: [], objective: "", audience: "", contribution: "", structure: "", image: "", link: "" }];
              setProj(next);
              setNewProj({ name: "", category: "", description: "" });
              saveContent("projects", next, "Project added and public pages revalidated.");
            }}>Add project</button></p>
          </div>
          <button className="btn" onClick={() => saveContent("projects", proj, "Portfolio saved and public pages revalidated.")}>Save portfolio</button>
        </div>
      )}

      {tab === "Insights" && (
        <div className="mt-6 space-y-4">
          {arts.map((a) => (
            <div key={a.slug} className="card"><strong className="text-navy">{a.title}</strong><p className="text-muted">{a.summary}</p></div>
          ))}
          <div className="card">
            <h3 className="text-xl font-bold text-navy">Add a draft article</h3>
            <label>Title</label><input value={newArt.title} onChange={(e) => setNewArt({ ...newArt, title: e.target.value })} />
            <label>Summary</label><textarea rows={3} value={newArt.summary} onChange={(e) => setNewArt({ ...newArt, summary: e.target.value })} />
            <p className="mt-4"><button className="btn" onClick={() => {
              if (!newArt.title.trim()) return;
              const slug = newArt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-article";
              const next = [...arts, { slug, title: newArt.title, summary: newArt.summary, relatedService: "", relatedLabel: "", sections: [{ heading: null, body: newArt.summary }] }];
              setArts(next);
              setNewArt({ title: "", summary: "" });
              saveContent("articles", next, "Article added and public pages revalidated.");
            }}>Add draft</button></p>
          </div>
          <button className="btn" onClick={() => saveContent("articles", arts, "Insights saved and public pages revalidated.")}>Save insights</button>
        </div>
      )}

      {tab === "Inquiries" && (
        <div className="mt-6 space-y-4">
          {inquiries.length === 0 && <p className="text-muted">No inquiries yet. Submit the quote form on /contact/ or /get-a-quote/ to create one.</p>}
          {inquiries.map((q) => (
            <div key={q.id} className="card">
              <div className="flex flex-wrap justify-between gap-3">
                <strong className="text-navy">{q.name} — {q.service}</strong>
                <div className="flex items-center gap-2">
                  <select
                    value={q.status}
                    onChange={(e) => setStatus(q.id, e.target.value)}
                    className="!w-auto"
                    aria-label="Inquiry status"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                  <button className="btn-ghost !py-1 !px-3" onClick={() => deleteInquiry(q.id)}>Delete</button>
                </div>
              </div>
              <p className="text-muted">{q.email} · Budget: {q.budget} · Timeline: {q.timeline} · {q.created_at ? new Date(q.created_at).toLocaleString() : ""}</p>
              <p className="mt-2 whitespace-pre-wrap">{q.message}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "Settings" && (
        <div className="mt-6 card max-w-2xl">
          <label>Brand name</label><input value={settings.brand} onChange={(e) => setSettings({ ...settings, brand: e.target.value })} />
          <label>Tagline</label><input value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} />
          <label>Contact email</label><input value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} />
          <p className="mt-5"><button className="btn" onClick={() => saveContent("settings", settings, "Settings saved and public pages revalidated.")}>Save settings</button></p>
          <div className="mt-6 rounded-xl border border-slate2 bg-soft p-4">
            <strong>What is stored where:</strong> brand, tagline, email, service prices, projects, articles and inquiries are stored in the database when saved here, and the public site reads them. Changing the admin password or session secret requires updating the Vercel env vars (ADMIN_PASSWORD, ADMIN_SESSION_SECRET) and redeploying.
          </div>
        </div>
      )}
    </div>
  );
}
