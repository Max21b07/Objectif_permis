import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#fff8ec",
        ink: "#20251f",
        moss: "#496b52",
        mint: "#d9ead8",
        clay: "#cf7d57",
        skysoft: "#dfeef5",
        lemon: "#f7df8b",
        rosewash: "#f6ded8",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        body: ["Nunito", "Verdana", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 55px rgba(47, 70, 54, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
