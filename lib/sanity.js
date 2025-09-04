import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-10-10',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);
export function urlFor(source) { try { return builder.image(source).auto('format'); } catch { return null; } }