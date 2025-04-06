/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      dropShadow: {
        'xl-180': [
          '0 -3px 7px rgb(0 0 0 / 0.1)',
        ],
      },
      fontFamily: {
        "mont": ['Mont-Heavy', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

