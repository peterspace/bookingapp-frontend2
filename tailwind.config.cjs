/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
        // primary: '#130D1A',
        // secondary: '#DCA4FD',
        primaryText: '#FFFFFF',
        secondaryText: '#9D9DA3',
        infoText: '#B27CFF',

        primaryFill: 'rgba(19, 13, 26, 0.64)',
        secondaryFill: 'rgba(255, 255, 255, 0.08)',
        secondaryFillLight: 'rgba(255, 255, 255, 0.16)',
        secondaryFillDim: 'rgba(255, 255, 255, 0.64)',
        attentionFill: 'rgba(255, 178, 55, 0.12)',
        attentionText: '#FFB237',
        infoFill: 'rgba(255, 255, 255, 0.08)',

        warningFill: 'rgba(255, 92, 92, 0.16)',
        warningText: '#FF5C5C',
        hoverLight: 'rgba(255, 255, 255, 0.16)',
        buttonGradient:
          'radial-gradient(59.21% 78.44% at 50% 50%, #5A38A3 0%, #683FAB 31.77%, #9D52FF 68.23%, #EDBCFC 96.35%)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
// primary: '#F5385D',
