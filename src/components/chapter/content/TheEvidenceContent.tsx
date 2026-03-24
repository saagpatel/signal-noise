"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheEvidenceContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You&apos;re on a jury. Two eyewitnesses independently place the
					suspect at the scene of the crime. That sounds convincing &mdash; two
					separate people, telling the same story. Your gut says guilty.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					But before you cast your vote, ask a question nobody else in the
					courtroom is asking: how independent are those witnesses, really? Did
					they see the same news coverage? Talk to the same detective? Sit in
					the same waiting room before testifying?
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The answer changes everything. And the math will show you exactly why.
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Collapse
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the <strong className="text-white">Independence</strong> slider
					to 0%. Watch the second branch of the tree collapse. The third node
					shrinks back toward the second &mdash; the posterior barely moves.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					When witnesses aren&apos;t independent &mdash; when they talked before
					testifying, or saw the same news coverage, or were interviewed by the
					same detective who inadvertently suggested details &mdash; the second
					testimony adds nothing new. It&apos;s the same information, dressed up
					as confirmation.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now drag it back to 100%. The tree opens up. The posterior jumps. Two
					truly independent witnesses are genuinely powerful. The difference
					between 0% and 100% independence isn&apos;t a detail &mdash; it&apos;s
					the entire case.
				</p>
			</NarrativeBlock>

			{/* Section 3: The Correlation Penalty */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Correlation Penalty
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is the hidden variable that changes everything. Two correlated
					witnesses are just one data point wearing a disguise. The courtroom
					counts two voices, but the math counts one piece of evidence.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Try adjusting the{" "}
					<strong className="text-white">Witness Reliability</strong> slider. A
					more reliable witness produces a stronger likelihood ratio &mdash; the
					branch of the tree thickens. But notice: even with 95% reliability,
					correlation between the two witnesses can erase almost all the gain
					from having a second one.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The same pattern appears everywhere. Polls that sample the same
					demographics. Studies that cite the same source data. News articles
					that quote each other. The number of voices matters far less than
					their independence.
				</p>
			</NarrativeBlock>

			{/* Section 4: The Equation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Equation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Toggle the equation overlay above. The exponent on the second
					likelihood ratio is the independence parameter. At 100%, it&apos;s
					full strength &mdash; the second witness carries the same evidential
					weight as the first. At 0%, it collapses to 1 &mdash; no update at
					all.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The sigma function wraps everything in a logistic curve, keeping the
					posterior probability between 0 and 1 no matter how extreme the
					evidence. The log-odds form is the natural language of Bayesian
					updating &mdash; evidence adds, it doesn&apos;t multiply.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag each slider and watch its corresponding term light up. The{" "}
					<strong className="text-white">Prior Guilt</strong> shifts the
					starting point. The{" "}
					<strong className="text-white">Witness Reliability</strong> determines
					how loud each piece of evidence is. And{" "}
					<strong className="text-white">Independence</strong> decides whether
					the second voice is truly new information &mdash; or just an echo.
				</p>
			</NarrativeBlock>

			{/* Section 5: Bridge */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Pattern
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Six chapters. Six disguises. One equation. The base rate fooled the
					doctor. Noise fooled the astronomer. Aggregation tamed the forecaster.
					Anchoring trapped the updater. Fat tails humbled the trader. And
					correlation deceived the jury.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					In the final chapter, you&apos;ll watch all six move together &mdash;
					and see that the pattern was always the same.
				</p>
			</NarrativeBlock>
		</div>
	);
}
