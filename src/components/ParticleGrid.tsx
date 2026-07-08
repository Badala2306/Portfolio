"use client";

import { useEffect, useRef } from "react";

// Lightweight canvas animation: a field of "data points" that drift and
// link into short-lived edges when close — evoking a live query graph /
// scatterplot rather than generic decorative particles. Chosen instead of
// a heavy Three.js scene to keep the hero fast on low-end devices.
export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const COUNT = Math.min(70, Math.floor((width * height) / 18000));
    type Point = { x: number; y: number; vx: number; vy: number; r: number };
    const points: Point[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6
    }));

    const LINK_DIST = Math.min(140, width / 6);
    let raf = 0;
    let mouse = { x: -9999, y: -9999 };

    function onResize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    }
    function onMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => (mouse = { x: -9999, y: -9999 }));

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of points) {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const boosted = distToMouse < 100;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, boosted ? p.r * 2.2 : p.r, 0, Math.PI * 2);
        ctx!.fillStyle = boosted ? "#F5A524" : "#22D3EE";
        ctx!.globalAlpha = boosted ? 0.9 : 0.55;
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx!.strokeStyle = `rgba(34, 211, 238, ${0.12 * (1 - dist / LINK_DIST)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
