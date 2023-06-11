/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],  
  theme: {
    extend: {
      colors: {
        bgColor: '#f1f5f9',
        primary: '#60a5fa',
        primaryHover: '#3b82f6',
        primaryBorder: '#d1d5db'
      },
    },
  },
  plugins: [],
}

