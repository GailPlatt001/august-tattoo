export const dynamic = 'force-dynamic';
import './globals.css';
import Gallery from '../components/Gallery';
import { sanityClient, urlFor } from '../lib/sanity';

export default async function Page() {
  const docs = await sanityClient.fetch(`*[_type == "tattooImage"] | order(order asc, _createdAt desc){ _id, alt, categories, featured, photo }`);
  const images = (docs || []).map((d) => ({
    id: d._id,
    alt: d.alt || 'Tattoo image',
    cat: d.categories || [],
    src: d.photo ? urlFor(d.photo).width(1200).url() : '',
    thumb: d.photo ? urlFor(d.photo).width(600).height(600).fit('crop').url() : '',
  }));
  return <Gallery initialImages={images} />;
}
