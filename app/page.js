import Link from "next/link";
import { Hero, Section, Faqs } from "@/components/ui";
import { services, projects, homeFaqs, processSteps } from "@/lib/content";

export const metadata = {
  title: "AH Digital Solutions — Smart Digital Solutions for Growing Businesses",
  description: "AH Digital Solutions builds professional business websites, Shopify stores and SEO-ready digital experiences for small and growing businesses, with full-stack, AI and Flutter development available.",
};

const primary = services.slice(0, 3);
const specialized = services.slice(3);

export default function Home() {
  return (
    <>
      <Hero kicker="Web Development · Shopify · SEO" title="Build a Stronger Online Presence for Your Business" text="We create professional business websites, custom Shopify stores, and SEO-ready digital experiences designed around your business goals." />
      <Section>
        <h2 className="text-3xl font-bold text-navy">Practical Digital Solutions. Built Around Your Goals.</h2>
        <p className="mt-2 max-w-3xl text-muted">Every project starts with understanding what your business needs. We focus on clear communication, thoughtful design, maintainable development, and a straightforward delivery process.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[["Business-focused solutions", "We start with goals and requirements, not unnecessary features."], ["Transparent project scope", "Deliverables, exclusions, timeline and revision terms are clarified before starting."], ["Responsive and maintainable development", "Built for mobile, tablet and desktop, with code and structure you can maintain."]].map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Digital Services for Your Next Stage of Growth</h2>
        <p className="mt-2 max-w-3xl text-muted">From your first professional website to a fully functional online store, we help you build the digital foundations your business needs.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {primary.map((s) => (
            <div key={s.slug} className="card"><h3 className="text-xl font-bold text-navy">{s.name}</h3><p className="mt-1 text-slate-600">{s.short}</p><p className="mt-3"><Link href={`/${s.slug}/`}>Explore {s.name} →</Link></p></div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Selected Projects &amp; Digital Experiences</h2>
        <p className="mt-2 max-w-3xl text-muted">Explore selected projects that demonstrate our approach to website development, eCommerce, and content-focused digital experiences. These are self-initiated / owned projects, described as such — not presented as commissioned client work.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <div key={p.slug} className="card"><p className="font-bold text-teal-700">{p.category}</p><h3 className="mt-1 text-xl font-bold text-navy">{p.name}</h3><p className="mt-1 text-slate-600">{p.description}</p><p className="mt-3"><Link href={`/portfolio/${p.slug}/`}>View Case Study →</Link></p></div>
          ))}
        </div>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">A Clearer, More Practical Approach to Digital Projects</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[["Business-first thinking", "Start with goals and requirements, not unnecessary features."], ["Responsive by design", "Build for mobile, tablet and desktop."], ["Technical foundations", "Prioritize maintainability, performance and accessibility."], ["SEO-aware structure", "Implement appropriate technical and on-page SEO foundations."], ["Transparent delivery", "Clarify scope, timeline, deliverables and revision terms before starting."], ["Direct communication", "A clear contact and feedback process throughout the project."]].map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Our Process</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-5">
          {processSteps.map(([t, d]) => (
            <div key={t} className="border-t-[3px] border-brand pt-3"><strong className="text-navy">{t}</strong><p className="text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Need Something More Custom?</h2>
        <p className="mt-2 max-w-3xl text-muted">For businesses with more advanced requirements, we also offer custom web applications, AI integrations and cross-platform mobile development.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {specialized.map((s) => (
            <div key={s.slug} className="card"><h3 className="text-xl font-bold text-navy">{s.name}</h3><p className="mt-1 text-slate-600">{s.short}</p><p className="mt-3"><Link href={`/${s.slug}/`}>Explore →</Link></p></div>
          ))}
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Clear Starting Prices. Custom Scope.</h2>
        <p className="mt-2 max-w-3xl text-muted">Every project is different. Our starting prices help you plan your budget, while custom quotes account for your specific requirements, integrations and delivery needs.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {primary.map((s) => (
            <div key={s.slug} className="card"><h3 className="text-xl font-bold text-navy">{s.name}</h3><p className="mt-1 text-3xl font-black text-navy">{s.price}</p><p className="mt-1 text-slate-600">{s.priceNote}.</p><p className="mt-3"><Link href={`/${s.slug}/`}>Details →</Link></p></div>
          ))}
        </div>
        <p className="mt-6"><Link className="btn no-underline" href="/get-a-quote/">Get a Free Quote ↗</Link></p>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Frequently Asked Questions</h2>
        <div className="mt-7"><Faqs items={homeFaqs} /></div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">Ready to Discuss Your Project?</h2>
        <p className="mt-2 max-w-3xl text-muted">Tell us what you are building, what challenges you are facing, and what you want to achieve. We will review your requirements and recommend a suitable next step.</p>
        <p className="mt-6 flex flex-wrap gap-3"><Link className="btn no-underline" href="/get-a-quote/">Get a Free Quote ↗</Link><Link className="btn-ghost no-underline" href="/services/">Explore Our Services</Link></p>
      </Section>
    </>
  );
}
