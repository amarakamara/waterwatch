/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#074173",
        lblue: "#0D7BD9",
        dblue: "#070F2B",
      },
      fontFamily: {
        kufam: ["Kufam", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      borderWidth: {
        0.5: "0.5px",
        0.1: "0.01px",
      },
      screens: {
        xxs: "240px",
        xs: "340px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      lineHeight: {
        1: ".15rem",
      },
      fontSize: {
        "1xs": "0.6rem",
      },  
    },
  },
  plugins: [],
};
