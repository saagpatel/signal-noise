import { fromLogOdds, toLogOdds } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-evidence",
	number: 6,
	title: "The Evidence",
	subtitle: "Correlated Witnesses",
	hook: "Two eyewitnesses both place the suspect at the scene. That sounds damning \u2014 unless they talked to each other first.",
	sliders: [
		{
			id: "priorGuilt",
			label: "Prior Guilt",
			min: 1,
			max: 99,
			step: 1,
			defaultValue: 20,
			unit: "%",
			description: "Base probability of guilt before evidence",
		},
		{
			id: "evidenceReliability",
			label: "Witness Reliability",
			min: 50,
			max: 99,
			step: 1,
			defaultValue: 80,
			unit: "%",
			description: "How accurately each witness identifies the suspect",
		},
		{
			id: "evidenceIndependence",
			label: "Independence",
			min: 0,
			max: 100,
			step: 10,
			defaultValue: 100,
			unit: "%",
			description: "How independent the second witness is from the first",
		},
	],
	equationLatex: String.raw`P(\text{guilt}) = \sigma\!\left(\log\frac{\htmlClass{term-priorGuilt}{p}}{1-p} + \log\htmlClass{term-evidenceReliability}{LR_1} + \htmlClass{term-evidenceIndependence}{\rho}\log\htmlClass{term-evidenceReliability}{LR_1}\right)`,
	equationTerms: [
		{ id: "priorGuilt", latexClass: "term-priorGuilt" },
		{ id: "evidenceReliability", latexClass: "term-evidenceReliability" },
		{ id: "evidenceIndependence", latexClass: "term-evidenceIndependence" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const priorFrac = params.priorGuilt / 100;
		const reliability = params.evidenceReliability / 100;
		const independence = params.evidenceIndependence / 100;

		// Likelihood ratio from one witness
		const lr1 = reliability / (1 - reliability);

		// Second witness penalized by correlation
		const lr2 = lr1 ** independence;

		const posteriorAfterFirst = fromLogOdds(
			toLogOdds(priorFrac) + Math.log(lr1),
		);
		const posteriorGuilt = fromLogOdds(
			toLogOdds(priorFrac) + Math.log(lr1) + Math.log(lr2),
		);
		const effectiveLR = lr1 * lr2;

		return {
			params,
			derived: {
				posteriorGuilt,
				posteriorAfterFirst,
				effectiveLR,
				lr1,
				lr2,
				priorFrac,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const prior = (d.priorFrac * 100).toFixed(0);
		const afterFirst = (d.posteriorAfterFirst * 100).toFixed(1);
		const posteriorPct = (d.posteriorGuilt * 100).toFixed(1);
		const independence = model.params.evidenceIndependence.toFixed(0);
		const effLR = d.effectiveLR.toFixed(1);
		return `Prior: **${prior}%**. After witness 1: **${afterFirst}%**. After witness 2 (**${independence}%** independent): **${posteriorPct}%**. Effective evidence multiplier: **${effLR}\u00d7**.`;
	},
};

export default config;
