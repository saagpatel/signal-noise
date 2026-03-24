import { normalCDF } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-forecast",
	number: 3,
	title: "The Forecast",
	subtitle: "Election Modeling",
	hook: "Your candidate is up 52\u201348 in the polls. Should you celebrate? That depends on what you mean by \u2018up.\u2019",
	sliders: [
		{
			id: "pollAverage",
			label: "Poll Average",
			min: 45,
			max: 55,
			step: 0.1,
			defaultValue: 52,
			unit: "%",
			description: "Average vote share across polls",
		},
		{
			id: "marginOfError",
			label: "Margin of Error",
			min: 1,
			max: 5,
			step: 0.1,
			defaultValue: 3,
			unit: "%",
			description: "95% confidence interval half-width for a single poll",
		},
		{
			id: "numberOfPolls",
			label: "Number of Polls",
			min: 1,
			max: 50,
			step: 1,
			defaultValue: 5,
			description: "Independent polls averaged together",
		},
		{
			id: "systematicBias",
			label: "Systematic Bias",
			min: -3,
			max: 3,
			step: 0.1,
			defaultValue: 0,
			unit: "%",
			description: "Persistent polling error that aggregation cannot fix",
		},
	],
	equationLatex: String.raw`P(\text{win}) = \Phi\!\left(\frac{\htmlClass{term-pollAverage}{\bar{x}} + \htmlClass{term-systematicBias}{b} - 50\%}{\htmlClass{term-marginOfError}{\text{MoE}} / \sqrt{\htmlClass{term-numberOfPolls}{N}}}\right)`,
	equationTerms: [
		{ id: "pollAverage", latexClass: "term-pollAverage" },
		{ id: "marginOfError", latexClass: "term-marginOfError" },
		{ id: "numberOfPolls", latexClass: "term-numberOfPolls" },
		{ id: "systematicBias", latexClass: "term-systematicBias" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const pollAvg = params.pollAverage;
		const moe = params.marginOfError;
		const nPolls = params.numberOfPolls;
		const bias = params.systematicBias;

		const biasAdjustedEstimate = pollAvg + bias;
		const individualStd = moe / 1.96;
		const aggregatedStd = individualStd / Math.sqrt(Math.max(1, nPolls));
		const effectiveMoE = aggregatedStd * 1.96;
		const winProbability = normalCDF(biasAdjustedEstimate, 50, aggregatedStd);

		return {
			params,
			derived: {
				winProbability,
				effectiveMoE,
				biasAdjustedEstimate,
				aggregatedStd,
				individualStd,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const biasAdj = d.biasAdjustedEstimate.toFixed(1);
		const effMoE = d.effectiveMoE.toFixed(1);
		const winPct = (d.winProbability * 100).toFixed(1);
		return `Bias-adjusted estimate: **${biasAdj}%**. Effective margin: \u00b1**${effMoE}%**. Win probability: **${winPct}%**.`;
	},
};

export default config;
