// Single source of truth for the public site.
// Admin-panel edits are stored in the browser only (localStorage) and do NOT
// change this file or the public pages. To apply an admin edit permanently,
// export it from /admin and update this file, then rebuild/redeploy.
export const site = {
  brand: "AH Digital Solutions",
  tagline: "Smart Digital Solutions for Growing Businesses",
  email: "ahmadraza3430178@gmail.com",
  baseUrl: "https://ah-digital-solutions.vercel.app",
  description:
    "AH Digital Solutions builds professional business websites, Shopify stores and SEO-ready digital experiences for small and growing businesses, with full-stack, AI and Flutter development available.",
};

export const services = [
  {
    slug: "business-website-development",
    name: "Business Website Development",
    title: "Professional Business Website Development",
    price: "$250+",
    priceNote: "Small business website",
    short:
      "Create a professional online presence with responsive layouts, clear service pages, contact forms and SEO-friendly architecture.",
    hero: "Establish a professional online presence with a responsive website designed around your business goals. We create clear, user-friendly websites for service businesses, consultants, startups and growing companies.",
    problems: [
      "Your current website looks outdated, is hard to use on mobile, or does not explain your services clearly.",
      "Potential customers cannot easily find what you offer or how to contact you.",
      "Your website was built without a clear structure for search engines or for future updates.",
    ],
    included: [
      "Homepage, About, Services and Contact pages (up to 5 agreed pages at the starting price)",
      "Responsive layout for mobile, tablet and desktop",
      "Contact form and clear calls to action",
      "Basic on-page SEO setup: titles, descriptions and headings",
      "Performance and accessibility foundations",
      "Handover notes and agreed revisions",
    ],
    approach: [
      "Discovery: business goals, audience and required pages.",
      "Proposal and scope: deliverables, exclusions and timeline agreed in writing.",
      "Design and development: build, with progress shared at agreed checkpoints.",
      "Review and testing: responsive, form, speed and content checks.",
      "Launch and handover: deployment, access and support options explained.",
    ],
    portfolioSlug: "civil-engineering-services",
    faqs: [
      ["What information do you need to start?", "Your business details, services, any existing website or content, and examples you like. If you do not have written content yet, we will agree what is included and what needs to be supplied separately."],
      ["Can you redesign my existing website?", "Yes. A redesign starts with a review of your current pages, content and goals, then a scope for what will be kept, rewritten or rebuilt."],
      ["Will I own the website?", "Ownership of the website and source code is agreed in writing before the project starts, including any third-party themes, subscriptions or hosting costs that remain separate."],
    ],
  },
  {
    slug: "shopify-development",
    name: "Shopify eCommerce Development",
    title: "Shopify Store Development for Growing Brands",
    price: "$350+",
    priceNote: "Initial store setup or theme customization",
    short:
      "Launch or improve your online store with thoughtful storefront design, product organization, theme customization and shopping-focused user experiences.",
    hero: "Launch a new Shopify store or improve an existing one with thoughtful storefront design, clear product navigation and a shopping experience tailored to your brand and customers.",
    problems: [
      "You sell products but do not yet have a store that customers trust and can navigate easily.",
      "Your existing Shopify theme looks generic, loads slowly, or makes products hard to find.",
      "You need help setting up collections, navigation, product pages and essential store settings.",
    ],
    included: [
      "Initial store setup or theme customization",
      "Agreed page and product configuration",
      "Navigation and collection setup",
      "Essential storefront settings and responsive checks",
      "Basic SEO configuration for product and collection pages",
      "Launch checklist and handover",
    ],
    approach: [
      "Discovery: products, customers, brand and sales goals.",
      "Setup and design: theme, structure, collections and product presentation.",
      "Configuration: navigation, settings, apps and integrations agreed in scope.",
      "Testing: mobile shopping, checkout flow and page speed checks.",
      "Launch: go-live checklist, access handover and support options.",
    ],
    portfolioSlug: "bt-clothes",
    faqs: [
      ["Can you customize an existing Shopify theme?", "Yes, within what the theme and Shopify platform support. Custom work is scoped separately from standard theme settings."],
      ["Are Shopify fees included?", "No. Shopify subscriptions, paid apps, premium themes and payment-provider fees are separate and depend on your account and country."],
      ["Do you import large product catalogues?", "Large imports are scoped separately, because they depend on product data quality, images, variants and any required cleanup."],
    ],
  },
  {
    slug: "seo-services",
    name: "SEO Services",
    title: "Practical SEO Services for Business Websites",
    price: "$150+",
    priceNote: "One-time audit and action plan",
    short:
      "Improve technical foundations, page structure, metadata, internal linking and content relevance to help search engines understand your website.",
    hero: "Build a stronger search foundation with technical SEO, on-page optimization and content recommendations aligned with the way your potential customers search.",
    problems: [
      "Your website exists, but search engines do not clearly understand what each page is about.",
      "Pages load slowly, have duplicate or missing metadata, or are hard to crawl and index.",
      "You publish content, but it is not structured around the searches your customers actually make.",
    ],
    included: [
      "Defined technical review and indexability checks",
      "On-page SEO checks: titles, descriptions, headings and internal links",
      "Metadata and site-structure review",
      "Internal linking recommendations",
      "Keyword and search-intent mapping for agreed pages",
      "Prioritized action plan, with implementation scoped separately",
    ],
    approach: [
      "Audit: technical, on-page and indexability review.",
      "Priorities: fixes ranked by likely impact and effort.",
      "Implementation: agreed fixes, or a clear plan for your team to implement.",
      "Reporting: what was checked, changed and what remains, using Search Console where appropriate.",
      "Next steps: one-time work or a separately scoped monthly plan.",
    ],
    portfolioSlug: "bestlivingpicks",
    faqs: [
      ["Do you guarantee Google rankings?", "No. Rankings depend on competition, content, site history and many factors outside any single service. We focus on sound foundations, clear reporting and realistic expectations."],
      ["What is the difference between an audit and monthly SEO?", "An audit is a one-time review and prioritized action plan. Monthly SEO is a separate, recurring scope with agreed deliverables such as content, fixes and reporting."],
      ["Do you work on Shopify SEO too?", "Yes. Technical and on-page SEO checks can be applied to Shopify stores, within the platform's limits and your theme."],
    ],
  },
  {
    slug: "full-stack-development",
    name: "Full-Stack Development",
    title: "Custom Web Applications Built Around Your Workflow",
    price: "$600+",
    priceNote: "Clearly limited custom application",
    short:
      "Custom dashboards, admin panels, database-backed applications and APIs built with React/Next.js, Node.js, Laravel and suitable databases.",
    hero: "Turn your business requirements into practical web applications, dashboards, portals and API-connected systems built with a suitable frontend, backend and database architecture.",
    problems: [
      "Off-the-shelf tools do not match how your business actually works.",
      "You need a dashboard, portal or internal system with logins, roles and real data.",
      "Your current system is hard to maintain, extend or connect to other tools.",
    ],
    included: [
      "Custom dashboards and admin panels",
      "Authentication and role-based access, where required",
      "Database design and API development",
      "Frontend and backend integration",
      "Testing, deployment and handover documentation",
      "Agreed revisions and support options",
    ],
    approach: [
      "Discovery: workflow, users, data and integrations.",
      "Architecture: frontend, backend and database chosen for the scope.",
      "Build in milestones: working parts reviewed at agreed checkpoints.",
      "Testing: functionality, roles, data handling and responsive behaviour.",
      "Launch and handover: deployment, access and maintenance options.",
    ],
    portfolioSlug: "civil-engineering-services",
    faqs: [
      ["Which technologies do you use?", "React/Next.js for frontends and Node.js or Laravel for backends, with MySQL or MongoDB where suitable. The stack is chosen for the project, not forced onto it."],
      ["How is a custom app priced?", "From a starting price for a clearly limited scope. Larger systems are quoted after discovery, because features, roles, integrations and data requirements change the cost substantially."],
      ["Will I own the application and code?", "Ownership is agreed in writing before work begins, including third-party services, hosting and any ongoing costs."],
    ],
  },
  {
    slug: "ai-web-development",
    name: "AI Web Development",
    title: "AI-Powered Web Applications for Practical Business Use",
    price: "$700+",
    priceNote: "Focused AI feature, clearly scoped",
    short:
      "AI-assisted workflows, chatbot integrations and custom AI-powered tools, built around real business tasks — not as a generic enterprise platform claim.",
    hero: "Add useful AI capabilities to your website or web application, from conversational assistants and knowledge-based tools to API-connected workflows tailored to your requirements.",
    problems: [
      "Your team repeats the same support, search or content tasks every day.",
      "Customers cannot quickly find answers in your documents or website content.",
      "You want AI features, but need a clear, limited use case — not a vague platform promise.",
    ],
    included: [
      "AI-assisted workflows scoped to a specific task",
      "Chatbot and support-assistant integrations",
      "Document-based question-and-answer tools, where suitable",
      "AI API integrations with agreed data handling",
      "Human review steps where accuracy matters",
      "Testing, limits and handover documentation",
    ],
    approach: [
      "Use-case first: define the exact task AI should help with.",
      "Data and limits: agree what data is used, what is not, and what AI cannot guarantee.",
      "Build a focused demo or first version for review.",
      "Test with real examples, including cases where AI may be wrong.",
      "Launch with monitoring, human review and clear cost notes for third-party APIs.",
    ],
    portfolioSlug: "bestlivingpicks",
    faqs: [
      ["Do you build a complete enterprise AI platform?", "No. We build focused AI features for a defined task. A simple API integration is described as such, not marketed as a complete enterprise platform."],
      ["Who pays for AI API usage?", "Third-party API costs are separate from the development fee and depend on usage, model and provider. This is agreed before launch."],
      ["How do you handle data privacy?", "Data handling, retention and any third-party processing are discussed during discovery and recorded in the project scope before building."],
    ],
  },
  {
    slug: "flutter-app-development",
    name: "Flutter App Development",
    title: "Cross-Platform Mobile App Development with Flutter",
    price: "$800+",
    priceNote: "Clearly limited app scope",
    short:
      "Cross-platform mobile applications connected to suitable APIs and backend systems, with a consistent experience on iOS and Android.",
    hero: "Build a mobile application for your business with a consistent user experience, suitable backend integrations and a maintainable development approach.",
    problems: [
      "Your customers mainly use phones, but you have no app — or only a website that is hard to use on mobile.",
      "You need one codebase for iOS and Android instead of two separate native apps.",
      "Your app idea needs logins, data and API connections, not just static screens.",
    ],
    included: [
      "Cross-platform UI implementation with Flutter",
      "API integration and backend connections",
      "Authentication, where required",
      "Basic app architecture, testing and release preparation",
      "Agreed post-launch support options",
      "Handover notes for future updates",
    ],
    approach: [
      "Discovery: audience, platform needs, features and backend requirements.",
      "Design and build: screens, navigation and API connections.",
      "Testing: devices, screen sizes, logins and core flows.",
      "Release preparation: store listings and build files, as agreed.",
      "Launch support: fixes for agreed issues after release.",
    ],
    portfolioSlug: "bt-clothes",
    faqs: [
      ["Do you publish to the App Store and Google Play?", "Release preparation is included in scope. Store accounts, fees and publishing approvals remain subject to Apple and Google, and are the client's responsibility unless otherwise agreed."],
      ["Is Flutter right for every app?", "No. Flutter suits many business apps with shared UI and API backends. Highly platform-specific or performance-critical apps may need a different approach, which we will say honestly during discovery."],
      ["What does the starting price cover?", "A clearly limited app scope. Complex features, large integrations, design work and ongoing maintenance are quoted separately."],
    ],
  },
];

