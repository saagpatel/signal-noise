export type DotCategory =
	| "truePositive"
	| "falseNegative"
	| "falsePositive"
	| "trueNegative";

export interface DotCounts {
	truePositives: number;
	falseNegatives: number;
	falsePositives: number;
	trueNegatives: number;
	sick: number;
	population: number;
}

export interface GridLayout {
	cols: number;
	rows: number;
	cellWidth: number;
	cellHeight: number;
	dotSize: number;
}

/** Classify a dot by its index into one of four categories based on count ranges. */
export function classifyDot(index: number, counts: DotCounts): DotCategory {
	if (index < counts.truePositives) return "truePositive";
	if (index < counts.sick) return "falseNegative";
	if (index < counts.sick + counts.falsePositives) return "falsePositive";
	return "trueNegative";
}

/** Compute grid dimensions and dot sizing for a given container and dot count. */
export function computeGridLayout(
	containerWidth: number,
	containerHeight: number,
	dotCount: number,
): GridLayout {
	const cols = Math.ceil(Math.sqrt(dotCount));
	const rows = Math.ceil(dotCount / cols);
	const cellWidth = containerWidth / cols;
	const cellHeight = containerHeight / rows;
	const dotSize = Math.max(
		1,
		Math.floor(Math.min(cellWidth, cellHeight) * 0.7),
	);
	return { cols, rows, cellWidth, cellHeight, dotSize };
}

/** Compute (x, y) positions for all dots as a flat Float32Array. */
export function computePositions(
	layout: GridLayout,
	dotCount: number,
): Float32Array {
	const positions = new Float32Array(dotCount * 2);
	for (let i = 0; i < dotCount; i++) {
		const col = i % layout.cols;
		const row = Math.floor(i / layout.cols);
		positions[i * 2] =
			col * layout.cellWidth + (layout.cellWidth - layout.dotSize) / 2;
		positions[i * 2 + 1] =
			row * layout.cellHeight + (layout.cellHeight - layout.dotSize) / 2;
	}
	return positions;
}
