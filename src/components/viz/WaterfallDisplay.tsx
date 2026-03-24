"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCanvasSize } from "@/hooks/useCanvasSize";
import {
	type CellClassification,
	classifyCell,
	generateWaterfallData,
	paramSeed,
	SIGNAL_BIN_RANGE,
	WATERFALL_BINS,
	WATERFALL_ROWS,
} from "@/lib/waterfall-utils";
import type { ChapterModel } from "@/types/chapter";

const COLORS: Record<CellClassification, string> = {
	detection: "#22c55e",
	"false-alarm": "#f97316",
	missed: "#1e3a5f",
	quiet: "#0f0f12",
};

const LEGEND = [
	{ key: "detection", label: "True Detection", color: "#22c55e" },
	{ key: "false-alarm", label: "False Alarm", color: "#f97316" },
	{ key: "missed", label: "Missed Signal", color: "#1e3a5f" },
	{ key: "quiet", label: "Noise (quiet)", color: "#0f0f12" },
];

interface WaterfallDisplayProps {
	model: ChapterModel;
	className?: string;
}

export function WaterfallDisplay({ model, className }: WaterfallDisplayProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const waterfallDataRef = useRef<number[][] | null>(null);
	const prevSeedRef = useRef<number>(0);
	const dirtyRef = useRef(true);
	const rafRef = useRef<number>(0);
	const modelRef = useRef(model);
	const dprRef = useRef(1);

	const { width, height, dpr } = useCanvasSize(containerRef);

	// Keep model ref in sync + regenerate data when signal params change
	useEffect(() => {
		modelRef.current = model;
		const newSeed = paramSeed(
			model.params.signalStrength ?? 1.0,
			model.params.noiseStd ?? 1.0,
		);
		if (newSeed !== prevSeedRef.current) {
			waterfallDataRef.current = generateWaterfallData(
				model.params.signalStrength ?? 1.0,
				model.params.noiseStd ?? 1.0,
			);
			prevSeedRef.current = newSeed;
		}
		dirtyRef.current = true;
	}, [model]);

	// Canvas sizing
	useEffect(() => {
		if (width === 0 || height === 0) return;
		const canvas = canvasRef.current;
		if (!canvas) return;

		canvas.width = width * dpr;
		canvas.height = height * dpr;

		const ctx = canvas.getContext("2d");
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

		dprRef.current = dpr;
		dirtyRef.current = true;
	}, [width, height, dpr]);

	// Stable draw callback — reads from refs
	const draw = useCallback(() => {
		if (!dirtyRef.current) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const canvas = canvasRef.current;
		const data = waterfallDataRef.current;
		if (!canvas || !data) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const ctx = canvas.getContext("2d");
		if (!ctx) {
			rafRef.current = requestAnimationFrame(draw);
			return;
		}

		const currentDpr = dprRef.current;
		const w = canvas.width / currentDpr;
		const h = canvas.height / currentDpr;
		ctx.clearRect(0, 0, w, h);

		const threshold = modelRef.current.params.detectionThreshold ?? 2.0;
		const cellW = w / WATERFALL_BINS;
		const cellH = h / WATERFALL_ROWS;

		for (let row = 0; row < WATERFALL_ROWS; row++) {
			for (let bin = 0; bin < WATERFALL_BINS; bin++) {
				const value = data[row][bin];
				const isSignalBin =
					bin >= SIGNAL_BIN_RANGE[0] && bin < SIGNAL_BIN_RANGE[1];
				const classification = classifyCell(value, threshold, isSignalBin);
				ctx.fillStyle = COLORS[classification];
				ctx.fillRect(bin * cellW, row * cellH, cellW + 0.5, cellH + 0.5);
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
				className="aspect-[2/1] w-full overflow-hidden rounded-lg bg-zinc-900"
			>
				<canvas ref={canvasRef} className="h-full w-full" />
			</div>
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
		</div>
	);
}
