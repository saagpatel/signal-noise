"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheTestContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You are a doctor. A patient sits across from you, slightly pale,
					fingers laced tight in their lap. You&apos;ve just received the
					results of a routine screening test &mdash; and it came back positive.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The test is 95% accurate. That sounds reassuring. The patient asks the
					obvious question: <em>&ldquo;So I have it?&rdquo;</em>
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Your instinct says <em>probably</em>. After all, 95% is a high number.
					But your instinct is about to betray you. The answer depends on
					something the test result alone cannot tell you &mdash; and it&apos;s
					the single most important number in all of probabilistic reasoning.
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Hidden Variable
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Look at the interactive panel. The{" "}
					<strong className="text-white">Base Rate</strong> slider is set to 1%
					&mdash; meaning one in every hundred people in the population actually
					has this disease. Now drag it down to 0.1%.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Watch what happens to the dot grid. Those orange dots? Every one of
					them is a healthy person who just received a positive test result.
					They&apos;re terrified for nothing. And they vastly outnumber the red
					dots &mdash; the people who actually have the disease.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					At a 0.1% base rate with a 95% accurate test, fewer than 2% of
					positive results are true positives. The test is still 95% accurate.
					But a positive result is almost meaningless.
				</p>
			</NarrativeBlock>

			{/* Section 3: Reveal */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Why This Happens
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Here&apos;s the mechanism. When a disease is rare, the population of
					healthy people is enormous compared to the population of sick people.
					Even a small false positive rate &mdash; that 5% error &mdash; applied
					to a massive healthy population produces a flood of false alarms.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Try dragging the <strong className="text-white">Specificity</strong>{" "}
					slider. This controls how well the test avoids false positives. Push
					it to 99% and watch the orange dots shrink. That single percentage
					point matters more than you&apos;d expect, because it&apos;s applied
					to thousands of healthy people.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now try the <strong className="text-white">Sensitivity</strong>{" "}
					slider. This controls how well the test catches real cases. Drag it
					down to 50%. The red dots thin out &mdash; the test is missing half
					the sick people &mdash; but the overall picture barely changes.
					Sensitivity matters for finding cases. Specificity matters for not
					crying wolf.
				</p>
			</NarrativeBlock>

			{/* Section 4: Deep Dive */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Equation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Toggle the equation overlay above. What you&apos;re looking at is
					Bayes&apos; theorem, written in a form called the{" "}
					<em>Positive Predictive Value</em>. It answers a single question:
					given a positive test, what&apos;s the probability the patient is
					actually sick?
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The numerator is the probability of being sick <em>and</em> testing
					positive. The denominator is the probability of testing positive{" "}
					<em>for any reason</em> &mdash; truly sick or falsely flagged. When
					the base rate is low, that denominator is dominated by false
					positives, and the fraction collapses.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag each slider and watch its corresponding term light up in the
					equation. The math isn&apos;t abstract &mdash; every symbol maps to a
					lever you can pull.
				</p>
			</NarrativeBlock>

			{/* Section 5: Takeaway */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Beyond Medicine
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					This isn&apos;t just about medical tests. Every screening system in
					the world faces this exact tradeoff. Spam filters flag legitimate
					emails. Airport security stops innocent travelers. Drug tests in
					workplaces produce false positives that cost people their jobs.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The pattern is always the same: when what you&apos;re looking for is
					rare, even an accurate detector will be wrong most of the time it
					fires. The base rate is the invisible variable that determines whether
					a positive result means anything at all.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					Sound familiar? In the next chapter, you&apos;ll see this same math
					wearing a different disguise &mdash; a radio telescope searching for
					signals in a sky full of noise.
				</p>
			</NarrativeBlock>
		</div>
	);
}
