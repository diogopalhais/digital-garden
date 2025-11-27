/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Base
        background: '#000000',
        card: '#0a0a0a',
        'card-hover': '#111111',
        border: '#262626',
        'border-hover': '#333333',
        
        // Accent colors from palette
        accent: '#80D580',           // Pastel Green - main accent
        'accent-hover': '#9DE09D',
        tomato: '#FF5F43',           // Tomato - warm red-orange
        orange: '#FFA54E',           // Yellow Orange
        mint: '#80D580',             // Pastel Green
        cream: '#F8EDD9',            // Mint Cream
        papaya: '#FFF1D4',           // Papaya Whip
        
        // Text
        'text-primary': '#F8EDD9',   // Mint Cream
        'text-secondary': '#c9c0b0',
        'text-muted': '#8a8279',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(128, 213, 128, 0.1)' },
          '100%': { boxShadow: '0 0 30px rgba(128, 213, 128, 0.2)' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#c9c0b0',
            '--tw-prose-headings': '#F8EDD9',
            '--tw-prose-lead': '#c9c0b0',
            '--tw-prose-links': '#80D580',
            '--tw-prose-bold': '#F8EDD9',
            '--tw-prose-counters': '#8a8279',
            '--tw-prose-bullets': '#8a8279',
            '--tw-prose-hr': '#262626',
            '--tw-prose-quotes': '#F8EDD9',
            '--tw-prose-quote-borders': '#80D580',
            '--tw-prose-captions': '#8a8279',
            '--tw-prose-code': '#F8EDD9',
            '--tw-prose-pre-code': '#c9c0b0',
            '--tw-prose-pre-bg': '#141414',
            '--tw-prose-th-borders': '#262626',
            '--tw-prose-td-borders': '#262626',
            'a': {
              textDecoration: 'none',
              borderBottom: '1px solid #80D580',
              transition: 'border-color 0.2s ease',
              '&:hover': {
                borderColor: '#9DE09D',
              },
            },
            'code': {
              backgroundColor: '#262626',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
