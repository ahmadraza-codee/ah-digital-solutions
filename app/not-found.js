import Link from "next/link";
import { Hero, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Hero kicker="404" title="Page Not Found" text="The page you are looking for does not exist or has moved." showWork={false} />
      <Section><Link className="btn no-underline" href="/">Back to Home</Link></Section>
    </>
  );
}
