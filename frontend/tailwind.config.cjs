/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			display: ["Oswald", "sans-serif"],
			body: ["Nunito", "sans-serif"],
			logo: ["Permanent Marker", "cursive"],
		},
	},
	plugins: [
		// require('@tailwindcss/forms'),
	],
};
