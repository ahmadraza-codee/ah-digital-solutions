import Link from "next/link";
import { Hero, Section } from "@/components/ui";

export const metadata = {
  title: "Thank You | AH Digital Solutions",
  description: "Your inquiry was received. AH Digital Solutions will review your requirements and reply by email.",
};

export default function ThankYouPage() {
  return (
    <>
      <Hero kicker="Thank You" title="Thank You — Your Inquiry Was Received" text="We will review your requirements and reply by email. If you do not hear back within a few working days, please email us directly." showWork={false} />
      <Section>
        <p className="mt-2 max-w-3xl text-muted">While you wait, you can explore our services and recent work — or send another inquiry if you have a second project in mind.</p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link className="btn no-underline" href="/">Back to Home</Link>
          <Link className="btn-ghost no-underline" href="/portfolio/">View Our Work</Link>
        </p>
      </Section>
    </>
  );
}
