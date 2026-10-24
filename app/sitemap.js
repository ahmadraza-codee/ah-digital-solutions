import { site, services, projects, articles } from "@/lib/content";

export default function sitemap() {
  const paths = ["", "services", "portfolio", "about", "insights", "contact", "get-a-quote", "privacy-policy", "terms",
    ...services.map((s) => s.slug),
    ...projects.map((p) => `portfolio/${p.slug}`),
    ...articles.map((a) => `insights/${a.slug}`)];
  return paths.map((p) => ({ url: `${site.baseUrl}/${p}`, lastModified: new Date() }));
}
