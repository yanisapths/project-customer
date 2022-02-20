module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
    fontFamily: {
      'kod' : [' Kodchasan ','sans-serif'],
      'noto' : [' Noto Sans Thai ','sans-serif'],
      'chon' : ['Chonburi' ,'cursive'],
      'sans': ['sans-serif'],
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
