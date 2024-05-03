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
      colors: {
        mainBlue: "#5383E8",
        headerBlack: "#2F436E",
        lightBlue: "#B3CDFF",
      },
      borderRadius: {
        14: "14px",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [],
};
