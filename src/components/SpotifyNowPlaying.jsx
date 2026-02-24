import { useState, useEffect } from 'react';

const WORKER_URL = 'https://spotify-now-playing.palhais-diogo.workers.dev';

export default function SpotifyNowPlaying() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(WORKER_URL);
        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch now playing:', error);
        setData({ isPlaying: false });
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-5">
        <div className="bg-border h-20 w-20 animate-pulse rounded-lg" />
        <div className="flex-1 space-y-3">
          <div className="bg-border h-4 w-3/4 animate-pulse rounded-md" />
          <div className="bg-border h-3 w-1/2 animate-pulse rounded-md" />
        </div>
      </div>
    );
  }

  if (!data?.isPlaying) {
    return (
      <div className="flex items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-lg border border-[#1DB954]/20 bg-linear-to-br from-[#1DB954]/20 to-[#1DB954]/5">
          <SpotifyIcon className="h-8 w-8 text-[#1DB954]/60" />
          <div className="absolute -inset-px rounded-lg bg-linear-to-br from-[#1DB954]/10 to-transparent opacity-50" />
        </div>
        <div className="flex-1">
          <p className="text-text-primary text-base font-semibold">
            Nothing playing
          </p>
          <p className="text-text-muted mt-1 text-sm">
            Not listening to anything right now
          </p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block transition-all"
    >
      <div className="flex items-center gap-5">
        {/* Album Art */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg" style={{ boxShadow: 'var(--shadow-elevated)' }}>
          <img
            src={data.albumImage}
            alt={data.album}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Song Info */}
        <div className="min-w-0 flex-1">
          <p className="text-text-primary truncate text-base font-bold transition-colors duration-300 group-hover:text-[#1DB954]">
            {data.title}
          </p>
          <p className="text-text-secondary mt-1 truncate text-sm">
            {data.artist}
          </p>
          <p className="text-text-muted mt-0.5 truncate text-xs">
            {data.album}
          </p>
        </div>

        {/* Pulse Animation */}
        <div className="relative flex h-5 w-5 items-center justify-center">
          <span className="pulse-ring" />
          <span className="pulse-ring" style={{ animationDelay: '0.5s' }} />
          <span className="h-2 w-2 rounded-full bg-[#1DB954]" />
        </div>
      </div>

      <style>{`
        .pulse-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          border: 2px solid #1DB954;
          animation: pulse-out 1.5s ease-out infinite;
        }
        @keyframes pulse-out {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </a>
  );
}

function SpotifyIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}
