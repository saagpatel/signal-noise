import type { ChapterConfig } from "@/types/chapter";
import { ChapterNav } from "./ChapterNav";

export function ChapterShell({ chapter }: { chapter: ChapterConfig }) {
	return (
		<article className="mx-auto max-w-4xl px-6 py-16">
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

			<section className="rounded-xl border border-border bg-surface p-8">
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-400">
					{chapter.hook}
				</p>
				<p className="mt-6 font-mono text-sm text-muted">
					Interactive visualization coming in Phase 1.
				</p>
			</section>

			<ChapterNav chapter={chapter} />
		</article>
	);
}
