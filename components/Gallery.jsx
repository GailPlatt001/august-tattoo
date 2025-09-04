'use client';
import Image from 'next/image';
import CONFIG from './Config';
import { useState } from 'react';

// Use human-readable labels (these will match what’s saved in Sanity)
const CATEGORY_LABELS = [
  'Neo-Traditional',
  'Black & Grey',
  'Delicate',
  'Small Tattoos',
  'Other',
];

export default function Gallery({ initialImages = [] }) {
  const [active, setActive] = useState('All');

  // Filter by the human-readable label
  const filtered =
    active === 'All'
      ? initialImages
      : initialImages.filter((img) => (img.cat || []).includes(active));

  const [lightbox, setLightbox] = useState(null);

  const waText = encodeURIComponent("Hi AugustTattoo — I'd like to book a tattoo.");
  const waHref = CONFIG.WHATSAPP_NUMBER ? `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waText}` : '#';
  const withUTM = (url) => `${url}${url.includes('?') ? '&' : '?'}${CONFIG.DEFAULT_UTM.replace('?', '')}`;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 backdrop-blur bg-neutral-950/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-semibold tracking-widest text-lg">AUGUST TATTOO</a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#portfolio" className="opacity-80 hover:opacity-100">Portfolio</a>
            <a href="#about" className="opacity-80 hover:opacity-100">About</a>
            <a href="#contact" className="opacity-80 hover:opacity-100">Contact</a>
            <a href={`https://www.instagram.com/${CONFIG.IG_HANDLE}`} target="_blank" className="opacity-80 hover:opacity-100">Instagram</a>
          </nav>
        </div>
      </header>

      {/* Filters */}
      <section id="portfolio" className="max-w-6xl mx-auto px-4 sm:px-6 pb-2">
        <div className="flex flex-wrap gap-2">
          {['All', ...CATEGORY_LABELS].map((label) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                active === label
                  ? 'border-white bg-white text-neutral-900'
                  : 'border-white/15 hover:border-white/30'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map((img) => (
            <figure
              key={img.id}
              className="mb-3 relative break-inside-avoid overflow-hidden rounded-2xl border border-white/10 group cursor-zoom-in"
              onClick={() => setLightbox(img)}
            >
              {img.src && (
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1200}
                  height={1600}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                />
              )}
              <figcaption className="pointer-events-none absolute inset-0 flex items-end justify-end p-3">
                <span
                  className="text-[11px] italic tracking-wide opacity-60 bg-black/30 px-2 py-1 rounded-md"
                  style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
                >
                  {CONFIG.BRAND_WATERMARK}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              {lightbox.src && (
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={1600}
                  height={2000}
                  className="w-full h-auto"
                />
              )}
              <button
                className="absolute top-3 right-3 bg-white text-black text-xs rounded-full px-2 py-1"
                onClick={() => setLightbox(null)}
              >
                Close
              </button>
              <div
                className="absolute bottom-3 right-3 text-[11px] italic tracking-wide opacity-70 bg-black/40 px-2 py-1 rounded-md"
                style={{ fontFamily: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif' }}
              >
                {CONFIG.BRAND_WATERMARK}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-neutral-300 max-w-prose">
          Short artist bio, style focus (Neo-Traditional), studio location and opening hours. Add a portrait and brand statement.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold mb-4">Booking / Contact</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href={withUTM(waHref)}
            className={`rounded-2xl border p-4 hover:bg-white/5 ${
              CONFIG.WHATSAPP_NUMBER ? 'border-white/15' : 'border-white/15 opacity-50 cursor-not-allowed'
            }`}
            aria-disabled={!CONFIG.WHATSAPP_NUMBER}
          >
            <div className="text-sm opacity-75">WhatsApp</div>
            <div className="font-semibold text-lg">
              {CONFIG.WHATSAPP_NUMBER ? 'Tap to start chat' : 'Add number in env to enable'}
            </div>
          </a>
          <a
            href={withUTM(`https://www.instagram.com/${CONFIG.IG_HANDLE}`)}
            target="_blank"
            className="rounded-2xl border border-white/15 p-4 hover:bg-white/5"
          >
            <div className="text-sm opacity-75">Instagram</div>
            <div className="font-semibold text-lg">DM @{CONFIG.IG_HANDLE}</div>
          </a>
        </div>
        <p className="mt-3 text-xs text-neutral-400">
          We’ll wire these buttons to your actual WhatsApp number and IG profile.
        </p>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} August Tattoo · Minimal portfolio built with Next.js + Tailwind.
      </footer>
    </div>
  );
}
