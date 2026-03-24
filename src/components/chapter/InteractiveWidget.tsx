"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { chapters } from "@/chapters";
import { Toggle } from "@/components/ui/Toggle";
import { DotGrid } from "@/components/viz/DotGrid";
import { useChapterModel } from "@/hooks/useChapterModel";
import { LiveAnnotation } from "./LiveAnnotation";
import { SliderPanel } from "./SliderPanel";

const EquationOverlay = dynamic(
	() => import("./EquationOverlay").then((m) => m.EquationOverlay),
	{ ssr: false },
);

export function InteractiveWidget({ slug }: { slug: string }) {
	const config = chapters[slug];
	const { model, params, setParam, annotation } = useChapterModel(config);
	const [activeSlider, setActiveSlider] = useState<string | null>(null);
	const [showEquation, setShowEquation] = useState(false);

	return (
		<div className="flex flex-col gap-6">
			<SliderPanel
				sliders={config.sliders}
				params={params}
				onParamChange={setParam}
				onActiveSliderChange={setActiveSlider}
			/>

			<DotGrid model={model} />

			<LiveAnnotation text={annotation} />

			<div className="flex items-center justify-between">
				<Toggle
					checked={showEquation}
					onChange={setShowEquation}
					label={showEquation ? "Hide Equation" : "Show Equation"}
				/>
			</div>

			{showEquation && config.equationLatex && (
				<EquationOverlay
					latex={config.equationLatex}
					terms={config.equationTerms}
					activeTermId={activeSlider}
				/>
			)}
		</div>
	);
}
