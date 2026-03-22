import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-update",
	number: 4,
	title: "The Update",
	subtitle: "Bayesian Belief Revision",
	hook: "You have a hunch. Evidence arrives. How much should it change your mind?",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control prior belief, evidence strength, and repetition.",
};

export default config;