export const projects = [
  {
    slug: "bt-clothes",
    name: "BT Clothes",
    category: "eCommerce / Fashion",
    status: "Self-initiated / owned project",
    description: "A clothing-store project featuring fashion product presentation and an online shopping experience.",
    stack: ["Next.js", "Shopify", "Tailwind CSS"],
    objective: "Present a fashion store clearly, organize products for browsing, and support a straightforward shopping experience.",
    audience: "Online shoppers looking for clothing, and a store owner who needs a clear, maintainable storefront.",
    contribution: "Storefront structure, product presentation, collection and navigation planning, and shopping-focused layout.",
    structure: "Homepage with featured products, product pages, collections, navigation and mobile storefront layout.",
  },
  {
    slug: "civil-engineering-services",
    name: "Civil Engineering Services Website",
    category: "Business Website",
    status: "Self-initiated / owned project",
    description: "A service-focused website concept for steel detailing, quantity takeoff and cost estimation.",
    stack: ["Next.js", "Laravel", "MySQL"],
    objective: "Explain technical services clearly and give potential clients a simple path to enquire.",
    audience: "Construction and engineering clients who need detailing, takeoff or estimation services.",
    contribution: "Service hierarchy, inquiry path, page structure and responsive design.",
    structure: "Homepage, service pages for steel detailing, rebar detailing, quantity takeoff and cost estimation, and a contact/inquiry page.",
  },
  {
    slug: "bestlivingpicks",
    name: "BestLivingPicks",
    category: "Content / Affiliate Website",
    status: "Self-initiated / owned project",
    description: "A content-led website project focused on home products, organized editorial content and search-friendly architecture.",
    stack: ["Next.js", "Laravel", "SEO"],
    objective: "Organize product content and editorial picks so readers can browse by category and search engines can understand the structure.",
    audience: "Readers researching home products and deals, and a publisher who needs a maintainable content structure.",
    contribution: "Article templates, categories, content structure and technical SEO foundations.",
    structure: "Homepage, category pages, article templates, curated picks sections and internal linking between related articles.",
  },
];

