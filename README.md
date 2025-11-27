# Developer Portfolio 🚀

A personal portfolio website built with modern web technologies. Features a beautiful bento grid layout, dark mode design, and smooth animations.

## Features

- **Bento Grid Layout** — Modern, asymmetric card-based design
- **Dark Mode Only** — Elegant dark theme inspired by [opencode.ai](https://opencode.ai)
- **MDX Content** — Write in Markdown with component support
- **Smooth Animations** — Powered by Motion One with reduced motion support
- **SEO Optimized** — Meta tags, Open Graph, sitemap
- **Type Safe** — TypeScript throughout with Zod schema validation
- **Fast** — Zero JavaScript by default thanks to Astro

## Tech Stack

- [Astro](https://astro.build) — Static site generator
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com) — Styling
- [Motion One](https://motion.dev) — Animations
- [MDX](https://mdxjs.com) — Rich content
- [Cloudflare Workers](https://workers.cloudflare.com/) — Serverless APIs

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/diogopalhais/diogopalhais.github.io.git
cd diogopalhais.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Commands

| Command         | Action                                       |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Start development server at `localhost:4321` |
| `npm run build` | Build for production to `./dist/`            |
| `npm run preview` | Preview production build locally           |
| `npm run format`| Format code with Prettier                    |

## Project Structure

```
diogopalhais.github.io/
├── src/
│   ├── components/     # Astro/React components
│   ├── content/        # MDX content (projects, pages)
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utilities and helpers
│   ├── pages/          # Page routes
│   └── styles/         # Global styles
├── public/             # Static assets
├── scripts/            # Setup scripts (Spotify OAuth, etc.)
├── serverless/         # Cloudflare Workers
│   ├── spotify/        # Now Playing API
│   └── trakt/          # Watching API
└── astro.config.mjs    # Astro configuration
```

## Content Management

### Adding a Project

Create a new `.mdx` file in `src/content/projects/`:

```mdx
---
title: "Project Name"
description: "Project description"
date: 2025-11-25
tags: ["React", "TypeScript"]
repo: "https://github.com/..."
demo: "https://..."
featured: true
---

Project details...
```

## Customization

### Colors

Edit the color palette in `tailwind.config.mjs`:

```js
colors: {
  background: '#09090b',
  card: '#18181b',
  accent: '#10b981',
  // ...
}
```

### Site Metadata

Update site URL and metadata in `astro.config.mjs` and `src/components/BaseHead.astro`.

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

- **Vercel**: `npm run build` and deploy `dist/`
- **Netlify**: Connect repo and set build command to `npm run build`

## License

- **Content**: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)
- **Code**: MIT

---

Built with ☕ from Portugal 🇵🇹
