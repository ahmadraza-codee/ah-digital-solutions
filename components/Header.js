"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header({ services }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const closeAll = () => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate2 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" onClick={closeAll} className="text-xl font-black text-navy no-underline">
          <span className="text-brand">AH</span> Digital Solutions
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-4 text-[15px] font-semibold md:flex">
          <Link href="/" className="text-navy no-underline">Home</Link>
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((v) => !v)}
              className="flex items-center gap-1 bg-transparent p-0 font-semibold text-navy"
            >
              Services <span aria-hidden="true" className="text-xs">{servicesOpen ? "▲" : "▼"}</span>
            </button>
            {servicesOpen && (
              <div className="absolute left-0 top-full w-72 pt-2">
                <div className="rounded-xl border border-slate2 bg-white p-2 shadow-lg">
                  <Link href="/services/" onClick={closeAll} className="block rounded-lg px-3 py-2 text-navy no-underline hover:bg-soft">All Services</Link>
                  {services.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}/`} onClick={closeAll} className="block rounded-lg px-3 py-2 text-navy no-underline hover:bg-soft">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/portfolio/" className="text-navy no-underline">Portfolio</Link>
          <Link href="/about/" className="text-navy no-underline">About</Link>
          <Link href="/blog/" className="text-navy no-underline">Blog</Link>
          <Link href="/contact/" className="text-navy no-underline">Contact</Link>
          <Link href="/get-a-free-quote/" className="btn no-underline !px-4 !py-2">Get a Free Quote</Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="rounded-lg border border-slate2 bg-white px-3 py-2 text-xl font-bold text-navy md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="border-t border-slate2 bg-white px-5 pb-5 pt-2 md:hidden">
          <Link href="/" onClick={closeAll} className="block py-2 font-semibold text-navy no-underline">Home</Link>
          <button
            type="button"
            aria-expanded={mobileServicesOpen}
            onClick={() => setMobileServicesOpen((v) => !v)}
            className="flex w-full items-center justify-between bg-transparent p-0 py-2 text-left font-semibold text-navy"
          >
            Services <span aria-hidden="true" className="text-xs">{mobileServicesOpen ? "▲" : "▼"}</span>
          </button>
          {mobileServicesOpen && (
            <div className="pl-4">
              <Link href="/services/" onClick={closeAll} className="block py-1.5 text-navy no-underline">All Services</Link>
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}/`} onClick={closeAll} className="block py-1.5 text-navy no-underline">
                  {s.name}
                </Link>
              ))}
            </div>
          )}
          <Link href="/portfolio/" onClick={closeAll} className="block py-2 font-semibold text-navy no-underline">Portfolio</Link>
          <Link href="/about/" onClick={closeAll} className="block py-2 font-semibold text-navy no-underline">About</Link>
          <Link href="/blog/" onClick={closeAll} className="block py-2 font-semibold text-navy no-underline">Blog</Link>
          <Link href="/contact/" onClick={closeAll} className="block py-2 font-semibold text-navy no-underline">Contact</Link>
          <p className="mt-3">
            <Link href="/get-a-free-quote/" onClick={closeAll} className="btn no-underline">Get a Free Quote</Link>
          </p>
        </nav>
      )}
    </header>
  );
}
