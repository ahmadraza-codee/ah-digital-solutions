import { Suspense } from "react";
import QuoteFormWithSearch from "../contact/QuoteFormWithSearch";
import { Hero, Section } from "@/components/ui";

export const metadata = {
  title: "Get a Free Quote | AH Digital Solutions",
  description: "Request a free, no-obligation quote for a business website, Shopify store, SEO audit, full-stack app, AI project or Flutter app.",
};

export default function GetAQuotePage() {
  return (
    <>
      <Hero kicker="Get a Free Quote" title="Get a Free Quote" text="No obligation. Tell us what you are building and we will reply with a scoped proposal, not a generic price list." showWork={false} />
      <Section>
        <div className="max-w-3xl">
          <Suspense><QuoteFormWithSearch /></Suspense>
        </div>
      </Section>
    </>
  );
}
