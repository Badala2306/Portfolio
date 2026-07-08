"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/profile";

export default function Certifications() {
  return (
    <section className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-eyebrow">06 — Certifications</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
          Learning documented
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass flex items-start gap-3 rounded-xl p-5 transition hover:border-amber/40"
            >
              <Award className="mt-0.5 flex-shrink-0 text-amber" size={20} />
              <div>
                <p className="font-display text-sm font-semibold">{c.name}</p>
                <p className="mt-1 font-mono text-xs text-muted">{c.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
