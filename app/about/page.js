import Link from "next/link";
import { Hero, Section } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "About AH Digital Solutions — Founder-Led Web Development Agency",
  description: "AH Digital Solutions is a founder-led web development agency. Meet Ahmad Raza, full-stack web developer and BS Software Engineering student, and learn how projects are delivered under the founder's direct supervision.",
};

export default async function AboutPage() {
  const { processSteps, site } = await getContent();
  return (
    <>
      <Hero kicker="About" title="A Founder-Led Agency, Built for Growing Businesses" text="AH Digital Solutions helps small and growing businesses build professional websites, launch Shopify stores, and improve their organic search foundations, with custom software and AI development available for more advanced requirements." />
      <Section>
        <h2 className="text-3xl font-bold text-navy">About the agency</h2>
        <p className="mt-3 max-w-3xl">AH Digital Solutions is an independent digital services brand for small and growing businesses, working with international clients in the USA, UK, Canada, Australia and the UAE. The focus is practical delivery: clear scope, maintainable code and websites that businesses can actually use and grow.</p>
        <p className="mt-3 max-w-3xl">We do not present ourselves as a large team. The agency is founder-led: every project is planned, built and delivered under the founder&rsquo;s direct supervision, so the person you talk to is the person responsible for your project.</p>
      </Section>
      <Section alt>
        <h2 className="text-3xl font-bold text-navy">Meet the founder</h2>
        <div className="mt-6 grid items-start gap-8 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-xl border border-slate2">
            <img src="/founder-ahmad-raza.png" alt="Ahmad Raza, founder of AH Digital Solutions" className="w-full" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-navy">Ahmad Raza</h3>
            <p className="font-bold text-teal-700">Founder &amp; Full-Stack Web Developer</p>
            <p className="mt-3 max-w-3xl">Ahmad Raza is a full-stack web developer from Hafizabad, Pakistan, and a BS Software Engineering student at the University of Agriculture Faisalabad (2024–Present). He works hands-on across JavaScript, React, Next.js, Node.js, Laravel, PHP, Shopify, Flutter and SEO — building the websites, stores and web applications the agency delivers.</p>
            <p className="mt-3 max-w-3xl"><strong>Founder-led delivery means:</strong> your project is scoped, built and reviewed under the founder&rsquo;s direct supervision. You communicate directly with the project lead, progress is shared at agreed checkpoints, and decisions are made by the person doing the work.</p>
            <h4 className="mt-6 font-bold text-navy">Education</h4>
            <ul className="mt-2 list-disc space-y-1 pl-6">
              <li>BS Software Engineering — University of Agriculture Faisalabad (2024–Present)</li>
              <li>FSc Pre-Engineering — KIPS College, Hafizabad (2022–2024)</li>
              <li>Matriculation — Govt. Model Higher Secondary School (2022)</li>
            </ul>
            <h4 className="mt-6 font-bold text-navy">Skills</h4>
            <p className="mt-2">
              {["JavaScript", "React", "Next.js", "Node.js", "Laravel", "PHP", "Shopify", "Flutter", "SEO", "Tailwind CSS", "MySQL", "MongoDB"].map((t) => <span key={t} className="tag">{t}</span>)}
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <h2 className="text-3xl font-bold text-navy">How we work</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-5">
          {processSteps.map(([t, d]) => (
            <div key={t} className="border-t-[3px] border-brand pt-3"><strong className="text-navy">{t}</strong><p className="text-slate-600">{d}</p></div>
          ))}
        </div>
        <h2 className="mt-10 text-3xl font-bold text-navy">What we will not promise</h2>
        <p className="mt-3 max-w-3xl">We do not guarantee specific Google rankings, traffic or revenue. We do not claim client numbers, testimonials or results we cannot verify. If a project is not a good fit, we will say so during discovery rather than overpromising.</p>
        <p className="mt-6"><Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote ↗</Link></p>
        <p className="mt-4 text-muted">Contact: <a href={`mailto:${site.email}`}>{site.email}</a>. No business phone or address is published.</p>
      </Section>
    </>
  );
}
