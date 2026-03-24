"use client";

import katex from "katex";
import { useEffect, useMemo, useRef } from "react";
import "katex/dist/katex.min.css";
import type { EquationTerm } from "@/types/chapter";

interface EquationOverlayProps {
	latex: string;
	terms: EquationTerm[];
	activeTermId: string | null;
}

export function EquationOverlay({
	latex,
	terms,
	activeTermId,
}: EquationOverlayProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	const html = useMemo(
		() =>
			katex.renderToString(latex, {
				trust: true,
				displayMode: true,
				throwOnError: false,
			}),
		[latex],
	);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		// Clear all highlights
		for (const term of terms) {
			const els = container.querySelectorAll(`.${term.latexClass}`);
			els.forEach((el) => el.classList.remove("equation-active"));
		}

		// Apply highlight to active term
		if (activeTermId) {
			const activeTerm = terms.find((t) => t.id === activeTermId);
			if (activeTerm) {
				const els = container.querySelectorAll(`.${activeTerm.latexClass}`);
				els.forEach((el) => el.classList.add("equation-active"));
			}
		}
	}, [activeTermId, terms]);

	return (
		<div
			ref={containerRef}
			className="rounded-lg border border-border bg-surface/50 p-6 text-center"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
