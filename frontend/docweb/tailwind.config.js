/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: { 
          darkseagreen: { "100": "#aac184", "200": "rgba(170, 193, 132, 0.1)" }, 
          "greenPrimary": '#94A875',
          "greenSecondary": "#5B654B"
        }
      },
  },
  plugins: [],
}
