"use client";

import { motion } from "framer-motion";
import { achievements, education, profile } from "@/data/profile";

export default function About() {
  return (
    <section id="about" className="relative border-t border-border bg-base px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">01 — About</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Turning <span className="text-gradient">raw data</span> into decisions
        </h2>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-[15px] leading-relaxed text-muted"
          >
            <p>
             I&apos;m an Electronics and Computer Engineering student at Thapar Institute of
              Engineering and Technology, but the work I keep coming back to is analytics:
              framing a business question, writing the SQL to answer it, and shaping the
              result into something a stakeholder can act on in under a minute.
            </p>
            <p>
              My core strength is SQL and Excel — multi-table joins, CTEs, window functions,
              PivotTables, and Power Query all show up across my projects because they&apos;re the
              tools I reach for first. I&apos;m extending that into Power BI and Python, using both
              in live dashboard and automation work rather than treating them as boxes to tick.
            </p>
            <p>
              What I enjoy most is the middle step most people skip: cleaning the data properly
              before visualizing it. Every dashboard on this site started as a messy export with
              nulls, duplicates, or inconsistent formatting — the interesting part is making it
              trustworthy before it&apos;s pretty.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="glass rounded-2xl p-6"
          >
            <p className="font-mono text-xs uppercase tracking-wide text-cyan">Education</p>
            <p className="mt-2 font-display text-lg font-semibold">{education.degree}</p>
            <p className="text-sm text-muted">{education.university}</p>
            <p className="text-sm text-muted">{education.location}</p>
            <div className="mt-4 flex justify-between border-t border-border pt-4 font-mono text-sm">
              <span className="text-muted">CGPA</span>
              <span className="text-amber">{education.cgpa}</span>
            </div>
            <div className="flex justify-between font-mono text-sm">
              <span className="text-muted">Graduating</span>
              <span>{education.graduation}</span>
            </div>

            <p className="mt-6 font-mono text-xs uppercase tracking-wide text-cyan">
              Highlights
            </p>
            <ul className="mt-2 space-y-2">
              {achievements.map((a) => (
                <li key={a} className="flex gap-2 text-sm text-muted">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan" />
                  {a}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
