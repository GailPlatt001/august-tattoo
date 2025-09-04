export const dynamic = 'force-dynamic';
import './globals.css';
import Gallery from '../components/Gallery';
import InstagramFeed from '../components/InstagramFeed';

export default async function Page() {
  const hasSanity = !!(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '').trim();
  let images = [];

  if (hasSanity) {
    try {
      const { sanityClient, urlFor } = await import('../lib/sanity');

      const query = `
        *[
          _type in ["tattooImage","tattoo-image"]
          && (defined(photo) || defined(image))
        ] | order(order asc, _createdAt desc) {
          _id,
          alt,
          featured,
          "categories": coalesce(categories[]->title, categories),
          "photo": select(defined(photo) => photo, defined(image) => image)
        }
      `;

      const docs = sanityClient ? await sanityClient.fetch(query) : [];

      images = (docs || []).map((d) => ({
        id: d._id,
        alt: d.alt || 'Tattoo image',
        cat: d.categories || [],
        src: d.photo ? urlFor(d.photo)?.width(1200)?.url() ?? '' : '',
        thumb: d.photo ? urlFor(d.photo)?.width(600)?.height(600)?.fit('crop')?.url() ?? '' : '',
      }));
    } catch (e) {
      console.error('Sanity fetch failed', e);
    }
  }

  return (
    <>
      <Gallery initialImages={images} />
      <InstagramFeed count={12} />
      {images.length === 0 && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-center text-neutral-400 text-sm">
          No images yet — publish one in <a className="underline" href="/studio">Studio</a>.
        </div>
      )}
    </>
  );
}
