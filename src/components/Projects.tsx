"use client";

import { motion } from "framer-motion";
import { Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/profile";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-border bg-base px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">03 — Projects</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Five projects, five business questions answered
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Add a new project by appending an object to the{" "}
          <code className="font-mono text-cyan">projects</code> array in{" "}
          <code className="font-mono text-cyan">src/data/profile.ts</code>.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="glass group flex flex-col justify-between rounded-2xl p-6 transition hover:border-cyan/40"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-muted transition group-hover:text-cyan"
                    aria-label={`Open ${p.title} on GitHub`}
                  >
                    <ArrowUpRight size={18} />
                  </a>
                </div>
                <p className="mt-2 text-[13px] leading-relaxed text-muted">
                  {p.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2 text-xs text-ink/80">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[10px] text-cyan"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-mono text-xs text-muted transition hover:text-cyan"
                >
                  <Github size={14} /> Code
                </a>
              </div>
              <p className="mt-3 font-mono text-[11px] text-amber">{p.metric}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
