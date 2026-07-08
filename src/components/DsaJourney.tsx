"use client";

import { motion } from "framer-motion";
import { dsa } from "@/data/profile";

export default function DsaJourney() {
  return (
    <section id="dsa" className="border-t border-border bg-base px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">05 — My DSA Journey</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Practicing the same muscle SQL uses
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {dsa.note}
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6"
          >
            <p className="font-mono text-xs uppercase text-cyan">Total solved</p>
            <p className="mt-1 font-display text-5xl font-semibold">
              {dsa.totalSolved}
              <span className="text-lg text-muted">+</span>
            </p>

            <div className="mt-6 flex h-3 overflow-hidden rounded-full">
              {dsa.breakdown.map((b) => (
                <div
                  key={b.label}
                  style={{
                    width: `${(b.value / dsa.totalSolved) * 100}%`,
                    backgroundColor: b.color
                  }}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-4">
              {dsa.breakdown.map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 font-mono text-xs">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: b.color }}
                  />
                  {b.label} · {b.value}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="glass rounded-2xl p-6">
            <p className="font-mono text-xs uppercase text-cyan">Topic-wise progress</p>
            <div className="mt-4 space-y-4">
              {dsa.topics.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="mb-1.5 flex justify-between font-mono text-xs">
                    <span>{t.name}</span>
                    <span className="text-muted">{t.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full rounded-full bg-cyan"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${t.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: i * 0.05 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 border-t border-border pt-10 md:grid-cols-3">
          {dsa.milestones.map((m) => (
            <div key={m.date} className="glass rounded-xl p-5">
              <p className="font-mono text-xs text-amber">{m.date}</p>
              <p className="mt-2 text-sm text-muted">{m.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
