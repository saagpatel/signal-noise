import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-market",
	number: 5,
	title: "The Market",
	subtitle: "Financial Noise",
	hook: "A stock moved 3% today. Is it a signal — or just noise?",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control daily move, volatility, and observation window.",
};

export default config;
