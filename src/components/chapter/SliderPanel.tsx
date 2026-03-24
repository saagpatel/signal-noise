"use client";

import { useCallback, useEffect, useRef } from "react";
import { Slider } from "@/components/ui/Slider";
import type { SliderDef } from "@/types/chapter";

interface SliderPanelProps {
	sliders: SliderDef[];
	params: Record<string, number>;
	onParamChange: (id: string, value: number) => void;
	onActiveSliderChange: (id: string | null) => void;
}

export function SliderPanel({
	sliders,
	params,
	onParamChange,
	onActiveSliderChange,
}: SliderPanelProps) {
	const clearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const activate = useCallback(
		(id: string) => {
			if (clearTimerRef.current) {
				clearTimeout(clearTimerRef.current);
				clearTimerRef.current = null;
			}
			onActiveSliderChange(id);
		},
		[onActiveSliderChange],
	);

	const scheduleDeactivate = useCallback(() => {
		if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
		clearTimerRef.current = setTimeout(() => {
			onActiveSliderChange(null);
			clearTimerRef.current = null;
		}, 400);
	}, [onActiveSliderChange]);

	// Clean up timer on unmount
	useEffect(() => {
		return () => {
			if (clearTimerRef.current) clearTimeout(clearTimerRef.current);
		};
	}, []);

	return (
		<div className="flex flex-col gap-5" onPointerUp={scheduleDeactivate}>
			{sliders.map((slider) => (
				<div
					key={slider.id}
					onPointerDown={() => activate(slider.id)}
					onFocus={() => activate(slider.id)}
					onBlur={scheduleDeactivate}
				>
					<Slider
						min={slider.min}
						max={slider.max}
						step={slider.step}
						value={params[slider.id] ?? slider.defaultValue}
						onValueChange={(v) => onParamChange(slider.id, v)}
						label={slider.label}
						unit={slider.unit}
					/>
				</div>
			))}
		</div>
	);
}
