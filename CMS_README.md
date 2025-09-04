# CMS Patch (Sanity) for August Tattoo

This patch adds Sanity CMS + Studio at `/studio` and fetches tattoo images into the gallery.

## Install dependencies
Add these to your project:
```
npm i next-sanity @sanity/client @sanity/image-url @sanity/vision
```

## Create a Sanity project
1. Go to https://www.sanity.io/manage and create a project (dataset: `production`).
2. Copy your **Project ID**.
3. In Sanity → API → CORS Origins, add:
   - `https://august-tattoo.vercel.app`
   - `https://august-tattoo.com`
   - `http://localhost:3000`
4. Set dataset **Public** (read) so the site can fetch without tokens.

## Environment variables (Vercel → Project → Settings → Environment Variables)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
```
Redeploy after saving.

## Studio (content editor)
- Once deployed, visit `/studio` on your site.
- Create new **Tattoo Image** documents: upload photo, add categories (neo/color/black/lettering), alt text, optional order/featured.

## Gallery
- The homepage fetches tattoos via GROQ sorted by `order` then `_createdAt`.
- Images are rendered through the Sanity image CDN with automatic format.
