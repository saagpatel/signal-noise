/** Bayesian posterior — P(H|E) = (likelihood × prior) / marginal */
export function bayesUpdate(
	prior: number,
	likelihood: number,
	marginal: number,
): number {
	return (likelihood * prior) / marginal;
}

/** Positive Predictive Value given base rate, sensitivity, specificity */
export function ppv(
	baseRate: number,
	sensitivity: number,
	specificity: number,
): number {
	const tp = sensitivity * baseRate;
	const fp = (1 - specificity) * (1 - baseRate);
	return tp / (tp + fp);
}

/** Normal distribution PDF */
export function normalPDF(x: number, mean: number, std: number): number {
	return (
		(1 / (std * Math.sqrt(2 * Math.PI))) *
		Math.exp(-0.5 * ((x - mean) / std) ** 2)
	);
}

/** Normal distribution CDF (approximation via error function) */
export function normalCDF(x: number, mean: number, std: number): number {
	return 0.5 * (1 + erf((x - mean) / (std * Math.sqrt(2))));
}

/** Abramowitz & Stegun error function approximation — accurate to 1.5e-7 */
function erf(x: number): number {
	const t = 1 / (1 + 0.3275911 * Math.abs(x));
	const poly =
		t *
		(0.254829592 +
			t *
				(-0.284496736 +
					t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
	const result = 1 - poly * Math.exp(-x * x);
	return x >= 0 ? result : -result;
}

/** Signal-to-noise ratio */
export function snr(signalPower: number, noisePower: number): number {
	return signalPower / noisePower;
}

/** False alarm rate for a detection threshold (P(noise > threshold)) */
export function falseAlarmRate(threshold: number, noiseStd: number): number {
	return 1 - normalCDF(threshold, 0, noiseStd);
}

/** Detection probability for a given threshold and signal strength */
export function detectionProbability(
	threshold: number,
	signalStrength: number,
	noiseStd: number,
): number {
	return 1 - normalCDF(threshold, signalStrength, noiseStd);
}

/** d' (d-prime) — signal detection theory sensitivity index */
export function dPrime(signalStrength: number, noiseStd: number): number {
	return signalStrength / noiseStd;
}

/** Effective margin of error after aggregating N independent polls */
export function effectiveMarginOfError(moe: number, pollCount: number): number {
	return moe / Math.sqrt(Math.max(1, pollCount));
}

// Inline assertions for known values (run at import time in dev)
console.assert(
	Math.abs(ppv(0.01, 0.95, 0.95) - 0.161) < 0.001,
	"ppv(0.01, 0.95, 0.95) should ≈ 0.161",
);
console.assert(
	Math.abs(normalCDF(0, 0, 1) - 0.5) < 0.001,
	"normalCDF(0, 0, 1) should ≈ 0.5",
);
console.assert(
	Math.abs(normalCDF(1.96, 0, 1) - 0.975) < 0.001,
	"normalCDF(1.96, 0, 1) should ≈ 0.975",
);
console.assert(
	Math.abs(dPrime(1.0, 1.0) - 1.0) < 0.001,
	"dPrime(1.0, 1.0) should = 1.0",
);
console.assert(
	Math.abs(effectiveMarginOfError(3.0, 9) - 1.0) < 0.001,
	"effectiveMarginOfError(3.0, 9) should = 1.0",
);
