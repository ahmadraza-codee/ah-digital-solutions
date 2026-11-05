import Link from "next/link";
import { Hero, Section } from "@/components/ui";
import { getContent } from "@/lib/content-server";

export const metadata = {
  title: "Our Services | AH Digital Solutions",
  description: "Business website development, Shopify eCommerce, SEO, full-stack development, AI web applications and Flutter apps — with starting prices and free quotes.",
};

export default async function ServicesPage() {
  const { services } = await getContent();
  return (
    <>
      <Hero kicker="Services" title="Digital Services for Growing Businesses" text="Six services, one clear focus: a professional website, a store that sells, and search foundations that help customers find you." />
      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.slug} className="card">
              <h3 className="text-xl font-bold text-navy">{s.name}</h3>
              <p className="mt-1 text-slate-600">{s.short}</p>
              <p className="mt-3 font-bold text-navy">From {s.price}</p>
              <p className="mt-2"><Link href={`/services/${s.slug}/`}>Explore →</Link></p>
            </div>
          ))}
        </div>
        <p className="mt-8"><Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote ↗</Link></p>
      </Section>
    </>
  );
}
