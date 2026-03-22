import type { Config } from "tailwindcss";

const config: Config = {
	content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				serif: ["var(--font-newsreader)", "Georgia", "serif"],
				mono: ["var(--font-jetbrains)", "Menlo", "monospace"],
			},
			colors: {
				canvas: "#0a0a0b",
				surface: "#141416",
				border: "#27272a",
				muted: "#71717a",
				accent: "#e879f9",
			},
		},
	},
	plugins: [],
};

export default config;
