/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	content: ["./src/**/*.js"],
	theme: {
		extend: {
			colors: {
				"first-black": "#0b132a",
				"second-black": "#0B132A",
				"first-white": "#F8F8F8",
				"second-white": "rgba(255, 255, 255, 0.7)",
				"third-white": "#EEEFF2",
				"fourth-white": "#DDDDDD",
				"fifth-white": "#DDE0E4",
				"sixth-white": "#E0E0E2",
				"seventh-white": "#f9f9f9",
				"eighth-white": "#EFEEEE",
				"ninth-white": "#F4F4F8",
				"first-gray": "#4F5665",
				"second-gray": "#AFB5C0",
				"third-gray": "#C4C4C4",
				"fourth-gray": "#9F9F9F",
				"fifth-gray": "#777",
				"sixth-gray": "#bababa",
				"first-brown": "#6A4029",
				"second-brown": "#895537",
				"third-brown": "#362115",
				"first-yellow": "#FFBA33",
				"second-yellow": "#F5C361",
				"third-yellow": "#e7aa3685",
				"first-green": "#88B788",
				"first-orange": "#C59378",
				"second-orange": "#F47B0A",
			},
			fontFamily: {
				rubik: ["Rubik", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
			content: {
				"checkSign": "url('/src/assets/icon/check-sign.svg')",
			}
		},
	},
	plugins: [],
};
