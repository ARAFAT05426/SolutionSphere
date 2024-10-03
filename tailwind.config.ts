import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '360px',
        'sm': '480px',
        'md': '640px',
        'lg': '820px',
        'xl': '1080px',
        '2xl': '1280px',
        '3xl': '1440px',
        '4xl': '2160px',
      },
      container: {
        center: true,
      },
      colors: {
        primary: "#FB1919",
        secondary: "#14cf93",
      },
      fontFamily: {
        josefin: ['josefin Sans', 'sans-serif'],
        rancho: ['Rancho', 'cursive']
      },
    },
  },
  plugins: [],
};
export default config;
