/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0eeff',
          100: '#e0dbff',
          200: '#c2b8ff',
          300: '#9e8cff',
          400: '#7c5cfc',
          500: '#5b4bff', // Primary Brand Purple
          600: '#4f3ef5',
          700: '#3e2cd4',
          800: '#3123ab',
          900: '#281d8a',
        },
        coral: {
          50: '#fff1f0',
          100: '#ffe1df',
          400: '#ff8a65',
          500: '#ff6b4a', // Accent Coral
          600: '#f05330',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          500: '#14b8a6', // Supporting Teal
          600: '#0d9488',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          bg: '#F7F8FC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(91, 75, 255, 0.06)',
        'soft-md': '0 4px 20px 0 rgba(91, 75, 255, 0.08)',
        'soft-lg': '0 10px 30px 0 rgba(91, 75, 255, 0.12)',
      },
    },
  },
  plugins: [],
};
