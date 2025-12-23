/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./program_detail_template/**/*.{js,ts,jsx,tsx}",
    "./**/*.{js,ts,jsx,tsx}",
    "!./node_modules/**/*",
    "!./.next/**/*",
    "!./out/**/*",
    "!./dist/**/*",
    "!./coverage/**/*",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9f506",
        "background-light": "#f8f8f5",
        "background-dark": "#23220f",
        "surface-light": "#ffffff",
        "surface-dark": "#2c2b18",
        "text-main": "#181811",
        "text-muted": "#6b6b60",
        "text-main-light": "#181811",
        "text-main-dark": "#ffffff",
        "text-sec-light": "#8c8b5f",
        "text-sec-dark": "#a8a89a",
        "border-light": "#e5e5e0",
        "border-dark": "#3a3928",
      },
      fontFamily: {
        display: ["Spline Sans", "sans-serif"],
        sans: ["Spline Sans", "sans-serif"],
        body: ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "1.5rem",
        xl: "2rem",
        "2xl": "3rem",
        full: "9999px",
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
