/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/main/resources/templates/**/*.{html,js}"],
  theme: {
    extend: {
        fontFamily: {
            'montserrat': ['Montserrat'],
        },
        colors: {
            'charcoal': '#434a55',
            'white-smoke': '#f5f5f5',
            'sea-green': '#00c6b9',
            'dark-sea-green': '#00b8ab',
            'table-title': '#676c75',
            'light-sea-green': '#00e0d1',
            'green': '#4ECA64',
            'red': '#ED2939',
        }
    },
  },
  plugins: [],
}