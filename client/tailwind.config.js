/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#6e00ff',
        customPurpleLight: '#E7E2FF',
      },
      backgroundImage: {
        'gradient-to-r-custom': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      gradientColorStops: theme => ({
        customPurple: '#6e00ff',
        customPurpleLight: '#a466ff',
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['focus'],
    },
  },
  plugins: [],
}