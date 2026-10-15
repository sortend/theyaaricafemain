module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          600: '#CFAE00',
          700: '#B39A00'
        },
        espresso: '#4B2E2E',
        cream: '#F5F0E6',
        charcoal: '#2D2D2D'
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
