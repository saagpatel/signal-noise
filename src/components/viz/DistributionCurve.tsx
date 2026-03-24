"use client";

import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";
import { useMemo, useRef } from "react";
import { useCanvasSize } from "@/hooks/useCanvasSize";
import { normalPDF } from "@/lib/math";
import type { ChapterModel } from "@/types/chapter";

type DistributionMode = "election" | "market";

interface ModeConfig {
	xDomain: [number, number];
	thresholdValue: number;
	thresholdLabel: string;
	winLabel: (prob: number) => string;
	xAxisLabel: string;
	getMean: (model: ChapterModel) => number;
	getStd: (model: ChapterModel) => number;
	getWinProb: (model: ChapterModel) => number;
	getOverlayData?: (model: ChapterModel) => { std: number; opacity: number }[];
	getObservationX?: (model: ChapterModel) => number | null;
	observationLabel?: string;
	xTicks: number[];
}

const MODE_CONFIGS: Record<DistributionMode, ModeConfig> = {
	election: {
		xDomain: [40, 60],
		thresholdValue: 50,
		thresholdLabel: "50%",
		winLabel: (prob) => `${(prob * 100).toFixed(1)}% win`,
		xAxisLabel: "Vote Share",
		getMean: (m) => m.derived.biasAdjustedEstimate,
		getStd: (m) => m.derived.aggregatedStd,
		getWinProb: (m) => m.derived.winProbability,
		getOverlayData: (m) => {
			const n = m.params.numberOfPolls;
			if (n <= 1) return [];
			const individualStd = m.derived.individualStd;
			const overlays: { std: number; opacity: number }[] = [];
			if (n > 2) overlays.push({ std: individualStd, opacity: 0.15 });
			const halfN = Math.max(2, Math.floor(n / 2));
			if (halfN < n)
				overlays.push({
					std: individualStd / Math.sqrt(halfN),
					opacity: 0.25,
				});
			return overlays;
		},
		xTicks: [40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
	},
	market: {
		xDomain: [-10, 10],
		thresholdValue: 0,
		thresholdLabel: "0%",
		winLabel: () => "",
		xAxisLabel: "Daily Return (%)",
		getMean: () => 0,
		getStd: (m) => m.derived.dailyStd ?? 1,
		getWinProb: () => 0,
		getObservationX: (m) => m.params.dailyMove ?? null,
		observationLabel: "Today's move",
		xTicks: [-10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10],
	},
};

const MARGIN = { top: 24, right: 20, bottom: 44, left: 16 };
const POINT_COUNT = 200;

interface DistributionCurveProps {
	model: ChapterModel;
	mode: DistributionMode;
	className?: string;
}

export function DistributionCurve({
	model,
	mode,
	className,
}: DistributionCurveProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { width, height } = useCanvasSize(containerRef);

	const modeConfig = MODE_CONFIGS[mode] ?? MODE_CONFIGS.election;

	const mean = modeConfig.getMean(model);
	const std = modeConfig.getStd(model);
	const winProb = modeConfig.getWinProb(model);
	const [xMin, xMax] = modeConfig.xDomain;

	const innerW = width - MARGIN.left - MARGIN.right;
	const innerH = height - MARGIN.top - MARGIN.bottom;

	// Generate curve points
	const curvePoints: [number, number][] = useMemo(() => {
		if (std <= 0) return [];
		const pts: [number, number][] = [];
		const step = (xMax - xMin) / POINT_COUNT;
		for (let x = xMin; x <= xMax; x += step) {
			pts.push([x, normalPDF(x, mean, std)]);
		}
		return pts;
	}, [mean, std, xMin, xMax]);

	// D3 scales
	const xScale = useMemo(
		() => scaleLinear().domain([xMin, xMax]).range([0, innerW]),
		[xMin, xMax, innerW],
	);

	const yMax = useMemo(
		() => curvePoints.reduce((max, [, y]) => Math.max(max, y), 0) * 1.1 || 1,
		[curvePoints],
	);

	const yScale = useMemo(
		() => scaleLinear().domain([0, yMax]).range([innerH, 0]),
		[yMax, innerH],
	);

	// D3 path generators → path strings
	const linePath = useMemo(() => {
		const gen = line<[number, number]>()
			.x((d) => xScale(d[0]))
			.y((d) => yScale(d[1]));
		return gen(curvePoints) ?? "";
	}, [curvePoints, xScale, yScale]);

	const winAreaPath = useMemo(() => {
		const threshold = modeConfig.thresholdValue;
		const winPoints = curvePoints.filter(([x]) => x >= threshold);
		if (winPoints.length === 0) return "";
		const gen = area<[number, number]>()
			.x((d) => xScale(d[0]))
			.y0(yScale(0))
			.y1((d) => yScale(d[1]));
		return gen(winPoints) ?? "";
	}, [curvePoints, xScale, yScale, modeConfig.thresholdValue]);

	// Overlay curves (fewer polls → wider distribution)
	const overlayCurves = useMemo(() => {
		const overlayData = modeConfig.getOverlayData?.(model) ?? [];
		return overlayData.map(({ std: oStd, opacity }) => {
			if (oStd <= 0) return { path: "", opacity };
			const pts: [number, number][] = [];
			const step = (xMax - xMin) / POINT_COUNT;
			for (let x = xMin; x <= xMax; x += step) {
				pts.push([x, normalPDF(x, mean, oStd)]);
			}
			// Use same yScale — overlay curves are always shorter than main
			const gen = line<[number, number]>()
				.x((d) => xScale(d[0]))
				.y((d) => yScale(d[1]));
			return { path: gen(pts) ?? "", opacity };
		});
	}, [model, mean, xMin, xMax, xScale, yScale, modeConfig]);

	if (width === 0 || height === 0) {
		return (
			<div className={className}>
				<div
					ref={containerRef}
					className="aspect-[3/2] w-full rounded-lg bg-zinc-900"
				/>
			</div>
		);
	}

	const thresholdX = xScale(modeConfig.thresholdValue);
	const observationValue = modeConfig.getObservationX?.(model) ?? null;
	const observationX =
		observationValue !== null ? xScale(observationValue) : null;

	return (
		<div className={className}>
			<div ref={containerRef} className="aspect-[3/2] w-full">
				<svg width={width} height={height} className="overflow-visible">
					<g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
						{/* Overlay curves (behind main) */}
						{overlayCurves.map((curve, i) => (
							<path
								key={i}
								d={curve.path}
								fill="none"
								stroke="var(--color-accent)"
								strokeWidth={1}
								opacity={curve.opacity}
							/>
						))}

						{/* Win region shading */}
						{winAreaPath && (
							<path d={winAreaPath} fill="rgba(34, 197, 94, 0.2)" />
						)}

						{/* Main curve */}
						<path
							d={linePath}
							fill="none"
							stroke="var(--color-accent)"
							strokeWidth={2}
						/>

						{/* Threshold line */}
						<line
							x1={thresholdX}
							y1={0}
							x2={thresholdX}
							y2={innerH}
							stroke="#71717a"
							strokeWidth={1}
							strokeDasharray="4 4"
						/>

						{/* Threshold label */}
						<text
							x={thresholdX}
							y={-8}
							textAnchor="middle"
							fill="#71717a"
							fontSize={11}
							fontFamily="var(--font-jetbrains), monospace"
						>
							{modeConfig.thresholdLabel}
						</text>

						{/* Win probability text */}
						{winProb > 0 && (
							<text
								x={Math.min(innerW - 10, thresholdX + 12)}
								y={16}
								textAnchor="start"
								fill="#22c55e"
								fontSize={13}
								fontFamily="var(--font-jetbrains), monospace"
								fontWeight={700}
							>
								{modeConfig.winLabel(winProb)}
							</text>
						)}

						{/* Observation line (e.g. today's market move) */}
						{observationX !== null && (
							<>
								<line
									x1={observationX}
									y1={0}
									x2={observationX}
									y2={innerH}
									stroke="#22c55e"
									strokeWidth={2}
								/>
								{modeConfig.observationLabel && (
									<text
										x={observationX}
										y={-8}
										textAnchor={observationX > innerW / 2 ? "end" : "start"}
										dx={observationX > innerW / 2 ? -6 : 6}
										fill="#22c55e"
										fontSize={11}
										fontFamily="var(--font-jetbrains), monospace"
										fontWeight={700}
									>
										{modeConfig.observationLabel}
									</text>
								)}
							</>
						)}

						{/* X axis line */}
						<line
							x1={0}
							y1={innerH}
							x2={innerW}
							y2={innerH}
							stroke="#27272a"
							strokeWidth={1}
						/>

						{/* X axis ticks */}
						{modeConfig.xTicks.map((tick) => (
							<g key={tick}>
								<line
									x1={xScale(tick)}
									y1={innerH}
									x2={xScale(tick)}
									y2={innerH + 4}
									stroke="#71717a"
									strokeWidth={1}
								/>
								<text
									x={xScale(tick)}
									y={innerH + 18}
									textAnchor="middle"
									fill="#71717a"
									fontSize={10}
									fontFamily="var(--font-jetbrains), monospace"
								>
									{tick}%
								</text>
							</g>
						))}

						{/* X axis label */}
						<text
							x={innerW / 2}
							y={innerH + 36}
							textAnchor="middle"
							fill="#71717a"
							fontSize={11}
							fontFamily="var(--font-jetbrains), monospace"
						>
							{modeConfig.xAxisLabel}
						</text>
					</g>
				</svg>
			</div>
		</div>
	);
}
