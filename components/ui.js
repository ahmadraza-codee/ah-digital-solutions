import Link from "next/link";

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({ items }) {
  const list = [{ name: "Home", href: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://ah-digital-solutions.vercel.app${item.href}`,
    })),
  };
  return (
    <>
      <JsonLd data={data} />
      <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-5 pt-5 text-sm text-muted">
        {list.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span aria-hidden="true"> / </span>}
            {i === list.length - 1 ? (
              <span className="text-navy">{item.name}</span>
            ) : (
              <Link href={item.href}>{item.name}</Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}

export function Hero({ kicker, title, text, showWork = true }) {
  return (
    <section className="bg-navy text-white py-16">
      <div className="mx-auto max-w-6xl px-5">
        {kicker && <p className="text-sm font-extrabold uppercase tracking-widest text-blue-300">{kicker}</p>}
        <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight tracking-tight md:text-5xl">{title}</h1>
        {text && <p className="mt-4 max-w-3xl text-lg text-slate-300">{text}</p>}
        <div className="mt-7 flex flex-wrap gap-3">
          <Link className="btn no-underline" href="/get-a-free-quote/">Get a Free Quote ↗</Link>
          {showWork && <Link className="btn-ghost no-underline" href="/portfolio/">Explore Our Work</Link>}
        </div>
      </div>
    </section>
  );
}

export function Section({ alt, children }) {
  return (
    <section className={alt ? "bg-soft py-14" : "py-14"}>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
    </section>
  );
}

export function Faqs({ items }) {
  return (
    <div className="space-y-3">
      {items.map(([q, a]) => (
        <details key={q} className="rounded-xl border border-slate2 bg-white p-4">
          <summary className="cursor-pointer font-bold text-navy">{q}</summary>
          <p className="mt-2 text-slate-600">{a}</p>
        </details>
      ))}
    </div>
  );
}