export const articles = [
  {
    slug: "business-website-cost",
    title: "How Much Does a Business Website Cost?",
    summary: "What actually changes the price of a business website — pages, content, features and integrations — and how to budget for it.",
    relatedService: "business-website-development",
    relatedLabel: "Business Website Development",
    sections: [
      { heading: null, body: "Most business owners ask for a price before they ask for a website. The honest answer is that a website is not one product with one price. A five-page brochure site, a store with hundreds of products, and a custom booking system are different projects, even if they all look like “a website” on the surface." },
      { heading: "What changes the cost?", body: "Pages and content: more pages mean more design, writing, images and testing. If content is supplied and ready, the project is faster. If content must be written or restructured, that work needs to be scoped. Features: a contact form is simple. Booking, payments, memberships, multilingual content and custom integrations are not — each adds design, development and testing time. Design: a clean template-based layout costs less than a fully custom design. Both can look professional; the difference is how much is tailored to your brand. Third-party costs: domain, hosting, premium themes, plugins and apps are usually separate from the development fee. Ask for these to be listed clearly in any quote." },
      { heading: "A practical way to budget", body: "Start with the smallest website that does the job well: a clear homepage, services, about and contact, with a fast, mobile-friendly layout and basic SEO setup. At AH Digital Solutions, that kind of small business website starts at $250. Larger sites are quoted after discovery, when pages, features and content are known. Before you accept any quote, ask what is included, how many revision rounds are allowed, who owns the website and code, and what ongoing costs will remain. A clear scope protects both you and the developer." },
    ],
  },
  {
    slug: "shopify-store-setup",
    title: "Shopify Store Setup: What Does a Business Actually Need?",
    summary: "The essentials of a Shopify launch — theme, products, navigation, settings and checks — without unnecessary apps or complexity.",
    relatedService: "shopify-development",
    relatedLabel: "Shopify Development",
    sections: [
      { heading: null, body: "A Shopify store can be launched quickly, but a store that customers trust takes more than switching on a theme. The essentials are structure, clarity and testing — not dozens of paid apps." },
      { heading: "Start with the store, not the apps", body: "Choose or customize a theme that fits your brand, then set up the basics: homepage, product pages, collections, navigation, shipping and tax settings, and a working checkout. Each product needs a clear title, useful description, good images and a sensible price and variant structure." },
      { heading: "Make shopping easy", body: "Customers should be able to find a product in a few clicks, understand what it is, and check out without confusion. Test the store on a phone first — most shopping happens there. Check images, buttons, menus and the checkout flow before launch." },
      { heading: "What to avoid at launch", body: "Avoid installing many apps before you know what problem each one solves. Apps add cost, slow pages down and can conflict with each other. Start with the essentials, launch, then add features based on real customer behaviour. Shopify plans, payment-provider fees, premium themes and paid apps are separate from development costs and depend on your country and account. At AH Digital Solutions, Shopify store setup and theme customization start at $350, with larger stores quoted after discovery." },
    ],
  },
  {
    slug: "technical-seo-audit",
    title: "Technical SEO Audit: What to Check Before Investing in SEO",
    summary: "Before spending on SEO, check crawlability, indexability, metadata, speed and structure — the foundations rankings are built on.",
    relatedService: "seo-services",
    relatedLabel: "SEO Services",
    sections: [
      { heading: null, body: "Many businesses invest in SEO content before checking whether search engines can properly crawl, understand and index their website. A technical audit answers that question first, so later work is not wasted." },
      { heading: "What a useful audit checks", body: "Crawlability and indexability: can search engines reach your pages? Are important pages blocked, duplicated or missing from the sitemap? Are the right pages indexed, and the wrong ones excluded? Metadata and structure: does each important page have a unique, descriptive title and description? Is there one clear H1 per page? Do headings, internal links and page structure reflect what the page is about? Speed and mobile experience: slow pages and broken mobile layouts hurt both visitors and search performance. Images, scripts and layout shifts should be checked, not guessed at. Content and intent: does each page match a real search intent, or are several pages competing for the same topic? Keyword mapping helps avoid duplication and thin pages." },
      { heading: "What an audit is not", body: "An audit does not guarantee rankings. It produces a prioritized list of fixes and recommendations. Implementation, content and time are separate steps. At AH Digital Solutions, a one-time technical audit and action plan starts at $150, with implementation and monthly work scoped separately." },
    ],
  },
];

