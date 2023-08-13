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
			animation: {
				slideup: 'slideup 0.4as ease-in-out',
				slidedown: 'slidedown 1s ease-in-out',
				slideleft: 'slideleft 1s ease-in-out',
				slideright: 'slideright 1s ease-in-out',
				wave: 'wave 1.2s linear infinite',
				slowfade: 'slowfade 2.2s ease-in-out',
			  },
			  keyframes: {
				slowfade: {
				  from: { opacity: 0 },
				  to: { opacity: 1 },
				},
				slideup: {
				  from: { opacity: 0, transform: 'translateY(20%)' },
				  to: { opacity: 1, transform: 'none' },
				},
				slidedown: {
				  from: { opacity: 0, transform: 'translateY(-25%)' },
				  to: { opacity: 1, transform: 'none' },
				},
				slideleft: {
				  from: { opacity: 0, transform: 'translateX(-20px)' },
				  to: { opacity: 1, transform: 'translateX(0)' },
				},
				slideright: {
				  from: { opacity: 0, transform: 'translateX(20px)' },
				  to: { opacity: 1, transform: 'translateX(0)' },
				},
				wave: {
				  '0%': { transform: 'scale(0)' },
				  '50%': { transform: 'scale(1)' },
				  '100%': { transform: 'scale(0)' },
				},
			  },
		},
	},
	plugins: [],
};
