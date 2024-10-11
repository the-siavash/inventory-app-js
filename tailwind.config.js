/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/js/*.js'],
  theme: {
    fontFamily: {
      estedad: ['Estedad', 'sans-serif'],
    },
    extend: {},
  },
  darkMode: 'selector',
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
