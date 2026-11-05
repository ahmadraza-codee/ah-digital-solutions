/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // Service pages moved from root-level slugs to /services/[slug]/
      { source: "/business-website-development", destination: "/services/business-website-development/", permanent: true },
      { source: "/shopify-development", destination: "/services/shopify-development/", permanent: true },
      { source: "/seo-services", destination: "/services/seo/", permanent: true },
      { source: "/services/seo-services", destination: "/services/seo/", permanent: true },
      { source: "/full-stack-development", destination: "/services/full-stack-development/", permanent: true },
      { source: "/ai-web-development", destination: "/services/ai-web-development/", permanent: true },
      { source: "/flutter-app-development", destination: "/services/mobile-app-development/", permanent: true },
      { source: "/services/flutter-app-development", destination: "/services/mobile-app-development/", permanent: true },
      // Quote page renamed
      { source: "/get-a-quote", destination: "/get-a-free-quote/", permanent: true },
      // Insights renamed to Blog
      { source: "/insights", destination: "/blog/", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug/", permanent: true },
      // Terms renamed
      { source: "/terms", destination: "/terms-and-conditions/", permanent: true },
    ];
  },
};
module.exports = nextConfig;
