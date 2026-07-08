"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { profile } from "@/data/profile";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  // Submissions are delivered straight to profile.email via Web3Forms —
  // a free form-relay service that needs no backend code and no login,
  // just an access key emailed to you once. See README "Wiring up Contact"
  // for how to get your own key. Falls back to opening the visitor's mail
  // client if no key has been configured yet.
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!accessKey) {
      const subject = encodeURIComponent(`Portfolio inquiry from ${form.name || "a visitor"}`);
      const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio inquiry from ${form.name}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatus("sent");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <p className="section-eyebrow">08 — Contact</p>
        <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
         Let&apos;s talk data
        </h2>
        <p className="mt-3 max-w-xl text-sm text-muted">
          Open to Data Analytics, Business Analysis, and BI internships. Messages sent below
          go straight to my inbox — or reach me directly through the links.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_0.8fr]">
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass space-y-4 rounded-2xl p-6"
          >
            <div>
              <label htmlFor="name" className="font-mono text-xs text-muted">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-cyan"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-xs text-muted">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-cyan"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-xs text-muted">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-cyan"
                placeholder="What are you hiring for?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan px-5 py-3 font-mono text-sm font-medium text-base transition hover:bg-cyan/90 disabled:opacity-60"
            >
              <Send size={16} />
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {status === "sent" && (
              <p className="flex items-center gap-2 font-mono text-xs text-cyan">
                <CheckCircle2 size={14} /> Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 font-mono text-xs text-amber">
                <AlertCircle size={14} /> Something went wrong — email me directly at{" "}
                {profile.email}.
              </p>
            )}
            {!accessKey && (
              <p className="font-mono text-[11px] text-muted">
                Form relay isn&apos;t configured yet — submitting will open your mail client
               instead. See README &quot;Wiring up Contact&quot;.
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="glass flex flex-col justify-center gap-5 rounded-2xl p-6"
          >
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm transition hover:text-cyan">
              <Mail size={18} /> {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition hover:text-cyan"
            >
              <Github size={18} /> github.com/{profile.githubUsername}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition hover:text-cyan"
            >
              <Linkedin size={18} /> linkedin.com/in/manan-badala-0a4488297
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
