"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

export function NarrativeBlock({ children }: { children: React.ReactNode }) {
	const [ref, isVisible] = useIntersectionReveal(0.15);
	const reducedMotion = useReducedMotion();

	return (
		<div ref={ref as React.RefObject<HTMLDivElement>}>
			<motion.div
				initial={false}
				animate={
					reducedMotion || isVisible
						? { opacity: 1, y: 0 }
						: { opacity: 1, y: 8 }
				}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="mb-12 motion-safe:transition-opacity"
			>
				{children}
			</motion.div>
		</div>
	);
}
