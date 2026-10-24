# AH Digital Solutions — Next.js website

A Next.js (App Router, JavaScript) rebuild of the AH Digital Solutions agency
website, based on the static site in `../dist/` and its generator `../gen.py`.
Same brand, services, starting prices, case-study wording and honesty rules:
no testimonials, client numbers, ranking guarantees, or commissioned-client
claims. Portfolio projects are labelled **self-initiated / owned projects**,
and no unverified results are published. No business phone or address is
published; the contact email is ahmadraza3430178@gmail.com.

## Pages

- `/` home, `/services/`, and one page per service:
  `/business-website-development/`, `/shopify-development/`,
  `/seo-services/`, `/full-stack-development/`, `/ai-web-development/`,
  `/flutter-app-development/`
- `/portfolio/` and `/portfolio/bt-clothes/`,
  `/portfolio/civil-engineering-services/`, `/portfolio/bestlivingpicks/`
- `/about/`, `/insights/` and three articles, `/contact/`,
  `/get-a-quote/`, `/privacy-policy/`, `/terms/`
- `/admin/` — front-end admin panel (see below)
- `/sitemap.xml` is generated from `lib/content.js`; `public/robots.txt`
  points at the tentative base URL in `lib/content.js` (`site.baseUrl`).
  Update `site.baseUrl` to the real domain before launch.

All public content lives in one data file: `lib/content.js`
(services, projects, articles, home FAQs, process steps). Pages are
data-driven from it; service, portfolio and article detail pages use
dynamic routes with `generateStaticParams`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

Stack: Next.js 14 (App Router, JavaScript — no TypeScript), React 18,
Tailwind CSS 3 with the brand palette (Midnight Navy `#14243A`,
Digital Blue `#2563EB`, Soft White `#F8FAFC`, Light Slate `#E2E8F0`,
Inter/system font stack) in `tailwind.config.js` and `app/globals.css`.

## Quote / contact form

The form on `/contact/` and `/get-a-quote/` (fields: name, email, service,
budget, timeline, message) does **not** send to a server or database. On
submit it:

1. Saves the inquiry in the visitor's browser localStorage (key
   `ah_inquiries`), viewable in `/admin/` → Inquiries.
2. Shows a success message and a pre-filled `mailto:` link to
   ahmadraza3430178@gmail.com so the inquiry can actually be emailed.

A real server-side form (validation, spam protection, email delivery,
database) is a later step.

## Admin panel (`/admin/`)

Tabs: Overview (counts + SEO checklist), Services & Pricing (edit names
and starting prices, reset to defaults, Export JSON), Portfolio (list,
toggle featured, add a project locally), Insights (list, add a draft
locally), Inquiries (list/delete/clear browser-saved inquiries), Settings
(brand/tagline/email, browser-only).

**Browser-only limits — read before relying on it:**

- The admin page states this on the page itself: it is a **front-end
  panel with no server authentication**. Anyone who can open `/admin`
  can view and change these local values. There is no login, no roles,
  and no server persistence.
- Admin edits are stored only in that browser's localStorage. Public
  pages always read the defaults from `lib/content.js`, so admin edits
  do **not** change what visitors see until you export them, apply them
  to `lib/content.js`, rebuild, and redeploy.
- Local edits are lost if browser data is cleared and are not shared
  across devices. Do not store secrets or payment data here.
- A real multi-user admin panel needs server authentication plus a
  database, as a later step.

## Repo push — what to exclude

`.gitignore` already excludes `node_modules/`, `.next/`, and `.env*`.
Never commit those directories: they are large, machine-generated, and
rebuilt with `npm install` / `npm run build`. A repo push should contain
only source files (app/, components/, lib/, public/, config files,
README.md, .gitignore, package.json).

## Status

This build is **not deployed and not pushed** in the task that created it.
Deploy (e.g. Vercel/Netlify) and any GitHub push are separate, later steps
requiring the owner's approval and, for a `.com`, a domain/social/
trademark availability check first.
