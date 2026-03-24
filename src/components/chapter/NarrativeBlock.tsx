"use client";

import { motion } from "framer-motion";
import { useIntersectionReveal } from "@/hooks/useIntersectionReveal";

export function NarrativeBlock({ children }: { children: React.ReactNode }) {
	const [ref, isVisible] = useIntersectionReveal(0.15);

	return (
		<div ref={ref as React.RefObject<HTMLDivElement>}>
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				animate={isVisible ? { opacity: 1, y: 0 } : {}}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="mb-12"
			>
				{children}
			</motion.div>
		</div>
	);
}
