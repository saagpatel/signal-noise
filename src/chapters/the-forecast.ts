import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-forecast",
	number: 3,
	title: "The Forecast",
	subtitle: "Election Modeling",
	hook: "Your candidate is up 52–48 in the polls. Should you celebrate? That depends on what you mean by 'up.'",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control poll average, margin of error, and sample size.",
};

export default config;
