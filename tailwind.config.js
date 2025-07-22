/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
				default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
			},
			colors: {
				green: '#73EA51',
				'hyper-blue': '#33B1DD',
				'hyper-dark-blue': '#0A548B',
				'light-gray': '#f2f3f5',
				'light-green': '#8FFF6F',
			},
			fontSize: {
				'2rem': '2rem',
			},
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#0DCAF0",
      slate: "#475569",
      gray: {
        100: "#f3f4f6",
        200: "#e5e7eb",
        300: "#d1d5db",
        400: "#9ca3af",
        500: "#6b7280",
        600: "#4b5563",
        700: "#374151",
        800: "#1f2937",
        900: "#111827",
      },
      red: {
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
      },
      white: "#FFFFFF",
      orange: colors.orange,
			warning: '#D1711C',
			zinc: colors.zinc,
			cyan: colors.cyan,
			black: colors.black,
			blue: colors.blue,
			'hyper-blue': '#33B1DD',
			'light-gray': '#f2f3f5',
			'light-green': '#8FFF6F',
    },
  },
  plugins: [],
};
