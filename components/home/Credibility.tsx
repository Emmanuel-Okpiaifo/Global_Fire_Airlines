"use client";

import { useEffect, useState } from "react";
import { brand } from "@/lib/brand";

export function Credibility() {
  const [memberCount, setMemberCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/leads/count")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { count?: number } | null) => {
        if (!cancelled && data && typeof data.count === "number") {
          setMemberCount(data.count);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="credibility" aria-label="Current stage">
      <div className="wrap credibility__inner">
        <ul className="credibility__list">
          {brand.credibility.lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        {memberCount !== null && memberCount > 0 && (
          <p className="credibility__count">
            <strong>{memberCount}</strong>
            <span>
              founding {memberCount === 1 ? "registration" : "registrations"} so far
            </span>
          </p>
        )}
      </div>
    </section>
  );
}
