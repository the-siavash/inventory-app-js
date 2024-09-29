/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html'],
  theme: {
    fontFamily: {
      estedad: ['Estedad', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
