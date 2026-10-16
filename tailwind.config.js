/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1a6b3c",
          dark: "#145530",
          light: "#e8f5ee",
          muted: "#c6dfd0",
        },
      },
    },
  },
  plugins: [],
};
