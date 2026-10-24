import Link from "next/link";
import "./globals.css";
import { site, services } from "@/lib/content";

export const metadata = {
  title: "AH Digital Solutions — Smart Digital Solutions for Growing Businesses",
  description: site.description,
  metadataBase: new URL(site.baseUrl),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-20 border-b border-slate2 bg-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-3.5">
            <Link href="/" className="text-xl font-black text-navy no-underline"><span className="text-brand">AH</span> Digital Solutions</Link>
            <nav className="flex flex-wrap items-center gap-4 text-[15px] font-semibold">
              <Link href="/services/" className="text-navy no-underline">Services</Link>
              <Link href="/portfolio/" className="text-navy no-underline">Portfolio</Link>
              <Link href="/about/" className="text-navy no-underline">About</Link>
              <Link href="/insights/" className="text-navy no-underline">Insights</Link>
              <Link href="/contact/" className="text-navy no-underline">Contact</Link>
              <Link href="/get-a-quote/" className="btn no-underline !py-2 !px-4">Get a Free Quote</Link>
            </nav>
          </div>
        </header>
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
                {services.map((s) => <li key={s.slug}><Link href={`/${s.slug}/`} className="text-blue-300">{s.name}</Link></li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Company</h4>
              <p><Link href="/portfolio/" className="text-blue-300">Portfolio</Link><br /><Link href="/about/" className="text-blue-300">About</Link><br /><Link href="/insights/" className="text-blue-300">Insights</Link><br /><Link href="/contact/" className="text-blue-300">Contact</Link><br /><Link href="/get-a-quote/" className="text-blue-300">Get a Free Quote</Link></p>
            </div>
            <div>
              <h4 className="font-bold text-white">Legal</h4>
              <p><Link href="/privacy-policy/" className="text-blue-300">Privacy Policy</Link><br /><Link href="/terms/" className="text-blue-300">Terms</Link><br /><Link href="/admin/" className="text-blue-300">Admin Panel</Link></p>
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-6xl px-5 text-sm text-slate-400">© 2026 AH Digital Solutions. No specific Google rankings or revenue results are guaranteed.</p>
        </footer>
      </body>
    </html>
  );
}
