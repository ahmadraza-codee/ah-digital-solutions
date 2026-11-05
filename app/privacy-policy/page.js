import { Hero, Section } from "@/components/ui";
import { site } from "@/lib/content";

export const metadata = { title: "Privacy Policy | AH Digital Solutions", description: "How AH Digital Solutions handles information submitted through this website." };

export default function PrivacyPage() {
  return (
    <>
      <Hero kicker="Legal" title="Privacy Policy" text="This website is a static informational site. It does not require user accounts and does not sell personal information." showWork={false} />
      <Section>
        <div className="max-w-3xl space-y-6">
          <div><h2 className="text-2xl font-bold text-navy">Information you provide</h2><p className="mt-2">If you send an inquiry by email or through the quote form, we receive the details you choose to share, such as your name, email address and project description, solely to respond to your inquiry. Inquiries submitted through the quote form are saved in our database so they can be reviewed and answered; they are not sold or shared with third parties for marketing.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">Information we do not collect</h2><p className="mt-2">We do not collect payment details through this website, and we do not require account registration. Any future analytics, if added, will be described here before it is used for decisions about you.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">Third parties</h2><p className="mt-2">This site is hosted by a third-party hosting provider, which may log standard technical information such as IP addresses for security and delivery. Email inquiries are handled through your email provider and ours.</p></div>
          <div><h2 className="text-2xl font-bold text-navy">Contact</h2><p className="mt-2">For privacy questions, email <a href={`mailto:${site.email}`}>{site.email}</a>.</p></div>
        </div>
      </Section>
    </>
  );
}
