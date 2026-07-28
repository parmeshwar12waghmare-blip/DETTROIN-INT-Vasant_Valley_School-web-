/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#F04424',
        secondary: '#1F1F1F',
        background: '#FBF8F6',
        surface: '#FFFFFF',
        border: '#ECECEC',
        heading: '#111111',
        body: '#555555',
        muted: '#777777',
        accentGlow: '#FFD47D',
        // map CSS variable names for convenience if needed
      },
      borderRadius: {
        DEFAULT: '12px',
        md: '12px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 2px 8px rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
