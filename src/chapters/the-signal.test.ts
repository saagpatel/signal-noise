import { describe, expect, it } from "vitest";
import config from "./the-signal";

describe("the-signal config", () => {
	describe("sliders", () => {
		it("defines exactly 3 sliders", () => {
			expect(config.sliders).toHaveLength(3);
		});

		it("has detectionThreshold with correct range", () => {
			const s = config.sliders.find((s) => s.id === "detectionThreshold");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0.5);
			expect(s!.max).toBe(4.0);
			expect(s!.defaultValue).toBe(2.0);
		});

		it("has signalStrength with correct range", () => {
			const s = config.sliders.find((s) => s.id === "signalStrength");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0);
			expect(s!.max).toBe(3.0);
			expect(s!.defaultValue).toBe(1.0);
		});

		it("has noiseStd with correct range", () => {
			const s = config.sliders.find((s) => s.id === "noiseStd");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0.5);
			expect(s!.max).toBe(2.0);
			expect(s!.defaultValue).toBe(1.0);
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
			detectionThreshold: 2.0,
			signalStrength: 1.0,
			noiseStd: 1.0,
		};

		it("returns detectionRate between 0 and 1", () => {
			const m = config.compute(defaults);
			expect(m.derived.detectionRate).toBeGreaterThanOrEqual(0);
			expect(m.derived.detectionRate).toBeLessThanOrEqual(1);
		});

		it("returns falseAlarmRate between 0 and 1", () => {
			const m = config.compute(defaults);
			expect(m.derived.falseAlarmRate).toBeGreaterThanOrEqual(0);
			expect(m.derived.falseAlarmRate).toBeLessThanOrEqual(1);
		});

		it("lower threshold increases detection rate", () => {
			const low = config.compute({ ...defaults, detectionThreshold: 1.0 });
			const high = config.compute({ ...defaults, detectionThreshold: 3.0 });
			expect(low.derived.detectionRate).toBeGreaterThan(
				high.derived.detectionRate,
			);
		});

		it("lower threshold increases false alarm rate", () => {
			const low = config.compute({ ...defaults, detectionThreshold: 1.0 });
			const high = config.compute({ ...defaults, detectionThreshold: 3.0 });
			expect(low.derived.falseAlarmRate).toBeGreaterThan(
				high.derived.falseAlarmRate,
			);
		});

		it("stronger signal increases detection rate", () => {
			const weak = config.compute({ ...defaults, signalStrength: 0.5 });
			const strong = config.compute({ ...defaults, signalStrength: 2.5 });
			expect(strong.derived.detectionRate).toBeGreaterThan(
				weak.derived.detectionRate,
			);
		});

		it("signal strength does not affect false alarm rate", () => {
			const a = config.compute({ ...defaults, signalStrength: 0.5 });
			const b = config.compute({ ...defaults, signalStrength: 2.5 });
			expect(a.derived.falseAlarmRate).toBeCloseTo(
				b.derived.falseAlarmRate,
				10,
			);
		});

		it("dPrime equals signal/noise", () => {
			const m = config.compute({
				...defaults,
				signalStrength: 2.0,
				noiseStd: 1.0,
			});
			expect(m.derived.dPrime).toBeCloseTo(2.0, 5);
		});

		it("all derived values are non-negative", () => {
			const m = config.compute(defaults);
			for (const [, val] of Object.entries(m.derived)) {
				expect(val).toBeGreaterThanOrEqual(0);
			}
		});
	});

	describe("equation", () => {
		it("has non-empty equationLatex", () => {
			expect(config.equationLatex.length).toBeGreaterThan(0);
		});

		it("has 3 equation terms matching slider ids", () => {
			expect(config.equationTerms).toHaveLength(3);
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
				detectionThreshold: 2.0,
				signalStrength: 1.0,
				noiseStd: 1.0,
			});
			expect(config.annotation(m)).toContain("**");
		});
	});
});
