import Link from "next/link";
import { Section, Faqs, JsonLd } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "AH Digital Solutions — Web Development Agency | Business Websites, Shopify & SEO",
  description: "AH Digital Solutions is a web development agency building professional business websites, Shopify eCommerce stores and SEO-ready digital experiences for small and growing businesses — founder-led delivery, direct communication.",
};

const FEATURED_SLUGS = [
  { slug: "bt-clothes", note: "eCommerce, product pages, responsive design" },
  { slug: "precon-detailing", note: "Corporate website, service presentation, lead generation" },
  { slug: "bestlivingpicks", note: "Content website, SEO structure, affiliate layout" },
];

const ADDITIONAL_LABELS = {
  "full-stack-development": "Full-Stack Web Applications",
  "ai-web-development": "AI-Powered Web Solutions",
  "mobile-app-development": "Flutter Mobile Applications",
};

// Industries we build for — phrased as who the work is for, never as
// "trusted by" (no client claims are made anywhere on this site).
const INDUSTRIES = [
  ["Service Businesses", "Websites that explain what you do, who it is for, and how a visitor can enquire."],
  ["Online Stores & Retail", "Shopify storefronts with clear products, collections and a checkout customers can trust."],
  ["Consultants & Professionals", "A professional presence that presents expertise, services and a simple way to get in touch."],
  ["Education & Training", "Course and information pages with a clear structure for students and parents."],
  ["Health & Wellness", "Calm, clear websites for clinics, practitioners and wellness services, with easy contact options."],
  ["Startups", "A focused first website that explains the product and collects early enquiries without overbuilding."],
];

// What every project includes — drawn from the services' `included` lists
// in lib/content.js, in our own words.
const DELIVERABLES = [
  ["Responsive Website", "Homepage, About, Services and Contact pages in a layout that works on mobile, tablet and desktop."],
  ["Contact & Enquiry Forms", "Clear calls to action and a working contact form, so visitors can reach you without hunting for details."],
  ["Basic SEO Setup", "Titles, descriptions and headings set up per page, with internal links that help search engines understand the site."],
  ["Storefront & Product Setup", "For Shopify work: agreed page and product configuration, navigation and collections, checked on mobile."],
  ["Handover Notes & Agreed Revisions", "Handover notes after launch, and revision rounds agreed in the proposal before work begins."],
];

const PROMISES = [
  ["Clear Scope in Writing", "Deliverables, exclusions, timeline and price are agreed in writing before work begins — no vague promises."],
  ["Agreed Revisions", "Revision rounds are agreed in the proposal. Changes beyond the agreed scope are quoted separately, not silently added."],
  ["Confidential Handling", "Your project details, content and logins stay private and are never shared with anyone else."],
  ["Agreed Delivery Dates", "The timeline is agreed in the proposal, and progress is shared at checkpoints so you always know where things stand."],
];

const TOOLS = ["Next.js", "React", "Shopify", "Tailwind CSS", "Node.js", "Laravel", "Flutter"];

