"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, FileDown, Mail } from "lucide-react";
import ParticleGrid from "./ParticleGrid";
import { profile } from "@/data/profile";

const QUERY = `SELECT city, rent_to_sales_ratio
FROM expansion_candidates
ORDER BY estimated_consumers DESC
LIMIT 3;`;

function TypedQuery() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= QUERY.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 22);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-cyan">
      {QUERY.slice(0, shown)}
      <span className="animate-blink">▌</span>
    </pre>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-base bg-grid bg-[length:40px_40px] pt-24"
    >
      <ParticleGrid />
      <div className="absolute inset-0 bg-gradient-to-b from-base/20 via-base/70 to-base" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-eyebrow mb-4">Data Analytics · Portfolio</p>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl text-cyan sm:text-2xl">
            {profile.tagline}
          </p>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-muted">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-lg bg-cyan px-5 py-3 font-mono text-sm font-medium text-base transition hover:bg-cyan/90"
            >
              View Projects
            </a>
            <a
              href={profile.resumeFile}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-sm transition hover:border-cyan/40"
            >
              <FileDown size={16} /> Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-sm transition hover:border-cyan/40"
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-sm transition hover:border-cyan/40"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href="#contact"
              className="glass flex items-center gap-2 rounded-lg px-5 py-3 font-mono text-sm transition hover:border-cyan/40"
            >
              <Mail size={16} /> Contact
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass relative overflow-hidden rounded-2xl p-5"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#F43F5E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#F5A524]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#22D3EE]" />
            <span className="ml-2 font-mono text-xs text-muted">query.sql — running</span>
          </div>
          <TypedQuery />

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Rank 1", city: "City A" },
              { label: "Rank 2", city: "City B" },
              { label: "Rank 3", city: "City C" }
            ].map((row, i) => (
              <motion.div
                key={row.city}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.15, duration: 0.4 }}
                className="rounded-lg border border-border bg-surface p-3"
              >
                <p className="font-mono text-[10px] uppercase text-muted">{row.label}</p>
                <p className="font-display text-sm font-semibold">{row.city}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-4 font-mono text-[11px] text-muted">
            → styled after the query logic from the Monday Coffee expansion project
          </p>
        </motion.div>
      </div>
    </section>
  );
}
