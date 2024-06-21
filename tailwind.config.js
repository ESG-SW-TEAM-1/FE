/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#101322",
        primary: {
          DEFAULT: "#163D68",
          light: "#4263EB",
        },
        textActive: "#d4d9e1",
        textInactive: "#586a85",
      },
    },
  },
  plugins: [],
};
