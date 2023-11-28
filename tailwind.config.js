/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        halfScreen: "60dvh",
      },
      minHeight: { deviceScreen: "100dvh" },
      translate: {
        end: "200%",
      },
      fontFamily: {
        poppins: ["Poppins", "sans - serif"],
        raleway: ["Raleway", "sans - serif"],
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto Slab", "serif"],
      },
    },
  },
  plugins: [],
};
