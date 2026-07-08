"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#github", label: "GitHub" },
  { href: "#dsa", label: "DSA" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          {profile.name.split(" ")[0]}
          <span className="text-cyan">.</span>
        </a>

        <ul className="hidden gap-8 font-mono text-sm text-muted md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-cyan">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-ink"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="font-mono text-sm">{open ? "close" : "menu"}</span>
        </button>
      </nav>

      {open && (
        <ul className="glass mx-4 mt-2 flex flex-col gap-4 rounded-xl p-5 font-mono text-sm md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="hover:text-cyan">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
