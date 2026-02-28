/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#1c1816',
        'bg-secondary': '#2a2422',
        'bg-dark': '#120f0e',
        'text-primary': '#ffffff',
        'text-inverse': '#1c1816',
        'accent-white': '#ffffff',
        'accent-blue': '#7bb5e3',
      },
      fontFamily: {
        'primary': ['Outfit', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      spacing: {
        'section-large': '8rem',
        'section-medium': '4rem',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
