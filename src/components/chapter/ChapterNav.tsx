import Link from "next/link";
import { chapterList } from "@/chapters";
import type { ChapterConfig } from "@/types/chapter";

export function ChapterNav({ chapter }: { chapter: ChapterConfig }) {
	const idx = chapterList.findIndex((c) => c.slug === chapter.slug);
	const prev = idx > 0 ? chapterList[idx - 1] : null;
	const next = idx < chapterList.length - 1 ? chapterList[idx + 1] : null;

	return (
		<nav className="mt-24 flex items-center justify-between border-t border-border pt-8">
			{prev ? (
				<Link
					href={`/chapter/${prev.slug}`}
					className="font-mono text-sm text-muted transition-colors hover:text-white"
				>
					← {prev.title}
				</Link>
			) : (
				<span />
			)}

			<Link
				href="/"
				className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-white"
			>
				All Chapters
			</Link>

			{next ? (
				<Link
					href={`/chapter/${next.slug}`}
					className="font-mono text-sm text-muted transition-colors hover:text-white"
				>
					{next.title} →
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}
