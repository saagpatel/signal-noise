import dynamic from "next/dynamic";
import type { ChapterConfig } from "@/types/chapter";
import { ChapterNav } from "./ChapterNav";

const InteractiveWidget = dynamic(
	() => import("./InteractiveWidget").then((m) => m.InteractiveWidget),
	{ ssr: false },
);

interface ChapterShellProps {
	chapter: ChapterConfig;
	children?: React.ReactNode;
}

export function ChapterShell({ chapter, children }: ChapterShellProps) {
	const hasContent = !!children;

	return (
		<article className="mx-auto max-w-7xl px-6 py-16">
			<header className="mb-16">
				<span className="font-mono text-xs tracking-widest text-muted">
					Chapter {String(chapter.number).padStart(2, "0")}
				</span>
				<h1 className="mt-3 font-serif text-5xl font-light tracking-tight sm:text-6xl">
					{chapter.title}
				</h1>
				<p className="mt-2 font-mono text-sm uppercase tracking-wider text-muted">
					{chapter.subtitle}
				</p>
			</header>

			{hasContent ? (
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:gap-16 lg:items-start">
					<div className="order-2 lg:order-1">{children}</div>
					<div className="order-1 lg:order-2 lg:sticky lg:top-8">
						<InteractiveWidget slug={chapter.slug} />
					</div>
				</div>
			) : (
				<section className="rounded-xl border border-border bg-surface p-8">
					<p className="font-serif text-lg font-light leading-relaxed text-zinc-400">
						{chapter.hook}
					</p>
					<p className="mt-6 font-mono text-sm text-muted">
						Interactive visualization coming soon.
					</p>
				</section>
			)}

			<ChapterNav chapter={chapter} />
		</article>
	);
}
