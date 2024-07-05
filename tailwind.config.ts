import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      neutral: {
        950: '#0a0a0a',
        800: '#262626',
        600: '#525252',
        400: '#a3a3a3',
        200: '#e5e5e5',
        50: '#fafafa',
      },
      primary: {
        100: '#e9f6fd',
        200: '#bce3fa',
        300: '#8fcff7',
        400: '#62bcf4',
        500: '#177fac',
        600: '#146690',
        700: '#114d74',
        800: '#0d3458',
        900: '#0a1b3c',
      },
      second: {
        400: '#ffd300',
        200: '#fff7d1',
      },
    },
  },
  plugins: [],
};
export default config;
