const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      ...defaultTheme.screens,
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      teal: colors.teal,
      indigo: colors.indigo,
      yellow: colors.yellow,
      olive: {
        primary: '#7BC6B7',
        secondary: '#ACDED5'
     },
    },
    extend: {
      boxShadow: {
        '3xl': '-5px 5px 35px 25px',
      }
    },
    fontFamily: {
      noto : " 'Noto Sans Thai', sans-serif ",
      'display': ['Oswald',],
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(10px)',
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),
  require('tailwindcss-filters'),
], 
}

