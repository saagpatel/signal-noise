"use client";

import { useCallback } from "react";

interface ToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	label: string;
}

export function Toggle({ checked, onChange, label }: ToggleProps) {
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				onChange(!checked);
			}
		},
		[checked, onChange],
	);

	return (
		<button
			role="switch"
			aria-checked={checked}
			onClick={() => onChange(!checked)}
			onKeyDown={handleKeyDown}
			className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
		>
			<span
				className={`inline-block h-3 w-3 rounded-full border transition-colors ${
					checked ? "border-accent bg-accent" : "border-zinc-600 bg-transparent"
				}`}
			/>
			{label}
		</button>
	);
}
