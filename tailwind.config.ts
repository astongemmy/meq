import type { Config } from 'tailwindcss';
import colors from './lib/colors';

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'rethink-sans': ['var(--font-rethink-sans)', 'Sans-serif'],
      },
      colors: {
        'dark-mode-quaternary': colors.dark.quaternary,
        'dark-mode-secondary': colors.dark.secondary,
        'dark-mode-septenary': colors.dark.septenary,
        'dark-mode-octonary': colors.dark.octonary,
        'dark-mode-tertiary': colors.dark.tertiary,
        'theme-secondary': colors.theme.secondary,
        'dark-mode-quinary': colors.dark.quinary,
        'dark-mode-primary': colors.dark.primary,
        'dark-mode-senary': colors.dark.senary,
        'theme-primary': colors.theme.primary
      },
      spacing: {
        '5.5': '1.3rem',
        '13': '3.2rem',
        '15': '3.3rem',
        '23': '4.7rem',
        '33': '7.3rem',
        '84': '23rem',
        '112': '26rem',
        '126': '28rem',
        '144': '32rem',
        '166': '38rem',
        '188': '44rem',
      },
      fontSize: {
        '7.5xl': '5.5rem'
      },
      scale: {
        '35': '.35',
        '45': '.45',
        '65': '.65'
      }
    },
  },
  plugins: [],
};

export default config;