/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#E96479",
        primaryOpc1: "rgba(0,201,183,0.1)",
        textWhite: "##F5E9CF",
        textWhiter:'#c2f0e8',
        hightLightPink: "#E999DB",
        backGround: "#020c1b",
        bgLighter:'#072758',
        bgOverlay:"#fbfbfb"
      },
      screens: {
        xs: "480px",
        ss: "620px",
        sm: "768px",
        md: "1060px",
        lg: "1200px",
        xl: "1700px",
      },
    },
  },
  plugins: [],
};
