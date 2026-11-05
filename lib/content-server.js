import "server-only";
import { cache } from "react";
import {
  site as defaultSite,
  services as defaultServices,
  projects as defaultProjects,
  articles as defaultArticles,
  homeFaqs,
  processSteps,
} from "./content";
import { query } from "./db";

// Server-side content resolver: lib/content.js defaults merged with any
// admin-saved overrides from the content_overrides table.
// If the database is unavailable (e.g. DATABASE_URL unset at build time),
// it silently falls back to the file defaults so the build never crashes.
// React cache() dedupes the query within a single render pass.
export const getContent = cache(async () => {
  const base = {
    site: defaultSite,
    services: defaultServices,
    projects: defaultProjects,
    articles: defaultArticles,
    homeFaqs,
    processSteps,
  };
  try {
    const res = await query("SELECT key, value FROM content_overrides");
    const ov = Object.fromEntries(res.rows.map((r) => [r.key, r.value]));
    if (Array.isArray(ov.services)) base.services = ov.services;
    if (Array.isArray(ov.projects)) base.projects = ov.projects;
    if (Array.isArray(ov.articles)) base.articles = ov.articles;
    if (ov.settings && typeof ov.settings === "object") {
      base.site = { ...defaultSite, ...ov.settings };
    }
    return base;
  } catch {
    return base;
  }
});

export async function getService(slug) {
  const c = await getContent();
  return c.services.find((s) => s.slug === slug);
}

export async function getProject(slug) {
  const c = await getContent();
  return c.projects.find((p) => p.slug === slug);
}

export async function getArticle(slug) {
  const c = await getContent();
  return c.articles.find((a) => a.slug === slug);
}
