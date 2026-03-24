"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheConvergenceContent() {
	return (
		<div className="prose-section">
			{/* Section 1: The Pattern */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Pattern
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You&apos;ve been a doctor reading test results, a radio astronomer
					scanning for signals, a data journalist calling an election, a
					Bayesian reasoner weighing evidence, a trader parsing market noise,
					and a juror evaluating witnesses. Six different rooms, six different
					problems. And in every room, the same invisible structure determined
					who was right and who was fooled.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The structure is always the same: a prior probability, a piece of
					evidence, and a question &mdash; how much should this evidence change
					what I believe? The equation that answers this question has been
					hiding in plain sight through every chapter.
				</p>
			</NarrativeBlock>

			{/* Section 2: The Proof */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Proof
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the shared parameter slider. As it moves from left to right,
					watch all four visualizations respond. The dot grid shifts from gray
					to red as the base rate rises. The waterfall display crosses more
					thresholds. The election curve slides past 50%. The belief meter
					fills.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					One number. Four transformations. Same equation. The slider maps to a
					different parameter in each model &mdash; base rate, detection
					threshold, poll average, prior belief &mdash; but the mathematical
					structure underneath is identical. Bayes&apos; theorem doesn&apos;t
					care whether you&apos;re diagnosing patients or detecting aliens.
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
