import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色：低饱和绿色系（sage 薄荷绿）
        sage: {
          50: "#F4F8F5",
          100: "#E8F1EA",
          200: "#D1E3D6",
          300: "#A9CBB2",
          400: "#7DAB89",
          500: "#5A8C68",
          600: "#467554",
          700: "#396046",
          800: "#2F4D3A",
          900: "#284031",
        },
        // 米白背景
        cream: "#FAF8F3",
        // 辅助强调色
        accent: {
          amber: "#E8B86D",
          rose: "#D98B8B",
          sky: "#7DA9C4",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 2px 12px rgba(70, 117, 84, 0.08)",
        card: "0 4px 16px rgba(70, 117, 84, 0.06)",
        float: "0 8px 24px rgba(70, 117, 84, 0.12)",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "pop": "pop 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
