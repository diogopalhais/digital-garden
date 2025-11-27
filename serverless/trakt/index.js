/**
 * Trakt Watching Worker
 *
 * Cloudflare Worker that fetches recently watched movies and shows from Trakt.
 * Enriches data with TMDB poster images and user ratings.
 */

const TRAKT_API_URL = 'https://api.trakt.tv';

function getTraktHeaders(clientId) {
  return {
    'Content-Type': 'application/json',
    'trakt-api-version': '2',
    'trakt-api-key': clientId,
  };
}

async function getTMDBData(env, type, tmdbId) {
  if (!tmdbId || !env.TMDB_API_KEY) {
    return { poster: null, totalEpisodes: null };
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/${tmdbId}?api_key=${env.TMDB_API_KEY}`
    );

    if (!response.ok) {
      return { poster: null, totalEpisodes: null };
    }

    const data = await response.json();

    return {
      poster: data.poster_path
        ? `https://image.tmdb.org/t/p/w300${data.poster_path}`
        : null,
      totalEpisodes: data.number_of_episodes || null,
    };
  } catch {
    return { poster: null, totalEpisodes: null };
  }
}

async function getRatingsMap(env, type) {
  const response = await fetch(
    `${TRAKT_API_URL}/users/${env.TRAKT_USERNAME}/ratings/${type}`,
    { headers: getTraktHeaders(env.TRAKT_CLIENT_ID) }
  );

  if (!response.ok) return {};

  const ratings = await response.json();
  const map = {};

  for (const item of ratings) {
    const media = type === 'movies' ? item.movie : item.show;
    const slug = media.ids?.slug;
    if (slug) {
      map[slug] = item.rating;
    }
  }

  return map;
}

async function getWatchedMovies(env) {
  const [response, ratingsMap] = await Promise.all([
    fetch(`${TRAKT_API_URL}/users/${env.TRAKT_USERNAME}/watched/movies`, {
      headers: getTraktHeaders(env.TRAKT_CLIENT_ID),
    }),
    getRatingsMap(env, 'movies'),
  ]);

  if (!response.ok) return [];

  const allMovies = await response.json();
  const movies = allMovies.slice(0, 10);

  return Promise.all(
    movies.map(async (item) => {
      const tmdbId = item.movie.ids?.tmdb;
      const slug = item.movie.ids?.slug;
      const { poster } = await getTMDBData(env, 'movie', tmdbId);

      return {
        type: 'movie',
        title: item.movie.title,
        year: item.movie.year,
        plays: item.plays,
        rating: ratingsMap[slug] || null,
        lastWatchedAt: item.last_watched_at,
        poster,
        traktUrl: `https://trakt.tv/movies/${slug}`,
      };
    })
  );
}

async function getWatchedShows(env) {
  const [response, ratingsMap] = await Promise.all([
    fetch(`${TRAKT_API_URL}/users/${env.TRAKT_USERNAME}/watched/shows`, {
      headers: getTraktHeaders(env.TRAKT_CLIENT_ID),
    }),
    getRatingsMap(env, 'shows'),
  ]);

  if (!response.ok) return [];

  const allShows = await response.json();
  const shows = allShows.slice(0, 10);

  return Promise.all(
    shows.map(async (item) => {
      const tmdbId = item.show.ids?.tmdb;
      const slug = item.show.ids?.slug;
      const { poster, totalEpisodes } = await getTMDBData(env, 'tv', tmdbId);

      let watchedEpisodes = 0;
      if (item.seasons) {
        for (const season of item.seasons) {
          if (season.episodes) {
            watchedEpisodes += season.episodes.length;
          }
        }
      }

      return {
        type: 'show',
        title: item.show.title,
        year: item.show.year,
        rating: ratingsMap[slug] || null,
        watchedEpisodes,
        totalEpisodes,
        lastWatchedAt: item.last_watched_at,
        poster,
        traktUrl: `https://trakt.tv/shows/${slug}`,
      };
    })
  );
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const [movies, shows] = await Promise.all([
        getWatchedMovies(env),
        getWatchedShows(env),
      ]);

      return new Response(JSON.stringify({ movies, shows }), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
          ...corsHeaders,
        },
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data', movies: [], shows: [] }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        }
      );
    }
  },
};

