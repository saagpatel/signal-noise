"use client";

import { useCallback, useMemo, useState } from "react";
import type { ChapterConfig, ChapterModel } from "@/types/chapter";

export function useChapterModel(config: ChapterConfig) {
	const defaultParams = useMemo(
		() => Object.fromEntries(config.sliders.map((s) => [s.id, s.defaultValue])),
		[config.sliders],
	);

	const [params, setParams] = useState<Record<string, number>>(defaultParams);

	const model: ChapterModel = useMemo(
		() => config.compute(params),
		[params, config],
	);

	const setParam = useCallback(
		(id: string, value: number) =>
			setParams((prev) => ({ ...prev, [id]: value })),
		[],
	);

	const annotation = useMemo(() => config.annotation(model), [model, config]);

	return { model, params, setParam, annotation };
}
