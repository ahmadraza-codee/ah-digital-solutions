/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1220",
        brand: "#2563EB",
        soft: "#F8FAFC",
        slate2: "#E2E8F0",
        muted: "#64748B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
