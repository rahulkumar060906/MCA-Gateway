/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        enter: {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        enter: 'enter 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};
