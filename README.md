# Manan Badala — Data Analytics Portfolio

A dark-themed, animated portfolio built with Next.js (App Router), TypeScript, Tailwind CSS,
and Framer Motion. Content is pulled from Manan's resume; GitHub stats are pulled live at
page-load time via public GitHub badge services.

This README assumes **zero prior experience** with Next.js/React. Follow it top to bottom.

---

## 1. What's in this folder

```
portfolio/
├── public/
│   └── Manan_Badala_Resume.pdf     ← shown in the Resume section / download button
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← wraps every page: fonts, <html>, <body>, metadata
│   │   ├── page.tsx                ← the homepage — stacks all sections in order
│   │   └── globals.css             ← global styles, color tokens, focus states
│   ├── components/                 ← one file per section (Hero, About, Skills, ...)
│   └── data/
│       └── profile.ts              ← ALL editable content lives here (see §5)
├── package.json                    ← dependency list + npm scripts
├── tailwind.config.ts              ← color palette, fonts, animation tokens
└── next.config.js                  ← allows loading images from GitHub stat services
```

---

## 2. Install the required software (one-time)

1. **Node.js** (v18.18 or newer) — download from https://nodejs.org (choose the LTS version).
   To check it installed correctly, open a terminal and run:
   ```
   node -v
   npm -v
   ```
   Both should print a version number.
2. **VS Code** — download from https://code.visualstudio.com
3. Optional but recommended VS Code extensions (install from the Extensions icon on the
   left sidebar, or `Ctrl/Cmd+Shift+X`):
   - `ES7+ React/Redux/React-Native snippets`
   - `Tailwind CSS IntelliSense`
   - `Prettier — Code formatter`

---

## 3. Open the project in VS Code

