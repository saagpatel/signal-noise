import Link from "next/link";
import { chapterList } from "@/chapters";

export function ChapterPicker() {
	return (
		<section id="chapters" className="mx-auto max-w-6xl px-6 pb-32 pt-16">
			<h2 className="mb-16 text-center font-mono text-xs uppercase tracking-[0.3em] text-muted">
				Seven Chapters
			</h2>
			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{chapterList.map((chapter) => (
					<Link
						key={chapter.slug}
						href={`/chapter/${chapter.slug}`}
						className="group rounded-xl border border-border bg-surface p-8 transition-all duration-200 hover:border-zinc-600 hover:bg-zinc-900/50"
					>
						<span className="font-mono text-xs tracking-widest text-muted">
							{String(chapter.number).padStart(2, "0")}
						</span>
						<h3 className="mt-3 font-serif text-2xl font-light tracking-tight text-white group-hover:text-accent">
							{chapter.title}
						</h3>
						<p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted">
							{chapter.subtitle}
						</p>
						<p className="mt-4 font-serif text-base font-light leading-relaxed text-zinc-400">
							{chapter.hook}
						</p>
					</Link>
				))}
			</div>
		</section>
	);
}
