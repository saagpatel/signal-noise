import { describe, expect, it } from "vitest";
import config from "./the-market";

describe("the-market config", () => {
	describe("sliders", () => {
		it("defines exactly 3 sliders", () => {
			expect(config.sliders).toHaveLength(3);
		});

		it("has dailyMove slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "dailyMove");
			expect(s).toBeDefined();
			expect(s!.min).toBe(-10);
			expect(s!.max).toBe(10);
			expect(s!.defaultValue).toBe(3);
			expect(s!.unit).toBe("%");
		});

		it("has annualVolatility slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "annualVolatility");
			expect(s).toBeDefined();
			expect(s!.min).toBe(10);
			expect(s!.max).toBe(60);
			expect(s!.defaultValue).toBe(20);
			expect(s!.unit).toBe("%");
		});

		it("has observationDays slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "observationDays");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(252);
			expect(s!.defaultValue).toBe(1);
		});

		it("has all default values within min/max range", () => {
			for (const s of config.sliders) {
				expect(s.defaultValue).toBeGreaterThanOrEqual(s.min);
				expect(s.defaultValue).toBeLessThanOrEqual(s.max);
			}
		});
	});

	describe("compute", () => {
		it("computes zScore ≈ 2.38 for 3% move / 20% annual vol", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			// z = 3 / (20 / sqrt(252)) = 3 / 1.2599 ≈ 2.381
			expect(model.derived.zScore).toBeCloseTo(2.381, 2);
		});

		it("returns pValue < 0.05 for z ≈ 2.38", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			expect(model.derived.pValue).toBeLessThan(0.05);
		});

		it("computes expectedRandomMoves with 252 trading days", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 252,
			});
			// expectedRandomMoves = 252 * pValue
			expect(model.derived.expectedRandomMoves).toBe(
				252 * model.derived.pValue,
			);
		});

		it("computes dailyStd = annualVol / sqrt(252)", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			expect(model.derived.dailyStd).toBeCloseTo(20 / Math.sqrt(252), 6);
		});

		it("returns all derived values as finite", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			for (const [, val] of Object.entries(model.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		});

		it("zScore sign matches dailyMove sign", () => {
			const positive = config.compute({
				dailyMove: 5,
				annualVolatility: 20,
				observationDays: 1,
			});
			expect(positive.derived.zScore).toBeGreaterThan(0);

			const negative = config.compute({
				dailyMove: -5,
				annualVolatility: 20,
				observationDays: 1,
			});
			expect(negative.derived.zScore).toBeLessThan(0);
		});
	});

	describe("equation", () => {
		it("has non-empty equationLatex", () => {
			expect(config.equationLatex.length).toBeGreaterThan(0);
		});

		it("has 3 equation terms", () => {
			expect(config.equationTerms).toHaveLength(3);
		});

		it("equation terms have latexClass values starting with term-", () => {
			for (const term of config.equationTerms) {
				expect(term.latexClass).toMatch(/^term-/);
			}
		});
	});

	describe("annotation", () => {
		it("returns a string containing bold markers", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			const text = config.annotation(model);
			expect(text).toContain("**");
		});

		it("contains 'standard deviations'", () => {
			const model = config.compute({
				dailyMove: 3,
				annualVolatility: 20,
				observationDays: 1,
			});
			const text = config.annotation(model);
			expect(text).toContain("standard deviations");
		});
	});
});
