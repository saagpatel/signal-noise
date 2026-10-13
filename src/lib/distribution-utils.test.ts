import { describe, expect, it } from "vitest";
import { centralInterval } from "./distribution-utils";

describe("centralInterval", () => {
	it("returns a symmetric interval around the mean", () => {
		expect(centralInterval(0, 20 / Math.sqrt(252))).toEqual([
			-(20 / Math.sqrt(252)),
			20 / Math.sqrt(252),
		]);
	});
});
