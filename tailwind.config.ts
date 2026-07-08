import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        base: "#0A0E14",
        surface: "#0F1521",
        "surface-2": "#141B2B",
        border: "#212B3D",
        muted: "#8B95A7",
        ink: "#E7EBF3",
        cyan: {
          DEFAULT: "#22D3EE",
          dim: "#0E7490"
        },
        amber: {
          DEFAULT: "#F5A524",
          dim: "#92620F"
        }
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      backgroundImage: {
        grid:
          "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)"
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        blink: "blink 1s step-end infinite",
        scan: "scan 4s linear infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" }
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
