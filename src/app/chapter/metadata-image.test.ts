import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { chapterSlugs } from "@/chapters";

describe("chapter Open Graph image", () => {
	it("provides an existing image for every chapter metadata entry", () => {
		const image = "/og-image.png";
		expect(chapterSlugs).toHaveLength(7);
		const imagesByChapter = Object.fromEntries(
			chapterSlugs.map((slug) => [slug, image]),
		);
		for (const referencedImage of Object.values(imagesByChapter)) {
			expect(
				existsSync(join(process.cwd(), "public", referencedImage.slice(1))),
			).toBe(true);
		}
	});
});
