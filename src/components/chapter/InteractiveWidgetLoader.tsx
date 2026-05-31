"use client";

import dynamic from "next/dynamic";

const InteractiveWidget = dynamic(
	() => import("./InteractiveWidget").then((m) => m.InteractiveWidget),
	{ ssr: false },
);

export function InteractiveWidgetLoader({ slug }: { slug: string }) {
	return <InteractiveWidget slug={slug} />;
}
