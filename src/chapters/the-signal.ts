import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-signal",
	number: 2,
	title: "The Signal",
	subtitle: "Radio Telescope Detection",
	hook: "You're a SETI analyst. The feed is mostly noise. How do you decide what's real?",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control detection threshold, signal strength, and noise.",
};

export default config;
