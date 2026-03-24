"use client";

import type { ChapterModel } from "@/types/chapter";

const LEGEND = [
	{ key: "prior", label: "Prior", color: "rgba(59, 130, 246, 0.2)" },
	{ key: "posterior", label: "Posterior", color: "dynamic" },
];

interface BeliefMeterProps {
	model: ChapterModel;
	className?: string;
}

export function BeliefMeter({ model, className }: BeliefMeterProps) {
	const priorFrac = model.derived.priorFrac as number;
	const posterior = model.derived.posterior as number;
	const logOddsPosterior = model.derived.logOddsPosterior as number;

	const priorPct = (priorFrac * 100).toFixed(0);
	const posteriorPct = (posterior * 100).toFixed(1);
	const logOddsDisplay = logOddsPosterior.toFixed(2);

	// Interpolate hue from 220 (blue, low posterior) to 0 (red, high posterior)
	const hue = 220 - posterior * 220;
	const posteriorColor = `hsl(${hue}, 70%, 50%)`;

	return (
		<div className={className}>
			<div className="relative h-12 w-full overflow-hidden rounded-lg bg-zinc-900">
				{/* Ghost bar — prior */}
				<div
					className="absolute inset-y-0 left-0 bg-blue-500/20"
					style={{ width: `${priorFrac * 100}%` }}
				/>
				{/* Posterior bar */}
				<div
					className="absolute inset-y-0 left-0 transition-all duration-300"
					style={{
						width: `${posterior * 100}%`,
						backgroundColor: posteriorColor,
					}}
				/>
			</div>

			{/* Labels */}
			<div className="mt-3 flex items-baseline justify-between">
				<div className="flex gap-6">
					<span className="font-mono text-xs text-zinc-400">
						Prior: {priorPct}%
					</span>
					<span className="font-mono text-xs text-white">
						Posterior: {posteriorPct}%
					</span>
				</div>
				<span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
					log-odds: {logOddsDisplay}
				</span>
			</div>

			{/* Legend */}
			<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
				{LEGEND.map((item) => (
					<div key={item.key} className="flex items-center gap-1.5">
						<div
							className="dot-legend-swatch"
							style={{
								backgroundColor:
									item.color === "dynamic" ? posteriorColor : item.color,
							}}
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
