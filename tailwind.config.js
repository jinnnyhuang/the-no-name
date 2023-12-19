/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        5.4: ["5.4rem", { lineHeight: "1" }],
      },
      fontFamily: {
        // 預設字體
        sans: ["Roboto, Noto Sans TC, sans-serif", ...defaultTheme.fontFamily.sans],
        noto: "Noto Sans TC, sans-serif",
        display: "Poppins, sans-serif", // Add a new `font-display` class
      },
      colors: {
        primary: "var(--color-primary)",
      },
      letterSpacing: {
        base: "0.0125em",
      },
      spacing: {
        0.8: "0.8rem",
        3.75: "0.9375rem",
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        7.5: "1.875rem",
        8.5: "2.125rem",
        9.5: "2.375rem",
        10.5: "2.625rem",
        19: "4.75rem",
        button: "11.5rem",
      },
      screens: {
        // ml: "820px",
        // xxl: "1366px",
        // "3xl": "1920px",
        "hover-none": { raw: "(hover: none)" }, // 不可使用 HOVER 的裝置
        "hover-hover": { raw: "(hover: hover)" }, // 可使用 HOVER 的裝置
      },
      animation: {
        fadeIn: "fadeIn 0.25s cubic-bezier(0.5, 1, 0.89, 1)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("tailwindcss/plugin")(({ addVariant }) => {
      addVariant("foo", "&:has(p)");
    }),
  ],
};
