import { describe, expect, it } from "vitest";
import config from "./the-update";

describe("the-update config", () => {
	describe("sliders", () => {
		it("defines exactly 3 sliders", () => {
			expect(config.sliders).toHaveLength(3);
		});

		it("has prior slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "prior");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(99);
			expect(s!.defaultValue).toBe(50);
			expect(s!.unit).toBe("%");
		});

		it("has evidenceStrength slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "evidenceStrength");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0.5);
			expect(s!.max).toBe(10);
			expect(s!.defaultValue).toBe(3);
		});

		it("has numberOfPieces slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "numberOfPieces");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(10);
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
		it("returns posterior ≈ 0.75 for default params (50%, 3x, 1 piece)", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 1,
			});
			expect(model.derived.posterior).toBeCloseTo(0.75, 2);
		});

		it("barely moves a near-zero prior even with strong evidence", () => {
			const model = config.compute({
				prior: 1,
				evidenceStrength: 10,
				numberOfPieces: 1,
			});
			// prior=1% → odds=1/99 → log-odds≈-4.595, update=log(10)≈2.303
			// posterior ≈ 9.2%
			expect(model.derived.posterior).toBeCloseTo(0.092, 1);
			expect(model.derived.posterior).toBeLessThan(0.15);
		});

		it("pushes posterior above 95% with multiple evidence pieces", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 5,
			});
			expect(model.derived.posterior).toBeGreaterThan(0.95);
		});

		it("returns posterior between 0 and 1", () => {
			const model = config.compute({
				prior: 99,
				evidenceStrength: 10,
				numberOfPieces: 10,
			});
			expect(model.derived.posterior).toBeGreaterThan(0);
			expect(model.derived.posterior).toBeLessThan(1);
		});

		it("returns all derived values as finite numbers", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 1,
			});
			for (const [, val] of Object.entries(model.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		});

		it("returns correct derived keys", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 1,
			});
			expect(model.derived).toHaveProperty("posterior");
			expect(model.derived).toHaveProperty("logOddsUpdate");
			expect(model.derived).toHaveProperty("logOddsPrior");
			expect(model.derived).toHaveProperty("logOddsPosterior");
			expect(model.derived).toHaveProperty("priorFrac");
		});
	});

	describe("annotation", () => {
		it("returns a string containing bold markers", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 1,
			});
			const text = config.annotation(model);
			expect(text).toContain("**");
		});

		it("contains the posterior percentage", () => {
			const model = config.compute({
				prior: 50,
				evidenceStrength: 3,
				numberOfPieces: 1,
			});
			const text = config.annotation(model);
			expect(text).toContain("75.0%");
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
