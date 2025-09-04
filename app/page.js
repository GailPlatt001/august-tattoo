export const dynamic = 'force-dynamic';
import './globals.css';
import Gallery from '../components/Gallery';

export default async function Page() {
  const hasSanity = !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  let images = [];

  if (hasSanity) {
    const { sanityClient, urlFor } = await import('../lib/sanity');

    const query = `*[_type == "tattooImage"] | order(order asc, _createdAt desc){
      _id, alt, categories, featured, photo
    }`;

    const docs = sanityClient ? await sanityClient.fetch(query) : [];

    images = (docs || []).map((d) => ({
      id: d._id,
      alt: d.alt || 'Tattoo image',
      cat: d.categories || [],
      src: d.photo ? urlFor(d.photo).width(1200).url() : '',
      thumb: d.photo ? urlFor(d.photo).width(600).height(600).fit('crop').url() : '',
    }));
  }

  return <Gallery initialImages={images} />;
}
