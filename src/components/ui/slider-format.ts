export function formatSliderValue(value: number, step: number): string {
	const decimalPlaces = Math.max(0, (String(step).split(".")[1] ?? "").length);
	return value.toFixed(decimalPlaces);
}
