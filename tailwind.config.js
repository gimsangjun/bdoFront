/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      width: {
        1080: "1080px",
        800: "800px",
        536: "536px",
      },
    },
  },
  plugins: [],
};
