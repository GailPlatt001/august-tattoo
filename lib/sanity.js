import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '').trim();
const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || 'production').trim();

let client = null;
try {
  client = projectId
    ? createClient({ projectId, dataset, apiVersion: '2023-10-10', useCdn: true })
    : null;
} catch (e) {
  console.error('Sanity client init failed:', e);
  client = null;
}
export const sanityClient = client;

const builder = client ? imageUrlBuilder(client) : null;
export function urlFor(source) {
  try {
    return builder ? builder.image(source).auto('format') : null;
  } catch {
    return null;
  }
}

