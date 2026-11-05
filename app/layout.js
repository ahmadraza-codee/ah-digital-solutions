import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { JsonLd } from "@/components/ui";
import { site } from "@/lib/content";
import { getContent } from "@/lib/content-server";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "AH Digital Solutions — Smart Digital Solutions for Growing Businesses",
  description: site.description,
  metadataBase: new URL(site.baseUrl),
};

/*
 * Google Analytics 4 — NOT enabled yet.
 * When a GA4 measurement ID exists, set the NEXT_PUBLIC_GA_ID env var and
 * add the gtag script here (e.g. next/script with
 * https://www.googletagmanager.com/gtag/js?id=<id>). No analytics runs
 * until then, and no placeholder ID is shipped.
 */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AH Digital Solutions",
  url: site.baseUrl,
  slogan: site.tagline,
  description: site.description,
  email: site.email,
};

export default async function RootLayout({ children }) {
  const { site, services } = await getContent();
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd data={organizationSchema} />
        <Header services={services.map((s) => ({ slug: s.slug, name: s.name }))} />
        <main>{children}</main>
        <footer className="bg-navy py-11 text-slate-300">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 md:grid-cols-4">
            <div>
              <h4 className="font-bold text-white">AH Digital Solutions</h4>
              <p className="mt-2">{site.tagline}.<br />Web Development · eCommerce · SEO · AI</p>
              <p className="mt-3">Email: <a href={`mailto:${site.email}`} className="text-blue-300">{site.email}</a></p>
            </div>
            <div>
              <h4 className="font-bold text-white">Services</h4>
              <ul className="mt-2 space-y-1">
                {services.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="text-blue-300">{s.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Company</h4>
              <p><Link href="/portfolio/" className="text-blue-300">Portfolio</Link><br /><Link href="/about/" className="text-blue-300">About</Link><br /><Link href="/blog/" className="text-blue-300">Blog</Link><br /><Link href="/contact/" className="text-blue-300">Contact</Link><br /><Link href="/get-a-free-quote/" className="text-blue-300">Get a Free Quote</Link></p>
            </div>
            <div>
              <h4 className="font-bold text-white">Legal</h4>
              <p><Link href="/privacy-policy/" className="text-blue-300">Privacy Policy</Link><br /><Link href="/terms-and-conditions/" className="text-blue-300">Terms &amp; Conditions</Link><br /><Link href="/admin/" className="text-blue-300">Admin Panel</Link></p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-6xl px-5 text-sm text-slate-400">© 2026 AH Digital Solutions. No specific Google rankings or revenue results are guaranteed.</p>
        </footer>
      </body>
    </html>
  );
}
