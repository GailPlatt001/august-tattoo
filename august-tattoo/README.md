# August Tattoo — Next.js Portfolio

Minimal, fashion‑forward portfolio for a neo‑traditional tattoo artist with QR tracking and Google Analytics.

## Quick start

1. **Install deps**
   ```bash
   npm i
   ```

2. **Dev server**
   ```bash
   npm run dev
   ```

3. **Environment variables (optional)**
   Create `.env.local` in project root:
   ```env
   NEXT_PUBLIC_GA=G-KDJ6TFL60S
   NEXT_PUBLIC_DOMAIN=https://august-tattoo.com
   NEXT_PUBLIC_WHATSAPP=
   NEXT_PUBLIC_IG_HANDLE=august_tattooer
   NEXT_PUBLIC_BRAND_WATERMARK=AugustTattoo
   NEXT_PUBLIC_DEFAULT_UTM=?utm_source=qr_card&utm_medium=print&utm_campaign=launch
   ```

4. **Deploy on Vercel**
   - Import this repo as a Vercel project (Next.js preset).
   - Add your domain `august-tattoo.com` in Project → Settings → Domains.
   - Add any env vars in Project → Settings → Environment Variables (optional).

## Notes
- Images use Unsplash placeholders; replace with your content/CMS later.
- GA is loaded from `app/layout.js`. You can override `NEXT_PUBLIC_GA` in envs.
- Instagram feed is a placeholder; connect Basic Display API later.
- Watermark is a non-destructive overlay; for strong protection, apply watermarks server-side during upload in a later phase.
