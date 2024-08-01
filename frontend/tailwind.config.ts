import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xxs: '0.625rem',
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
    },
    colors: {
      wish: '#FF96A3',
      kakao: '#FEE502',
      naver: '#04C759',
    },
    extend: {
      colors: {
        main: '#33C4A8',
        secondary: '#EAF9F6',
        unavailable: '#C1DBD7',
        gray: {
          '1': '#F5F5F5',
          '2': '#D9D9D9',
          '3': '#A9A9A9',
          '4': '#5A5A5A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
