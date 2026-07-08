"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { profile } from "@/data/profile";

type GithubStatsData = {
  stats: {
    totalStars: number;
    totalContributions: number;
    publicRepos: number;
    followers: number;
  };
  topLanguages: Array<{
    name: string;
    color: string;
  }>;
  streak: {
    current: number;
    longest: number;
    totalContributions: number;
  };
  calendar: Array<{
    date: string;
    contributionCount: number;
  }>;
};

const u = profile.githubUsername;

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: value >= 1000 ? "compact" : "standard" }).format(
    value
  );
}

function CardShell({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl border border-border bg-surface-2 p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function LoadingCard() {
  return (
    <CardShell>
      <div className="h-4 w-32 rounded bg-border" />
      <div className="mt-6 grid grid-cols-2 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-7 w-16 rounded bg-border" />
            <div className="mt-2 h-3 w-20 rounded bg-border" />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function StatsCard({ data }: { data: GithubStatsData }) {
  const stats = [
    { label: "Total Stars", value: data.stats.totalStars },
    { label: "Total Contributions", value: data.stats.totalContributions },
    { label: "Public Repos", value: data.stats.publicRepos },
    { label: "Followers", value: data.stats.followers }
  ];

  return (
    <CardShell>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-cyan">GitHub Stats</h3>
        <Github size={18} className="text-amber" />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="font-display text-2xl font-semibold">{formatNumber(stat.value)}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

function TopLanguagesCard({ data }: { data: GithubStatsData }) {
  return (
    <CardShell>
      <h3 className="font-display text-lg font-semibold text-cyan">Languages I Work With</h3>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {data.topLanguages.length ? (
          data.topLanguages.map((language) => (
            <span
              key={language.name}
              className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 font-mono text-xs text-ink/90"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: language.color }}
              />
              {language.name}
            </span>
          ))
        ) : (
          <p className="text-sm text-muted">Language data is not available yet.</p>
        )}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted">
        Core languages used across analytics, coursework, dashboards, and web projects.
      </p>
    </CardShell>
  );
}

function StreakCard({ data }: { data: GithubStatsData }) {
  return (
    <CardShell className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-cyan">GitHub Streak</h3>
          <p className="mt-2 text-sm text-muted">
            Based on the official GitHub contribution calendar.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-display text-3xl font-semibold text-amber">
              {data.streak.current}
            </p>
            <p className="font-mono text-[11px] text-muted">Current</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold text-cyan">
              {data.streak.longest}
            </p>
            <p className="font-mono text-[11px] text-muted">Longest</p>
          </div>
          <div>
            <p className="font-display text-3xl font-semibold">
              {formatNumber(data.streak.totalContributions)}
            </p>
            <p className="font-mono text-[11px] text-muted">Total</p>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

function contributionColor(count: number) {
  if (count === 0) return "#1F2937";
  if (count < 2) return "#0E7490";
  if (count < 5) return "#22D3EE";
  if (count < 10) return "#67E8F9";
  return "#F5A524";
}

function HeatmapCard({ data }: { data: GithubStatsData }) {
  const days = useMemo(() => data.calendar.slice(-371), [data.calendar]);

  return (
    <CardShell className="mt-6 overflow-hidden">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold text-cyan">
          GitHub Contribution Heatmap
        </h3>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
          <span>Less</span>
          {[0, 1, 4, 8, 12].map((count) => (
            <span
              key={count}
              className="h-3 w-3 rounded-sm"
              style={{ backgroundColor: contributionColor(count) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>

      {days.length ? (
        <div className="grid grid-flow-col grid-rows-7 gap-1 overflow-x-auto rounded-lg bg-base/30 p-3">
          {days.map((day) => (
            <span
              key={day.date}
              title={`${day.date}: ${day.contributionCount} contributions`}
              className="h-3 w-3 rounded-sm border border-base/40"
              style={{ backgroundColor: contributionColor(day.contributionCount) }}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">
          Add a server-side GITHUB_TOKEN to show real contribution calendar data.
        </p>
      )}
    </CardShell>
  );
}

export default function GithubStats() {
  const [data, setData] = useState<GithubStatsData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadStats() {
      try {
        const res = await fetch("/api/github-stats");
        if (!res.ok) throw new Error("Unable to load GitHub stats");
        const json = await res.json();
        if (mounted) setData(json);
      } catch {
        if (mounted) setError(true);
      }
    }

    loadStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="github" className="border-t border-border bg-surface px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="section-eyebrow">04 - GitHub</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Live from{" "}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan hover:underline"
              >
                @{u}
              </a>
            </h2>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass flex items-center gap-2 rounded-lg px-4 py-2.5 font-mono text-sm transition hover:border-cyan/40"
          >
            <Github size={16} /> Full profile
          </a>
        </div>

        {error && (
          <CardShell className="mt-10">
            <h3 className="font-display text-lg font-semibold text-amber">
              GitHub stats are temporarily unavailable.
            </h3>
            <p className="mt-2 text-sm text-muted">
              The portfolio is still live; refresh later or open the full profile.
            </p>
          </CardShell>
        )}

        {!error && !data && (
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <LoadingCard />
            <LoadingCard />
          </div>
        )}

        {!error && data && (
          <>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <StatsCard data={data} />
              <TopLanguagesCard data={data} />
            </div>
            <StreakCard data={data} />
            <HeatmapCard data={data} />
          </>
        )}
      </div>
    </section>
  );
}
