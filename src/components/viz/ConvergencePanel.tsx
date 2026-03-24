"use client";

import { useMemo } from "react";
import theForecast from "@/chapters/the-forecast";
import theSignal from "@/chapters/the-signal";
import theTest from "@/chapters/the-test";
import theUpdate from "@/chapters/the-update";
import { BeliefMeter } from "@/components/viz/BeliefMeter";
import { DistributionCurve } from "@/components/viz/DistributionCurve";
import { DotGrid } from "@/components/viz/DotGrid";
import { WaterfallDisplay } from "@/components/viz/WaterfallDisplay";
import { mapConvergenceParam } from "@/lib/convergence-map";
import type { ChapterModel } from "@/types/chapter";

interface ConvergencePanelProps {
	model: ChapterModel;
	className?: string;
}

const CHAPTER_CONFIGS = [theTest, theSignal, theForecast, theUpdate] as const;

export function ConvergencePanel({ model, className }: ConvergencePanelProps) {
	const convergenceParam = model.params.convergenceParam ?? 0.5;

	const chapterModels = useMemo(() => {
		const mapped = mapConvergenceParam(convergenceParam);
		return mapped.map((entry, i) => CHAPTER_CONFIGS[i].compute(entry.params));
	}, [convergenceParam]);

	return (
		<div className={className}>
			<div className="grid grid-cols-2 gap-4">
				<div>
					<span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
						01 The Test
					</span>
					<DotGrid model={chapterModels[0]} compact />
				</div>
				<div>
					<span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
						02 The Signal
					</span>
					<WaterfallDisplay model={chapterModels[1]} compact />
				</div>
				<div>
					<span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
						03 The Forecast
					</span>
					<DistributionCurve model={chapterModels[2]} mode="election" compact />
				</div>
				<div>
					<span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-muted">
						04 The Update
					</span>
					<BeliefMeter model={chapterModels[3]} compact />
				</div>
			</div>
		</div>
	);
}
