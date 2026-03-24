import { describe, expect, it } from "vitest";
import {
	classifyDot,
	computeGridLayout,
	computePositions,
	type DotCounts,
} from "./dot-grid-utils";

const defaultCounts: DotCounts = {
	truePositives: 95,
	falseNegatives: 5,
	falsePositives: 495,
	trueNegatives: 9405,
	sick: 100,
	population: 10000,
};

describe("classifyDot", () => {
	it("returns truePositive for index 0 when truePositives > 0", () => {
		expect(classifyDot(0, defaultCounts)).toBe("truePositive");
	});

	it("returns truePositive for last index in TP range", () => {
		expect(classifyDot(94, defaultCounts)).toBe("truePositive");
	});

	it("returns falseNegative at truePositives boundary", () => {
		expect(classifyDot(95, defaultCounts)).toBe("falseNegative");
	});

	it("returns falsePositive at sick boundary", () => {
		expect(classifyDot(100, defaultCounts)).toBe("falsePositive");
	});

	it("returns trueNegative for last index", () => {
		expect(classifyDot(9999, defaultCounts)).toBe("trueNegative");
	});

	it("handles zero false negatives (sensitivity = 100%)", () => {
		const counts: DotCounts = {
			...defaultCounts,
			truePositives: 100,
			falseNegatives: 0,
		};
		expect(classifyDot(99, counts)).toBe("truePositive");
		expect(classifyDot(100, counts)).toBe("falsePositive");
	});

	it("handles zero false positives (specificity = 100%)", () => {
		const counts: DotCounts = {
			...defaultCounts,
			falsePositives: 0,
			trueNegatives: 9900,
		};
		expect(classifyDot(100, counts)).toBe("trueNegative");
	});

	it("all categories sum to population", () => {
		let tp = 0,
			fn = 0,
			fp = 0,
			tn = 0;
		for (let i = 0; i < defaultCounts.population; i++) {
			const cat = classifyDot(i, defaultCounts);
			if (cat === "truePositive") tp++;
			else if (cat === "falseNegative") fn++;
			else if (cat === "falsePositive") fp++;
			else tn++;
		}
		expect(tp).toBe(defaultCounts.truePositives);
		expect(fn).toBe(defaultCounts.falseNegatives);
		expect(fp).toBe(defaultCounts.falsePositives);
		expect(tn).toBe(defaultCounts.trueNegatives);
	});
});

describe("computeGridLayout", () => {
	it("returns 100 cols for 10000 dots", () => {
		const layout = computeGridLayout(500, 500, 10000);
		expect(layout.cols).toBe(100);
		expect(layout.rows).toBe(100);
	});

	it("returns 50 cols for 2500 dots", () => {
		const layout = computeGridLayout(500, 500, 2500);
		expect(layout.cols).toBe(50);
		expect(layout.rows).toBe(50);
	});

	it("returns dotSize greater than 0", () => {
		const layout = computeGridLayout(500, 500, 10000);
		expect(layout.dotSize).toBeGreaterThan(0);
	});

	it("cellWidth matches container / cols", () => {
		const layout = computeGridLayout(600, 400, 10000);
		expect(layout.cellWidth).toBeCloseTo(600 / layout.cols, 5);
	});
});

describe("computePositions", () => {
	it("returns Float32Array of length dotCount * 2", () => {
		const layout = computeGridLayout(500, 500, 100);
		const positions = computePositions(layout, 100);
		expect(positions).toBeInstanceOf(Float32Array);
		expect(positions.length).toBe(200);
	});

	it("all x values are within container width", () => {
		const layout = computeGridLayout(500, 500, 10000);
		const positions = computePositions(layout, 10000);
		for (let i = 0; i < 10000; i++) {
			expect(positions[i * 2]).toBeGreaterThanOrEqual(0);
			expect(positions[i * 2]).toBeLessThan(500);
		}
	});

	it("all y values are within container height", () => {
		const layout = computeGridLayout(500, 500, 10000);
		const positions = computePositions(layout, 10000);
		for (let i = 0; i < 10000; i++) {
			expect(positions[i * 2 + 1]).toBeGreaterThanOrEqual(0);
			expect(positions[i * 2 + 1]).toBeLessThan(500);
		}
	});

	it("first dot is near top-left", () => {
		const layout = computeGridLayout(500, 500, 10000);
		const positions = computePositions(layout, 10000);
		expect(positions[0]).toBeLessThan(10);
		expect(positions[1]).toBeLessThan(10);
	});
});
