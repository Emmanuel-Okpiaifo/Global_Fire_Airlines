"use client";

import { useEffect, useState } from "react";
import { pitchSlides } from "@/lib/pitch";

export function PitchDeck() {
  const [index, setIndex] = useState(0);
  const slide = pitchSlides[index];
  const last = index === pitchSlides.length - 1;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        setIndex((current) => Math.min(pitchSlides.length - 1, current + 1));
      }
      if (event.key === "ArrowLeft") {
        setIndex((current) => Math.max(0, current - 1));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-[100svh] flex-col bg-navy text-ivory">
      <div className="h-1 bg-navy-deep">
        <div
          className="h-full bg-copper transition-all"
          style={{ width: `${((index + 1) / pitchSlides.length) * 100}%` }}
        />
      </div>

      <article className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-[max(1rem,env(safe-area-inset-left))] py-8 sm:px-6 sm:py-12 2xl:max-w-6xl 2xl:py-16">
        <p className="eyebrow text-gold">
          {slide.number} · {slide.kicker}
        </p>
        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-cormorant)] text-[clamp(1.75rem,6vw,3.75rem)] leading-tight sm:mt-5 2xl:text-7xl">
          {slide.title}
        </h1>
        {slide.body && (
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone sm:mt-6 sm:text-base md:text-lg 2xl:text-xl">
            {slide.body}
          </p>
        )}
        {slide.stats && (
          <dl className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 px-4 py-5 sm:px-5 sm:py-6">
                <dt className="text-[10px] tracking-[0.16em] uppercase text-gold sm:text-[11px]">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-cormorant)] text-2xl sm:text-3xl 2xl:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {slide.points && (
          <ul className="mt-6 max-w-3xl space-y-2.5 text-sm leading-6 text-stone sm:mt-8 sm:space-y-3 2xl:text-base">
            {slide.points.map((point) => (
              <li key={point} className="border-l border-copper/50 pl-4">
                {point}
              </li>
            ))}
          </ul>
        )}
        {slide.footnote && (
          <p className="mt-6 max-w-3xl text-xs leading-5 text-stone/60 sm:mt-8">{slide.footnote}</p>
        )}
      </article>

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-3 px-[max(1rem,env(safe-area-inset-left))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-10 2xl:max-w-6xl">
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          disabled={index === 0}
          className="min-h-[44px] min-w-[44px] text-[11px] tracking-[0.18em] uppercase text-stone disabled:opacity-30"
        >
          Previous
        </button>
        <p className="text-[11px] tracking-[0.2em] uppercase text-gold">
          {index + 1} / {pitchSlides.length}
        </p>
        <button
          type="button"
          onClick={() => setIndex((current) => Math.min(pitchSlides.length - 1, current + 1))}
          disabled={last}
          className="min-h-[44px] min-w-[44px] text-[11px] tracking-[0.18em] uppercase text-gold disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
