import { mapConvergenceParam } from "@/lib/convergence-map";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-convergence",
	number: 7,
	title: "The Assumption Check",
	subtitle: "Four Models, Different Failure Modes",
	hook: "Four models can look certain for different reasons. Stress their assumptions before trusting their output.",
	sliders: [
		{
			id: "convergenceParam",
			label: "Comparison Sweep",
			min: 0,
			max: 1,
			step: 0.01,
			defaultValue: 0.5,
			description:
				"Sweeps four unrelated parameters across their own ranges for comparison",
		},
	],
	equationLatex: String.raw`\text{output} = f\!\left(\htmlClass{term-convergenceParam}{\text{inputs}},\,\text{assumptions}\right)`,
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
		return `Base rate: **${d.ch1BaseRate.toFixed(1)}%** | Threshold: **${d.ch2Threshold.toFixed(1)}\u03c3** | Poll avg: **${d.ch3PollAvg.toFixed(1)}%** | Prior: **${d.ch4Prior.toFixed(0)}%** \u2014 a side-by-side sensitivity sweep, not a shared quantity.`;
	},
};

export default config;
