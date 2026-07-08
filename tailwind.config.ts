import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Static colors for specific use
        ivory: "#FAF7F0",
        bone: "#F0EDE5",
        bronze: {
          DEFAULT: "#C49A2E",
          50: "#FBF5E0",
          100: "#F5E8B3",
          200: "#EDD27B",
          300: "#E3BC44",
          400: "#C49A2E",
          500: "#A07D20",
          600: "#7D6118",
        },
        charcoal: {
          DEFAULT: "#242017",
          light: "#3D3B28",
          muted: "#6B6455",
        },
        // Theme-aware aliases (mapped to CSS vars)
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        "theme-primary": "var(--text-primary)",
        "theme-secondary": "var(--text-secondary)",
        "theme-border": "var(--border)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderWidth: {
        "0.5": "0.5px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-in-right": "slideInRight 0.35s ease-out",
        "marquee": "marquee 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      aspectRatio: {
        "4/5": "4 / 5",
      },
    },
  },
  plugins: [],
};
export default config;
