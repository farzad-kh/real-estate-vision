/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: "90ch",
          },
        },
      }),
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    
          'custom-gradient': 'linear-gradient(to right, #1e66f0, #1974f0, #2781ee, #3b8dea, #5198e5)',
      },
colors:{
  bluePrimery:"#3479d9",
 grayTitle:"#3d669a",
},

      gridTemplateColumns: {
        autofit: "repeat(auto-fit,minmax(0,auto))",
        "autofit10": "repeat(auto-fit,minmax(114px,auto))"
        ,autofitbookmark:"repeat(auto-fit,minmax(266px,1fr))"
        ,"autofitbookmark1":"repeat(auto-fit,minmax(266px,741px))"
      },
      screens: {
        xs: '480px',  
        sm: '576px',  
        md: '786px',  
        lg: '992px',  
        xl: '1400px',  
  
        '2xl': '1536px',  
    
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.2s ease-out",
      },
    },
  
  },
  plugins: [require('@tailwindcss/typography'),],
};
