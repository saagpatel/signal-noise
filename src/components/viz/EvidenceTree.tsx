"use client";

import { hierarchy, tree } from "d3-hierarchy";
import { interpolateRgb } from "d3-interpolate";
import { useMemo, useRef } from "react";
import { useCanvasSize } from "@/hooks/useCanvasSize";
import type { ChapterModel } from "@/types/chapter";

interface TreeNodeData {
	name: string;
	probability: number;
	lr: number;
	children?: TreeNodeData[];
}

const MARGIN = { top: 32, right: 60, bottom: 32, left: 60 };

const LEGEND = [
	{ label: "Low probability", color: "#3b82f6" },
	{ label: "High probability", color: "#ef4444" },
	{ label: "Branch = evidence strength", color: "#71717a" },
];

const colorScale = interpolateRgb("#3b82f6", "#ef4444");

interface EvidenceTreeProps {
	model: ChapterModel;
	className?: string;
}

export function EvidenceTree({ model, className }: EvidenceTreeProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { width, height } = useCanvasSize(containerRef);

	const innerWidth = width - MARGIN.left - MARGIN.right;
	const innerHeight = height - MARGIN.top - MARGIN.bottom;

	const layoutData = useMemo(() => {
		if (innerWidth <= 0 || innerHeight <= 0) return null;

		const d = model.derived;

		const rootData: TreeNodeData = {
			name: "Prior",
			probability: d.priorFrac,
			lr: 1,
			children: [
				{
					name: "After Witness 1",
					probability: d.posteriorAfterFirst,
					lr: d.lr1,
					children: [
						{
							name: "After Both",
							probability: d.posteriorGuilt,
							lr: d.lr2,
						},
					],
				},
			],
		};

		const root = hierarchy(rootData);

		const treeLayout = tree<TreeNodeData>().size([innerHeight, innerWidth]);
		treeLayout(root);

		return root;
	}, [model.derived, innerWidth, innerHeight]);

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

	return (
		<div className={className}>
			<div ref={containerRef} className="aspect-[3/2] w-full">
				<svg width={width} height={height} className="overflow-visible">
					<g transform={`translate(${MARGIN.left},${MARGIN.top})`}>
						{layoutData?.links().map((link, i) => {
							// Horizontal tree: swap x/y from d3 layout
							const sx = link.source.y ?? 0;
							const sy = link.source.x ?? 0;
							const tx = link.target.y ?? 0;
							const ty = link.target.x ?? 0;
							const midX = (sx + tx) / 2;

							const lr = link.target.data.lr;
							const strokeWidth = Math.max(
								2,
								Math.min(12, Math.log(lr + 1) * 4),
							);

							return (
								<path
									key={i}
									d={`M ${sx},${sy} C ${midX},${sy} ${midX},${ty} ${tx},${ty}`}
									fill="none"
									stroke="#71717a"
									strokeWidth={strokeWidth}
									opacity={0.7}
								/>
							);
						})}

						{layoutData?.descendants().map((node, i) => {
							// Horizontal tree: swap x/y
							const nx = node.y ?? 0;
							const ny = node.x ?? 0;
							const p = node.data.probability;
							const r = 18 + p * 18;
							const pct = (p * 100).toFixed(1);

							return (
								<g key={i} transform={`translate(${nx},${ny})`}>
									<circle
										r={r}
										fill={colorScale(p)}
										stroke="white"
										strokeWidth={1.5}
									/>
									<text
										dy="0.35em"
										textAnchor="middle"
										fill="white"
										fontWeight={700}
										fontSize={12}
										fontFamily="var(--font-jetbrains), monospace"
									>
										{pct}%
									</text>
									<text
										y={r + 16}
										textAnchor="middle"
										fill="#a1a1aa"
										fontSize={10}
										fontFamily="var(--font-jetbrains), monospace"
									>
										{node.data.name}
									</text>
								</g>
							);
						})}
					</g>
				</svg>
			</div>

			<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
				{LEGEND.map((item) => (
					<div key={item.label} className="flex items-center gap-1.5">
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
