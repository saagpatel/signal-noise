import { describe, expect, it } from "vitest";
import theForecast from "@/chapters/the-forecast";
import theSignal from "@/chapters/the-signal";
import theTest from "@/chapters/the-test";
import theUpdate from "@/chapters/the-update";
import { CONVERGENCE_SLUGS, mapConvergenceParam } from "./convergence-map";

describe("mapConvergenceParam", () => {
	it("returns 4 entries", () => {
		expect(mapConvergenceParam(0.5)).toHaveLength(4);
	});

	it("returns correct slug ordering", () => {
		const slugs = mapConvergenceParam(0).map((e) => e.slug);
		expect(slugs).toEqual(CONVERGENCE_SLUGS);
	});

	it("at convergenceParam=0, maps to minimum values", () => {
		const mapped = mapConvergenceParam(0);
		expect(mapped[0].params.baseRate).toBeCloseTo(0.1, 5);
		expect(mapped[1].params.detectionThreshold).toBeCloseTo(0.5, 5);
		expect(mapped[2].params.pollAverage).toBeCloseTo(45, 5);
		expect(mapped[3].params.prior).toBeCloseTo(1, 5);
	});

	it("at convergenceParam=1, maps to maximum values", () => {
		const mapped = mapConvergenceParam(1);
		expect(mapped[0].params.baseRate).toBeCloseTo(10, 5);
		expect(mapped[1].params.detectionThreshold).toBeCloseTo(4.0, 5);
		expect(mapped[2].params.pollAverage).toBeCloseTo(55, 5);
		expect(mapped[3].params.prior).toBeCloseTo(99, 5);
	});

	it("at convergenceParam=0.5, maps to midpoint values", () => {
		const mapped = mapConvergenceParam(0.5);
		expect(mapped[0].params.baseRate).toBeCloseTo(5.05, 2);
		expect(mapped[1].params.detectionThreshold).toBeCloseTo(2.25, 2);
		expect(mapped[2].params.pollAverage).toBeCloseTo(50, 2);
		expect(mapped[3].params.prior).toBeCloseTo(50, 2);
	});

	it("includes all default params for each chapter", () => {
		const mapped = mapConvergenceParam(0.5);
		expect(mapped[0].params.sensitivity).toBe(95);
		expect(mapped[0].params.specificity).toBe(95);
		expect(mapped[1].params.signalStrength).toBe(1.0);
		expect(mapped[1].params.noiseStd).toBe(1.0);
		expect(mapped[2].params.marginOfError).toBe(3);
		expect(mapped[2].params.numberOfPolls).toBe(5);
		expect(mapped[3].params.evidenceStrength).toBe(3);
	});

	it("produces valid ChapterModels when passed to compute functions", () => {
		const configs = [theTest, theSignal, theForecast, theUpdate];
		const mapped = mapConvergenceParam(0.5);
		for (let i = 0; i < 4; i++) {
			const model = configs[i].compute(mapped[i].params);
			expect(model.params).toBeDefined();
			expect(model.derived).toBeDefined();
			for (const [, val] of Object.entries(model.derived)) {
				expect(Number.isFinite(val)).toBe(true);
			}
		}
	});
});
