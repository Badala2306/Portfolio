"use client";

import { FileDown } from "lucide-react";
import { profile } from "@/data/profile";

export default function ResumeSection() {
  return (
    <section id="resume" className="border-t border-border bg-base px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <p className="section-eyebrow text-center">07 — Resume</p>
        <h2 className="mt-3 text-center font-display text-3xl font-semibold sm:text-4xl">
          One page, no fluff
        </h2>

        <div className="glass mt-10 overflow-hidden rounded-2xl">
          <object
            data={profile.resumeFile}
            type="application/pdf"
            className="h-[600px] w-full"
            aria-label="Manan Badala's resume"
          >
            <p className="p-6 text-center text-sm text-muted">
              Your browser can&apos;t preview PDFs inlin{" "}
              <a href={profile.resumeFile} className="text-cyan underline">
                Open the resume directly
              </a>
              .
            </p>
          </object>
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href={profile.resumeFile}
            download
            className="flex items-center gap-2 rounded-lg bg-cyan px-6 py-3 font-mono text-sm font-medium text-base transition hover:bg-cyan/90"
          >
            <FileDown size={16} /> Download Resume (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
