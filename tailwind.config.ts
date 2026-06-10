import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF8F4",
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
          DEFAULT: "#1E1E1E",
          light: "#3D3D3D",
          muted: "#6B6B6B",
        },
        bone: "#F0EDE6",
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
