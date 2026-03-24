import { mapConvergenceParam } from "@/lib/convergence-map";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-convergence",
	number: 7,
	title: "The Convergence",
	subtitle: "One Pattern, Seven Disguises",
	hook: "You\u2019ve seen this equation six times in six disguises. Now watch them all move together.",
	sliders: [
		{
			id: "convergenceParam",
			label: "Shared Parameter",
			min: 0,
			max: 1,
			step: 0.01,
			defaultValue: 0.5,
			description:
				"Maps to the primary parameter of each chapter simultaneously",
		},
	],
	equationLatex: String.raw`P(H|E) = \frac{\htmlClass{term-convergenceParam}{P(E|H)} \cdot \htmlClass{term-convergenceParam}{P(H)}}{P(E)}`,
	equationTerms: [
		{ id: "convergenceParam", latexClass: "term-convergenceParam" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const mapped = mapConvergenceParam(params.convergenceParam ?? 0.5);
		return {
			params,
			derived: {
				ch1BaseRate: mapped[0].params.baseRate,
				ch2Threshold: mapped[1].params.detectionThreshold,
				ch3PollAvg: mapped[2].params.pollAverage,
				ch4Prior: mapped[3].params.prior,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		return `Base rate: **${d.ch1BaseRate.toFixed(1)}%** | Threshold: **${d.ch2Threshold.toFixed(1)}\u03c3** | Poll avg: **${d.ch3PollAvg.toFixed(1)}%** | Prior: **${d.ch4Prior.toFixed(0)}%** \u2014 one slider, four models, same pattern.`;
	},
};

export default config;
