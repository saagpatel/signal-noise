import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-test",
	number: 1,
	title: "The Test",
	subtitle: "Medical Diagnostics",
	hook: "A test is 95% accurate. It comes back positive. What are the chances you're actually sick?",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control base rate, sensitivity, and specificity.",
};

export default config;
