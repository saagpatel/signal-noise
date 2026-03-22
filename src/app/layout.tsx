import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
	subsets: ["latin"],
	variable: "--font-newsreader",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Signal & Noise — An Interactive Essay on Probabilistic Thinking",
	description:
		"Seven interactive chapters teaching Bayesian reasoning through direct manipulation of live visualizations.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${newsreader.variable} ${jetbrainsMono.variable}`}
		>
			<body>{children}</body>
		</html>
	);
}
