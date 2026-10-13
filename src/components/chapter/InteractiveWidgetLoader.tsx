"use client";

import dynamic from "next/dynamic";

const InteractiveWidget = dynamic(
	() => import("./InteractiveWidget").then((m) => m.InteractiveWidget),
	{
		ssr: false,
		loading: ({ error }) => (
			<div
				role={error ? "alert" : "status"}
				className="rounded-lg bg-zinc-900 p-4 text-sm text-zinc-300"
			>
				{error
					? "The interactive widget could not load. The chapter text remains available."
					: "Loading interactive widget…"}
			</div>
		),
	},
);

export function InteractiveWidgetLoader({ slug }: { slug: string }) {
	return (
		<>
			<noscript>
				<p className="rounded-lg bg-zinc-900 p-4 text-sm text-zinc-300">
					Enable JavaScript to use the interactive controls. The chapter text is
					available without them.
				</p>
			</noscript>
			<InteractiveWidget slug={slug} />
		</>
	);
}
