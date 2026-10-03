/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F19',
        panel: '#151B28',
        accent: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 18px 60px rgba(37, 99, 235, 0.16)',
      },
    },
  },
  plugins: [],
};
