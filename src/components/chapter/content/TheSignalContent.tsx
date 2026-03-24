"use client";

import { NarrativeBlock } from "@/components/chapter/NarrativeBlock";

export default function TheSignalContent() {
	return (
		<div className="prose-section">
			{/* Section 1: Setup */}
			<NarrativeBlock>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					You are a SETI analyst. Your radio telescope is pointed at a patch of
					sky that has been quiet for six months. The waterfall display scrolls
					endlessly &mdash; row after row of noise, rendered as a dark heatmap.
					Somewhere in that noise, there might be a signal. Your job is to
					decide when to sound the alarm.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					The display on your right simulates what you see. Each row is a moment
					in time. Each column is a frequency bin. The colors tell you what the
					algorithm decided: green means it flagged something as real. Orange
					means it flagged noise by mistake.
				</p>
			</NarrativeBlock>

			{/* Section 2: First Manipulation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Crying Wolf
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Look at the{" "}
					<strong className="text-white">Detection Threshold</strong> slider.
					It&apos;s set to 2.0&sigma; &mdash; meaning the algorithm only flags a
					frequency bin when its amplitude is more than two standard deviations
					above the noise floor. Drag it down to 1.0.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Watch what happens. Orange floods the display. The algorithm is
					flagging everything. Most of those orange cells are pure noise that
					happened to spike. You haven&apos;t found more aliens &mdash;
					you&apos;ve created more false alarms.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now drag it back up to 3.0. The orange vanishes. But so do some of the
					green cells. Real signals that were too faint got classified as noise.
					You missed them.
				</p>
			</NarrativeBlock>

			{/* Section 3: The Tradeoff */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Same Tradeoff
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					This is the same tradeoff you saw in the doctor&apos;s office. Lower
					the threshold and you catch more real signals &mdash; but you also
					catch more noise. Raise it and you get fewer false alarms &mdash; but
					you miss faint signals.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Try dragging the{" "}
					<strong className="text-white">Signal Strength</strong> slider. This
					controls how far the real signal rises above the noise floor. At 0,
					there is no signal at all &mdash; every green cell would be a mistake.
					At 3.0, the signal is unmistakable.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Now try <strong className="text-white">Noise Level</strong>. More
					noise makes everything harder. The same signal that was obvious at
					noise level 0.5 disappears into static at 2.0.
				</p>
			</NarrativeBlock>

			{/* Section 4: The Equation */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					The Equation
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					Toggle the equation overlay. The key number is <em>d&prime;</em>{" "}
					(d-prime) &mdash; the sensitivity index. It measures the gap between
					the signal distribution and the noise distribution, in units of noise.
					A d&prime; of 0 means signal and noise are indistinguishable. A
					d&prime; of 3 means the signal stands well clear.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-300">
					Watch how d&prime; changes as you drag the sliders. Signal strength
					up? d&prime; goes up. Noise level up? d&prime; goes down. The
					threshold doesn&apos;t appear in d&prime; at all &mdash; it controls
					where you draw the line, not how distinguishable the signal is.
				</p>
			</NarrativeBlock>

			{/* Section 5: Bridge */}
			<NarrativeBlock>
				<h2 className="mb-4 font-serif text-2xl font-light tracking-tight text-white">
					Drawing the Line
				</h2>
				<p className="font-serif text-lg font-light leading-relaxed text-zinc-300">
					The threshold sets your tolerance for uncertainty. Low threshold:
					you&apos;ll catch every signal, but your inbox fills with noise. High
					threshold: you&apos;ll never cry wolf, but you&apos;ll miss the faint
					whisper that could change everything.
				</p>
				<p className="mt-4 font-serif text-lg font-light leading-relaxed text-zinc-400">
					This tradeoff appears everywhere. Next, you&apos;ll see it on election
					night &mdash; where the noise isn&apos;t random static but systematic
					polling error, and the stakes are a democracy.
				</p>
			</NarrativeBlock>
		</div>
	);
}
