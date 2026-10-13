import { describe, expect, it } from "vitest";
import { formatSliderValue } from "./slider-format";

describe("formatSliderValue", () => {
	it("uses the precision implied by the step", () => {
		expect(formatSliderValue(0.12, 0.01)).toBe("0.12");
		expect(formatSliderValue(1.5, 0.1)).toBe("1.5");
		expect(formatSliderValue(2.7, 1)).toBe("3");
	});
});
