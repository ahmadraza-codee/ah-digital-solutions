import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section, JsonLd, Breadcrumbs } from "@/components/ui";
import { getContent, getArticle } from "@/lib/content-server";
import { site } from "@/lib/content";

export async function generateStaticParams() {
  const { articles } = await getContent();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  if (!a) return {};
  return { title: `${a.title} | AH Digital Solutions`, description: a.summary };
}

export default async function ArticlePage({ params }) {
  const a = await getArticle(params.slug);
  if (!a) notFound();
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.summary,
    author: {
      "@type": "Organization",
      name: "AH Digital Solutions",
      url: site.baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "AH Digital Solutions",
      url: site.baseUrl,
    },
  };
  return (
    <>
      <JsonLd data={articleSchema} />
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: a.title, href: `/blog/${a.slug}/` }]} />
      <Hero kicker="Blog" title={a.title} text={a.summary} />
      <Section>
        <div className="max-w-3xl">
          {a.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2 className="mt-8 text-3xl font-bold text-navy">{s.heading}</h2>}
              <p className="mt-3">{s.body}</p>
            </div>
          ))}
          <p className="mt-6">Related service: <Link href={`/services/${a.relatedService}/`}>{a.relatedLabel}</Link></p>
          <p className="mt-6"><Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote ↗</Link></p>
        </div>
      </Section>
    </>
  );
}
