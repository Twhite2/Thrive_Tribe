/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate_blue: {
          DEFAULT: '#776BBF',
          100: '#151229',
          200: '#2b2353',
          300: '#40357c',
          400: '#5547a6',
          500: '#776bbf',
          600: '#9187cc',
          700: '#ada5d8',
          800: '#c8c3e5',
          900: '#e4e1f2'
        },
        african_violet: {
          DEFAULT: '#9C8CC0',
          100: '#1d182b',
          200: '#3b2f56',
          300: '#584780',
          400: '#7661a8',
          500: '#9c8cc0',
          600: '#afa3cc',
          700: '#c3bad9',
          800: '#d7d1e6',
          900: '#ebe8f2'
        },
        pale_purple: {
          DEFAULT: '#EBE0F5',
          100: '#301747',
          200: '#5f2e8e',
          300: '#8f52c7',
          400: '#bd99de',
          500: '#ebe0f5',
          600: '#efe6f7',
          700: '#f3edf9',
          800: '#f7f3fb',
          900: '#fbf9fd'
        },
        persian_pink: {
          DEFAULT: '#FC80B4',
          100: '#4b0220',
          200: '#950440',
          300: '#e00661',
          400: '#fa3889',
          500: '#fc80b4',
          600: '#fc9cc4',
          700: '#fdb4d3',
          800: '#fecde1',
          900: '#fee6f0'
        },
        amethyst: {
          DEFAULT: '#8872BE',
          100: '#1a132a',
          200: '#332754',
          300: '#4d3a7e',
          400: '#674da8',
          500: '#8872be',
          600: '#a08fcc',
          700: '#b8abd8',
          800: '#d0c7e5',
          900: '#e7e3f2'
        },
        // Keep backward compatibility with previous color naming
        primary: {
          light: '#9187cc', // slate_blue-600
          DEFAULT: '#776BBF', // slate_blue
          dark: '#40357c', // slate_blue-300
        },
        secondary: {
          light: '#fc9cc4', // persian_pink-600
          DEFAULT: '#FC80B4', // persian_pink
          dark: '#e00661', // persian_pink-300
        },
        accent: {
          light: '#a08fcc', // amethyst-600
          DEFAULT: '#8872BE', // amethyst
          dark: '#4d3a7e', // amethyst-300
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-merriweather)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-blend': 'linear-gradient(to right, #776BBF, #9C8CC0, #EBE0F5, #FC80B4, #8872BE)',
        'gradient-purple': 'linear-gradient(to right bottom, #776BBF, #9C8CC0, #8872BE)',
        'gradient-pink': 'linear-gradient(to right top, #8872BE, #9C8CC0, #FC80B4)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
