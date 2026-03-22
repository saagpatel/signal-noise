"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref to attach to a DOM element and a boolean indicating
 * whether the element has entered the viewport. Once visible, stays visible
 * (no re-hide on scroll out — reveal is one-way).
 */
export function useIntersectionReveal(
	threshold = 0.15,
): [React.RefObject<HTMLDivElement | null>, boolean] {
	const ref = useRef<HTMLDivElement>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.unobserve(el);
				}
			},
			{ threshold },
		);

		observer.observe(el);
		return () => observer.disconnect();
	}, [threshold]);

	return [ref, isVisible];
}
