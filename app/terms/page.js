import { Hero, Section } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata = { title: "Terms | AH Digital Solutions", description: "Terms for using the AH Digital Solutions website and for project engagements." };

export default function TermsPage() {
  return (
    <>
      <Hero kicker="Legal" title="Terms" text="These terms cover use of this website. Individual projects are governed by a written proposal and scope agreed before work begins." showWork={false} />
      <Section>
        <div className="max-w-3xl space-y-6">
          <div><h2 className="text-2xl font-bold text-navy">Website use</h2><p className="mt-2">Content on this site is provided for information about our services. Starting prices are entry points for clearly limited scopes, not fixed prices for every project.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">Projects</h2><p className="mt-2">Each project requires a written scope covering deliverables, exclusions, timeline, revision rounds, payment milestones, ownership and support. Third-party costs — hosting, Shopify plans, paid apps or themes, AI API usage and store fees — are separate unless explicitly included.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">No guarantees</h2><p className="mt-2">We do not guarantee specific search rankings, traffic, sales or revenue. Results depend on market, offer, content, competition and many factors outside a website build alone.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">Contact</h2><p className="mt-2">Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div>
        </div>
      </Section>
    </>
  );
}
