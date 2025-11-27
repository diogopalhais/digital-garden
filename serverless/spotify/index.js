/**
 * Spotify Now Playing Worker
 *
 * Cloudflare Worker that fetches the currently playing track from Spotify.
 * Returns JSON with track info or { isPlaying: false } when nothing is playing.
 */

async function getAccessToken(env) {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' + btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`),
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: env.SPOTIFY_REFRESH_TOKEN,
    }),
  });

  return response.json();
}

async function getNowPlaying(env) {
  const { access_token } = await getAccessToken(env);

  const response = await fetch(
    'https://api.spotify.com/v1/me/player/currently-playing',
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (response.status === 204 || response.status > 400) {
    return { isPlaying: false };
  }

  const song = await response.json();

  if (!song.item) {
    return { isPlaying: false };
  }

  return {
    isPlaying: song.is_playing,
    title: song.item.name,
    artist: song.item.artists.map((artist) => artist.name).join(', '),
    album: song.item.album.name,
    albumImage: song.item.album.images[0]?.url,
    songUrl: song.item.external_urls.spotify,
  };
}

export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const data = await getNowPlaying(env);

      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ isPlaying: false, error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }
  },
};

