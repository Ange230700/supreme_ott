// tailwind.config.mjs

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/primereact/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;
