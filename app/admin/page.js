"use client";
import { useEffect, useState } from "react";
import { site, services as defaultServices, projects as defaultProjects, articles as defaultArticles } from "@/lib/content";

function load(key, fallback) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
function download(name, obj) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = name; a.click(); URL.revokeObjectURL(url);
}

const TABS = ["Overview", "Services & Pricing", "Portfolio", "Insights", "Inquiries", "Settings"];
const SEO_CHECKLIST = [
  "Unique page titles and meta descriptions — set per page in this Next.js app (see each page's metadata).",
  "One clear H1 per page — the Hero title on each page.",
  "Canonical URLs and sitemap — sitemap is generated at /sitemap.xml; set the real domain in lib/content.js (site.baseUrl) before launch.",
  "Google Search Console — submit the sitemap after deployment; not configured in this build.",
  "Mobile performance — responsive Tailwind layout, system fonts, no heavy images in this build.",
  "Structured data — Organization schema is in the root layout metadata area via the sitemap/content; add Service/FAQ schema per page as a later step if required.",
  "Internal linking — home → service pages → related case studies and articles.",
  "Conversion tracking — quote submissions are saved locally only; no analytics or server tracking is wired up in this build.",
];

export default function AdminPage() {
  const [tab, setTab] = useState("Overview");
  const [inquiries, setInquiries] = useState([]);
  const [svc, setSvc] = useState(defaultServices);
  const [proj, setProj] = useState(defaultProjects);
  const [arts, setArts] = useState(defaultArticles);
  const [settings, setSettings] = useState({ brand: site.brand, tagline: site.tagline, email: site.email });
  const [newProj, setNewProj] = useState({ name: "", category: "", description: "" });
  const [newArt, setNewArt] = useState({ title: "", summary: "" });
  const [featured, setFeatured] = useState({});
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setInquiries(load("ah_inquiries", []));
    setSvc(load("ah_admin_services", defaultServices));
    setProj(load("ah_admin_projects", defaultProjects));
    setArts(load("ah_admin_articles", defaultArticles));
    setSettings(load("ah_admin_settings", { brand: site.brand, tagline: site.tagline, email: site.email }));
    setFeatured(load("ah_admin_featured", {}));
  }, []);

  const persistSvc = (v) => { setSvc(v); save("ah_admin_services", v); };
  const persistProj = (v) => { setProj(v); save("ah_admin_projects", v); };
  const persistArts = (v) => { setArts(v); save("ah_admin_articles", v); };
  const persistSettings = (v) => { setSettings(v); save("ah_admin_settings", v); };
  const persistFeatured = (v) => { setFeatured(v); save("ah_admin_featured", v); };

  const deleteInquiry = (i) => { const v = inquiries.filter((_, idx) => idx !== i); setInquiries(v); save("ah_inquiries", v); };
  const clearInquiries = () => { setInquiries([]); save("ah_inquiries", []); };

  return (
    <div className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-4xl font-black text-navy">Admin Panel</h1>
      <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
        <strong>Important — this is a front-end admin panel without server authentication.</strong> Anyone who can open /admin in this browser can see and change these local values. There is no login, no user roles, and nothing here is saved to a server or database. A real multi-user admin panel needs server authentication plus a database, as a later step. Do not use this panel to store real client secrets or payment data.
      </div>
      <div className="mt-4 rounded-xl border border-slate2 bg-soft p-4">
        <strong>How local edits work:</strong> edits on this page are saved only in this browser (localStorage). Public pages keep reading the defaults from <code>lib/content.js</code>, so local admin edits do <strong>not</strong> change what visitors see until you export them and apply them to <code>lib/content.js</code>, then rebuild and redeploy. Use “Export JSON” on the Services tab (and the equivalent exports below) to capture your edits.
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={tab === t ? "btn" : "btn-ghost"}>{t}</button>
        ))}
      </div>
      {msg && <p className="mt-4 font-bold text-green-700">{msg}</p>}

      {tab === "Overview" && (
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[["Services", svc.length], ["Projects", proj.length], ["Articles", arts.length], ["Inquiries (this browser)", inquiries.length]].map(([label, n]) => (
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
              <div><label>Service name</label><input value={s.name} onChange={(e) => { const v = [...svc]; v[i] = { ...v[i], name: e.target.value }; persistSvc(v); }} /></div>
              <div><label>Starting price</label><input value={s.price} onChange={(e) => { const v = [...svc]; v[i] = { ...v[i], price: e.target.value }; persistSvc(v); }} /></div>
              <div><label>Slug (read-only)</label><input value={s.slug} readOnly /></div>
            </div>
          ))}
          <div className="flex flex-wrap gap-3">
            <button className="btn-ghost" onClick={() => { persistSvc(defaultServices); setMsg("Services reset to defaults (browser only)."); }}>Reset to defaults</button>
            <button className="btn" onClick={() => download("ah-services.json", svc)}>Export JSON</button>
          </div>
          <p className="text-muted">Exports only capture this browser’s edits. Apply them to lib/content.js to change the public site.</p>
        </div>
      )}

      {tab === "Portfolio" && (
        <div className="mt-6 space-y-4">
          {proj.map((p) => (
            <div key={p.slug} className="card flex flex-wrap items-center justify-between gap-3">
              <div><strong className="text-navy">{p.name}</strong> — {p.category}<p className="text-muted">{p.status}</p></div>
              <label className="!mt-0 flex items-center gap-2 font-normal"><input type="checkbox" className="!w-auto" checked={!!featured[p.slug]} onChange={(e) => persistFeatured({ ...featured, [p.slug]: e.target.checked })} /> Featured</label>
            </div>
          ))}
          <div className="card">
            <h3 className="text-xl font-bold text-navy">Add a project (saved locally)</h3>
            <label>Title</label><input value={newProj.name} onChange={(e) => setNewProj({ ...newProj, name: e.target.value })} />
            <label>Category</label><input value={newProj.category} onChange={(e) => setNewProj({ ...newProj, category: e.target.value })} />
            <label>Description</label><textarea rows={3} value={newProj.description} onChange={(e) => setNewProj({ ...newProj, description: e.target.value })} />
            <p className="mt-4"><button className="btn" onClick={() => {
              if (!newProj.name.trim()) return;
              const slug = newProj.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-project";
              persistProj([...proj, { slug, name: newProj.name, category: newProj.category || "Project", status: "Self-initiated / owned project", description: newProj.description, stack: [], objective: "", audience: "", contribution: "", structure: "" }]);
              setNewProj({ name: "", category: "", description: "" }); setMsg("Project added locally (browser only).");
            }}>Add project</button></p>
          </div>
          <button className="btn" onClick={() => download("ah-projects.json", proj)}>Export JSON</button>
        </div>
      )}

      {tab === "Insights" && (
        <div className="mt-6 space-y-4">
          {arts.map((a) => (
            <div key={a.slug} className="card"><strong className="text-navy">{a.title}</strong><p className="text-muted">{a.summary}</p></div>
          ))}
          <div className="card">
            <h3 className="text-xl font-bold text-navy">Add a draft article (saved locally)</h3>
            <label>Title</label><input value={newArt.title} onChange={(e) => setNewArt({ ...newArt, title: e.target.value })} />
            <label>Summary</label><textarea rows={3} value={newArt.summary} onChange={(e) => setNewArt({ ...newArt, summary: e.target.value })} />
            <p className="mt-4"><button className="btn" onClick={() => {
              if (!newArt.title.trim()) return;
              const slug = newArt.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "new-article";
              persistArts([...arts, { slug, title: newArt.title, summary: newArt.summary, relatedService: "", relatedLabel: "", sections: [{ heading: null, body: newArt.summary }] }]);
              setNewArt({ title: "", summary: "" }); setMsg("Draft article added locally (browser only).");
            }}>Add draft</button></p>
          </div>
          <button className="btn" onClick={() => download("ah-articles.json", arts)}>Export JSON</button>
        </div>
      )}

      {tab === "Inquiries" && (
        <div className="mt-6 space-y-4">
          {inquiries.length === 0 && <p className="text-muted">No inquiries saved in this browser yet. Submit the quote form on /contact/ or /get-a-quote/ to create one.</p>}
          {inquiries.map((q, i) => (
            <div key={i} className="card">
              <div className="flex justify-between gap-3"><strong className="text-navy">{q.name} — {q.service}</strong><button className="btn-ghost !py-1 !px-3" onClick={() => deleteInquiry(i)}>Delete</button></div>
              <p className="text-muted">{q.email} · Budget: {q.budget} · Timeline: {q.timeline} · {q.createdAt ? new Date(q.createdAt).toLocaleString() : ""}</p>
              <p className="mt-2 whitespace-pre-wrap">{q.message}</p>
            </div>
          ))}
          {inquiries.length > 0 && <button className="btn-ghost" onClick={clearInquiries}>Clear all inquiries</button>}
        </div>
      )}

      {tab === "Settings" && (
        <div className="mt-6 card max-w-2xl">
          <label>Brand name</label><input value={settings.brand} onChange={(e) => persistSettings({ ...settings, brand: e.target.value })} />
          <label>Tagline</label><input value={settings.tagline} onChange={(e) => persistSettings({ ...settings, tagline: e.target.value })} />
          <label>Contact email</label><input value={settings.email} onChange={(e) => persistSettings({ ...settings, email: e.target.value })} />
          <button className="btn mt-5" onClick={() => download("ah-settings.json", settings)}>Export JSON</button>
          <div className="mt-6 rounded-xl border border-slate2 bg-soft p-4">
            <strong>What is NOT persisted server-side:</strong> brand, tagline, email, service prices, projects, articles and inquiries edited here exist only in this browser’s localStorage. They are lost if browser data is cleared, are not shared with other devices or visitors, and do not change the public site until exported and applied to lib/content.js and the site is rebuilt and redeployed.
          </div>
        </div>
      )}
    </div>
  );
}
