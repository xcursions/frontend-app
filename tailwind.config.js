/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      '3xl': '1800px',
      '4xl': '2030px',
    },
    fontFamily: {
      dmSansBold: ['"Dm-Sans-Bold", sans-serif'],
      dmSansBoldItalic: ['"Dm-Sans-Bold-Italic", sans-serif'],
      dmSansMedium: ['"Dm-Sans-Medium", sans-serif'],
      dmSansRegular: ['"Dm-Sans-Regular", sans-serif'],
      dmSansItalic: ['"Dm-Sans-Italic", sans-serif'],
      dmSansMediumItalic: ['"Dm-Sans-Medium-Italic", sans-serif'],
    },
    fontSize: {
      xxs: '0.65rem',
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      colors: {
        'myafro-black': '#313131',
        'afro-black-500': '#030303',
        primary: {
          main: '#FF7D8F',
          dark: '#bc5966',
          light: '#ffcbd2',
          bg: '#FFF1F4',
        },
      },
      backgroundImage: {
        'subscribe-image':
          "url('/assets/images/vendor/public-view/subscribe-image.png')",
        'venues-pattern':
          "url('/assets/images/vendor/public-view/image-2.png')",
        'scribble-pattern':
          "url('/assets/images/vendor/public-view/image-1.png')",
        'subscribe-background':
          "url('/assets/images/vendor/public-view/SubscriptionBackground.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   darkMode: ['class'],
//   content: [
//     './pages/**/*.{ts,tsx}',
//     './components/**/*.{ts,tsx}',
//     './app/**/*.{ts,tsx}',
//     './src/**/*.{ts,tsx}',
//   ],
//   theme: {
//     container: {
//       center: true,
//       padding: '2rem',
//       screens: {
//         '2xl': '1400px',
//       },
//     },
//     extend: {
//       keyframes: {
//         'accordion-down': {
//           from: { height: 0 },
//           to: { height: 'var(--radix-accordion-content-height)' },
//         },
//         'accordion-up': {
//           from: { height: 'var(--radix-accordion-content-height)' },
//           to: { height: 0 },
//         },
//       },
//       animation: {
//         'accordion-down': 'accordion-down 0.2s ease-out',
//         'accordion-up': 'accordion-up 0.2s ease-out',
//       },
//     },
//   },
//   plugins: [require('tailwindcss-animate')],
// };
