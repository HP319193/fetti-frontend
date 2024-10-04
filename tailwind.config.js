/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem", // 10px
        xs: "0.75rem", // 12px
        sm: "0.82rem", // 13px
        base: '0.8rem',// 14px
        md: '1rem', // 16px
        lg: '1.125rem', // 18px
        xl: '1.5rem', // 24px,
        '2xl': '1.7rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        xxs: "0.15rem",
        xs: "0.25rem", // 4px
        sm: "0.5rem", // 8px
        md: "1rem", // 16px
        lg: "1.25rem", // 24px
        xl: "3rem", // 48px,
        xxl: "5rem",
        side: "16.25rem", // sideMenuWidth,
        '97': '25rem',
        '128': '32rem',
      },
      colors: {
        white: {
          DEFAULT: "#ffffff",
        },
        blue: {
          light: "#e7f6fc",
          lighter: "#3F4C55",
          DEFAULT: "#10AEE5",
          dark: "#000000",
          secondary: "#1B2559"
        },
        black: {
          light: "#0a3637",
          lighter: "#3F4C55",
          DEFAULT: "#000000",
          dark: "#000000",
          secondary: "#1B2559"
        },
        gray: {
          lightest: "#F2F6F7",
          lighter: "#9b9ca5",
          light: "#aaadb9",
          DEFAULT: "#7a7984",
          dark: "#1B2559",
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
