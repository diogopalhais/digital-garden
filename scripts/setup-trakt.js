/**
 * Trakt API Setup Guide
 * 
 * Unlike Spotify, Trakt has a simpler setup for public profile data.
 * You only need a Client ID (no OAuth flow required for public data).
 * 
 * Steps:
 * 1. Go to https://trakt.tv/oauth/applications
 * 2. Click "New Application"
 * 3. Fill in:
 *    - Name: Your Digital Garden (or any name)
 *    - Redirect URI: urn:ietf:wg:oauth:2.0:oob
 *    - Description: Personal website integration
 * 4. Create the application
 * 5. Copy the "Client ID"
 * 
 * For TMDB (poster images):
 * 1. Go to https://www.themoviedb.org/settings/api
 * 2. Create an API key (free)
 * 3. Copy the "API Key (v3 auth)"
 * 
 * Then deploy your worker:
 * 
 *   cd serverless
 *   wrangler secret put TRAKT_CLIENT_ID --config wrangler-trakt.toml
 *   wrangler secret put TRAKT_USERNAME --config wrangler-trakt.toml
 *   wrangler secret put TMDB_API_KEY --config wrangler-trakt.toml
 *   wrangler deploy --config wrangler-trakt.toml
 */

console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║                    TRAKT API SETUP GUIDE                          ║
╠═══════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  Step 1: Create a Trakt Application                               ║
║  ─────────────────────────────────────                           ║
║  1. Go to: https://trakt.tv/oauth/applications                   ║
║  2. Click "New Application"                                       ║
║  3. Fill in the form:                                             ║
║     • Name: Digital Garden                                        ║
║     • Redirect URI: urn:ietf:wg:oauth:2.0:oob                    ║
║  4. Save and copy the "Client ID"                                 ║
║                                                                   ║
║  Step 2: Get TMDB API Key (for posters)                          ║
║  ──────────────────────────────────────                          ║
║  1. Go to: https://www.themoviedb.org/settings/api               ║
║  2. Create a free API key                                         ║
║  3. Copy the "API Key (v3 auth)"                                  ║
║                                                                   ║
║  Step 3: Deploy the Worker                                        ║
║  ────────────────────────────                                     ║
║  Run these commands:                                              ║
║                                                                   ║
║  cd serverless                                                    ║
║  wrangler secret put TRAKT_CLIENT_ID --config wrangler-trakt.toml ║
║  wrangler secret put TRAKT_USERNAME --config wrangler-trakt.toml  ║
║  wrangler secret put TMDB_API_KEY --config wrangler-trakt.toml    ║
║  wrangler deploy --config wrangler-trakt.toml                     ║
║                                                                   ║
║  Step 4: Update Component URL                                     ║
║  ───────────────────────────                                      ║
║  Update WORKER_URL in src/components/TraktWatching.jsx            ║
║  with your deployed worker URL                                    ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝
`);

