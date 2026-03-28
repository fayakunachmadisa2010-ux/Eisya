/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        sky: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          150: '#cceeff',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
        },
        blue: {
          50:  '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        blush: '#fbcfe8',
      },
      animation: {
        'float-up':    'floatUp 7s ease-in-out infinite',
        'glow-text':   'glowText 2.5s ease-in-out infinite',
        'photo-glow':  'photoGlow 3s ease-in-out infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'card-open':   'cardOpen 0.7s cubic-bezier(.34,1.56,.64,1) both',
        'slide-in':    'slideIn 0.7s cubic-bezier(.34,1.56,.64,1) both',
        'fade-in-up':  'fadeInUp 0.8s ease both',
        'confetti-fall':'confettiFall 5s linear infinite',
        'sparkle':     'sparkle 2s ease-in-out infinite',
        'bars':        'audioBars 0.6s ease-in-out infinite alternate',
      },
      keyframes: {
        floatUp: {
          '0%':   { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '10%':  { opacity: '0.7' },
          '90%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(-110vh) rotate(360deg)', opacity: '0' },
        },
        glowText: {
          '0%,100%': { textShadow: '0 0 10px rgba(59,130,246,0.2)' },
          '50%':     { textShadow: '0 0 30px rgba(59,130,246,0.7), 0 0 60px rgba(147,197,253,0.4)' },
        },
        photoGlow: {
          '0%,100%': { boxShadow: '0 0 0 4px #93c5fd, 0 0 20px #93c5fd40, 0 12px 40px rgba(59,130,246,0.2)' },
          '50%':     { boxShadow: '0 0 0 8px #bfdbfe, 0 0 48px #93c5fd80, 0 12px 40px rgba(59,130,246,0.3)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateY(60px) scale(0.85)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        cardOpen: {
          from: { opacity: '0', transform: 'scaleY(0.6) translateY(-20px)' },
          to:   { opacity: '1', transform: 'scaleY(1) translateY(0)' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-20px) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(110vh) rotate(720deg)', opacity: '0' },
        },
        sparkle: {
          '0%,100%': { transform: 'scale(0)', opacity: '0' },
          '50%':     { transform: 'scale(1)', opacity: '1' },
        },
        audioBars: {
          from: { height: '4px' },
          to:   { height: '18px' },
        },
      },
    },
  },
  plugins: [],
}
