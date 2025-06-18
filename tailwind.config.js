// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",],

//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'line-slide': {
          '0%': { width: '0px' },
          '100%': {},
        },
        'pen-slide': {
          '0%': { transform: 'translateX(50px) rotate(45deg)', opacity: 0 },
          '100%': { transform: 'translateX(0) rotate(45deg)', opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'fade-up': 'fade-up 0.6s ease-out forwards 0.4s',
        'line-slide': 'line-slide 0.5s ease-out forwards',
        'pen-slide': 'pen-slide 0.5s ease-out forwards 0.6s',
      },
    },
  },
  plugins: [],
};

