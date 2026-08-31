import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090D16",
        surface: {
          DEFAULT: "#111726",
          light: "#182136",
          card: "#131C2E",
          border: "#202E4A",
          hover: "#1D2A44",
        },
        combat: {
          red: {
            DEFAULT: "#E11D48",
            hover: "#F43F5E",
            dark: "#BE123C",
            glow: "rgba(225, 29, 72, 0.35)",
          },
          gold: {
            DEFAULT: "#F59E0B",
            light: "#FCD34D",
            dark: "#D97706",
            glow: "rgba(245, 158, 11, 0.3)",
          },
          slate: {
            50: "#F8FAFC",
            100: "#F1F5F9",
            200: "#E2E8F0",
            300: "#CBD5E1",
            400: "#94A3B8",
            500: "#64748B",
            600: "#475569",
            700: "#334155",
            800: "#1E293B",
            900: "#0F172A",
            950: "#080C16",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "combat-hero": "linear-gradient(to bottom, rgba(9, 13, 22, 0.82) 0%, rgba(9, 13, 22, 0.95) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
