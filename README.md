# Mohamed Abdirahman Warsame — Portfolio (React)

A React + TypeScript + Vite port of the original Flutter Web portfolio
(`../my_portfolio`), built to look and behave as close to the original as
possible. The Flutter project is untouched — this is a separate,
independent site.

## Stack

- React 19 + TypeScript (strict) + Vite
- `react-router-dom` for `/` (the single-page scroll site) and `/problems`
  (a Supabase-backed page, code-split so its dependency isn't downloaded by
  visitors who never leave `/`)
- Plain CSS: CSS Modules per component + `src/styles/tokens.css` (every
  color/gradient/breakpoint/type-scale value, ported 1:1 from the Flutter
  source's `lib/theme/`) — no Tailwind/CSS-in-JS
- Self-hosted fonts via `@fontsource/*` (Space Grotesk, Inter, Fira Code) —
  no external Google Fonts request
- `@supabase/supabase-js` for the Problems Solved data
- `react-zoom-pan-pinch` for the certificate lightbox's pinch/zoom
- `lucide-react` for icons (same generic-icon approach the Flutter app used
  for social links — not real brand logos there either)
- Vitest + React Testing Library

## Project structure

```
src/
  components/   # hero/, about/, skills/, projects/, certificates/,
                # learning/, contact/, problems/, layout/ (NavBar, Footer,
                # ScrollToTopButton), common/ (Button, SectionHeading,
                # FadeInSection, Chip, SocialLinks, SectionContainer)
  pages/        # HomePage.tsx, ProblemsPage.tsx
  hooks/        # useInView, useScrollSpy, useSmoothScroll, useTypewriter,
                # useScrollY, usePrefersReducedMotion, useSolvedProblems
  data/         # content.ts -- the single edit point for all site text/links
  lib/          # supabaseClient.ts, solvedProblems.ts, assetUrl.ts
  types/        # content.ts, solvedProblem.ts
  styles/       # tokens.css (design tokens), global.css (reset + base)
```

**To edit your own content** (bio, links, projects, skills, certificates),
edit `src/data/content.ts` — no component code needs to change.

## Running locally

```bash
npm install
cp .env.example .env.local   # already has real, safe-to-share values -- see below
npm run dev
```

## Testing, linting, type-checking

```bash
npm run typecheck
npm run lint
npm test
```

## Building for production

```bash
npm run build      # tsc -b && vite build && copies dist/index.html -> dist/404.html
npm run preview    # serve the built dist/ locally to sanity-check it
```

`vite.config.ts`'s `base` is set to `/portfolio-react/` — **update this**
(and the matching `basename` reference in `index.html`'s canonical/OG tags,
`public/robots.txt`'s sitemap URL, and `public/sitemap.xml`) once you know
the real repo name/deployed URL, since `my_portfolio` (the Flutter project)
has no pushed GitHub remote yet and there was nothing existing to match.

## Deploying to GitHub Pages

`.github/workflows/deploy.yml` mirrors the Flutter project's own workflow:
on push to `main`, it installs, typechecks, lints, tests, builds (with the
Supabase env vars from repo secrets), and publishes `dist/` to the
`gh-pages` branch via `peaceiris/actions-gh-pages`.

GitHub Pages has no server-side rewrite for client-side routes, so a direct
load of `/problems` would normally 404. The build's `copy-404.mjs` step
copies `dist/index.html` to `dist/404.html`, which GitHub Pages serves for
any unmatched path — the SPA then boots and React Router reads the real
URL from the browser and renders the right page.

**One-time setup**, once you've created/named the actual GitHub repo:

1. Update `vite.config.ts`'s `BASE_PATH` to `/<repo-name>/`.
2. Push to `main` — the workflow creates `gh-pages` automatically.
3. In the repo, **Settings → Secrets and variables → Actions**, add
   `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (see values in
   `.env.example` — they're a public/RLS-gated key, safe to store either
   way, but repo secrets keep them out of the workflow file itself).
4. **Settings → Pages**: Source = "Deploy from a branch", branch =
   `gh-pages`, folder = `/ (root)`.

## Environment variables

See `.env.example`. Both `VITE_SUPABASE_URL` and
`VITE_SUPABASE_PUBLISHABLE_KEY` are already filled in with the same
public/anon values the Flutter app used (safe to expose client-side —
Row Level Security on the `solved_problems` table restricts it to public
read-only access) — copy the file to `.env.local` and `/problems` works
immediately. If these are ever missing/misconfigured, the app doesn't
crash: `/problems` shows a friendly error state with a "Try again" button
instead.

## What's genuinely different from the Flutter version

- **Hover effects are plain CSS `:hover`**, not a JS wrapper widget — the
  Flutter source's `HoverScale` widget has no React equivalent needed at
  all; the browser already does this natively.
- **Certificate zoom** uses `react-zoom-pan-pinch` rather than Flutter's
  `InteractiveViewer` — same 1×–4× range and pan/zoom feel, different
  underlying implementation since there's no direct web equivalent.
- **The typewriter/particle-background timing** is driven by
  `setTimeout`/`requestAnimationFrame` rather than Flutter's `Ticker`;
  tuned to match the same per-character/per-frame timing, but won't be
  bit-for-bit identical across every possible frame rate.
- **Scroll-to-section/scroll-to-top** use a small hand-rolled
  `requestAnimationFrame` easing function (650ms, easeInOutCubic) since
  native `scrollIntoView`/`scrollTo({behavior:'smooth'})` doesn't support
  custom duration/easing consistently across browsers.

## Known follow-ups

- Three of the four certificate images aren't uploaded yet
  (`imun-online-conference-33.png`, `automatrix-2-agentic-ai.png`,
  `low-resource-nlp-llms.png`) — same as the Flutter project's state. Drop
  them into `public/certificates/` with those exact filenames; the cards
  already show a graceful "image not available" fallback until then.
- The Supabase `solved_problems` table is currently empty, so `/problems`
  correctly shows its "No write-ups posted yet" empty state — add rows via
  the Supabase dashboard to populate it.
- `vite.config.ts`'s base path, and the canonical/OG/sitemap URLs, use a
  placeholder repo name/domain (`portfolio-react`, `oday8.github.io`) —
  update them once the real deployment target is known.
