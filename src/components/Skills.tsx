"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/profile";

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-cyan">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="glass rounded-full px-3 py-1.5 text-xs text-ink/90"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">02 — Skills</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          The stack behind every dashboard
        </h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div className="space-y-5">
            {skills.analytics.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
              >
                <div className="mb-1.5 flex justify-between font-mono text-xs">
                  <span>{s.name}</span>
                  <span className="text-muted">{s.level}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-cyan to-amber"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.04 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-8">
            <TagGroup title="Languages" items={skills.languages} />
            <TagGroup title="Databases" items={skills.databases} />
            <TagGroup title="Tools" items={skills.tools} />
            <TagGroup title="Soft Skills" items={skills.soft} />
          </div>
        </div>
      </div>
    </section>
  );
}
