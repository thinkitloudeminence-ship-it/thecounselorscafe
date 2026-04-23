/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        brand: {
          orange: "#F97316",
          "orange-dark": "#EA580C",
          "orange-light": "#FED7AA",
          black: "#0A0A0A",
          "black-soft": "#1A1A1A",
          white: "#FFFFFF",
          "white-soft": "#F8F8F8",
          gray: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-clash)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      backgroundImage: {
        "orange-gradient": "linear-gradient(135deg, #F97316 0%, #EA580C 100%)",
        "hero-gradient": "linear-gradient(135deg, #0A0A0A 0%, #1a0a00 50%, #0A0A0A 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(234,88,12,0.05) 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(249,115,22,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(249,115,22,0.6)" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      boxShadow: {
        "orange-sm": "0 4px 14px rgba(249,115,22,0.25)",
        "orange-md": "0 8px 30px rgba(249,115,22,0.35)",
        "orange-lg": "0 20px 60px rgba(249,115,22,0.4)",
        "glass": "0 8px 32px rgba(0,0,0,0.12), inset 0 0 0 1px rgba(255,255,255,0.1)",
        "card": "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
