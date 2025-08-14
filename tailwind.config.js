/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff2e63',
        secondary: '#8f00ff',
        accent: '#00ffff',
        'text-primary': '#f8f8ff',
        'text-secondary': '#cbd5e1',
        'bg-primary': '#090c1c',
        'bg-secondary': '#0f0a28',
        'bg-card': '#1e293b',
      },
      fontFamily: {
        'big-shoulders': ['var(--font-big-shoulders)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ff2e63, #8f00ff)',
        'gradient-hero': 'linear-gradient(180deg, #ff2e63 0%, #8f00ff 100%)',
      },
      boxShadow: {
        'glow': '0 0 16px rgba(255, 0, 255, 0.5)',
        'hero': '4.714px 4.714px 78.567px 0px rgba(74, 0, 224, 0.57)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
