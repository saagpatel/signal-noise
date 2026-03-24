import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { chapterSlugs, chapters } from "@/chapters";
import { ChapterShell } from "@/components/chapter/ChapterShell";

interface ChapterPageProps {
	params: Promise<{ slug: string }>;
}

const contentComponents: Record<string, React.ComponentType> = {
	"the-test": dynamic(
		() => import("@/components/chapter/content/TheTestContent"),
	),
};

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

	const Content = contentComponents[slug];

	if (Content) {
		return (
			<ChapterShell chapter={chapter}>
				<Content />
			</ChapterShell>
		);
	}

	return <ChapterShell chapter={chapter} />;
}
