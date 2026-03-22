/** Current parameter values and computed derived values for a chapter's interactive model. */
export interface ChapterModel {
	/** Current parameter values keyed by parameterId */
	params: Record<string, number>;
	/** Derived computed values from params (what the viz and annotation read) */
	derived: Record<string, number>;
}

/** A single slider control definition. */
export interface SliderDef {
	/** Must match a key in ChapterModel.params */
	id: string;
	/** Display label, e.g. "Base Rate" */
	label: string;
	min: number;
	max: number;
	step: number;
	defaultValue: number;
	/** Unit displayed after value, e.g. "%" */
	unit?: string;
	/** Tooltip on hover */
	description?: string;
}

/** A term in the equation overlay that highlights when a slider is active. */
export interface EquationTerm {
	/** Must match a SliderDef.id */
	id: string;
	/** CSS class applied to this term's KaTeX span when active */
	latexClass: string;
}

/** Full chapter configuration — one per chapter. */
export interface ChapterConfig {
	/** URL slug, e.g. "the-test" */
	slug: string;
	/** Chapter number 1–7 */
	number: number;
	/** Display title, e.g. "The Test" */
	title: string;
	/** Subtitle, e.g. "Medical Diagnostics" */
	subtitle: string;
	/** 1–2 sentence teaser for the chapter picker card */
	hook: string;
	sliders: SliderDef[];
	/** Full KaTeX string for the equation overlay */
	equationLatex: string;
	equationTerms: EquationTerm[];
	/** Called on every slider change — returns the full ChapterModel */
	compute: (params: Record<string, number>) => ChapterModel;
	/** Returns the live annotation text shown below the visualization */
	annotation: (model: ChapterModel) => string;
}

/** Chapter registry — slug to config mapping. */
export type ChapterRegistry = Record<string, ChapterConfig>;
