/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#f8f5f1',
          100: '#e8e0d8',
          200: '#d6c7b8',
          300: '#c4ad99',
          400: '#b2937a',
          500: '#a17a5c',
          600: '#8a6549',
          700: '#725037',
          800: '#5c3d2a',
          900: '#432b1d',
        },
        gray: {
          50: '#f9f9fa',
          100: '#f0f0f2',
          200: '#e4e5e7',
          300: '#d5d6da',
          400: '#b9bcc0',
          500: '#9ca0a6',
          600: '#7f838a',
          700: '#62656c',
          800: '#43454b',
          900: '#27282c',
          950: '#18191b',
        },
        cream: {
          50: '#fefefe',
          100: '#fcfbf9',
          200: '#f7f5ef',
          300: '#f1ede3',
          400: '#e6dfd1',
          500: '#dcd2be',
          600: '#c2b9a6',
          700: '#a89e8c',
          800: '#857c6c',
          900: '#5e5849',
        },
        overlay: 'rgba(27, 25, 24, 0.8)',
      },
      fontFamily: {
        sans: ['var(--font-source-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
} 