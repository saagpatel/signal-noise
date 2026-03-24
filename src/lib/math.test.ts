import { describe, expect, it } from "vitest";
import {
	bayesUpdate,
	detectionProbability,
	dPrime,
	effectiveMarginOfError,
	falseAlarmRate,
	fromLogOdds,
	normalCDF,
	normalPDF,
	ppv,
	pValueTwoTailed,
	snr,
	toLogOdds,
} from "./math";

describe("bayesUpdate", () => {
	it("computes P(H|E) correctly", () => {
		// P(H)=0.5, P(E|H)=0.8, P(E)=0.5 → P(H|E)=0.8
		expect(bayesUpdate(0.5, 0.8, 0.5)).toBeCloseTo(0.8, 5);
	});

	it("returns prior when likelihood equals marginal", () => {
		expect(bayesUpdate(0.3, 0.6, 0.6)).toBeCloseTo(0.3, 5);
	});
});

describe("ppv", () => {
	it("returns ~0.161 for 1% base rate, 95% sensitivity, 95% specificity", () => {
		expect(ppv(0.01, 0.95, 0.95)).toBeCloseTo(0.161, 2);
	});

	it("returns 1.0 for perfect specificity", () => {
		expect(ppv(0.01, 0.95, 1.0)).toBeCloseTo(1.0, 5);
	});

	it("increases with higher base rate", () => {
		const low = ppv(0.01, 0.95, 0.95);
		const high = ppv(0.1, 0.95, 0.95);
		expect(high).toBeGreaterThan(low);
	});
});

describe("normalPDF", () => {
	it("peaks at the mean", () => {
		const atMean = normalPDF(0, 0, 1);
		const offMean = normalPDF(1, 0, 1);
		expect(atMean).toBeGreaterThan(offMean);
	});

	it("returns ~0.3989 at standard normal peak", () => {
		expect(normalPDF(0, 0, 1)).toBeCloseTo(0.3989, 3);
	});

	it("is symmetric around the mean", () => {
		expect(normalPDF(-2, 0, 1)).toBeCloseTo(normalPDF(2, 0, 1), 10);
	});
});

describe("normalCDF", () => {
	it("returns ~0.5 at the mean", () => {
		expect(normalCDF(0, 0, 1)).toBeCloseTo(0.5, 3);
	});

	it("returns ~0.975 at z=1.96", () => {
		expect(normalCDF(1.96, 0, 1)).toBeCloseTo(0.975, 2);
	});

	it("returns ~0.025 at z=-1.96", () => {
		expect(normalCDF(-1.96, 0, 1)).toBeCloseTo(0.025, 2);
	});

	it("approaches 1 for large positive z", () => {
		expect(normalCDF(5, 0, 1)).toBeGreaterThan(0.999);
	});

	it("approaches 0 for large negative z", () => {
		expect(normalCDF(-5, 0, 1)).toBeLessThan(0.001);
	});
});

describe("snr", () => {
	it("returns ratio of signal to noise power", () => {
		expect(snr(10, 2)).toBeCloseTo(5, 5);
	});
});

describe("falseAlarmRate", () => {
	it("decreases as threshold increases", () => {
		const low = falseAlarmRate(1, 1);
		const high = falseAlarmRate(3, 1);
		expect(high).toBeLessThan(low);
	});

	it("returns ~0.5 when threshold is 0", () => {
		expect(falseAlarmRate(0, 1)).toBeCloseTo(0.5, 2);
	});
});

describe("detectionProbability", () => {
	it("increases with signal strength", () => {
		const weak = detectionProbability(2, 1, 1);
		const strong = detectionProbability(2, 3, 1);
		expect(strong).toBeGreaterThan(weak);
	});

	it("decreases as threshold increases", () => {
		const low = detectionProbability(1, 2, 1);
		const high = detectionProbability(3, 2, 1);
		expect(high).toBeLessThan(low);
	});

	it("returns ~0.5 when threshold equals signal strength", () => {
		expect(detectionProbability(2, 2, 1)).toBeCloseTo(0.5, 2);
	});
});

describe("dPrime", () => {
	it("returns signal/noise ratio", () => {
		expect(dPrime(2, 1)).toBe(2);
	});

	it("returns 1 when signal equals noise", () => {
		expect(dPrime(1.5, 1.5)).toBeCloseTo(1, 5);
	});

	it("returns 0 when signal is 0", () => {
		expect(dPrime(0, 1)).toBe(0);
	});
});

describe("effectiveMarginOfError", () => {
	it("returns moe/sqrt(n)", () => {
		expect(effectiveMarginOfError(3, 9)).toBeCloseTo(1, 5);
	});

	it("returns moe unchanged for 1 poll", () => {
		expect(effectiveMarginOfError(3, 1)).toBe(3);
	});

	it("decreases as poll count increases", () => {
		const few = effectiveMarginOfError(3, 5);
		const many = effectiveMarginOfError(3, 50);
		expect(many).toBeLessThan(few);
	});

	it("guards against 0 polls", () => {
		expect(effectiveMarginOfError(3, 0)).toBe(3);
	});
});

describe("toLogOdds", () => {
	it("returns 0 for 50% probability", () => {
		expect(toLogOdds(0.5)).toBeCloseTo(0, 5);
	});

	it("returns positive for p > 0.5", () => {
		expect(toLogOdds(0.75)).toBeGreaterThan(0);
	});

	it("returns negative for p < 0.5", () => {
		expect(toLogOdds(0.25)).toBeLessThan(0);
	});

	it("clamps near-zero probabilities", () => {
		expect(Number.isFinite(toLogOdds(0))).toBe(true);
	});

	it("clamps near-one probabilities", () => {
		expect(Number.isFinite(toLogOdds(1))).toBe(true);
	});
});

describe("fromLogOdds", () => {
	it("returns 0.5 for log-odds 0", () => {
		expect(fromLogOdds(0)).toBeCloseTo(0.5, 5);
	});

	it("returns > 0.5 for positive log-odds", () => {
		expect(fromLogOdds(1)).toBeGreaterThan(0.5);
	});

	it("round-trips with toLogOdds", () => {
		expect(fromLogOdds(toLogOdds(0.75))).toBeCloseTo(0.75, 5);
		expect(fromLogOdds(toLogOdds(0.1))).toBeCloseTo(0.1, 5);
		expect(fromLogOdds(toLogOdds(0.99))).toBeCloseTo(0.99, 3);
	});

	it("approaches 1 for large positive log-odds", () => {
		expect(fromLogOdds(10)).toBeGreaterThan(0.999);
	});

	it("approaches 0 for large negative log-odds", () => {
		expect(fromLogOdds(-10)).toBeLessThan(0.001);
	});
});

describe("pValueTwoTailed", () => {
	it("returns ~0.05 for z=1.96", () => {
		expect(pValueTwoTailed(1.96)).toBeCloseTo(0.05, 2);
	});

	it("returns ~1.0 for z=0", () => {
		expect(pValueTwoTailed(0)).toBeCloseTo(1.0, 2);
	});

	it("is symmetric (same for +z and -z)", () => {
		expect(pValueTwoTailed(2)).toBeCloseTo(pValueTwoTailed(-2), 10);
	});

	it("decreases as |z| increases", () => {
		expect(pValueTwoTailed(3)).toBeLessThan(pValueTwoTailed(2));
	});
});
