"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheForecastContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You are a data journalist. It&apos;s the night before the election,
					and your candidate leads 52 to 48 in the polls. Your editor wants a
					headline. &ldquo;Call it,&rdquo; she says. &ldquo;Are they going to
					win?&rdquo;
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The distribution curve on your right shows what you actually know. The
					bell curve represents the range of plausible outcomes given the
					polling data. The green shaded area past 50% is the probability your
					candidate wins. Right now, it looks pretty good.
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Margin That Matters
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Drag the <strong className="text-white">Margin of Error</strong>{" "}
					slider up to 5%. Watch the curve flatten and spread. Your candidate
					still leads 52&ndash;48 in the polls, but with a 5-point margin of
					error, outcomes anywhere from 47% to 57% are plausible. The green
					shaded region shrinks. Suddenly that 4-point lead doesn&apos;t feel so
					safe.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now drag it down to 1%. The curve snaps tight. A 4-point lead with a
					1-point margin of error is nearly certain. The polling data is precise
					enough to call it.
				</p>
			</NarrativeBlock>

			{/* Section 3: Aggregation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Power of Aggregation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Here&apos;s where it gets interesting. Drag the{" "}
					<strong className="text-white">Number of Polls</strong> slider from 1
					to 50. Watch the curve narrow in real time. Each individual poll has a
					wide margin of error. But when you average 50 independent polls, the
					effective margin shrinks by a factor of seven.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The semi-transparent curves behind the main curve show what the
					distribution looked like with fewer polls. One poll: a vague hump.
					Twenty-five polls: getting sharper. Fifty polls: a spike. This is the
					central limit theorem in action &mdash; aggregation turns noise into
					signal.
				</p>
			</NarrativeBlock>

			{/* Section 4: Systematic Bias */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Fatal Flaw
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					But aggregation has a fatal flaw. Drag the{" "}
					<strong className="text-white">Systematic Bias</strong> slider to +2%.
					The entire curve shifts. Every poll overestimates your candidate by 2
					points.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					No amount of averaging can fix this. If every poll is biased in the
					same direction, fifty biased polls are just as wrong as one. The curve
					gets narrower &mdash; you become more <em>precisely wrong</em>.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is what happened in 2016 and 2020. The polls weren&apos;t random
					noise. They had a systematic bias that aggregation couldn&apos;t cure.
				</p>
			</NarrativeBlock>

			{/* Section 5: Bridge */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Three Disguises
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You&apos;ve now seen three versions of the same problem. A doctor
					deciding whether a test result is real. A radio astronomer deciding
					whether a signal is real. A journalist deciding whether a poll lead is
					real. In each case, the answer depends on how much noise surrounds the
					signal &mdash; and whether you know which direction the noise leans.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					In the next chapter, you&apos;ll learn what happens when the evidence
					arrives one piece at a time, and you have to update your beliefs as
					you go.
				</p>
			</NarrativeBlock>
		</div>
	);
}
