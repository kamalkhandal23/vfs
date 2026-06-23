/** @type {import('tailwindcss').Config} */

export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  
    theme: {
      extend: {
  
        colors: {
  
          /* BRAND COLORS */
  
          primary: "#137DC5",
          primaryLight: "#00CFC8",
          primaryDark: "#0A2342",
  
          /* TEXT COLORS */
  
          textPrimary: "#0A2342",
          textSecondary: "#475E75",
          textWhite: "#FFFFFF",
  
          /* BACKGROUND COLORS */
  
          bgLight: "#F0FDFA",
          bgWhite: "#FFFFFF",

            /* Navbar */
            navBg: "#000000",
  
          /* CARD / SURFACE */
  
          cardBg: "#E6F7FF",
          testimonialBg: "#E6F7FF",
  
          /* NEUTRAL COLORS */
  
          neutralLight: "#F6F7FF",
          neutralSoft: "#E2E8F0",
  
          /* BORDER COLORS */
  
          borderLight: "#E6F7FF",
  
          /* ICON COLORS */
  
          iconPrimary: "#0A2342",
  
          /* FOOTER */
  
          footerBg: "#0A2342",
  
          /* SPECIAL COLORS */
  
          accent: "#00CFC8"
        },
  
        backgroundImage: {
  
          primaryGradient:
            "linear-gradient(90deg, #00CFC8 0%, #137DC5 100%)",
  
          footerGradient:
            "linear-gradient(180deg, #0A2342 0%, #082A3C 100%)",
  
        },
  
        boxShadow: {
          card: "0px 25px 54px rgba(0,0,0,0.08)",
        }
  
      },
    },
  
    plugins: [],
  }