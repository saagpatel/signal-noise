import { ChapterPicker } from "@/components/landing/ChapterPicker";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
	return (
		<main className="min-h-screen">
			<Hero />
			<ChapterPicker />
		</main>
	);
}
