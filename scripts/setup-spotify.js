/**
 * Spotify OAuth Setup Script
 * 
 * This script helps you obtain a refresh token for the Spotify API.
 * The refresh token is needed for the "Now Playing" feature.
 * 
 * Usage:
 *   1. Set environment variables: SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET
 *   2. Run: node scripts/setup-spotify.js
 *   3. Open the URL printed in the console
 *   4. Authorize the app
 *   5. Copy the refresh token from the callback page
 */

import express from 'express';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = 'http://127.0.0.1:3000/callback';
const SCOPES = 'user-read-currently-playing user-read-playback-state';

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('❌ Missing environment variables!');
  console.error('Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET');
  console.error('\nExample:');
  console.error('  SPOTIFY_CLIENT_ID=your_id SPOTIFY_CLIENT_SECRET=your_secret node scripts/setup-spotify.js');
  process.exit(1);
}

const app = express();

const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;

console.log('\n🎵 Spotify OAuth Setup\n');
console.log('1. Open this URL in your browser:');
console.log(`\n   ${authUrl}\n`);
console.log('2. Authorize the application');
console.log('3. You will be redirected back here automatically\n');

app.get('/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    res.send(`<h1>Error</h1><p>${error}</p>`);
    console.error('❌ Authorization error:', error);
    return;
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI
      })
    });

    const data = await response.json();

    if (data.error) {
      res.send(`<h1>Error</h1><p>${data.error_description || data.error}</p>`);
      console.error('❌ Token error:', data.error_description || data.error);
      return;
    }

    res.send(`
      <html>
        <head><title>Spotify Setup Complete</title></head>
        <body style="font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px;">
          <h1>✅ Success!</h1>
          <p>Your refresh token has been generated.</p>
          <p><strong>Refresh Token:</strong></p>
          <code style="display: block; background: #f0f0f0; padding: 10px; word-break: break-all;">${data.refresh_token}</code>
          <p style="margin-top: 20px;">Add this to your environment variables or Cloudflare Worker secrets.</p>
        </body>
      </html>
    `);

    console.log('\n✅ Success! Refresh token obtained:\n');
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
    console.log('\nYou can now close this server (Ctrl+C)\n');

  } catch (err) {
    res.send(`<h1>Error</h1><p>${err.message}</p>`);
    console.error('❌ Request failed:', err.message);
  }
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
  console.log('   Waiting for callback...\n');
});
