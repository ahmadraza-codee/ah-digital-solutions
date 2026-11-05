import { getContent } from "@/lib/content-server";

export default async function sitemap() {
  const { site, services, projects, articles } = await getContent();
  const paths = ["", "services", "portfolio", "about", "insights", "contact", "get-a-quote", "privacy-policy", "terms",
    ...services.map((s) => s.slug),
    ...projects.map((p) => `portfolio/${p.slug}`),
    ...articles.map((a) => `insights/${a.slug}`)];
  return paths.map((p) => ({ url: `${site.baseUrl}/${p}`, lastModified: new Date() }));
}
