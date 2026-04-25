"use client";

import { useEffect, useRef } from "react";

const ROLES = [
  "UI/UX Enthusiast",
  "React Developer",
  "Next.js Engineer",
  "Cloud Practitioner",
  "Problem Solver",
];

export default function Hero() {
  const roleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ri = 0, ci = 0, del = false;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const w = ROLES[ri];
      if (!roleRef.current) return;
      if (!del) {
        roleRef.current.textContent = w.slice(0, ++ci);
        if (ci === w.length) {
          del = true;
          timeout = setTimeout(type, 2000);
          return;
        }
      } else {
        roleRef.current.textContent = w.slice(0, --ci);
        if (ci === 0) {
          del = false;
          ri = (ri + 1) % ROLES.length;
        }
      }
      timeout = setTimeout(type, del ? 45 : 85);
    };

    timeout = setTimeout(type, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const b1 = document.querySelector<HTMLElement>(".blob-1");
    const b2 = document.querySelector<HTMLElement>(".blob-2");

    const onMove = (e: MouseEvent) => {
      const px = (e.clientX / window.innerWidth - 0.5) * 32;
      const py = (e.clientY / window.innerHeight - 0.5) * 32;
      if (b1) b1.style.transform = `translate(${px}px,${py}px)`;
      if (b2) b2.style.transform = `translate(${-px * 0.6}px,${-py * 0.6}px)`;
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const btns = document.querySelectorAll<HTMLElement>(".mag");
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    btns.forEach((btn) => {
      const move = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        btn.style.transform = `translate(${dx}px,${dy}px)`;
      };
      const leave = () => { btn.style.transform = ""; };
      btn.addEventListener("mousemove", move);
      btn.addEventListener("mouseleave", leave);
      handlers.push({ el: btn, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section id="hero">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="hero-inner">
        <div className="hero-tag">
          <span className="pulse" />
          Available for opportunities
        </div>
        <h1 className="hname">
          <span className="hline"><span className="hline-inner">Anselmo</span></span>
          <span className="hline"><span className="hline-inner green">Ferrer.</span></span>
        </h1>
        <div className="hero-role-wrap">
          Full Stack Engineer <span className="sep">·</span>
          <span className="hero-role-line">
            <span id="hero-role" ref={roleRef} />
            <span className="cursor-blink" />
          </span>
        </div>
        <div className="hero-btns">
          <a href="#projects" className="btn-p mag">View My Work →</a>
          <a href="#contact" className="btn-g mag">Get in Touch</a>
        </div>
      </div>
      <div className="scroll-cue">
        <div className="scroll-cue-bar" />
        <span>scroll</span>
      </div>
    </section>
  );
}
