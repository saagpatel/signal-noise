export type CellClassification =
	| "detection"
	| "false-alarm"
	| "missed"
	| "quiet";

export const WATERFALL_BINS = 100;
export const WATERFALL_ROWS = 50;
export const SIGNAL_BIN_RANGE: [number, number] = [45, 55];

/** Mulberry32 PRNG — deterministic pseudo-random numbers in [0, 1). */
export function createSeededRandom(seed: number): () => number {
	let s = seed | 0;
	return () => {
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Derive a deterministic seed from signal parameters. Threshold excluded — it only affects classification. */
export function paramSeed(signalStrength: number, noiseStd: number): number {
	return (
		Math.round(signalStrength * 1000) * 10007 + Math.round(noiseStd * 1000)
	);
}

/** Generate one row of waterfall data (Gaussian noise + optional signal). */
export function generateWaterfallRow(
	signalStrength: number,
	noiseStd: number,
	random: () => number,
	binCount: number,
	signalBinRange: [number, number],
): number[] {
	const row: number[] = [];
	for (let bin = 0; bin < binCount; bin++) {
		// Box-Muller transform for Gaussian noise
		const u1 = Math.max(1e-10, random());
		const u2 = random();
		const gaussian = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
		const noise = gaussian * noiseStd;

		const isSignalBin = bin >= signalBinRange[0] && bin < signalBinRange[1];
		row.push(isSignalBin ? noise + signalStrength : noise);
	}
	return row;
}

/** Classify a cell based on its value, threshold, and whether it contains signal. */
export function classifyCell(
	value: number,
	threshold: number,
	isSignalBin: boolean,
): CellClassification {
	const aboveThreshold = value >= threshold;
	if (isSignalBin) {
		return aboveThreshold ? "detection" : "missed";
	}
	return aboveThreshold ? "false-alarm" : "quiet";
}

/** Generate the full waterfall grid (WATERFALL_ROWS × WATERFALL_BINS). */
export function generateWaterfallData(
	signalStrength: number,
	noiseStd: number,
): number[][] {
	const random = createSeededRandom(paramSeed(signalStrength, noiseStd));
	const rows: number[][] = [];
	for (let r = 0; r < WATERFALL_ROWS; r++) {
		rows.push(
			generateWaterfallRow(
				signalStrength,
				noiseStd,
				random,
				WATERFALL_BINS,
				SIGNAL_BIN_RANGE,
			),
		);
	}
	return rows;
}
