import { describe, expect, it } from "vitest";
import {
	classifyCell,
	createSeededRandom,
	generateWaterfallData,
	generateWaterfallRow,
	paramSeed,
	SIGNAL_BIN_RANGE,
	WATERFALL_BINS,
	WATERFALL_ROWS,
} from "./waterfall-utils";

describe("createSeededRandom", () => {
	it("produces deterministic output for the same seed", () => {
		const r1 = createSeededRandom(42);
		const r2 = createSeededRandom(42);
		const seq1 = Array.from({ length: 10 }, () => r1());
		const seq2 = Array.from({ length: 10 }, () => r2());
		expect(seq1).toEqual(seq2);
	});

	it("produces different output for different seeds", () => {
		const r1 = createSeededRandom(42);
		const r2 = createSeededRandom(99);
		expect(r1()).not.toBe(r2());
	});

	it("produces values in [0, 1)", () => {
		const r = createSeededRandom(123);
		for (let i = 0; i < 1000; i++) {
			const v = r();
			expect(v).toBeGreaterThanOrEqual(0);
			expect(v).toBeLessThan(1);
		}
	});
});

describe("paramSeed", () => {
	it("returns same seed for same params", () => {
		expect(paramSeed(1.0, 1.0)).toBe(paramSeed(1.0, 1.0));
	});

	it("returns different seeds for different params", () => {
		expect(paramSeed(1.0, 1.0)).not.toBe(paramSeed(1.5, 1.0));
		expect(paramSeed(1.0, 1.0)).not.toBe(paramSeed(1.0, 1.5));
	});
});

describe("generateWaterfallRow", () => {
	it("returns array of correct length", () => {
		const random = createSeededRandom(42);
		const row = generateWaterfallRow(1.0, 1.0, random, 100, [45, 55]);
		expect(row).toHaveLength(100);
	});

	it("signal bins have higher mean than noise bins", () => {
		const random = createSeededRandom(42);
		let signalSum = 0;
		let noiseSum = 0;
		let signalCount = 0;
		let noiseCount = 0;
		for (let r = 0; r < 200; r++) {
			const row = generateWaterfallRow(2.0, 1.0, random, 100, [45, 55]);
			for (let b = 0; b < 100; b++) {
				if (b >= 45 && b < 55) {
					signalSum += row[b];
					signalCount++;
				} else {
					noiseSum += row[b];
					noiseCount++;
				}
			}
		}
		expect(signalSum / signalCount).toBeGreaterThan(noiseSum / noiseCount);
	});
});

describe("classifyCell", () => {
	it("returns detection for signal bin above threshold", () => {
		expect(classifyCell(3.0, 2.0, true)).toBe("detection");
	});

	it("returns false-alarm for noise bin above threshold", () => {
		expect(classifyCell(3.0, 2.0, false)).toBe("false-alarm");
	});

	it("returns missed for signal bin below threshold", () => {
		expect(classifyCell(1.0, 2.0, true)).toBe("missed");
	});

	it("returns quiet for noise bin below threshold", () => {
		expect(classifyCell(1.0, 2.0, false)).toBe("quiet");
	});

	it("returns detection at exact threshold for signal bin", () => {
		expect(classifyCell(2.0, 2.0, true)).toBe("detection");
	});

	it("returns false-alarm at exact threshold for noise bin", () => {
		expect(classifyCell(2.0, 2.0, false)).toBe("false-alarm");
	});
});

describe("generateWaterfallData", () => {
	it("returns correct dimensions", () => {
		const data = generateWaterfallData(1.0, 1.0);
		expect(data).toHaveLength(WATERFALL_ROWS);
		for (const row of data) {
			expect(row).toHaveLength(WATERFALL_BINS);
		}
	});

	it("is deterministic for same params", () => {
		const d1 = generateWaterfallData(1.0, 1.0);
		const d2 = generateWaterfallData(1.0, 1.0);
		expect(d1).toEqual(d2);
	});

	it("differs for different signal strength", () => {
		const d1 = generateWaterfallData(1.0, 1.0);
		const d2 = generateWaterfallData(2.0, 1.0);
		let hasDiff = false;
		for (let r = 0; r < WATERFALL_ROWS && !hasDiff; r++) {
			for (let b = 0; b < WATERFALL_BINS && !hasDiff; b++) {
				if (d1[r][b] !== d2[r][b]) hasDiff = true;
			}
		}
		expect(hasDiff).toBe(true);
	});

	it("signal bins are within expected range", () => {
		expect(SIGNAL_BIN_RANGE[0]).toBe(45);
		expect(SIGNAL_BIN_RANGE[1]).toBe(55);
	});
});
