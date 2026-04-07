/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Playfair Display', 'Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'heading': 'clamp(28px, 3.5vw, 52px)',
        'stat-number': 'clamp(28px, 3vw, 44px)',
        'risk': 'clamp(42px, 8vw, 110px)',
      },
     
      animation: {
        'pulse-ring': 'pr 1.6s ease-out infinite',
        'pulse-dot': 'pd 1.6s ease-in-out infinite',
      },
      keyframes: {
        pr: {
          '0%': { transform: 'scale(1)', opacity: '0.8' },
          '70%': { transform: 'scale(2.5)', opacity: '0' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
        pd: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
        },
      },
    },
  },
  plugins: [],
}