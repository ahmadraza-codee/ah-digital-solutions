import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section, Faqs } from "@/components/ui";
import { services, getService, getProject } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: `${s.title} | AH Digital Solutions`, description: s.hero };
}

export default function ServicePage({ params }) {
  const s = getService(params.slug);
  if (!s) notFound();
  const related = getProject(s.portfolioSlug);
  return (
    <>
      <Hero kicker="AH Digital Solutions" title={s.title} text={s.hero} />
      <Section>
        <h2 className="text-3xl font-bold text-navy">Problems this service solves</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">{s.problems.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">What is included</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">{s.included.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Our approach</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6">{s.approach.map((x) => <li key={x}>{x}</li>)}</ol>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Relevant work</h2>
        {related && <p className="mt-3"><Link href={`/portfolio/${related.slug}/`}>{related.name} — View Case Study →</Link></p>}
        <p className="mt-2 text-muted">Case studies describe self-initiated / owned projects accurately. No commissioned-client claim is made, and no unverified results are published.</p>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Pricing</h2>
        <p className="mt-3 text-3xl font-black text-navy">{s.price} <span className="text-base font-normal text-muted">starting price</span></p>
        <p className="mt-2">Final scope, timeline and payment milestones are agreed after discovery, in writing.</p>
        <p className="text-muted">Third-party costs (hosting, Shopify plans, paid apps/themes, AI API usage, store fees) are separate unless explicitly included in your quote.</p>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">FAQs</h2>
        <div className="mt-6"><Faqs items={s.faqs} /></div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Start with a clear scope</h2>
        <p className="mt-2 max-w-3xl text-muted">Starting price: <strong>{s.price}</strong>. The final quote depends on pages, features, integrations and content requirements, agreed in writing before work begins.</p>
        <p className="mt-6"><Link className="btn no-underline" href={`/get-a-quote/?service=${encodeURIComponent(s.name)}`}>Get a Free Quote ↗</Link></p>
      </Section>
    </>
  );
}
