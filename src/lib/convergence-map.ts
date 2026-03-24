interface ConvergenceMapping {
	slug: string;
	primaryParam: string;
	primaryRange: [number, number];
	defaults: Record<string, number>;
}

const MAPPINGS: ConvergenceMapping[] = [
	{
		slug: "the-test",
		primaryParam: "baseRate",
		primaryRange: [0.1, 10],
		defaults: { sensitivity: 95, specificity: 95 },
	},
	{
		slug: "the-signal",
		primaryParam: "detectionThreshold",
		primaryRange: [0.5, 4.0],
		defaults: { signalStrength: 1.0, noiseStd: 1.0 },
	},
	{
		slug: "the-forecast",
		primaryParam: "pollAverage",
		primaryRange: [45, 55],
		defaults: { marginOfError: 3, numberOfPolls: 5, systematicBias: 0 },
	},
	{
		slug: "the-update",
		primaryParam: "prior",
		primaryRange: [1, 99],
		defaults: { evidenceStrength: 3, numberOfPieces: 1 },
	},
];

export const CONVERGENCE_SLUGS = MAPPINGS.map((m) => m.slug);

/** Map convergenceParam (0–1) to 4 chapter parameter sets. */
export function mapConvergenceParam(
	convergenceParam: number,
): { slug: string; params: Record<string, number> }[] {
	return MAPPINGS.map(({ slug, primaryParam, primaryRange, defaults }) => {
		const [min, max] = primaryRange;
		const primaryValue = min + convergenceParam * (max - min);
		return {
			slug,
			params: { ...defaults, [primaryParam]: primaryValue },
		};
	});
}
