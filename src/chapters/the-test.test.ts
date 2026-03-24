import { describe, expect, it } from "vitest";
import config from "./the-test";

describe("the-test config", () => {
	describe("sliders", () => {
		it("defines exactly 3 sliders", () => {
			expect(config.sliders).toHaveLength(3);
		});

		it("has baseRate slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "baseRate");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0.1);
			expect(s!.max).toBe(10);
			expect(s!.defaultValue).toBe(1);
			expect(s!.unit).toBe("%");
		});

		it("has sensitivity slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "sensitivity");
			expect(s).toBeDefined();
			expect(s!.min).toBe(50);
			expect(s!.max).toBe(99.9);
			expect(s!.defaultValue).toBe(95);
		});

		it("has specificity slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "specificity");
			expect(s).toBeDefined();
			expect(s!.min).toBe(50);
			expect(s!.max).toBe(99.9);
			expect(s!.defaultValue).toBe(95);
		});

		it("has all default values within min/max range", () => {
			for (const s of config.sliders) {
				expect(s.defaultValue).toBeGreaterThanOrEqual(s.min);
				expect(s.defaultValue).toBeLessThanOrEqual(s.max);
			}
		});
	});

	describe("compute", () => {
		it("returns ppv ≈ 0.161 for default params (1%, 95%, 95%)", () => {
			const model = config.compute({
				baseRate: 1,
				sensitivity: 95,
				specificity: 95,
			});
			expect(model.derived.ppv).toBeCloseTo(0.161, 2);
		});

		it("returns population of 10000", () => {
			const model = config.compute({
				baseRate: 1,
				sensitivity: 95,
				specificity: 95,
			});
			expect(model.derived.population).toBe(10000);
		});

		it("returns sick + healthy equal to population", () => {
			const model = config.compute({
				baseRate: 5,
				sensitivity: 80,
				specificity: 90,
			});
			expect(model.derived.sick + model.derived.healthy).toBe(
				model.derived.population,
			);
		});

		it("returns truePositives + falseNegatives equal to sick", () => {
			const model = config.compute({
				baseRate: 3,
				sensitivity: 90,
				specificity: 85,
			});
			expect(model.derived.truePositives + model.derived.falseNegatives).toBe(
				model.derived.sick,
			);
		});

		it("returns falsePositives + trueNegatives equal to healthy", () => {
			const model = config.compute({
				baseRate: 3,
				sensitivity: 90,
				specificity: 85,
			});
			expect(model.derived.falsePositives + model.derived.trueNegatives).toBe(
				model.derived.healthy,
			);
		});

		it("returns all derived values as non-negative", () => {
			const model = config.compute({
				baseRate: 0.1,
				sensitivity: 50,
				specificity: 50,
			});
			for (const [, val] of Object.entries(model.derived)) {
				expect(val).toBeGreaterThanOrEqual(0);
			}
		});

		it("returns ppv approaching 1.0 with high base rate and high specificity", () => {
			const model = config.compute({
				baseRate: 10,
				sensitivity: 95,
				specificity: 99.9,
			});
			expect(model.derived.ppv).toBeGreaterThan(0.99);
		});
	});

	describe("annotation", () => {
		it("returns a string containing bold markers", () => {
			const model = config.compute({
				baseRate: 1,
				sensitivity: 95,
				specificity: 95,
			});
			const text = config.annotation(model);
			expect(text).toContain("**");
		});

		it("contains the correct PPV percentage", () => {
			const model = config.compute({
				baseRate: 1,
				sensitivity: 95,
				specificity: 95,
			});
			const text = config.annotation(model);
			expect(text).toContain("16.1%");
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

		it("equation terms have latexClass values starting with term-", () => {
			for (const term of config.equationTerms) {
				expect(term.latexClass).toMatch(/^term-/);
			}
		});
	});
});
