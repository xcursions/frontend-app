/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      mdLg: "929px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1800px",
      "4xl": "2030px",
    },
    fontFamily: {
      dmSans: ["var(--font-dmSans)"],
      dmSansBold: ['"Dm-Sans-Bold", sans-serif'],
      dmSansBoldItalic: ['"Dm-Sans-Bold-Italic", sans-serif'],
      dmSansMedium: ['"Dm-Sans-Medium", sans-serif'],
      dmSansRegular: ['"Dm-Sans-Regular", sans-serif'],
      dmSansItalic: ['"Dm-Sans-Italic", sans-serif'],
      dmSansMediumItalic: ['"Dm-Sans-Medium-Italic", sans-serif'],
    },
    fontSize: {
      xxs: "0.65rem",
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "zoom-in-img": {
          from: { scale: "1" },
          to: { scale: "1.5" },
        },
        "reveal-top-nav": {
          from: { top: "-100%" },
          to: { top: "0" },
        },
        "banner-svg-scroll-down": {
          "0%, 100%, 20%": {
            transform: "translateY(3px)",
          },
          "50%": { transform: "translateY(0)" },
        },
        "fade-in-bottom-up": {
          "0%": { opacity: "0", visibility: "hidden" },
          "50%": {
            opacity: "0",
            transform: "translateY(75%)",
            visibility: "visible",
          },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-left-right": {
          "0%": { opacity: "0", visibility: "hidden" },
          "50%": {
            opacity: "0",
            transform: "translateX(-75%)",
            visibility: "visible",
          },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "fade-in-right-left": {
          "0%": { opacity: "0", visibility: "hidden" },
          "50%": {
            opacity: "0",
            transform: "translateX(75%)",
            visibility: "visible",
          },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "zoom-in-img": "zoom-in-img 15s ease-in",
        "reveal-top-nav": "reveal-top-nav 0.5s linear",
        "banner-svg-scroll-down": "banner-svg-scroll-down 2s infinite",
      },
      colors: {
        "myafro-black": "#313131",
        "afro-black-500": "#030303",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          main: "#FF7D8F",
          dark: "#bc5966",
          light: "#ffcbd2",
          bg: "#FFF1F4",
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "subscribe-image":
          "url('/assets/images/vendor/public-view/subscribe-image.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
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
