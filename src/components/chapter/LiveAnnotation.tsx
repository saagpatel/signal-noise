"use client";

function parseAnnotation(text: string): React.ReactNode[] {
	const parts = text.split(/(\*\*[^*]+\*\*)/g);
	return parts.map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) {
			return (
				<strong key={i} className="font-medium text-white tabular-nums">
					{part.slice(2, -2)}
				</strong>
			);
		}
		return <span key={i}>{part}</span>;
	});
}

export function LiveAnnotation({ text }: { text: string }) {
	return (
		<p className="font-serif text-base font-light leading-relaxed text-zinc-400">
			{parseAnnotation(text)}
		</p>
	);
}
