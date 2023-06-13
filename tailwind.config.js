/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        LightBlue : '#27374D',
        DarkBlue : '#182D4A'
      },
      fontFamily:{
        poppins : ['Poppins']
      }
    },
  },
  plugins: [],
};
