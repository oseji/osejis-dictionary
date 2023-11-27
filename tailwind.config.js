/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        halfScreen: "60dvh",
      },
      translate: {
        end: "200%",
      },
    },
  },
  plugins: [],
};
