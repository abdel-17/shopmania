import plugin from "tailwindcss/plugin";

const primary = {
	50: "#fdf3f5",
	100: "#fbe8eb",
	200: "#f7d4db",
	300: "#f0b1bd",
	400: "#e7859b",
	500: "#de6987",
	600: "#c53964",
	700: "#a62a53",
	800: "#8b264b",
	900: "#772444",
	950: "#420f21",
};

const secondary = {
	50: "#f3faf8",
	100: "#d8efe9",
	200: "#b1ded3",
	300: "#82c6b7",
	400: "#58a99b",
	500: "#43998b",
	600: "#307168",
	700: "#295c55",
	800: "#254a46",
	900: "#223f3b",
	950: "#0f2422",
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./app/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: primary[400],
					...primary,
				},
				secondary: {
					DEFAULT: secondary[400],
					...secondary,
				},
			},
		},
	},
	plugins: [
		plugin(({ addComponents }) => {
			addComponents({
				".btn": tw(
					"inline-flex h-10 items-center justify-center gap-2 rounded-full bg-primary-700 px-6 text-sm font-medium text-primary-50",
				),
			});
		}),
	],
};

function tw(...classes: string[]) {
	const className = classes.join(" ");
	return {
		[`@apply ${className}`]: "",
	};
}
