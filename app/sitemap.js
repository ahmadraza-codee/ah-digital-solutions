import { getContent } from "@/lib/content-server";

export default async function sitemap() {
  const { site, services, projects, articles } = await getContent();
  const paths = ["", "services", "portfolio", "about", "blog", "contact", "get-a-free-quote", "thank-you", "privacy-policy", "terms-and-conditions",
    ...services.map((s) => `services/${s.slug}`),
    ...projects.map((p) => `portfolio/${p.slug}`),
    ...articles.map((a) => `blog/${a.slug}`)];
  return paths.map((p) => ({ url: `${site.baseUrl}/${p}`, lastModified: new Date() }));
}
