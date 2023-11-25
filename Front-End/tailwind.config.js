/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "desaturated-dark-cyan": "#5BA4A4",
        "light-grayish-cyan-bg": "#EFFAFA",
        "light-grayish-cyan-filter": "#EEF6F6",
        "very-light-grayish-cyan": "#B7C4C4",
        "dark-grayish-cyan": "#7B8E8E",
        "very-dark-grayish-cyan": "#2C3A3A",
      },
      fontFamily: {
        "league-spartan": ["'League-Spartan', sans-serif"],
      },
      screens: {
        xs: "440px",
      }
    },
  },
  plugins: [],
};

