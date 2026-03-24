import { describe, expect, it } from "vitest";
import config from "./the-forecast";

describe("the-forecast config", () => {
	describe("sliders", () => {
		it("defines exactly 4 sliders", () => {
			expect(config.sliders).toHaveLength(4);
		});

		it("has pollAverage with correct range", () => {
			const s = config.sliders.find((s) => s.id === "pollAverage");
			expect(s).toBeDefined();
			expect(s!.min).toBe(45);
			expect(s!.max).toBe(55);
			expect(s!.defaultValue).toBe(52);
		});

		it("has marginOfError with correct range", () => {
			const s = config.sliders.find((s) => s.id === "marginOfError");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(5);
			expect(s!.defaultValue).toBe(3);
		});

		it("has numberOfPolls with correct range", () => {
			const s = config.sliders.find((s) => s.id === "numberOfPolls");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(50);
			expect(s!.defaultValue).toBe(5);
		});

		it("has systematicBias with correct range", () => {
			const s = config.sliders.find((s) => s.id === "systematicBias");
			expect(s).toBeDefined();
			expect(s!.min).toBe(-3);
			expect(s!.max).toBe(3);
			expect(s!.defaultValue).toBe(0);
		});

		it("has all defaults within range", () => {
			for (const s of config.sliders) {
				expect(s.defaultValue).toBeGreaterThanOrEqual(s.min);
				expect(s.defaultValue).toBeLessThanOrEqual(s.max);
			}
		});
	});

	describe("compute", () => {
		const defaults = {
			pollAverage: 52,
			marginOfError: 3,
			numberOfPolls: 5,
			systematicBias: 0,
		};

		it("returns winProbability > 0.5 when leading", () => {
			const m = config.compute(defaults);
			expect(m.derived.winProbability).toBeGreaterThan(0.5);
		});

		it("winProbability increases as pollAverage increases", () => {
			const low = config.compute({ ...defaults, pollAverage: 46 });
			const mid = config.compute({ ...defaults, pollAverage: 50 });
			const high = config.compute({ ...defaults, pollAverage: 54 });
			expect(high.derived.winProbability).toBeGreaterThan(
				mid.derived.winProbability,
			);
			expect(mid.derived.winProbability).toBeGreaterThan(
				low.derived.winProbability,
			);
		});

		it("winProbability ≈ 0.5 when pollAverage is 50 with no bias", () => {
			const m = config.compute({ ...defaults, pollAverage: 50 });
			expect(m.derived.winProbability).toBeCloseTo(0.5, 1);
		});

		it("winProbability decreases as marginOfError increases (with lead)", () => {
			const tight = config.compute({ ...defaults, marginOfError: 1 });
			const wide = config.compute({ ...defaults, marginOfError: 5 });
			expect(tight.derived.winProbability).toBeGreaterThan(
				wide.derived.winProbability,
			);
		});

		it("effectiveMoE decreases as numberOfPolls increases", () => {
			const few = config.compute({ ...defaults, numberOfPolls: 1 });
			const many = config.compute({ ...defaults, numberOfPolls: 50 });
			expect(many.derived.effectiveMoE).toBeLessThan(few.derived.effectiveMoE);
		});

		it("effectiveMoE with 1 poll equals marginOfError", () => {
			const m = config.compute({ ...defaults, numberOfPolls: 1 });
			expect(m.derived.effectiveMoE).toBeCloseTo(defaults.marginOfError, 5);
		});

		it("biasAdjustedEstimate equals pollAverage + bias", () => {
			const m = config.compute({ ...defaults, systematicBias: 2 });
			expect(m.derived.biasAdjustedEstimate).toBeCloseTo(
				defaults.pollAverage + 2,
				5,
			);
		});

		it("positive bias increases winProbability", () => {
			const noBias = config.compute({ ...defaults, systematicBias: 0 });
			const posBias = config.compute({ ...defaults, systematicBias: 2 });
			expect(posBias.derived.winProbability).toBeGreaterThan(
				noBias.derived.winProbability,
			);
		});

		it("negative bias decreases winProbability", () => {
			const noBias = config.compute({ ...defaults, systematicBias: 0 });
			const negBias = config.compute({ ...defaults, systematicBias: -2 });
			expect(negBias.derived.winProbability).toBeLessThan(
				noBias.derived.winProbability,
			);
		});

		it("all derived values are finite", () => {
			const m = config.compute(defaults);
			for (const [, val] of Object.entries(m.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		});
	});

	describe("equation", () => {
		it("has non-empty equationLatex", () => {
			expect(config.equationLatex.length).toBeGreaterThan(0);
		});

		it("has 4 equation terms matching slider ids", () => {
			expect(config.equationTerms).toHaveLength(4);
			const termIds = config.equationTerms.map((t) => t.id);
			const sliderIds = config.sliders.map((s) => s.id);
			expect(termIds).toEqual(expect.arrayContaining(sliderIds));
		});

		it("equation terms have latexClass starting with term-", () => {
			for (const term of config.equationTerms) {
				expect(term.latexClass).toMatch(/^term-/);
			}
		});
	});

	describe("annotation", () => {
		it("returns string with bold markers", () => {
			const m = config.compute({
				pollAverage: 52,
				marginOfError: 3,
				numberOfPolls: 5,
				systematicBias: 0,
			});
			expect(config.annotation(m)).toContain("**");
		});

		it("contains win probability percentage", () => {
			const m = config.compute({
				pollAverage: 52,
				marginOfError: 3,
				numberOfPolls: 5,
				systematicBias: 0,
			});
			const text = config.annotation(m);
			expect(text).toContain("%");
			expect(text).toContain("Win probability");
		});
	});
});
