export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        noir: '#0C0A0A',
        brand: {
          50: '#FBF3F1',
          100: '#F6E4DF',
          200: '#EDC9BE',
          300: '#E0A795',
          400: '#D08472',
          500: '#B86A59',
          600: '#9D5445',
          700: '#7D4237',
          800: '#5E322A',
          900: '#3F221D',
          950: '#241310',
        },
        ink: '#171314',
        'ink-soft': '#6B5F5C',
        cream: '#FAF6F2',
        blush: '#F6EAE6',
        leaf: {
          50: '#F4F8F3',
          100: '#E6EFE4',
          500: '#6C8F6E',
          600: '#557555',
          700: '#415C42',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'Georgia', 'serif'],
        body: ['"Karla"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 6px 24px -8px rgba(157, 84, 69, 0.18)',
        card: '0 2px 12px -2px rgba(20, 20, 20, 0.08)',
      },
      borderRadius: {
        blob: '0.25rem',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: '0', transform: 'translateY(12px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'slide-in-right': { '0%': { transform: 'translateX(100%)' }, '100%': { transform: 'translateX(0)' } },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
      },
    },
  },
  plugins: [],
};