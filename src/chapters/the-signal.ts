import { detectionProbability, dPrime, falseAlarmRate, snr } from "@/lib/math";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

const config: ChapterConfig = {
	slug: "the-signal",
	number: 2,
	title: "The Signal",
	subtitle: "Radio Telescope Detection",
	hook: "You\u2019re a SETI analyst. The feed is mostly noise. How do you decide what\u2019s real?",
	sliders: [
		{
			id: "detectionThreshold",
			label: "Detection Threshold",
			min: 0.5,
			max: 4.0,
			step: 0.1,
			defaultValue: 2.0,
			unit: "\u03c3",
			description:
				"Amplitude threshold for flagging a detection (in standard deviations)",
		},
		{
			id: "signalStrength",
			label: "Signal Strength",
			min: 0,
			max: 3.0,
			step: 0.1,
			defaultValue: 1.0,
			unit: "\u03c3",
			description:
				"How far the signal rises above the noise floor (in standard deviations)",
		},
		{
			id: "noiseStd",
			label: "Noise Level",
			min: 0.5,
			max: 2.0,
			step: 0.1,
			defaultValue: 1.0,
			description: "Standard deviation of background noise",
		},
	],
	equationLatex: String.raw`P(\text{detect}) = 1 - \Phi\!\left(\frac{\htmlClass{term-detectionThreshold}{\lambda} - \htmlClass{term-signalStrength}{\mu_s}}{\htmlClass{term-noiseStd}{\sigma_n}}\right)`,
	equationTerms: [
		{ id: "detectionThreshold", latexClass: "term-detectionThreshold" },
		{ id: "signalStrength", latexClass: "term-signalStrength" },
		{ id: "noiseStd", latexClass: "term-noiseStd" },
	],
	compute: (params: Record<string, number>): ChapterModel => {
		const threshold = params.detectionThreshold;
		const signal = params.signalStrength;
		const noise = params.noiseStd;

		const detectionRate = detectionProbability(threshold, signal, noise);
		const far = falseAlarmRate(threshold, noise);
		const snrValue = signal > 0 && noise > 0 ? snr(signal ** 2, noise ** 2) : 0;
		const dPrimeValue = noise > 0 ? dPrime(signal, noise) : 0;
		const falsePerTrue =
			detectionRate > 0.001
				? Number(((far * 90) / (detectionRate * 10)).toFixed(1))
				: 0;

		return {
			params,
			derived: {
				detectionRate,
				falseAlarmRate: far,
				snr: snrValue,
				dPrime: dPrimeValue,
				falsePerTrue,
			},
		};
	},
	annotation: (model: ChapterModel): string => {
		const d = model.derived;
		const detPct = (d.detectionRate * 100).toFixed(1);
		const farPct = (d.falseAlarmRate * 100).toFixed(1);
		return `Detection rate: **${detPct}%**. False alarm rate: **${farPct}%**. d\u2032 = **${d.dPrime.toFixed(2)}**. For every real signal detected, roughly **${d.falsePerTrue}** false alarms fire.`;
	},
};

export default config;
