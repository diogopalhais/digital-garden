# Personal Website & Digital Garden 🌱

A personal digital garden and portfolio website built with modern web technologies. Features a beautiful bento grid layout, dark mode design, and smooth animations.

## Features

- **Bento Grid Layout** — Modern, asymmetric card-based design
- **Dark Mode Only** — Elegant dark theme
- **MDX Content** — Write pages in Markdown with component support
- **Live Integrations** — Spotify Now Playing & Trakt recently watched
- **Smooth Animations** — Powered by Motion with reduced motion support
- **SEO Optimized** — Meta tags, Open Graph, sitemap
- **Type Safe** — TypeScript throughout
- **Fast** — Zero JavaScript by default thanks to Astro

## Tech Stack

- [Astro 4](https://astro.build) — Static site generator
- [React 19](https://react.dev) — Interactive components
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 4](https://tailwindcss.com) — Styling (via Vite plugin)
- [Motion](https://motion.dev) — Animations
- [MDX](https://mdxjs.com) — Rich content pages
- [Cloudflare Workers](https://workers.cloudflare.com/) — Serverless APIs

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/diogopalhais/digital-garden.git
cd digital-garden

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Commands

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `pnpm dev`        | Start development server at `localhost:4321` |
| `pnpm build`      | Build for production to `./dist/`            |
| `pnpm preview`    | Preview production build locally             |
| `pnpm format`     | Format code with Prettier                    |

## Project Structure

```
digital-garden/
├── src/
│   ├── components/     # Astro & React components
│   │   ├── *.astro     # Static Astro components
│   │   └── *.jsx       # Interactive React components
│   ├── content/
│   │   └── pages/      # MDX content pages
│   ├── data/           # TypeScript data (projects)
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Page routes
│   └── styles/         # Global styles
├── public/             # Static assets
├── scripts/            # Setup scripts (Spotify/Trakt OAuth)
├── serverless/         # Cloudflare Workers
│   ├── spotify/        # Now Playing API
│   └── trakt/          # Watching API
└── astro.config.mjs    # Astro configuration
```

## Pages

| Route        | Description                          |
| ------------ | ------------------------------------ |
| `/`          | Home with bento grid layout          |
| `/whoami`    | About page                           |
| `/now`       | What I'm currently up to             |
| `/uses`      | Tools, hardware, and software I use  |
| `/watching`  | Movies & TV shows I've watched       |
| `/colophon`  | Site credits and technical details   |

## Content Management

### MDX Pages

Content pages are stored in `src/content/pages/` as MDX files:

```mdx
---
title: "Page Title"
description: "Page description"
---

Your markdown content with component support...
```

### Projects

Projects are managed in `src/data/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    name: "Project Name",
    type: "Project Type",
    company: "Company Name",  // or role: "Personal Project"
    image: "/images/projects/image.png",
    year: "2024",
    url: "https://...",       // optional
    sunset: false,            // optional, marks deprecated projects
  },
];
```

## Integrations

Dynamic features are powered by Cloudflare Workers. See [`serverless/README.md`](./serverless/README.md) for detailed deployment instructions.

### Spotify Now Playing

Display your currently playing track.

1. Create an app at [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Set Redirect URI to `http://127.0.0.1:3000/callback`
3. Get your refresh token:

```bash
SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/setup-spotify.js
```

4. Deploy the worker:

```bash
cd serverless/spotify
wrangler deploy
wrangler secret put SPOTIFY_CLIENT_ID
wrangler secret put SPOTIFY_CLIENT_SECRET
wrangler secret put SPOTIFY_REFRESH_TOKEN
```

### Trakt Watching

Display recently watched movies and TV shows.

1. Create an app at [trakt.tv/oauth/applications](https://trakt.tv/oauth/applications)
2. (Optional) Get a TMDB API key at [themoviedb.org](https://www.themoviedb.org/) for poster images
3. Deploy the worker:

```bash
cd serverless/trakt
wrangler deploy
wrangler secret put TRAKT_CLIENT_ID
wrangler secret put TRAKT_USERNAME
wrangler secret put TMDB_API_KEY  # optional
```

## Deployment

This site is deployed to GitHub Pages at [diogopalhais.github.io](https://diogopalhais.github.io). Push to `master` to trigger automatic deployment via GitHub Actions.

To deploy elsewhere:

- **Vercel**: `pnpm build` and deploy `dist/`
- **Netlify**: Connect repo and set build command to `pnpm build`
- **Cloudflare Pages**: Connect repo and set build command to `pnpm build`

## License

- **Content**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Code**: MIT

---

Built with ☕ from Porto, Portugal 🇵🇹
