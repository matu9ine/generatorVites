/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0f1014',
        cardBg: '#1a1b23',
        inputBg: '#14151a',
        accent: '#2563eb',
      }
    },
  },
  plugins: [],
}
