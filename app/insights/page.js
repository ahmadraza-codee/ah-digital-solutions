import Link from "next/link";
import { Hero, Section } from "@/components/ui";
import { articles } from "@/lib/content";

export const metadata = {
  title: "Insights | AH Digital Solutions",
  description: "Practical articles on business websites, Shopify setup and technical SEO, written to support AH Digital Solutions services.",
};

export default function InsightsPage() {
  return (
    <>
      <Hero kicker="Insights" title="Practical Guides for Growing Businesses" text="Short, honest guides on websites, Shopify and SEO — written to help you make better decisions, not to fill the blog with generic articles." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {articles.map((a) => (
            <div key={a.slug} className="card">
              <h3 className="text-xl font-bold text-navy">{a.title}</h3>
              <p className="mt-1 text-slate-600">{a.summary}</p>
              <p className="mt-3"><Link href={`/insights/${a.slug}/`}>Read Article →</Link></p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
