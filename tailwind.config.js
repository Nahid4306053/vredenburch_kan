// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        clubRed: "rgb(0, 0, 139)", // Replace with the exact red color of your club
        clubBlue: "#F00303", // Replace with the exact blue color of your club
      },
    },
  },
  plugins: [],
};
