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
        primary: '#FF00FF',
        secondary: '#FAFF00',
        tertiary: '#00FFFF',
        'pop-black': '#000000',
        'pop-white': '#FFFFFF',
        'pop-bg': '#f9f9f9',
        'pop-surface': '#eeeeee',
        'pop-on-surface': '#1b1b1b',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        archivo: ['"Archivo Narrow"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      fontSize: {
        'headline-xl': ['84px', { lineHeight: '80px', letterSpacing: '-0.02em' }],
        'headline-lg': ['48px', { lineHeight: '48px', letterSpacing: '0.01em' }],
        'headline-lg-mobile': ['36px', { lineHeight: '36px' }],
        'body-md': ['18px', { lineHeight: '26px' }],
        'label-bold': ['14px', { lineHeight: '18px', letterSpacing: '0.05em' }],
      },
      boxShadow: {
        pop: '6px 6px 0px #000000',
        'pop-sm': '4px 4px 0px #000000',
        'pop-lg': '8px 8px 0px #000000',
        'pop-pink': '6px 6px 0px #FF00FF',
        'pop-yellow': '6px 6px 0px #FAFF00',
        'pop-cyan': '6px 6px 0px #00FFFF',
      },
      borderWidth: {
        3: '3px',
        4: '4px',
        6: '6px',
      },
      spacing: {
        18: '72px',
        22: '88px',
      },
    },
  },
  plugins: [],
}
