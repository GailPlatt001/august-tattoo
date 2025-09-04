import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

// Only create a client if we actually have a projectId
export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion: '2023-10-10', useCdn: true })
  : null;

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;
export function urlFor(source) {
  return builder ? builder.image(source).auto('format') : null;
}
