/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            50: '#FDF8F3',
            100: '#F9EDE0',
            200: '#F3D9C1',
            300: '#E8BE96',
            400: '#D49F6A',
            500: '#C4854A',
            600: '#B0703A',
            700: '#8F5B2F',
            800: '#764B2C',
            900: '#614028',
            950: '#342014',
          },
          accent: {
            50: '#F0F4E8',
            100: '#DFE8D0',
            200: '#C4D4A8',
            300: '#A4BC7C',
            400: '#86A458',
            500: '#6A893F',
            600: '#556E31',
            700: '#435528',
            800: '#374524',
            900: '#2E3820',
            950: '#172010',
          },
          sand: {
            50: '#FAF9F7',
            100: '#F3F1ED',
            200: '#E8E4DC',
            300: '#D9D3C7',
            400: '#C4BAAC',
            500: '#A89E90',
            600: '#8C8278',
            700: '#736B62',
            800: '#5F584F',
            900: '#4F4942',
            950: '#2C2824',
          },
          gold: {
            50: '#FBF8EF',
            100: '#F5EDD6',
            200: '#EBDAAD',
            300: '#E0C47E',
            400: '#D4AC53',
            500: '#C99638',
            600: '#BB7B2D',
            700: '#9B6227',
            800: '#7E4F26',
            900: '#684224',
            950: '#3A2111',
          },
        },
        fontFamily: {
          display: ['"Noto Naskh Arabic"', 'serif'],
          body: ['"Noto Sans Arabic"', 'sans-serif'],
        },
        animation: {
          'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'slide-up': 'slideUp 0.5s ease-out',
          'fade-in': 'fadeIn 0.3s ease-out',
        },
        keyframes: {
          'pulse-soft': {
            '0%, 100%': { opacity: '1', transform: 'scale(1)' },
            '50%': { opacity: '0.8', transform: 'scale(1.05)' },
          },
          slideUp: {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  }