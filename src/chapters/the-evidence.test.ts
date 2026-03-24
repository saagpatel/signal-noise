import { describe, expect, it } from "vitest";
import config from "./the-evidence";

describe("the-evidence config", () => {
	describe("sliders", () => {
		it("defines exactly 3 sliders", () => {
			expect(config.sliders).toHaveLength(3);
		});

		it("has priorGuilt slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "priorGuilt");
			expect(s).toBeDefined();
			expect(s!.min).toBe(1);
			expect(s!.max).toBe(99);
			expect(s!.defaultValue).toBe(20);
			expect(s!.unit).toBe("%");
		});

		it("has evidenceReliability slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "evidenceReliability");
			expect(s).toBeDefined();
			expect(s!.min).toBe(50);
			expect(s!.max).toBe(99);
			expect(s!.defaultValue).toBe(80);
		});

		it("has evidenceIndependence slider with correct range", () => {
			const s = config.sliders.find((s) => s.id === "evidenceIndependence");
			expect(s).toBeDefined();
			expect(s!.min).toBe(0);
			expect(s!.max).toBe(100);
			expect(s!.defaultValue).toBe(100);
		});

		it("has all default values within min/max range", () => {
			for (const s of config.sliders) {
				expect(s.defaultValue).toBeGreaterThanOrEqual(s.min);
				expect(s.defaultValue).toBeLessThanOrEqual(s.max);
			}
		});
	});

	describe("compute", () => {
		const defaults = {
			priorGuilt: 20,
			evidenceReliability: 80,
			evidenceIndependence: 100,
		};

		it("posteriorGuilt > priorGuilt when evidence is reliable", () => {
			const model = config.compute(defaults);
			expect(model.derived.posteriorGuilt).toBeGreaterThan(
				model.derived.priorFrac,
			);
		});

		it("posteriorGuilt increases with higher evidenceReliability", () => {
			const low = config.compute({
				...defaults,
				evidenceReliability: 60,
			});
			const high = config.compute({
				...defaults,
				evidenceReliability: 95,
			});
			expect(high.derived.posteriorGuilt).toBeGreaterThan(
				low.derived.posteriorGuilt,
			);
		});

		it("independence=0% means second witness adds nothing", () => {
			const model = config.compute({
				...defaults,
				evidenceIndependence: 0,
			});
			expect(model.derived.posteriorGuilt).toBeCloseTo(
				model.derived.posteriorAfterFirst,
				6,
			);
		});

		it("independence=100% gives full effect (posteriorGuilt > posteriorAfterFirst significantly)", () => {
			const model = config.compute({
				...defaults,
				evidenceIndependence: 100,
			});
			expect(model.derived.posteriorGuilt).toBeGreaterThan(
				model.derived.posteriorAfterFirst + 0.05,
			);
		});

		it("posteriorAfterFirst is between 0 and 1", () => {
			const model = config.compute(defaults);
			expect(model.derived.posteriorAfterFirst).toBeGreaterThan(0);
			expect(model.derived.posteriorAfterFirst).toBeLessThan(1);
		});

		it("posteriorGuilt is between 0 and 1", () => {
			const model = config.compute(defaults);
			expect(model.derived.posteriorGuilt).toBeGreaterThan(0);
			expect(model.derived.posteriorGuilt).toBeLessThan(1);
		});

		it("all derived values are finite", () => {
			const model = config.compute(defaults);
			for (const [, val] of Object.entries(model.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		});

		it("effectiveLR > 1 when reliability > 50%", () => {
			const model = config.compute(defaults);
			expect(model.derived.effectiveLR).toBeGreaterThan(1);
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

	describe("annotation", () => {
		it("returns a string containing bold markers", () => {
			const model = config.compute({
				priorGuilt: 20,
				evidenceReliability: 80,
				evidenceIndependence: 100,
			});
			const text = config.annotation(model);
			expect(text).toContain("**");
		});
	});
});
