/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      boxShadow: {
        'neumorph': '5px 5px 10px #d1d9e6, -5px -5px 10px #ffffff',
        'neumorphInset': 'inset 3px 3px 6px #d1d9e6, inset -3px -3px 6px #ffffff',
      },
      colors: {
              side: '#1c1c22',
              prim: 'rgb(10, 137, 153)',
              wh:'#f8f9fa',
              sec: '#6c757d',
              light: '#f8f9fa',
              dark: '#343a40',
              // New colors
              primary: {
                50: '#e6f7f9',
                100: '#cceff3',
                200: '#99dfe7',
                300: '#66cfdb',
                400: '#33bfcf',
                500: '#0ab0c3',
                600: '#088d9c',
                700: '#066a75',
                800: '#04474e',
                900: '#022327'
              },
              secondary: {
                50: '#f5f7f8',
                100: '#ebeff1',
                200: '#d7dfe3',
                300: '#c3cfd5',
                400: '#afbfc7',
                500: '#9bafb9',
                600: '#7c8c94',
                700: '#5d696f',
                800: '#3e464a',
                900: '#1f2325'
              }
            },
      fontFamily: {
        'sans': ['Roboto', 'Arial', 'sans-serif'],
        'serif': ['Georgia', 'Times New Roman', 'serif'],
        'mono': ['Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '3.25rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        '0': '0',
        '1': '0.25rem',
        '2': '0.5rem',
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
        '32': '8rem',
        '40': '10rem',
        '48': '12rem',
        '56': '14rem',
        '64': '16rem',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
       backgroundColor: {
        'calendar-header': '#f3f4f6',
        'calendar-today': '#e5e7eb',
      },
      borderColor: {
        'calendar-cell': '#e5e7eb',
      },
      textColor: {
        'calendar-text': '#374151',
      },
    },
  },
  plugins: [],
}
