"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCanvasSize } from "@/hooks/useCanvasSize";
import {
	classifyDot,
	computeGridLayout,
	computePositions,
	type DotCounts,
} from "@/lib/dot-grid-utils";
import type { ChapterModel } from "@/types/chapter";

const COLORS: Record<string, string> = {
	truePositive: "#ef4444",
	falseNegative: "#7f1d1d",
	falsePositive: "#f97316",
	trueNegative: "#3f3f46",
};

const LEGEND = [
	{ key: "truePositive", label: "True Positive", color: "#ef4444" },
	{ key: "falsePositive", label: "False Positive", color: "#f97316" },
	{ key: "falseNegative", label: "False Negative", color: "#7f1d1d" },
	{ key: "trueNegative", label: "True Negative", color: "#3f3f46" },
];

interface DotGridProps {
	model: ChapterModel;
	className?: string;
	compact?: boolean;
}

export function DotGrid({ model, className, compact }: DotGridProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const positionsRef = useRef<Float32Array | null>(null);
	const dirtyRef = useRef(true);
	const rafRef = useRef<number>(0);
	const dotCountRef = useRef(10_000);
	const layoutRef = useRef<ReturnType<typeof computeGridLayout> | null>(null);
	const modelDerivedRef = useRef(model.derived);
	const dprRef = useRef(1);

	const { width, height, dpr } = useCanvasSize(containerRef);

	// Keep refs in sync
	useEffect(() => {
		modelDerivedRef.current = model.derived;
		dirtyRef.current = true;
	}, [model.derived]);

	useEffect(() => {
		dprRef.current = dpr;
	}, [dpr]);

	// Detect mobile on mount (compact mode always uses reduced dot count)
	useEffect(() => {
		if (compact) {
			dotCountRef.current = 2_500;
			dirtyRef.current = true;
			return;
		}

		const mq = window.matchMedia("(max-width: 640px)");
		dotCountRef.current = mq.matches ? 2_500 : 10_000;

		const handler = (e: MediaQueryListEvent) => {
			dotCountRef.current = e.matches ? 2_500 : 10_000;
			dirtyRef.current = true;
		};
		mq.addEventListener("change", handler);
		return () => mq.removeEventListener("change", handler);
	}, [compact]);

	// Recompute positions on resize
	useEffect(() => {
		if (width === 0 || height === 0) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = width * dpr;
		canvas.height = height * dpr;

		const ctx = canvas.getContext("2d");
		if (ctx) {
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		}

		const layout = computeGridLayout(width, height, dotCountRef.current);
		layoutRef.current = layout;
		positionsRef.current = computePositions(layout, dotCountRef.current);
		dirtyRef.current = true;
	}, [width, height, dpr]);

	// rAF draw loop — stable callback, reads from refs
	const draw = useCallback(() => {
		if (!dirtyRef.current) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const canvas = canvasRef.current;
		const positions = positionsRef.current;
		const layout = layoutRef.current;
		if (!canvas || !positions || !layout) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const d = modelDerivedRef.current;
		const counts: DotCounts = {
			truePositives: d.truePositives,
			falseNegatives: d.falseNegatives,
			falsePositives: d.falsePositives,
			trueNegatives: d.trueNegatives,
			sick: d.sick,
			population: d.population,
		};

		const currentDpr = dprRef.current;
		ctx.clearRect(0, 0, canvas.width / currentDpr, canvas.height / currentDpr);

		const dotCount = dotCountRef.current;
		const dotSize = layout.dotSize;

		// Batch by color for fewer state changes
		const batches: Record<string, number[]> = {
			truePositive: [],
			falseNegative: [],
			falsePositive: [],
			trueNegative: [],
		};

		for (let i = 0; i < dotCount; i++) {
			batches[classifyDot(i, counts)].push(i);
		}

		for (const [category, indices] of Object.entries(batches)) {
			ctx.fillStyle = COLORS[category];
			for (const i of indices) {
				ctx.fillRect(positions[i * 2], positions[i * 2 + 1], dotSize, dotSize);
			}
		}

		dirtyRef.current = false;
		rafRef.current = requestAnimationFrame(draw);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		rafRef.current = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(rafRef.current);
	}, [draw]);

	return (
		<div className={className}>
			<div
				ref={containerRef}
				className="aspect-square w-full overflow-hidden rounded-lg bg-zinc-900"
				aria-label="Dot grid visualization"
				role="img"
			>
				<canvas ref={canvasRef} className="h-full w-full" />
			</div>
			{!compact && (
				<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
					{LEGEND.map((item) => (
						<div key={item.key} className="flex items-center gap-1.5">
							<div
								className="dot-legend-swatch"
								style={{ backgroundColor: item.color }}
							/>
							<span className="font-mono text-[10px] uppercase tracking-wider text-muted">
								{item.label}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
