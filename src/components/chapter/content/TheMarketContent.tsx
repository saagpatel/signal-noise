"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheMarketContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					A stock in your portfolio jumped 3% today. Your colleague calls it a
					signal &mdash; surely something happened. A new product launch, a
					leaked earnings report, insider activity. The move <em>feels</em>{" "}
					meaningful. Your finger hovers over the buy button.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					But before you act on what looks like information, you need to ask the
					question that separates disciplined investors from everyone else: how
					often would noise alone produce a move this large?
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Volatility Is the Denominator
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the <strong className="text-white">Annual Volatility</strong>{" "}
					slider up to 60%. Watch the z-score collapse. That 3% move that looked
					significant is now well within the noise band &mdash; a daily
					occurrence for a volatile stock. The distribution widens, and
					today&apos;s move becomes unremarkable.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now drag it back down to 10%. The curve tightens. The same 3% move is
					now nearly five standard deviations from zero &mdash; an event so rare
					that noise almost certainly didn&apos;t cause it. Same move, different
					context, completely different conclusion.
				</p>
			</NarrativeBlock>

			{/* Section 3: The Noise Band */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Noise Band
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					The shaded region shows where most daily moves fall by pure chance. At
					20% annual volatility, a typical day moves about 1.3% &mdash;
					that&apos;s the daily standard deviation, derived by dividing the
					annual figure by the square root of 252 trading days.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the <strong className="text-white">Trading Days</strong> slider
					to 252. Now you&apos;re asking a different question: across an entire
					year of trading, how many days would you expect to see a move this
					extreme by chance alone? Even a p-value of 0.02 means five days a
					year. What looked like a once-in-a-lifetime event happens every other
					month.
				</p>
			</NarrativeBlock>

			{/* Section 4: The Equation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Equation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Toggle the equation overlay above. The z-score tells you how many
					standard deviations today&apos;s move sits from zero. The p-value
					tells you how often noise alone would produce a move this extreme or
					more &mdash; in either direction.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag each slider and watch its term light up. The daily move is in the
					numerator &mdash; it&apos;s your observed data. The volatility is in
					the denominator &mdash; it&apos;s your noise floor. A large move
					divided by large noise is nothing. A moderate move divided by small
					noise is everything. Context is the denominator.
				</p>
			</NarrativeBlock>

			{/* Section 5: Bridge */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Pattern
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Five chapters, and the pattern is unmistakable. Every time you see a
					result that looks surprising &mdash; a positive test, a faint signal,
					a poll lead, an updated belief, a price spike &mdash; the question is
					never <em>&ldquo;is this big?&rdquo;</em> The question is always{" "}
					<em>&ldquo;is this big relative to the noise?&rdquo;</em>
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					But what about evidence that isn&apos;t independent? In the next
					chapter, you&apos;ll enter a courtroom where every piece of evidence
					is tangled with every other &mdash; and separating signal from noise
					becomes a matter of life and freedom.
				</p>
			</NarrativeBlock>
		</div>
	);
}
