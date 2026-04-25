"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    const dot = document.getElementById("c-dot");
    const ring = document.getElementById("c-ring");
    const glow = document.getElementById("c-glow");
    if (!dot || !ring || !glow) return;

    let mx = 0, my = 0, rx = 0, ry = 0, gx = 0, gy = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
    };

    const follow = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      gx += (mx - gx) * 0.07;
      gy += (my - gy) * 0.07;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      glow.style.left = gx + "px";
      glow.style.top = gy + "px";
      rafId = requestAnimationFrame(follow);
    };

    document.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(follow);

    const hoverEls = document.querySelectorAll("a, button, .sp, .ptag");
    const addHover = () => document.body.classList.add("hovering");
    const removeHover = () => document.body.classList.remove("hovering");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      <div id="c-dot" />
      <div id="c-ring" />
      <div id="c-glow" />
    </>
  );
}
