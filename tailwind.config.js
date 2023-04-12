/** @type {import('tailwindcss').Config} */
import {
  gray,
  blue,
  red,
  green,
  grayDark,
  blueDark,
  redDark,
  greenDark,
} from "@radix-ui/colors";

export default {
  darkMode: "class",

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...gray,
        ...blue,
        ...red,
        ...green,
        ...grayDark,
        ...blueDark,
        ...redDark,
        ...greenDark,
      },
    },
  },
  plugins: [],
};