export default async function Home() {
  const { services, projects, homeFaqs, processSteps, site } = await getContent();
  const primary = services.slice(0, 3);
  const specialized = services.slice(3);
  const featured = FEATURED_SLUGS.map(({ slug, note }) => ({
    ...projects.find((p) => p.slug === slug),
    note,
  })).filter((p) => p.slug);
  const serviceImage = {
    "business-website-development": "/portfolio/precon-detailing.jpg",
    "shopify-development": "/portfolio/bt-clothes.png",
    seo: "/portfolio/bestlivingpicks.png",
  };
  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AH Digital Solutions",
          url: site.baseUrl,
        }}
      />

      {/* 1. Hero */}
      <section className="relative overflow-hidden text-white py-16">
        <img src="/hero-bg.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/60" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-blue-300">Professional Web Development &amp; Digital Growth Agency</p>
            <h1 className="mt-3 text-4xl font-black leading-tight tracking-tight md:text-5xl">We Build Digital Experiences That Help Businesses Grow.</h1>
            <p className="mt-4 text-lg text-slate-300">AH Digital Solutions helps businesses establish a stronger online presence through professional website development, Shopify eCommerce solutions, and strategic SEO services.</p>
            <p className="mt-4 text-slate-300">Every project is delivered under the founder&rsquo;s direct supervision — you work with the person building your website, not through layers of account managers.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote ↗</Link>
              <Link className="btn-ghost no-underline" href="/portfolio/">Explore Our Work</Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-white/15">
              <img src="/portfolio/bt-clothes.png" alt="BT Clothes — online store built by AH Digital Solutions" className="w-full" />
            </div>
            <div className="overflow-hidden rounded-xl border border-white/15">
              <img src="/portfolio/precon-detailing.jpg" alt="Precon Detailing — business website built by AH Digital Solutions" className="w-full" />
            </div>
            <p className="text-sm text-slate-400">Real projects built by AH Digital Solutions — self-initiated / owned projects, shown as such.</p>
          </div>
        </div>
      </section>

      {/* 2. Trust / value proposition */}
      <Section>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Direct Communication", "Work directly with the project lead"],
            ["Tailored Solutions", "Built around your business goals"],
            ["Responsive Development", "Designed for mobile, tablet and desktop"],
            ["Ongoing Support", "Assistance after project delivery"],
          ].map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-lg font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 3. Main services */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Digital Solutions Built Around Your Business</h2>
        <p className="mt-2 max-w-3xl text-muted">Three core services, delivered with the same care: a professional website, a store that sells, and search foundations that help customers find you.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {primary.map((s) => (
            <div key={s.slug} className="card overflow-hidden !p-0">
              {serviceImage[s.slug] && (
                <div className="overflow-hidden border-b border-slate2">
                  <img src={serviceImage[s.slug]} alt={`${s.name} — related project example`} className="w-full" loading="lazy" />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-navy">{s.name}</h3>
                <p className="mt-1 text-slate-600">{s.short}</p>
                <p className="mt-3 font-bold text-navy">From {s.price}</p>
                <p className="mt-3"><Link href={`/services/${s.slug}/`}>Explore Service →</Link></p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Why choose */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">A Dedicated Partner for Your Digital Growth</h2>
        <p className="mt-2 max-w-3xl text-muted">AH Digital Solutions is a founder-led agency. Your project is planned, built and delivered under the founder&rsquo;s direct supervision — so decisions are fast, communication is direct, and nothing gets lost between teams.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["Founder-led project execution", "Your project is delivered under the founder's direct supervision, from discovery to launch."],
            ["Direct communication", "You talk to the person doing the work — no account-manager relay, no waiting for answers."],
            ["Business-focused development", "Features are chosen for your goals and customers, not for a feature list."],
            ["Clear project milestones", "Scope, deliverables and checkpoints are agreed in writing before work begins."],
            ["Quality-focused delivery", "Responsive design, performance and maintainability are part of the build, not extras."],
            ["Customized solutions", "Built around your business instead of one-size-fits-all packages."],
          ].map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 5. Sample Work — featured projects with screenshots */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Sample Work</h2>
        <p className="mt-2 max-w-3xl text-muted">Three projects that show how we approach eCommerce, corporate websites and content-led sites. They are self-initiated / owned projects, shown to demonstrate skills, structure and approach — not presented as commissioned client work, and no unverified results are claimed.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <div key={p.slug} className="card overflow-hidden !p-0">
              <div className="overflow-hidden border-b border-slate2">
                <img src={p.image} alt={`${p.name} — homepage screenshot`} className="w-full" loading="lazy" />
              </div>
              <div className="p-6">
                <p className="font-bold text-teal-700">{p.category}</p>
                <h3 className="mt-1 text-xl font-bold text-navy">{p.name}</h3>
                <p className="mt-1 text-slate-600">{p.note}</p>
                <p><span className="tag">{p.status}</span></p>
                <p className="mt-3"><Link href={`/portfolio/${p.slug}/`}>View Case Study →</Link></p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6"><Link className="btn-ghost no-underline" href="/portfolio/">View All Projects</Link></p>
      </Section>

      {/* 6. What You Receive / Deliverables */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">What You Receive</h2>
        <p className="mt-2 max-w-3xl text-muted">Every project comes with complete, ready-to-use deliverables — agreed in the proposal before work begins.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          {DELIVERABLES.map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-lg font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 7. Industries We Serve */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Industries We Serve</h2>
        <p className="mt-2 max-w-3xl text-muted">Websites and stores built for the kinds of businesses we work with — each one scoped around how its customers actually find and contact it.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {INDUSTRIES.map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 8. Development process */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">How Your Project Moves Forward</h2>
        <p className="mt-2 max-w-3xl text-muted">A five-step process, agreed in writing before work begins.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-5">
          {processSteps.map(([t, d]) => (
            <div key={t} className="border-t-[3px] border-brand pt-3"><strong className="text-navy">{t}</strong><p className="text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 9. Tools & Technology */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Tools &amp; Technology</h2>
        <p className="mt-2 max-w-3xl text-muted">The stack is chosen for the project, not forced onto it — these are the tools we build with most often.</p>
        <div className="mt-7 flex flex-wrap gap-2">
          {TOOLS.map((t) => (
            <span key={t} className="tag !text-base !px-4 !py-2">{t}</span>
          ))}
        </div>
        <p className="mt-4 text-muted">Business websites and stores are usually built with Next.js, React and Tailwind CSS; stores run on Shopify; custom applications use Node.js or Laravel; mobile apps use Flutter.</p>
      </Section>

      {/* 10. Our Promise */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">Our Promise</h2>
        <p className="mt-2 max-w-3xl text-muted">What you can hold us to, in plain words — agreed before work starts, not claimed afterwards.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {PROMISES.map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-lg font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 11. Additional services */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Additional Development Services</h2>
        <p className="mt-2 max-w-3xl text-muted">For businesses with more advanced requirements — custom applications, AI features and mobile apps, quoted after discovery.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {specialized.map((s) => (
            <div key={s.slug} className="card">
              <h3 className="text-xl font-bold text-navy">{ADDITIONAL_LABELS[s.slug] || s.name}</h3>
              <p className="mt-1 text-slate-600">{s.short}</p>
              <p className="mt-3 font-bold text-navy">From {s.price}</p>
              <p className="mt-3"><Link href={`/services/${s.slug}/`}>Explore →</Link></p>
            </div>
          ))}
        </div>
      </Section>

      {/* 12. Pricing — Precon-style tier cards */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">Simple, Transparent Pricing</h2>
        <p className="mt-2 max-w-3xl text-muted">Starting prices help you plan your budget. The final price varies by project requirements and scope, and is agreed in writing before work begins.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {primary.map((s) => (
            <div key={s.slug} className="card relative">
              {s.slug === "shopify-development" && (
                <p className="absolute -top-3 right-4 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">Most Popular</p>
              )}
              <h3 className="text-xl font-bold text-navy">{s.name}</h3>
              <p className="mt-1 text-slate-600">{s.slug === "seo" ? "One-time audit and action plan." : `${s.priceNote}.`}</p>
              <p className="mt-3"><span className="text-3xl font-black text-navy">{s.price}</span> <span className="text-slate-600">starting price</span></p>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
                {(s.included || []).slice(0, 5).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4"><Link className="btn no-underline" href="/get-a-free-quote/">Get a Quote</Link></p>
            </div>
          ))}
          <div className="card">
            <h3 className="text-xl font-bold text-navy">Custom Web Applications</h3>
            <p className="mt-1 text-slate-600">Dashboards, AI features and mobile apps — quoted after discovery.</p>
            <p className="mt-3"><span className="text-3xl font-black text-navy">Request a Quote</span></p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-600">
              <li>Full-stack apps from $600+</li>
              <li>AI solutions from $700+</li>
              <li>Flutter apps from $800+</li>
              <li>Authentication, dashboards and APIs where required</li>
              <li>Testing, deployment and handover documentation</li>
            </ul>
            <p className="mt-4"><Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote</Link></p>
          </div>
        </div>
        <p className="mt-6 text-muted">SEO note: the $150 starting price is a one-time audit and action plan. Monthly SEO is a separate, recurring scope agreed in advance. Third-party costs (hosting, Shopify plans, paid apps/themes, AI API usage, store fees) are separate unless explicitly included in your quote.</p>
      </Section>

      {/* 13. What working together looks like (no testimonials — none exist yet) */}
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">What Working Together Looks Like</h2>
        <p className="mt-2 max-w-3xl text-muted">We do not publish testimonials until real clients agree to share them. Here is what you can expect from the process instead.</p>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {[
            ["Direct founder communication", "You discuss requirements, feedback and decisions directly with the founder — the person responsible for delivery."],
            ["Milestones you can follow", "Work is shared at agreed checkpoints, so you always know what is done and what comes next."],
            ["Transparent scope and pricing", "Deliverables, exclusions, timeline and price are written down before work starts. If something is not a good fit, we say so during discovery."],
          ].map(([t, d]) => (
            <div key={t} className="card"><h3 className="text-xl font-bold text-navy">{t}</h3><p className="mt-1 text-slate-600">{d}</p></div>
          ))}
        </div>
      </Section>

      {/* 14. FAQ */}
      <Section>
        <h2 className="text-3xl font-bold text-navy">Frequently Asked Questions</h2>
        <div className="mt-7"><Faqs items={homeFaqs} /></div>
      </Section>

      {/* 15. Final CTA */}
      <Section alt>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-navy">Ready to Build Something Great?</h2>
          <p className="mt-2 text-muted">Tell us about your project. Let&rsquo;s discuss how the right digital solution can help your business move forward.</p>
          <p className="mt-6"><Link className="btn no-underline" href="/get-a-free-quote/">Let&rsquo;s Discuss Your Project ↗</Link></p>
        </div>
      </Section>
    </>
  );
}
