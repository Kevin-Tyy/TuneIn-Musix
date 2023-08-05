/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,tsx,jsx}"],
	theme: {
		extend: {
			colors: {
				"primary-100": "#8243B7",
				"primary-200": "#6C55C1",
				"primary-300": "#5B18A1",
				"primary-400": "#3A1F5A",
				"primary-500": "#340F5F",
				"primary-600": "#1B0B35",
				"primary-dark": "#05010d",
			},
		},
	},
	plugins: [],
};
