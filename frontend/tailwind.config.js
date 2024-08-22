/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./node_modules/flowbite/**/*.js",
    flowbite.content(),
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        shimmer: "shimmer 2s linear infinite",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
      colors: {
        gray: '#7d7b7b',
        grid: '#141414',
        gold:'#FFD700',
        turquoise:'#40E0D0',
        coral:'#FF7F50',
        silver: '#C0C0C0',
      },
      fontFamily: {
          montserrat: ['Montserrat', 'sans-serif'],
          poppins: ['Poppins', 'sans-serif'],
          'bebas-neue': ['Bebas Neue', 'sans-serif'],
        'playwrite-nz': ['Playwrite NZ', 'sans-serif'],
        'source-code-pro': ['Source Code Pro', 'monospace'],
      },
    },
  },
  plugins: [addVariablesForColors, flowbite.plugin(),  require('flowbite/plugin')], 
  
};


function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}


