import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chapterSlugs, chapters } from "@/chapters";
import { ChapterShell } from "@/components/chapter/ChapterShell";

interface ChapterPageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return chapterSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: ChapterPageProps): Promise<Metadata> {
	const { slug } = await params;
	const chapter = chapters[slug];
	if (!chapter) return {};
	return {
		title: `${chapter.title} — Signal & Noise`,
		description: chapter.hook,
	};
}

export default async function ChapterPage({ params }: ChapterPageProps) {
	const { slug } = await params;
	const chapter = chapters[slug];
	if (!chapter) notFound();

	return <ChapterShell chapter={chapter} />;
}
