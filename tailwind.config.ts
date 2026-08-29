import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        script: ["var(--font-script)", "Great Vibes", "cursive"],
      },
      colors: {
        cream: {
          50: "#FAF7F2",
          100: "#F5F1EA",
          200: "#EFECE6",
          300: "#E8E3DA",
        },
      },
    },
  },
  plugins: [],
};
export default config;
