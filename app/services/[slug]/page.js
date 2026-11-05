import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section, Faqs, JsonLd, Breadcrumbs } from "@/components/ui";
import { getContent, getService, getProject } from "@/lib/content-server";
import { site } from "@/lib/content";

export async function generateStaticParams() {
  const { services } = await getContent();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const s = await getService(params.slug);
  if (!s) return {};
  return { title: `${s.title} | AH Digital Solutions`, description: s.metaDescription || s.hero };
}

export default async function ServicePage({ params }) {
  const s = await getService(params.slug);
  if (!s) notFound();
  const related = await getProject(s.portfolioSlug);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.metaDescription || s.hero,
    provider: {
      "@type": "Organization",
      name: "AH Digital Solutions",
      url: site.baseUrl,
    },
    areaServed: ["US", "GB", "CA", "AU", "AE"],
  };
  return (
    <>
      <JsonLd data={serviceSchema} />
      <Breadcrumbs items={[{ name: "Services", href: "/services/" }, { name: s.name, href: `/services/${s.slug}/` }]} />
      <Hero kicker="AH Digital Solutions" title={s.title} text={s.hero} />
      <Section>
        <h2 className="text-3xl font-bold text-navy">Problems this service solves</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">{s.problems.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">What is included</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6">{s.included.map((x) => <li key={x}>{x}</li>)}</ul>
      </Section>
      {s.audience && (
        <Section>
          <h2 className="text-3xl font-bold text-navy">Who this is for</h2>
          <p className="mt-3 max-w-3xl">{s.audience}</p>
        </Section>
      )}
      {s.tools && s.tools.length > 0 && (
        <Section alt>
          <h2 className="text-3xl font-bold text-navy">Tools &amp; technologies</h2>
          <p className="mt-3">{s.tools.map((t) => <span key={t} className="tag">{t}</span>)}</p>
          <p className="mt-2 text-muted">The stack is chosen for the project scope — not forced onto it.</p>
        </Section>
      )}
      <Section>
        <h2 className="text-3xl font-bold text-navy">Our approach</h2>
        <ol className="mt-4 list-decimal space-y-2 pl-6">{s.approach.map((x) => <li key={x}>{x}</li>)}</ol>
      </Section>
      {s.timeline && (
        <Section alt>
          <h2 className="text-3xl font-bold text-navy">Timeline</h2>
          <p className="mt-3 max-w-3xl">{s.timeline}</p>
        </Section>
      )}
      <Section>
        <h2 className="text-3xl font-bold text-navy">Relevant work</h2>
        {related && <p className="mt-3"><Link href={`/portfolio/${related.slug}/`}>{related.name} — View Case Study →</Link></p>}
        <p className="mt-2 text-muted">Case studies describe self-initiated / owned projects accurately. No commissioned-client claim is made, and no unverified results are published.</p>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Pricing</h2>
        <p className="mt-3 text-3xl font-black text-navy">{s.price} <span className="text-base font-normal text-muted">starting price</span></p>
        {s.tiers && (
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {s.tiers.map((t) => (
              <div key={t.name} className="card">
                <h3 className="text-xl font-bold text-navy">{t.name}</h3>
                <p className="mt-1 text-3xl font-black text-navy">{t.price}</p>
                <p className="mt-1 text-slate-600">{t.note}</p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-600">
                  {t.included.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}
        <p className="mt-2">Final scope, timeline and payment milestones are agreed after discovery, in writing.</p>
        <p className="text-muted">Third-party costs (hosting, Shopify plans, paid apps/themes, AI API usage, store fees) are separate unless explicitly included in your quote.</p>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">FAQs</h2>
        <div className="mt-6"><Faqs items={s.faqs} /></div>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Start with a clear scope</h2>
        <p className="mt-2 max-w-3xl text-muted">Starting price: <strong>{s.price}</strong>. The final quote depends on pages, features, integrations and content requirements, agreed in writing before work begins.</p>
        <p className="mt-6"><Link className="btn no-underline" href={`/get-a-free-quote/?service=${encodeURIComponent(s.name)}`}>Get a Free Quote ↗</Link></p>
      </Section>
    </>
  );
}
