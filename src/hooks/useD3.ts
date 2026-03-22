"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

type RenderFn = (
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	dims: { width: number; height: number },
) => void;

/**
 * D3 + React bridge hook.
 * Calls renderFn with a d3.select() on the root SVG ref whenever deps change.
 * D3 is used for math/scales only — React owns child DOM elements.
 */
export function useD3(
	renderFn: RenderFn,
	deps: unknown[],
): React.RefObject<SVGSVGElement | null> {
	const ref = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!ref.current) return;
		const svg = d3.select(ref.current);
		const { width, height } = ref.current.getBoundingClientRect();
		renderFn(svg, { width, height });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return ref;
}
