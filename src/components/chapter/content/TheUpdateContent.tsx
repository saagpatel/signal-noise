"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheUpdateContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You have a hunch &mdash; a 50/50 feeling about whether a new
					restaurant will still be open when you arrive. No strong reason to
					believe either way. Then a friend texts:{" "}
					<em>
						&ldquo;I drove past it twenty minutes ago. Looked packed.&rdquo;
					</em>
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					How much should that move your belief? Double it? Triple it? Your gut
					has an answer, but your gut doesn&apos;t show its work. The machinery
					of belief update is invisible to introspection &mdash; and that&apos;s
					exactly why it goes wrong so often.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Look at the interactive panel. You&apos;re starting at 50%. The
					colored bar is your belief, and the ghost behind it is where you
					started. Every slider change rewrites the bar in real time.
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Immovable Prior
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the <strong className="text-white">Prior Belief</strong> slider
					down to 1%. Now set{" "}
					<strong className="text-white">Evidence Strength</strong> to 10
					&mdash; that&apos;s overwhelming evidence, ten times more likely under
					the hypothesis than against it.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Watch the bar. It barely moves. A 1% prior absorbs a 10&times;
					likelihood ratio and lands somewhere around 9%. You threw your
					strongest evidence at near-certainty in the other direction, and the
					needle hardly budged.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is why extraordinary claims require extraordinary evidence. When
					your starting belief is close to zero, even powerful data can&apos;t
					drag it far. The prior is an anchor, and the evidence is a rope
					&mdash; not a catapult.
				</p>
			</NarrativeBlock>

			{/* Section 3: The Ratchet */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Ratchet
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Set the prior back to 50% and leave evidence strength at 3&times;. Now
					slowly drag <strong className="text-white">Evidence Pieces</strong>{" "}
					from 1 up to 10.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Watch the posterior climb. Each piece of evidence pushes the log-odds
					by the same fixed amount &mdash; it&apos;s additive. Like a ratchet:
					each click advances the mechanism by an identical step, regardless of
					where it already sits. Three pieces at 3&times; have the same log-odds
					impact as one piece at 27&times;.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is the deep insight of the log-odds form. On a probability scale,
					each update feels different &mdash; the jump from 50% to 75% looks
					bigger than 90% to 97%. But in log-odds space, both are the same sized
					step. The ratchet doesn&apos;t care where it started.
				</p>
			</NarrativeBlock>

			{/* Section 4: The Equation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Equation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Toggle the equation overlay. The log-odds form makes belief update
					beautifully simple: take your prior in log-odds, add <em>n</em> times
					the log of the likelihood ratio, and convert back. Addition, not
					multiplication. Linearity, not cascading fractions.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag each slider and watch its corresponding term light up. The{" "}
					<strong className="text-white">Prior</strong> sets the starting point.
					The <strong className="text-white">Likelihood Ratio</strong>{" "}
					determines how much each piece of evidence is worth. The{" "}
					<strong className="text-white">Evidence Pieces</strong> multiply that
					contribution &mdash; independent observations stack linearly.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is Bayes&apos; theorem in its most operational form &mdash; not a
					fraction to memorize, but a machine you feed evidence into one piece
					at a time.
				</p>
			</NarrativeBlock>

			{/* Section 5: Bridge */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					When the Noise Isn&apos;t Random
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is the same equation wearing a new disguise. In the previous
					chapters, you saw what happens when noise is statistical &mdash; false
					positives, detection thresholds, overlapping distributions. The update
					rule absorbed all of that cleanly.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					But what happens when the noise isn&apos;t random &mdash; when
					it&apos;s financial? When the evidence is a stock price, the
					likelihood ratio is a market signal, and the prior is the collective
					belief of every trader on the floor? The math still works. But the
					stakes change.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					In the next chapter, you&apos;ll feed real price data into this same
					update machinery &mdash; and discover why even perfect Bayesian
					reasoning can&apos;t save you from a market that&apos;s already priced
					in the signal.
				</p>
			</NarrativeBlock>
		</div>
	);
}
