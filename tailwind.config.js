module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '-5px 5px 35px 25px',
      }
    },
    fontFamily: {
      roboto : "'Roboto', sans-serif",
      mitr : "'Mitr', sans-serif",
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
