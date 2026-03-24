import { describe, expect, it } from "vitest";
import config from "./the-convergence";

describe("the-convergence config", () => {
	describe("sliders", () => {
		it("defines exactly 1 slider", () => {
			expect(config.sliders).toHaveLength(1);
		});

		it("has convergenceParam with correct range", () => {
			const s = config.sliders[0];
			expect(s.id).toBe("convergenceParam");
			expect(s.min).toBe(0);
			expect(s.max).toBe(1);
			expect(s.step).toBe(0.01);
			expect(s.defaultValue).toBe(0.5);
		});
	});

	describe("compute", () => {
		it("at convergenceParam=0, maps to minimum values", () => {
			const m = config.compute({ convergenceParam: 0 });
			expect(m.derived.ch1BaseRate).toBeCloseTo(0.1, 2);
			expect(m.derived.ch2Threshold).toBeCloseTo(0.5, 2);
			expect(m.derived.ch3PollAvg).toBeCloseTo(45, 2);
			expect(m.derived.ch4Prior).toBeCloseTo(1, 2);
		});

		it("at convergenceParam=1, maps to maximum values", () => {
			const m = config.compute({ convergenceParam: 1 });
			expect(m.derived.ch1BaseRate).toBeCloseTo(10, 2);
			expect(m.derived.ch2Threshold).toBeCloseTo(4.0, 2);
			expect(m.derived.ch3PollAvg).toBeCloseTo(55, 2);
			expect(m.derived.ch4Prior).toBeCloseTo(99, 2);
		});

		it("at convergenceParam=0.5, maps to midpoints", () => {
			const m = config.compute({ convergenceParam: 0.5 });
			expect(m.derived.ch3PollAvg).toBeCloseTo(50, 1);
			expect(m.derived.ch4Prior).toBeCloseTo(50, 1);
		});

		it("all derived values are finite", () => {
			const m = config.compute({ convergenceParam: 0.5 });
			for (const [, val] of Object.entries(m.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		});
	});

	describe("equation", () => {
		it("has non-empty equationLatex", () => {
			expect(config.equationLatex.length).toBeGreaterThan(0);
		});

		it("has 1 equation term matching slider id", () => {
			expect(config.equationTerms).toHaveLength(1);
			expect(config.equationTerms[0].id).toBe("convergenceParam");
		});

		it("equation term has latexClass starting with term-", () => {
			expect(config.equationTerms[0].latexClass).toMatch(/^term-/);
		});
	});

	describe("annotation", () => {
		it("returns string with bold markers", () => {
			const m = config.compute({ convergenceParam: 0.5 });
			expect(config.annotation(m)).toContain("**");
		});

		it("contains all 4 mapped values", () => {
			const m = config.compute({ convergenceParam: 0.5 });
			const text = config.annotation(m);
			expect(text).toContain("Base rate");
			expect(text).toContain("Threshold");
			expect(text).toContain("Poll avg");
			expect(text).toContain("Prior");
		});
	});
});
