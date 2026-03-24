import { fromLogOdds, toLogOdds } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-update",
	number: 4,
	title: "The Update",
	subtitle: "Belief Revision",
	hook: "You start with a hunch. Evidence arrives. How much should your belief shift \u2014 and why does the math say less than you think?",
	sliders: [
		{
			id: "prior",
			label: "Prior Belief",
			min: 1,
			max: 99,
			step: 1,
			defaultValue: 50,
			unit: "%",
			description: "Your initial confidence before seeing evidence",
		},
		{
			id: "evidenceStrength",
			label: "Evidence Strength",
			min: 0.5,
			max: 10,
			step: 0.1,
			defaultValue: 3,
			description:
				"Likelihood ratio \u2014 how much stronger is the evidence for vs against",
		},
		{
			id: "numberOfPieces",
			label: "Evidence Pieces",
			min: 1,
			max: 10,
			step: 1,
			defaultValue: 1,
			description: "Independent pieces of evidence",
		},
	],
	equationLatex: String.raw`\log\text{-odds}_{\text{post}} = \htmlClass{term-prior}{\log\text{-odds}_{\text{prior}}} + \htmlClass{term-numberOfPieces}{n} \times \log(\htmlClass{term-evidenceStrength}{LR})`,
	equationTerms: [
		{ id: "prior", latexClass: "term-prior" },
		{ id: "evidenceStrength", latexClass: "term-evidenceStrength" },
		{ id: "numberOfPieces", latexClass: "term-numberOfPieces" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const prior = params.prior;
		const evidenceStrength = params.evidenceStrength;
		const numberOfPieces = params.numberOfPieces;

		const priorFrac = prior / 100;
		const logOddsPrior = toLogOdds(priorFrac);
		const logOddsUpdate = numberOfPieces * Math.log(evidenceStrength);
		const logOddsPosterior = logOddsPrior + logOddsUpdate;
		const posterior = fromLogOdds(logOddsPosterior);

		return {
			params,
			derived: {
				posterior,
				logOddsUpdate,
				logOddsPrior,
				logOddsPosterior,
				priorFrac,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const priorPct = (d.priorFrac * 100).toFixed(0);
		const posteriorPct = (d.posterior * 100).toFixed(1);
		const pieces = model.params.numberOfPieces;
		const lr = model.params.evidenceStrength.toFixed(1);
		const shift = d.logOddsUpdate.toFixed(2);
		return `Starting from a **${priorPct}%** prior, **${pieces}** piece${pieces === 1 ? "" : "s"} of evidence at **${lr}\u00d7** strength shift${pieces === 1 ? "s" : ""} the log-odds by **${shift}**, landing on a posterior of **${posteriorPct}%**.`;
	},
};

export default config;
