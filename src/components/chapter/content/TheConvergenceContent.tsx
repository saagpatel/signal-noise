"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheConvergenceContent() {
	return (
		<div className="prose-section">
			{/* Section 1: The Pattern */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Models Are Not One Model
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You&apos;ve been a doctor reading test results, a radio astronomer
					scanning for signals, a data journalist calling an election, a
					Bayesian reasoner weighing evidence, a trader parsing market noise,
					and a juror evaluating witnesses. Six different rooms, six different
					problems. They all involve uncertainty, but they do not all implement
					the same equation or assign the same meaning to a slider.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					What connects them is a discipline of checking assumptions. A medical
					test depends on prevalence and error rates. A detector depends on
					overlapping distributions. A poll average depends on sampling and
					shared error. A Bayesian update depends on a prior and a likelihood
					model. Similar habits help, but the models stay distinct.
				</p>
			</NarrativeBlock>

			{/* Section 2: The Proof */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					A Comparison, Not a Proof
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the comparison sweep. As it moves from left to right, watch all
					four visualizations respond. The dot grid shifts from gray to red as
					the base rate rises. The waterfall display crosses more thresholds.
					The election curve slides past 50%. The belief meter fills.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The control maps to four unrelated parameters &mdash; base rate,
					detection threshold, poll average, and prior belief. It is a compact
					sensitivity comparison, not a shared measurement and not evidence that
					the models are mathematically identical. Ask which assumption makes
					each output move, and whether that assumption is defensible.
				</p>
			</NarrativeBlock>

			{/* Section 3: Why It Matters */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Why It Matters
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					This isn&apos;t a formula to memorize for an exam. It&apos;s a way of
					seeing. Every time you encounter a test result, a surprising headline,
					a confident prediction, or a persuasive argument, the same questions
					apply: What was the prior? How strong is the evidence? And how much
					should your belief actually move?
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The chapters taught you the failure modes. Base rate neglect makes
					accurate tests misleading. Low signal-to-noise ratios make thresholds
					treacherous. Systematic bias defeats aggregation. Correlated evidence
					masquerades as independent proof. These aren&apos;t abstract risks
					&mdash; they&apos;re the specific ways that intelligent people get
					fooled every day.
				</p>
			</NarrativeBlock>

			{/* Section 4: One Last Thing */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-400">
					The next time someone tells you a test is 95% accurate, or a stock
					moved 3%, or two witnesses agree &mdash; you&apos;ll know the question
					they forgot to ask. And you&apos;ll know the math that answers it.
				</p>
			</NarrativeBlock>
		</div>
	);
}
