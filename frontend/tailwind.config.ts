import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#2b2a2a',
        foreground: '#e5e5c4',
        inputBg: '#3b3a39',
        buttonBg: '#f4a261',
        buttonHover: '#e99650',
      },
    },
  },
  plugins: [],
} satisfies Config; 