export const homeFaqs = [
  ["What information do you need to start a project?", "Your business details, goals, audience, existing website or content, and budget range. A short discovery call or written brief is enough to prepare a scoped proposal."],
  ["How much does a business website cost?", "Starting at $250 for a small, clearly scoped website. The final price depends on pages, content, features and integrations, agreed in writing before work begins."],
  ["Can you redesign my existing website?", "Yes. Redesigns start with a review of your current site, then a scope for what to keep, rewrite or rebuild."],
  ["Do you work with international clients?", "Yes. AH Digital Solutions works with international clients in English, with communication and delivery agreed in writing."],
  ["Can you customize an existing Shopify theme?", "Yes, within the theme and Shopify platform limits. Custom work is scoped separately from standard settings."],
  ["Do you offer ongoing SEO services?", "Yes, as a separately scoped monthly plan with agreed deliverables. One-time audits are also available."],
  ["Will I own the website and source code?", "Ownership is agreed in writing before the project starts, including third-party themes, subscriptions and hosting costs that remain separate."],
  ["Do you provide maintenance after launch?", "Yes, maintenance and support options are explained at handover and agreed separately from the build."],
];

export const processSteps = [
  ["01 Discovery", "Understand your business, audience, requirements and budget."],
  ["02 Proposal & Scope", "Agree on deliverables, exclusions, milestones and estimated timeline."],
  ["03 Design & Development", "Build the agreed solution and share progress at defined checkpoints."],
  ["04 Review & Testing", "Test responsive behavior, forms, integrations, performance and agreed functionality."],
  ["05 Launch & Handover", "Deploy, provide agreed access and documentation, and explain ongoing support options."],
];

export function getService(slug) { return services.find((s) => s.slug === slug); }
export function getProject(slug) { return projects.find((p) => p.slug === slug); }
export function getArticle(slug) { return articles.find((a) => a.slug === slug); }
