/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // This is the key setting for dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // If you use src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
