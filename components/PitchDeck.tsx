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

      <article className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-12">
        <p className="eyebrow text-gold">
          {slide.number} · {slide.kicker}
        </p>
        <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-cormorant)] text-4xl leading-tight md:text-6xl">
          {slide.title}
        </h1>
        {slide.body && (
          <p className="mt-6 max-w-3xl text-base leading-7 text-stone md:text-lg">
            {slide.body}
          </p>
        )}
        {slide.stats && (
          <dl className="mt-10 grid gap-4 sm:grid-cols-3">
            {slide.stats.map((stat) => (
              <div key={stat.label} className="border border-white/10 px-5 py-6">
                <dt className="text-[11px] tracking-[0.16em] uppercase text-gold">
                  {stat.label}
                </dt>
                <dd className="mt-2 font-[family-name:var(--font-cormorant)] text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
        {slide.points && (
          <ul className="mt-8 max-w-3xl space-y-3 text-sm leading-6 text-stone">
            {slide.points.map((point) => (
              <li key={point} className="border-l border-copper/50 pl-4">
                {point}
              </li>
            ))}
          </ul>
        )}
        {slide.footnote && (
          <p className="mt-8 max-w-3xl text-xs leading-5 text-stone/60">{slide.footnote}</p>
        )}
      </article>

      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pb-10">
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          disabled={index === 0}
          className="text-[11px] tracking-[0.18em] uppercase text-stone disabled:opacity-30"
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
          className="text-[11px] tracking-[0.18em] uppercase text-gold disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}
