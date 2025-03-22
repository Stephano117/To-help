/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}" , "./screen/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
      colors: {
        twprimary: "#5B3E90",
        twsecondary: "#ffff",
        twtertiary: "#F0F3F3",
        text:"#2c3c49",
        success: "#2dd55b",
        warning: "#ffc409",
        danger: "#c5000f",
        light: "#f6f8fc",
        medium: "#5f5f5f",
        dark: "#2f2f2f",
        white: "#ffffff",
      },
    },
  },
  plugins: [],
}
