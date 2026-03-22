import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-convergence",
	number: 7,
	title: "The Convergence",
	subtitle: "One Pattern, Seven Disguises",
	hook: "You've seen this equation six times in six disguises. Now watch them all move together.",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — a single slider will control all six chapter models simultaneously.",
};

export default config;
