/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonBlue: '#00f3ff',
        neonPurple: '#bc13fe',
        darkBg: '#0a0a0a',
        cardBg: '#1a1a1a',
        lightBg: '#f3f4f6',
        lightCardBg: '#ffffff',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
