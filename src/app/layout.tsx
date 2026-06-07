import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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
	metadataBase: new URL("https://signal-and-noise-blush.vercel.app"),
	title: "Signal & Noise — An Interactive Essay on Probabilistic Thinking",
	description:
		"Seven interactive chapters teaching Bayesian reasoning through direct manipulation of live visualizations.",
	openGraph: {
		title: "Signal & Noise — An Interactive Essay on Probabilistic Thinking",
		description:
			"Seven interactive chapters teaching Bayesian reasoning through direct manipulation of live visualizations.",
		url: "https://signal-and-noise-blush.vercel.app",
		siteName: "Signal & Noise",
		images: [{ url: "/og-image.png", width: 1200, height: 630 }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Signal & Noise — An Interactive Essay on Probabilistic Thinking",
		description:
			"Seven interactive chapters teaching Bayesian reasoning through direct manipulation of live visualizations.",
		images: ["/og-image.png"],
	},
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
			<body>
				{children}
				<Analytics />
			</body>
		</html>
	);
}
