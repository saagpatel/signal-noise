"use client";

import { useCallback, useRef } from "react";

interface SliderProps {
	min: number;
	max: number;
	step: number;
	value: number;
	onValueChange: (value: number) => void;
	label: string;
	unit?: string;
}

function clamp(value: number, min: number, max: number): number {
	return Math.min(max, Math.max(min, value));
}

function snap(value: number, min: number, step: number): number {
	return Math.round((value - min) / step) * step + min;
}

export function Slider({
	min,
	max,
	step,
	value,
	onValueChange,
	label,
	unit,
}: SliderProps) {
	const trackRef = useRef<HTMLDivElement>(null);
	const fraction = (value - min) / (max - min);

	const valueFromPointer = useCallback(
		(clientX: number) => {
			const track = trackRef.current;
			if (!track) return value;
			const rect = track.getBoundingClientRect();
			const ratio = clamp((clientX - rect.left) / rect.width, 0, 1);
			const raw = min + ratio * (max - min);
			return snap(raw, min, step);
		},
		[min, max, step, value],
	);

	const handlePointerDown = useCallback(
		(e: React.PointerEvent) => {
			e.preventDefault();
			(e.target as HTMLElement).setPointerCapture(e.pointerId);
			onValueChange(valueFromPointer(e.clientX));
		},
		[onValueChange, valueFromPointer],
	);

	const handlePointerMove = useCallback(
		(e: React.PointerEvent) => {
			if (!(e.target as HTMLElement).hasPointerCapture(e.pointerId)) return;
			onValueChange(valueFromPointer(e.clientX));
		},
		[onValueChange, valueFromPointer],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			let next = value;
			switch (e.key) {
				case "ArrowRight":
				case "ArrowUp":
					next = clamp(value + step, min, max);
					break;
				case "ArrowLeft":
				case "ArrowDown":
					next = clamp(value - step, min, max);
					break;
				case "Home":
					next = min;
					break;
				case "End":
					next = max;
					break;
				default:
					return;
			}
			e.preventDefault();
			onValueChange(snap(next, min, step));
		},
		[value, step, min, max, onValueChange],
	);

	const displayValue = step < 1 ? value.toFixed(1) : String(Math.round(value));

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-baseline justify-between">
				<label className="font-mono text-xs uppercase tracking-wider text-muted">
					{label}
				</label>
				<span className="font-mono text-sm tabular-nums text-white">
					{displayValue}
					{unit ? <span className="ml-0.5 text-muted">{unit}</span> : null}
				</span>
			</div>
			{/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
			<div
				ref={trackRef}
				role="slider"
				tabIndex={0}
				aria-label={label}
				aria-valuenow={value}
				aria-valuemin={min}
				aria-valuemax={max}
				data-slider-track
				className="relative h-11 cursor-pointer select-none rounded-lg bg-zinc-800"
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				onKeyDown={handleKeyDown}
			>
				{/* Filled track */}
				<div
					className="absolute inset-y-0 left-0 rounded-lg bg-zinc-700 transition-[width] duration-75"
					style={{ width: `${fraction * 100}%` }}
				/>
				{/* Thumb */}
				<div
					className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-canvas shadow-lg transition-[left] duration-75"
					style={{ left: `${fraction * 100}%` }}
				/>
			</div>
		</div>
	);
}
