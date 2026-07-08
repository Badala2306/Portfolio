import { NextResponse } from "next/server";
import { profile } from "@/data/profile";

export const revalidate = 3600;

type Repo = {
  name: string;
  fork: boolean;
  stargazers_count: number;
  language: string | null;
};

type ContributionDay = {
  date: string;
  contributionCount: number;
};

const TOP_LANGUAGES = [
  { name: "C++", color: "#F34B7D" },
  { name: "Python", color: "#3572A5" },
  { name: "SQL", color: "#E38C00" },
  { name: "HTML", color: "#E34C26" },
  { name: "CSS", color: "#563D7C" },
  { name: "JavaScript", color: "#F5A524" },
  { name: "TypeScript", color: "#22D3EE" }
];

function githubHeaders() {
  const token = process.env.GITHUB_TOKEN;
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };

  if (token && token !== "your-github-token-here") {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

function calculateStreaks(days: ContributionDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let longest = 0;
  let running = 0;

  for (const day of sorted) {
    if (day.contributionCount > 0) {
      running += 1;
      longest = Math.max(longest, running);
    } else {
      running = 0;
    }
  }

  let current = 0;
  const today = new Date().toISOString().slice(0, 10);

  for (let i = sorted.length - 1; i >= 0; i -= 1) {
    const day = sorted[i];

    if (day.date > today) continue;
    if (day.contributionCount > 0) {
      current += 1;
      continue;
    }

    if (day.date === today) continue;
    break;
  }

  return { current, longest };
}

async function fetchContributionDays(username: string): Promise<ContributionDay[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token || token === "your-github-token-here") return [];

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...githubHeaders(),
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate }
  });

  if (!res.ok) return [];

  const json = await res.json();
  const weeks =
    json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks.flatMap((week: { contributionDays: ContributionDay[] }) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      contributionCount: day.contributionCount
    }))
  );
}

export async function GET() {
  const username = profile.githubUsername;

  try {
    const [userRes, reposRes, contributionDays] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: githubHeaders(),
        next: { revalidate }
      }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&type=owner&sort=updated`, {
        headers: githubHeaders(),
        next: { revalidate }
      }),
      fetchContributionDays(username)
    ]);

    if (!userRes.ok || !reposRes.ok) {
      return NextResponse.json(
        { message: "GitHub stats are temporarily unavailable." },
        { status: 502 }
      );
    }

    const user = await userRes.json();
    const repos = ((await reposRes.json()) as Repo[]).filter((repo) => !repo.fork);
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalContributions = contributionDays.reduce(
      (sum, day) => sum + day.contributionCount,
      0
    );
    const streak = calculateStreaks(contributionDays);
    return NextResponse.json({
      stats: {
        totalStars,
        totalContributions,
        publicRepos: user.public_repos,
        followers: user.followers
      },
      topLanguages: TOP_LANGUAGES,
      streak: {
        current: streak.current,
        longest: streak.longest,
        totalContributions
      },
      calendar: contributionDays
    });
  } catch {
    return NextResponse.json(
      { message: "GitHub stats are temporarily unavailable." },
      { status: 502 }
    );
  }
}
