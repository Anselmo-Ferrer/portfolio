"use client";

import { useRef, useState, useEffect } from "react";

const PROJECTS = [
  {
    num: "01 / 02",
    name: "Flashwise",
    desc: "A study platform that turns user-uploaded PDFs into summaries, flashcards, and interactive quizzes — powered by LLMs. I led the full lifecycle: interface design, AI generation logic, and everything in between. Focus on accessibility and usability throughout.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Prisma", "Supabase", "LLMs"],
    href: "https://github.com/Anselmo-Ferrer",
  },
  {
    num: "02 / 02",
    name: "Hyrik",
    desc: "A job recommendation system that semantically analyzes resumes via LLMs and surfaces opportunities aligned with the candidate's skills and goals. Built with a focus on inclusion and real-world impact for early-career professionals.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "LLMs", "Semantic NLP"],
    href: "https://github.com/Anselmo-Ferrer",
  },
];

const TOTAL_CARDS = PROJECTS.length + 1;

export default function Projects() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const startX = useRef(0);
  const sl = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => {
      const cards = track.querySelectorAll<HTMLElement>(".pc");
      if (!cards.length) return;
      const trackRect = track.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cardCenter = r.left + r.width / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    drag.current = true;
    startX.current = e.pageX - (trackRef.current?.offsetLeft ?? 0);
    sl.current = trackRef.current?.scrollLeft ?? 0;
    if (trackRef.current) trackRef.current.style.userSelect = "none";
  };

  const onMouseUp = () => {
    drag.current = false;
    if (trackRef.current) trackRef.current.style.userSelect = "";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current || !trackRef.current) return;
    trackRef.current.scrollLeft =
      sl.current - (e.pageX - (trackRef.current.offsetLeft ?? 0) - startX.current) * 1.3;
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelectorAll<HTMLElement>(".pc")[index];
    if (!card) return;
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft - 20,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects">
      <div className="inner proj-header rv">
        <div className="sec-tag" data-n="02">Selected Work</div>
        <h2 className="sec-h">
          Projects
          <br />
          <span style={{ color: "var(--fg-dim)", fontSize: "0.7em", letterSpacing: "-0.02em" }}>
            — drag to explore —
          </span>
        </h2>
      </div>
      <div
        className="proj-track"
        id="ptrack"
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {PROJECTS.map((p) => (
          <div className="pc" key={p.name}>
            <div className="pc-glow" />
            <div className="pc-num">Project · {p.num}</div>
            <div className="pc-name">{p.name}</div>
            <div className="pc-desc">{p.desc}</div>
            <div className="pc-tags">
              {p.tags.map((t) => (
                <span className="ptag" key={t}>{t}</span>
              ))}
            </div>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="pc-link"
            >
              View on GitHub →
            </a>
          </div>
        ))}
        <div className="pc pc-placeholder">
          <div style={{ fontSize: "44px", color: "var(--accent)", lineHeight: 1 }}>+</div>
          <div
            style={{
              fontFamily: "var(--mono)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--fg-dim)",
            }}
          >
            More on the way
          </div>
        </div>
      </div>
      <div className="proj-dots" role="tablist" aria-label="Project navigation">
        {Array.from({ length: TOTAL_CARDS }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-label={`Go to project ${i + 1}`}
            aria-selected={activeIndex === i}
            className={`proj-dot${activeIndex === i ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
