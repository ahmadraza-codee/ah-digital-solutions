import Link from "next/link";
import { notFound } from "next/navigation";
import { Hero, Section } from "@/components/ui";
import { projects, getProject } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: `${p.name} — Case Study | AH Digital Solutions`, description: p.description };
}

export default function CaseStudyPage({ params }) {
  const p = getProject(params.slug);
  if (!p) notFound();
  return (
    <>
      <Hero kicker={p.category.toUpperCase()} title={p.name} text={p.description} />
      <Section>
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
          <strong>Project status:</strong> {p.status}. This case study describes what was built and how, without implying a commissioned client or publishing unverified results.
        </div>
        <h2 className="mt-8 text-3xl font-bold text-navy">Project overview</h2>
        <p className="mt-3"><strong>Objective:</strong> {p.objective}</p>
        <p className="mt-2"><strong>Intended audience:</strong> {p.audience}</p>
        <p className="mt-2"><strong>Our contribution:</strong> {p.contribution}</p>
        <h2 className="mt-8 text-3xl font-bold text-navy">Technology</h2>
        <p className="mt-3">{p.stack.map((t) => <span key={t} className="tag">{t}</span>)}</p>
        <h2 className="mt-8 text-3xl font-bold text-navy">Structure</h2>
        <p className="mt-3">{p.structure}</p>
        <div className="mt-8 rounded-xl bg-gradient-to-br from-navy to-brand p-7 text-white">
          <strong>Concept preview</strong>
          <div className="mt-3 h-3 rounded bg-white/25" />
          <div className="mt-2 h-3 w-3/5 rounded bg-white/25" />
          <div className="mt-2 h-3 rounded bg-white/25" />
          <p className="mt-3 text-sm text-blue-100">A layout concept for this project. Actual project screenshots will replace concept panels at launch, where available.</p>
        </div>
        <h2 className="mt-8 text-3xl font-bold text-navy">Results</h2>
        <p className="mt-3">No public traffic, sales or ranking figures are published for this project, because no verified measurements are available. Any future results will only be added with real data.</p>
        <p className="mt-6"><Link className="btn no-underline" href="/get-a-quote/">Discuss a Similar Project ↗</Link></p>
      </Section>
    </>
  );
}
