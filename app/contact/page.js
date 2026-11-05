import { Suspense } from "react";
import QuoteFormWithSearch from "./QuoteFormWithSearch";
import { Hero, Section } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "Contact AH Digital Solutions",
  description: "Contact AH Digital Solutions for a project inquiry, website quote, Shopify help or SEO audit.",
};

export default async function ContactPage() {
  const { site } = await getContent();
  return (
    <>
      <Hero kicker="Contact" title="Tell Us About Your Project" text="Share your goals, budget range and timeline. We will review your requirements and recommend a suitable next step." showWork={false} />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <Suspense><QuoteFormWithSearch /></Suspense>
          </div>
          <div>
            <div className="card">
              <h3 className="text-xl font-bold text-navy">Contact details</h3>
              <p className="mt-2">Email: <a href={`mailto:${site.email}`}>{site.email}</a></p>
              <p>Working with international clients in English.</p>
              <p className="text-muted">No business address or phone number is published here until a verified business contact is confirmed. Email is the primary contact channel for now.</p>
            </div>
            <div className="card mt-4">
              <h3 className="text-xl font-bold text-navy">What happens next?</h3>
              <p className="mt-2">1. You send an inquiry.<br />2. We review scope and ask any missing questions.<br />3. You receive a written proposal with deliverables, timeline and price.</p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
