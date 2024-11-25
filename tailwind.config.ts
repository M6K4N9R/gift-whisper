import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gelica: ["var(--font-gelica)"],
        'work-sans': ['var(--font-work-sans)', 'Helvetica', 'sans-serif'],
        'work-sans-italic': ['var(--font-work-sans-italic)', 'Helvetica', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "dark-accent": {
          100: "#E6E7E8",
          200: "#C0C3C6",
          300: "#9A9FA4",
          400: "#747B82",
          500: "#4E5760",
          600: "#3A424A",
          700: "#262D34",
          800: "#13181E",
          900: "#0D1821", // Original dark-accent color
        },
        primary: {
          100: "#E1F3FB",
          200: "#C3E7F7",
          300: "#A5DBF3",
          400: "#87CEEB", // Original primary color
          500: "#69B3D3",
          600: "#4B98BB",
          700: "#2D7DA3",
          800: "#0F628B",
          900: "#004773",
        },
        secondary: {
          100: "#F7F7FD",
          200: "#EEEEFA",
          300: "#E6E6FA", // Original secondary color
          400: "#D1D1F5",
          500: "#BCBCF0",
          600: "#A7A7EB",
          700: "#9292E6",
          800: "#7D7DE1",
          900: "#6868DC",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
