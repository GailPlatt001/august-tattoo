'use client';
import { useEffect, useState } from 'react';
import CONFIG from './Config';

export default function InstagramFeed({ count = 12 }) {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((d) => setItems((d.items || []).slice(0, count)))
      .catch(() => setErr('fail'));
  }, [count]);

  if (err) return null;

  return (
    <section id="instagram" className="max-w-6xl mx-auto px-2 sm:px-4 pb-16">
      <div className="flex items-center justify-between mb-3 px-2">
        <h2 className="text-xl font-semibold">Instagram</h2>
        <a
          className="text-sm opacity-80 hover:opacity-100"
          href={`https://www.instagram.com/${CONFIG.IG_HANDLE}`}
          target="_blank"
        >
          Follow @{CONFIG.IG_HANDLE}
        </a>
      </div>

      {!items.length ? (
        <p className="text-neutral-400 text-sm px-2">
          No posts yet — follow on Instagram.
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {items.map((it) => {
            const img = it.media_type === 'VIDEO'
              ? (it.thumbnail_url || it.media_url)
              : it.media_url;
            return (
              <a
                key={it.id}
                href={it.permalink}
                target="_blank"
                className="block group overflow-hidden rounded-xl border border-white/10"
              >
                {/* use <img> so we don’t have to whitelist many CDN subdomains */}
                <img
                  src={img}
                  alt={it.caption || 'Instagram post'}
                  loading="lazy"
                  className="w-full h-full object-cover aspect-square transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}
