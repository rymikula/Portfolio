# Ryan Mikula - Portfolio

A small, deliberately minimal personal site. Instead of the usual list of jobs, the centerpiece is an **interactive, to-scale timeline** of my career: work and education are plotted on a shared time axis so the overlaps are visible at a glance (founding a game studio while in school, a master's running alongside a full-time role). Hover or click a role to read the detail.

Dark, restrained, and fast. One warm accent, one idea, no filler.

## Stack

- **Next.js 14** (App Router), exported as a fully static site
- **React 18** + **TypeScript**
- **Tailwind CSS** with a small set of CSS-variable design tokens
- No UI framework, no animation library, no 3D, no images. The timeline is plain React and CSS.

## Structure

```
app/
  layout.tsx       Fonts, metadata, root layout
  page.tsx         Page composition (header, timeline, footer)
  globals.css      Design tokens + base styles
  icon.svg         Favicon
components/
  CareerTimeline.tsx   The timeline: lane packing, bars, mobile list
  ui/SectionHeader.tsx Shared section header
lib/
  content.ts       Single source of truth for all content
scripts/
  fix-readlink.js  Node 22 / Windows build shim (see Notes)
```

All content (roles, dates, links, copy) lives in [`lib/content.ts`](lib/content.ts). Edit there and every component updates.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static export to ./out
```

The output in `out/` is plain static files, deployable to Cloudflare Pages, GitHub Pages, Netlify, or any static host.

## Notes

- **Responsive timeline.** The to-scale Gantt is shown on wider screens; below the `md` breakpoint it gracefully becomes a clean stacked list, since a horizontal chart is awkward on a phone.
- **`scripts/fix-readlink.js`** is a small `node -r` preload that works around a Node 22 regression on Windows where `fs.readlink` throws `EISDIR` on regular files, which otherwise breaks the webpack build. It is a no-op on other platforms.

## License

MIT, see [LICENSE](LICENSE).
