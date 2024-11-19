/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", // Memindai file HTML di root
    "./src/**/*.{js,jsx,ts,tsx}", // Memindai semua file React atau TypeScript dalam folder src
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0038B8", // Warna biru kustom
        secondary: "#FFD700", // Warna emas kustom
      },
    },
  },
  plugins: [],
};
