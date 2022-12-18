/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'bleuik': '#1F1F45',
        'bgik': '#BCE7F6',
        'mauveik': '#421A3A',
      },
    },
  },
  plugins: [],
}