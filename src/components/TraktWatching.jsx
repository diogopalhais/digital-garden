import { useState, useEffect } from 'react';

const WORKER_URL = 'https://trakt-watching.palhais-diogo.workers.dev';

export default function TraktWatching() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatching = async () => {
      try {
        const res = await fetch(WORKER_URL);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch Trakt data:', error);
        setData({ movies: [], shows: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchWatching();
  }, []);

  if (loading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-12">
      {/* Movies */}
      <section>
        <SectionHeader icon="🎬" title="Recently Watched Movies" />
        {data?.movies?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {data.movies.map((item, idx) => (
              <MovieCard key={`movie-${idx}`} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState message="No movies watched yet" />
        )}
      </section>

      {/* Shows */}
      <section>
        <SectionHeader icon="📺" title="Recently Watched Shows" />
        {data?.shows?.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {data.shows.map((item, idx) => (
              <ShowCard key={`show-${idx}`} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState message="No shows watched yet" />
        )}
      </section>

      {/* Trakt Profile Link */}
      <div className="pt-4 text-center">
        <a
          href="https://trakt.tv/users/diogopalhais"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-accent"
        >
          <TraktIcon className="h-4 w-4" />
          <span>View full profile on Trakt</span>
        </a>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="text-sm">{icon}</span>
      <h3 className="text-sm font-medium uppercase tracking-wider text-text-muted">
        {title}
      </h3>
    </div>
  );
}

function MovieCard({ item }) {
  return (
    <a
      href={item.traktUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-accent/30"
    >
      <div className="aspect-[2/3]">
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border text-text-muted">
            <FilmIcon className="h-8 w-8" />
          </div>
        )}
      </div>
      {/* Rating badge */}
      {item.rating && (
        <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="text-xs text-amber-400">★</span>
          <span className="text-xs font-semibold text-white">{item.rating}</span>
        </div>
      )}
      {/* Title overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
        <p className="truncate text-xs font-medium text-white">{item.title}</p>
        <p className="text-xs text-white/60">{item.year}</p>
      </div>
    </a>
  );
}

function ShowCard({ item }) {
  const progress = item.totalEpisodes
    ? `${item.watchedEpisodes}/${item.totalEpisodes}`
    : `${item.watchedEpisodes} ep`;

  return (
    <a
      href={item.traktUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/50 transition-all hover:border-accent/30"
    >
      <div className="aspect-[2/3]">
        {item.poster ? (
          <img
            src={item.poster}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border text-text-muted">
            <FilmIcon className="h-8 w-8" />
          </div>
        )}
      </div>
      {/* Rating badge */}
      {item.rating && (
        <div className="absolute top-2 right-2 flex items-center gap-0.5 rounded-full bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="text-xs text-amber-400">★</span>
          <span className="text-xs font-semibold text-white">{item.rating}</span>
        </div>
      )}
      {/* Progress badge */}
      <div className="absolute top-2 left-2 rounded-full bg-black/70 px-1.5 py-0.5 backdrop-blur-sm">
        <span className="text-xs font-medium text-white">{progress}</span>
      </div>
      {/* Title overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-10">
        <p className="truncate text-xs font-medium text-white">{item.title}</p>
        <p className="text-xs text-white/60">{item.year}</p>
      </div>
    </a>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12">
      <div>
        <div className="mb-4 h-4 w-24 animate-pulse rounded bg-border" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-border" />
          ))}
        </div>
      </div>
      <div>
        <div className="mb-4 h-4 w-24 animate-pulse rounded bg-border" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="aspect-[2/3] animate-pulse rounded-xl bg-border" />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="rounded-xl border border-dashed border-border/50 bg-card/30 p-8 text-center">
      <FilmIcon className="mx-auto h-8 w-8 text-text-muted/50" />
      <p className="mt-2 text-sm text-text-muted">{message}</p>
    </div>
  );
}

function FilmIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
    </svg>
  );
}

function TraktIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm0-22.557C6.18 1.443 1.443 6.18 1.443 12S6.18 22.557 12 22.557 22.557 17.82 22.557 12 17.82 1.443 12 1.443zm6.03 6.338L9.885 16.35l-.006-.005-3.9-3.9a.723.723 0 010-1.02.723.723 0 011.02 0l2.885 2.886 7.14-7.637a.723.723 0 011.02-.01.723.723 0 01-.014 1.117z"/>
    </svg>
  );
}
