import { ppv } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const POPULATION = 10_000;

const config: ChapterConfig = {
	slug: "the-test",
	number: 1,
	title: "The Test",
	subtitle: "Medical Diagnostics",
	hook: "A test is 95% accurate. It comes back positive. What are the chances you\u2019re actually sick?",
	sliders: [
		{
			id: "baseRate",
			label: "Base Rate",
			min: 0.1,
			max: 10,
			step: 0.1,
			defaultValue: 1,
			unit: "%",
			description: "Prevalence of the disease in the population",
		},
		{
			id: "sensitivity",
			label: "Sensitivity",
			min: 50,
			max: 99.9,
			step: 0.1,
			defaultValue: 95,
			unit: "%",
			description: "True positive rate \u2014 P(+|Disease)",
		},
		{
			id: "specificity",
			label: "Specificity",
			min: 50,
			max: 99.9,
			step: 0.1,
			defaultValue: 95,
			unit: "%",
			description: "True negative rate \u2014 P(\u2212|No Disease)",
		},
	],
	equationLatex: String.raw`\text{PPV} = \frac{\htmlClass{term-sensitivity}{P(+|D)} \cdot \htmlClass{term-baseRate}{P(D)}}{\htmlClass{term-sensitivity}{P(+|D)} \cdot \htmlClass{term-baseRate}{P(D)} + \htmlClass{term-specificity}{P(+|\neg D)} \cdot (1 - \htmlClass{term-baseRate}{P(D)})}`,
	equationTerms: [
		{ id: "baseRate", latexClass: "term-baseRate" },
		{ id: "sensitivity", latexClass: "term-sensitivity" },
		{ id: "specificity", latexClass: "term-specificity" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const baseRate = params.baseRate / 100;
		const sensitivity = params.sensitivity / 100;
		const specificity = params.specificity / 100;

		const ppvValue = ppv(baseRate, sensitivity, specificity);
		const fpr = 1 - ppvValue;

		const sick = Math.round(POPULATION * baseRate);
		const healthy = POPULATION - sick;
		const truePositives = Math.round(sick * sensitivity);
		const falseNegatives = sick - truePositives;
		const falsePositives = Math.round(healthy * (1 - specificity));
		const trueNegatives = healthy - falsePositives;

		return {
			params,
			derived: {
				ppv: ppvValue,
				fpr,
				population: POPULATION,
				sick,
				healthy,
				truePositives,
				falseNegatives,
				falsePositives,
				trueNegatives,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const totalPositives = d.truePositives + d.falsePositives;
		const ppvPct = (d.ppv * 100).toFixed(1);
		return `Of 10,000 people tested, **${d.truePositives}** truly have the disease and test positive. But **${d.falsePositives}** are healthy and also test positive. Of **${totalPositives}** positive results, only **${ppvPct}%** actually have the disease.`;
	},
};

export default config;
