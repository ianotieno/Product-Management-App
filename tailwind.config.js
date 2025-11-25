/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f0ff',
          100: '#e0e0ff', 
          500: '#000080',
          600: '#000066',
          700: '#00004d',
          800: '#000033',
          900: '#00001a'
        }
      }
    },
  },
  plugins: [],
}