import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section } from "@/components/ui";
import { articles, getArticle } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return {};
  return { title: `${a.title} | AH Digital Solutions`, description: a.summary };
}

export default function ArticlePage({ params }) {
  const a = getArticle(params.slug);
  if (!a) notFound();
  return (
    <>
      <Hero kicker="Insights" title={a.title} text={a.summary} />
      <Section>
        <div className="max-w-3xl">
          {a.sections.map((s, i) => (
            <div key={i}>
              {s.heading && <h2 className="mt-8 text-3xl font-bold text-navy">{s.heading}</h2>}
              <p className="mt-3">{s.body}</p>
            </div>
          ))}
          <p className="mt-6">Related service: <Link href={`/${a.relatedService}/`}>{a.relatedLabel}</Link></p>
          <p className="mt-6"><Link className="btn no-underline" href="/get-a-quote/">Get a Free Quote ↗</Link></p>
        </div>
      </Section>
    </>
  );
}
