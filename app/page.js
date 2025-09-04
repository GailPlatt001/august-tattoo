export const dynamic = 'force-dynamic';
import './globals.css';
import Gallery from '../components/Gallery';

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
          // normalize any field to "photo"
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
      {images.length === 0 && (
        <div style={{padding:'2rem',opacity:.7,textAlign:'center'}}>
          No images yet — publish one in <a href="/studio">Studio</a>.
        </div>
      )}
    </>
  );
}
