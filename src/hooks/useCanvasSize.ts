"use client";

import { useEffect, useRef, useState } from "react";

export interface CanvasSize {
	width: number;
	height: number;
	dpr: number;
}

export function useCanvasSize(
	containerRef: React.RefObject<HTMLDivElement | null>,
): CanvasSize {
	const [size, setSize] = useState<CanvasSize>({ width: 0, height: 0, dpr: 1 });
	const observerRef = useRef<ResizeObserver | null>(null);

	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		const dpr = window.devicePixelRatio || 1;

		observerRef.current = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			setSize({ width, height, dpr });
		});

		observerRef.current.observe(el);

		return () => {
			observerRef.current?.disconnect();
		};
	}, [containerRef]);

	return size;
}
