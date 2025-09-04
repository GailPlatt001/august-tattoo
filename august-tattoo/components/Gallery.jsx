"use client";

import Image from "next/image";
import CONFIG from "./Config";
import { useState, useEffect } from "react";

const categories = [
  { id: "all", label: "All" },
  { id: "neo", label: "Neo‑Traditional" },
  { id: "color", label: "Color" },
  { id: "black", label: "Black & Grey" },
  { id: "lettering", label: "Lettering" },
];

const demoImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop", alt: "Neo‑traditional floral tattoo", cat: ["neo","color"] },
  { id: 2, src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", alt: "Black & grey portrait tattoo", cat: ["black"] },
  { id: 3, src: "https://images.unsplash.com/photo-1520975693419-25d84d1c2d3b?q=80&w=1200&auto=format&fit=crop", alt: "Lettering on forearm", cat: ["lettering","black"] },
  { id: 4, src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1200&auto=format&fit=crop", alt: "Neo‑traditional animal tattoo", cat: ["neo","color"] },
  { id: 5, src: "https://images.unsplash.com/photo-1515202913167-d9a698095ebf?q=80&w=1200&auto=format&fit=crop", alt: "Floral shoulder piece", cat: ["neo","color"] },
  { id: 6, src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop", alt: "Blackwork geometric", cat: ["black"] },
  { id: 7, src: "https://images.unsplash.com/photo-1522335789203-9f8a5a5b0f49?q=80&w=1200&auto=format&fit=crop", alt: "Neo‑traditional lady head", cat: ["neo","color"] },
  { id: 8, src: "https://images.unsplash.com/photo-1473993702977-1706a7f23164?q=80&w=1200&auto=format&fit=crop", alt: "Script lettering", cat: ["lettering","black"] },
  { id: 9, src: "https://images.unsplash.com/photo-1519750770529-4f0370dbe35a?q=80&w=1200&auto=format&fit=crop", alt: "Color rose", cat: ["color","neo"] },
];

export default function Gallery() {
  const [active, setActive] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "all" ? demoImages : demoImages.filter((img) => img.cat.includes(active));

  const waText = encodeURIComponent("Hi AugustTattoo — I'd like to book a tattoo.");
  const waHref = CONFIG.WHATSAPP_NUMBER ? `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${waText}` : "#";

  const withUTM = (url) => `${url}${url.includes("?") ? "&" : "?"}${CONFIG.DEFAULT_UTM.replace("?", "")}`;

  return (
    <div className="min-h-screen">
      {/* Header */}
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

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-6">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">Neo‑Traditional Tattoo Portfolio</h1>
            <p className="mt-4 text-neutral-300 max-w-prose">
              Minimal, fashion‑forward showcase of healed and fresh work. Scan the QR to view anywhere. Booking via WhatsApp or Instagram DM.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={withUTM(waHref)} className={`px-4 py-2 rounded-2xl ${CONFIG.WHATSAPP_NUMBER ? 'bg-white text-neutral-900' : 'bg-white/20 text-white cursor-not-allowed'} text-sm font-semibold hover:opacity-90`} aria-disabled={!CONFIG.WHATSAPP_NUMBER}>
                Book via WhatsApp
              </a>
              <a href={withUTM(`https://www.instagram.com/${CONFIG.IG_HANDLE}`)} target="_blank" className="px-4 py-2 rounded-2xl border border-white/20 text-sm hover:bg-white/5">Instagram</a>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden border border-white/10">
            <Image src={demoImages[0].src} alt="Hero preview" width={1200} height={340} className="w-full h-[340px] object-cover" />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section id="portfolio" className="max-w-6xl mx-auto px-4 sm:px-6 pb-2">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-3 py-1.5 rounded-full text-sm border ${active === c.id ? "border-white bg-white text-neutral-900" : "border-white/15 hover:border-white/30"}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid (CSS columns) */}
      <section className="max-w-6xl mx-auto px-2 sm:px-4">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
          {filtered.map((img) => (
            <figure key={img.id} className="mb-3 relative break-inside-avoid overflow-hidden rounded-2xl border border-white/10 group cursor-zoom-in" onClick={() => setLightbox(img)}>
              <Image src={img.src} alt={img.alt} width={1200} height={1600} className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]" />
              {/* Signature-style watermark */}
              <figcaption className="pointer-events-none absolute inset-0 flex items-end justify-end p-3">
                <span className="text-[11px] italic tracking-wide opacity-60 bg-black/30 px-2 py-1 rounded-md" style={{fontFamily:'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'}}>
                  {CONFIG.BRAND_WATERMARK}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image src={lightbox.src} alt={lightbox.alt} width={1600} height={2000} className="w-full h-auto" />
              <button className="absolute top-3 right-3 bg-white text-black text-xs rounded-full px-2 py-1" onClick={() => setLightbox(null)}>Close</button>
              <div className="absolute bottom-3 right-3 text-[11px] italic tracking-wide opacity-70 bg-black/40 px-2 py-1 rounded-md" style={{fontFamily:'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif'}}>
                {CONFIG.BRAND_WATERMARK}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instagram Feed (placeholder) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Instagram</h2>
          <a href={withUTM(`https://www.instagram.com/${CONFIG.IG_HANDLE}`)} target="_blank" className="text-sm opacity-75 hover:opacity-100">@{CONFIG.IG_HANDLE}</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {demoImages.slice(0, 6).map((img) => (
            <div key={`ig-${img.id}`} className="aspect-square overflow-hidden rounded-xl border border-white/10">
              <Image src={img.src} alt={img.alt} width={600} height={600} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-neutral-400">This will show your live feed via Instagram Basic Display API (or a simple embed).</p>
      </section>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 pb-10">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-neutral-300 max-w-prose">Short artist bio, style focus (Neo‑Traditional), studio location and opening hours. Add a portrait and brand statement.</p>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        <h2 className="text-xl font-semibold mb-4">Booking / Contact</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href={withUTM(waHref)} className={`rounded-2xl border p-4 hover:bg-white/5 ${CONFIG.WHATSAPP_NUMBER ? 'border-white/15' : 'border-white/15 opacity-50 cursor-not-allowed'}`} aria-disabled={!CONFIG.WHATSAPP_NUMBER}>
            <div className="text-sm opacity-75">WhatsApp</div>
            <div className="font-semibold text-lg">{CONFIG.WHATSAPP_NUMBER ? 'Tap to start chat' : 'Add number in env to enable'}</div>
          </a>
          <a href={withUTM(`https://www.instagram.com/${CONFIG.IG_HANDLE}`)} target="_blank" className="rounded-2xl border border-white/15 p-4 hover:bg-white/5">
            <div className="text-sm opacity-75">Instagram</div>
            <div className="font-semibold text-lg">DM @{CONFIG.IG_HANDLE}</div>
          </a>
        </div>
        <p className="mt-3 text-xs text-neutral-400">We’ll wire these buttons to your actual WhatsApp number and IG profile.</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-center text-xs text-neutral-400">
        © {new Date().getFullYear()} August Tattoo · Minimal portfolio built with Next.js + Tailwind.
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-4 inset-x-0 px-4 sm:px-6 flex justify-center z-40">
        <div className="max-w-6xl w-full bg-white text-neutral-900 rounded-2xl shadow-lg flex items-center justify-between gap-3 p-3">
          <span className="text-sm font-medium">Like what you see?</span>
          <div className="flex gap-2">
            <a href={withUTM(waHref)} className={`px-3 py-1.5 rounded-xl ${CONFIG.WHATSAPP_NUMBER ? 'bg-neutral-900 text-white' : 'bg-neutral-300 text-neutral-600 cursor-not-allowed'}`} aria-disabled={!CONFIG.WHATSAPP_NUMBER}>WhatsApp</a>
            <a href={withUTM(`https://www.instagram.com/${CONFIG.IG_HANDLE}`)} target="_blank" className="px-3 py-1.5 rounded-xl border border-neutral-900 text-sm">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}
