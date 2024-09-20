/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'pokemon-green': '#78c250',
        'pokemon-yellow': '#f2d642',
      },
      fontFamily: {
        'pixel': ['Pixelify', 'sans-serif'],
        'regular': ['Outfit', 'sans-serif']
      },
    },
  },
  plugins: [],
}

