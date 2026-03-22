import type { ChapterConfig, ChapterRegistry } from "@/types/chapter";
import theConvergence from "./the-convergence";
import theEvidence from "./the-evidence";
import theForecast from "./the-forecast";
import theMarket from "./the-market";
import theSignal from "./the-signal";
import theTest from "./the-test";
import theUpdate from "./the-update";

export const chapters: ChapterRegistry = {
	"the-test": theTest,
	"the-signal": theSignal,
	"the-forecast": theForecast,
	"the-update": theUpdate,
	"the-market": theMarket,
	"the-evidence": theEvidence,
	"the-convergence": theConvergence,
};

/** Ordered list of all chapters sorted by chapter number. */
export const chapterList: ChapterConfig[] = Object.values(chapters).sort(
	(a, b) => a.number - b.number,
);

/** All chapter slugs — used by generateStaticParams. */
export const chapterSlugs: string[] = chapterList.map((c) => c.slug);
