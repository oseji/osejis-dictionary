/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      height: {
        100: "400px",
        150: "500px",
        200: "600px",
      },
      colors: {
        textPurple: "#C543EA ",
        textPurpleLighter: "#F7E4FC ",
      },
      fontFamily: {
        Raleway: ["Raleway", "serif"],
        Nunito: ["Nunito Sans", "sans-serif"],
        Slab: ["Roboto Slab", "sans-serif"],
        Mono: ["Roboto Mono", "sans-serif"],
        Playfair: ["Playfair Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
