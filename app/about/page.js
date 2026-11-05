import Link from "next/link";
import { Hero, Section } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "About AH Digital Solutions",
  description: "AH Digital Solutions is an independent digital services brand for small and growing businesses, led by Ahmad Raza, a full-stack web developer.",
};

export default async function AboutPage() {
  const { processSteps, site } = await getContent();
  return (
    <>
      <Hero kicker="About" title="An Independent Digital Services Brand, Built for Growing Businesses" text="AH Digital Solutions helps small and growing businesses build professional websites, launch Shopify stores, and improve their organic search foundations, with custom software and AI development available for more advanced requirements." />
      <Section>
        <h2 className="text-3xl font-bold text-navy">Who is behind AH Digital Solutions?</h2>
        <p className="mt-3 max-w-3xl">AH Digital Solutions is led by Ahmad Raza, a full-stack web developer and BS Software Engineering student at the University of Agriculture Faisalabad, with hands-on experience in React, Next.js, Laravel, Node.js, Shopify, Flutter and SEO. The focus is practical delivery: clear scope, maintainable code and websites that businesses can actually use and grow.</p>
        <h2 className="mt-10 text-3xl font-bold text-navy">How we work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {processSteps.map(([t, d]) => (
            <div key={t} className="border-t-[3px] border-brand pt-3"><strong className="text-navy">{t}</strong><p className="text-slate-600">{d}</p></div>
          ))}
        </div>
        <h2 className="mt-10 text-3xl font-bold text-navy">What we will not promise</h2>
        <p className="mt-3 max-w-3xl">We do not guarantee specific Google rankings, traffic or revenue. We do not claim client numbers, testimonials or results we cannot verify. If a project is not a good fit, we will say so during discovery rather than overpromising.</p>
        <p className="mt-6"><Link className="btn no-underline" href="/get-a-quote/">Get a Free Quote ↗</Link></p>
        <p className="mt-4 text-muted">Contact: <a href={`mailto:${site.email}`}>{site.email}</a>. No business phone or address is published.</p>
      </Section>
    </>
  );
}
