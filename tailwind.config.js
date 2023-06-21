/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        bg: {
          400: "#0d0d0d",
          500: "#111111",
          600: "#1a1a1a",
          700: "#444444",
        },
      },
      width: {
        sidebar: "450px",
      },
      spacing: {
        header: "4rem",
      },
      animation: {
        fade: "fade 2s ease-in-out forwards",
        emojifloat: "emojifloat 2s linear forwards",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
          "30%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        emojifloat: {
          "0%": {
            opacity: "1",
            transform: "translate3d(0, 0, 0)",
          },
          "10%": {
            transform: "translate3d(-15%, -50%, 0)",
          },
          "20%": {
            transform: "translate3d(-30%, -100%, 0)",
          },
          "30%": {
            transform: "translate3d(0%, -150%, 0)",
          },
          "40%": {
            transform: "translate3d(30%, -200%, 0)",
          },
          "50%": {
            transform: "translate3d(5%, -250%, 0)",
          },
          "60%": {
            transform: "translate3d(-20%, -300%, 0)",
          },
          "70%": {
            transform: "translate3d(0%, -325%, 0)",
          },
          "80%": {
            transform: "translate3d(20%, -350%, 0)",
          },
          "90%": {
            opacity: "0.5",
            transform: "translate3d(10%, -370%, 0)",
          },
          "100%": {
            opacity: "0",
            transform: "translate3d(0%, -390%, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
