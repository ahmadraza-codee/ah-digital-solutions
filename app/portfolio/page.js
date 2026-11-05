import Link from "next/link";
import { Hero, Section } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "Portfolio | AH Digital Solutions",
  description: "Selected projects from AH Digital Solutions: BT Clothes, Civil Engineering Services Website, BestLivingPicks, Precon Detailing, ToolKit and Team Task Manager — self-initiated projects described accurately.",
};

export default async function PortfolioPage() {
  const { projects } = await getContent();
  return (
    <>
      <Hero kicker="Portfolio" title="Selected Projects & Digital Experiences" text="Work that demonstrates our approach to website development, eCommerce, and content-focused digital experiences." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((p) => (
            <div key={p.slug} className="card">
              <h3 className="text-xl font-bold text-navy">{p.name}</h3>
              <p className="font-bold text-teal-700">{p.category}</p>
              <p className="mt-1 text-slate-600">{p.description}</p>
              <p><span className="tag">{p.status}</span></p>
              <p className="mt-3"><Link href={`/portfolio/${p.slug}/`}>View Case Study →</Link></p>
            </div>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-900">
          <strong>About project status:</strong> These are self-initiated / owned projects. They are shown to demonstrate skills, structure and approach — not presented as commissioned client work, and no unverified client results are claimed.
        </div>
      </Section>
    </>
  );
}
