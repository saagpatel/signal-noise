import { pValueTwoTailed } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-market",
	number: 5,
	title: "The Market",
	subtitle: "Financial Noise",
	hook: "A stock jumped 3% today. Is that a signal worth acting on, or just the market doing what markets do?",
	sliders: [
		{
			id: "dailyMove",
			label: "Daily Move",
			min: -10,
			max: 10,
			step: 0.1,
			defaultValue: 3,
			unit: "%",
			description: "Observed price change today",
		},
		{
			id: "annualVolatility",
			label: "Annual Volatility",
			min: 10,
			max: 60,
			step: 1,
			defaultValue: 20,
			unit: "%",
			description: "Stock's typical annual standard deviation",
		},
		{
			id: "observationDays",
			label: "Trading Days",
			min: 1,
			max: 252,
			step: 1,
			defaultValue: 1,
			description: "Number of trading days observed",
		},
	],
	equationLatex: String.raw`z = \frac{\htmlClass{term-dailyMove}{x}}{\htmlClass{term-annualVolatility}{\sigma_{\text{annual}}} / \sqrt{252}} \quad;\quad p = 2\!\left(1 - \Phi(|z|)\right)`,
	equationTerms: [
		{ id: "dailyMove", latexClass: "term-dailyMove" },
		{ id: "annualVolatility", latexClass: "term-annualVolatility" },
		{ id: "observationDays", latexClass: "term-observationDays" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const dailyMove = params.dailyMove;
		const annualVolatility = params.annualVolatility;
		const observationDays = params.observationDays;

		const dailyStd = annualVolatility / Math.sqrt(252);
		const zScore = dailyMove / dailyStd;
		const pValue = pValueTwoTailed(zScore);
		const expectedRandomMoves = observationDays * pValue;

		return {
			params,
			derived: {
				dailyStd,
				zScore,
				pValue,
				expectedRandomMoves,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const move = model.params.dailyMove.toFixed(1);
		const vol = model.params.annualVolatility.toFixed(0);
		const z = Math.abs(d.zScore).toFixed(2);
		const p = d.pValue < 0.001 ? "<0.001" : d.pValue.toFixed(3);
		const expected = d.expectedRandomMoves.toFixed(1);
		return `A **${move}%** daily move with **${vol}%** annual volatility is **${z}** standard deviations from noise. p-value: **${p}**. Expect **${expected}** moves this large per year by chance.`;
	},
};

export default config;
