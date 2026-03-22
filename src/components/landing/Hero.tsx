export function Hero() {
	return (
		<section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
			<p className="mb-6 font-mono text-sm uppercase tracking-[0.3em] text-muted">
				An Interactive Essay
			</p>
			<h1 className="max-w-3xl font-serif text-5xl font-light leading-tight tracking-tight sm:text-7xl md:text-8xl">
				Signal <span className="font-serif italic text-accent">&amp;</span>{" "}
				Noise
			</h1>
			<p className="mt-8 max-w-xl font-serif text-xl font-light leading-relaxed text-zinc-400 sm:text-2xl">
				Seven chapters on the math hiding inside every decision you make. Drag
				the sliders. Watch the numbers move. See what you&apos;ve been missing.
			</p>
			<a
				href="#chapters"
				className="mt-16 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-muted transition-colors duration-200 hover:text-white"
			>
				Begin
				<span className="animate-bounce" aria-hidden="true">
					↓
				</span>
			</a>
		</section>
	);
}
