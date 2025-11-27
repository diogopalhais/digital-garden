# Serverless Workers

Cloudflare Workers that power the dynamic features of the site.

## Workers

| Worker | Description |
| ------ | ----------- |
| [spotify](./spotify/) | Fetches currently playing track from Spotify |
| [trakt](./trakt/) | Fetches recently watched movies/shows from Trakt |

## Deployment

Each worker is deployed independently using [Wrangler](https://developers.cloudflare.com/workers/wrangler/).

### Prerequisites

```bash
npm install -g wrangler
wrangler login
```

### Spotify Worker

```bash
cd serverless/spotify

# Deploy
wrangler deploy

# Set secrets
wrangler secret put SPOTIFY_CLIENT_ID
wrangler secret put SPOTIFY_CLIENT_SECRET
wrangler secret put SPOTIFY_REFRESH_TOKEN
```

To get the refresh token, run the setup script from the project root:

```bash
SPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=xxx node scripts/setup-spotify.js
```

### Trakt Worker

```bash
cd serverless/trakt

# Deploy
wrangler deploy

# Set secrets
wrangler secret put TRAKT_CLIENT_ID
wrangler secret put TRAKT_USERNAME
wrangler secret put TMDB_API_KEY  # optional, for poster images
```

To get Trakt credentials:
1. Create an app at [trakt.tv/oauth/applications](https://trakt.tv/oauth/applications)
2. Copy the Client ID

To get TMDB API key (optional):
1. Create an account at [themoviedb.org](https://www.themoviedb.org/)
2. Go to Settings → API → Create API Key

## Local Development

```bash
cd serverless/<worker>
wrangler dev
```

This starts a local server with hot reloading.

