import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-evidence",
	number: 6,
	title: "The Evidence",
	subtitle: "Courtroom Reasoning",
	hook: "Two witnesses place the suspect at the scene. But how much does that really prove?",
	sliders: [],
	equationLatex: "",
	equationTerms: [],
	compute: (params: Record<string, number>): ChapterModel => ({
		params,
		derived: {},
	}),
	annotation: () =>
		"Interactive visualization coming soon — sliders will control prior guilt, evidence reliability, and independence.",
};

export default config;
