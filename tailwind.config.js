/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Noto Sans SC', 'sans-serif'],
        display: ['Sora', 'Noto Sans SC', 'sans-serif'],
      },
      colors: {
        surface: {
          900: '#05070A',
          800: '#080B10',
          700: '#0B0F14',
        },
        ink: {
          50: '#F5F7FA',
          300: '#9AA4B2',
          400: '#8B95A7',
        },
        accent: {
          400: '#6FA5FF',
          500: '#5B84FF',
          600: '#4E6CF7',
          700: '#5DD0FF',
        },
      },
      boxShadow: {
        soft: '0 22px 60px rgba(2, 6, 16, 0.42)',
        glass:
          '0 8px 30px rgba(2, 6, 16, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.18), inset 0 -1px 0 rgba(255, 255, 255, 0.04)',
      },
    },
  },
  plugins: [],
}