1. Unzip/copy this `portfolio` folder anywhere on your computer, e.g. `Desktop/portfolio`.
2. Open VS Code.
3. Go to **File → Open Folder…** (Mac: **File → Open…**) and select the `portfolio` folder.
4. VS Code will show the file tree on the left, matching the structure in §1.
5. Open a terminal **inside VS Code**: menu **Terminal → New Terminal** (or `` Ctrl+` ``).
   All commands below are typed into that terminal.

---

## 4. Run it locally

In the VS Code terminal, inside the `portfolio` folder:

```bash
npm install       # downloads all dependencies — only needed once (or after editing package.json)
npm run dev       # starts the local dev server
```

After `npm run dev`, you'll see something like:

```
▲ Next.js 14.2.5
- Local:   http://localhost:3000
```

Open that URL in your browser. The page hot-reloads — save any file and the browser updates
automatically.

To stop the server, click into the terminal and press `Ctrl+C`.

**Build for production** (checks for errors, produces an optimized build):
```bash
npm run build
npm run start     # serves the production build at http://localhost:3000
```

---

## 5. Editing content

Almost everything text-based lives in **`src/data/profile.ts`**. You will not need to touch
component files to update your info.

| Want to change...            | Edit this in `profile.ts`      |
|-------------------------------|---------------------------------|
| Name, tagline, summary, email | `profile` object                |
| Education / CGPA              | `education` object               |
| Skill bars & tags             | `skills` object                  |
| Projects                      | `projects` array — add a new object to add a new project card |
| Certifications                | `certifications` array           |
| Achievements (About section)  | `achievements` array             |
| DSA stats                     | `dsa` object                     |

### Adding a new project
Copy an existing object inside the `projects` array in `profile.ts` and edit its fields:
```ts
{
  slug: "unique-id",
  title: "Project Name",
  description: "One or two sentences.",
  stack: ["Tool A", "Tool B"],
  github: "https://github.com/Badala2306/repo-name",
  features: ["Bullet one", "Bullet two"],
  metric: "One standout number"
}
```
It will automatically appear as a new card in the Projects section — no other changes needed.

### Adding a new certification
Add `{ name: "...", issuer: "..." }` to the `certifications` array.

### Updating DSA stats
Edit the numbers directly in the `dsa` object (`totalSolved`, `breakdown`, `topics`,
`milestones`). If you later use a platform with a public API (Codeforces, LeetCode via a
third-party wrapper, etc.), you can replace the static numbers with a `fetch()` call inside
`src/components/DsaJourney.tsx` — ask an AI assistant to wire this up once you have the API
in mind, or keep it manual (simplest, no rate limits, no downtime).

### Replacing the resume PDF
Drop your new PDF into `public/` and update `resumeFile` in `profile.ts` to match the new
filename (must start with `/`, e.g. `/My_New_Resume.pdf`).

### Updating GitHub stats
The GitHub section (`src/components/GithubStats.tsx`) uses public badge services
(`github-readme-stats.vercel.app`, `ghchart.rshah.org`) keyed off `profile.githubUsername`.
Change that one value in `profile.ts` and every card updates automatically — no API key
needed. These services query GitHub live, so contribution graphs and language stats always
reflect the current state of the GitHub account.

### Wiring up the Contact form (get real messages in your inbox)
The Contact form uses **Web3Forms** — a free relay service that emails you every submission.
No account or login required, just an access key sent to your email. Until you add a key, the
form falls back to opening the visitor's mail client instead.

**Get your key (2 minutes):**
1. Go to https://web3forms.com
2. Enter the email address where you want to receive messages (e.g. your Gmail) and click
   "Create Access Key"
3. Check your inbox — they'll email you a key that looks like
   `a1b2c3d4-e5f6-... `
4. Copy it.

**Add it locally:**
1. In the `portfolio` folder, duplicate `.env.local.example` and rename the copy to
   `.env.local`
2. Paste your key so the line reads:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=a1b2c3d4-e5f6-...
   ```
3. Restart the dev server (`Ctrl+C`, then `npm run dev` again) — env files are only read on
   startup.
4. Submit a test message through the Contact form on your local site — you should get an
   email within seconds.

**Add it on Vercel (so the live site can send too):**
1. In your Vercel project, go to **Settings → Environment Variables**
2. Add a new variable: Name = `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, Value = your key
3. Redeploy (Vercel → Deployments → click the latest → **Redeploy**), or just push any new
   commit — it picks it up automatically.

`.env.local` is already excluded from git via `.gitignore`, so your key never gets committed
or exposed publicly.

---

## 6. Deploying to Vercel (free)

1. Push this project to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Go to https://vercel.com and sign in with GitHub.
3. Click **Add New… → Project**, select your repository.
4. Vercel auto-detects Next.js — leave all settings as default.
5. Click **Deploy**. In ~1 minute you'll get a live URL like
   `https://your-portfolio.vercel.app`.
6. Every future `git push` to `main` automatically redeploys the live site.

No environment variables are required for the default setup (no paid APIs are used).

---

## 7. Troubleshooting

**`npm install` fails / hangs**
- Delete the `node_modules` folder and `package-lock.json` if present, then retry
  `npm install`.
- Make sure you're connected to the internet and Node.js is v18.18+ (`node -v`).

**Port 3000 already in use**
- Run `npm run dev -- -p 3001` to use a different port, or close whatever else is using 3000.

**Fonts or icons look unstyled after `npm run dev`**
- Stop the server (`Ctrl+C`) and restart it — this happens occasionally on first run while
  Next.js downloads Google Fonts.

**Images (GitHub stats) not loading**
- These load from external services at runtime; they need an internet connection and will
  briefly fail if `github-readme-stats.vercel.app` is temporarily down (it's a shared public
  service, so this is rare but not impossible). Refresh the page.

**Changes not showing up in the browser**
- Confirm the terminal still shows the dev server running. If you edited `tailwind.config.ts`
  or `next.config.js`, restart `npm run dev` — those files aren't hot-reloaded.

**Build fails on Vercel but works locally**
- Run `npm run build` locally first — it produces the exact same error, which is usually a
  typo or an unused variable TypeScript is strict about.

---

## 8. Tech stack summary

- **Next.js 14** (App Router) — routing, image optimization, font loading
- **TypeScript** — type safety across components and content data
- **Tailwind CSS** — utility-first styling with a custom design-token theme in
  `tailwind.config.ts`
- **Framer Motion** — scroll-triggered reveal animations and micro-interactions
- **lucide-react** — icon set
- A lightweight **canvas particle-graph animation** (`ParticleGrid.tsx`) powers the hero
  background — chosen over a full Three.js scene to keep the page fast on low-end devices
  while still delivering an interactive, mouse-reactive visual.
