export const revalidate = 600; // cache 10 min

export async function GET() {
  const token = process.env.IG_BASIC_TOKEN; // server-only secret
  if (!token) {
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }

  const url =
    'https://graph.instagram.com/me/media' +
    '?fields=id,caption,media_url,permalink,thumbnail_url,media_type,timestamp,username' +
    '&limit=12&access_token=' + encodeURIComponent(token);

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const data = await res.json();
    if (!res.ok) {
      return new Response(JSON.stringify({ items: [], error: data?.error || 'fetch_failed' }), {
        status: 200, headers: { 'content-type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ items: data.data || [] }), {
      status: 200, headers: { 'content-type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify({ items: [], error: 'network_error' }), {
      status: 200, headers: { 'content-type': 'application/json' },
    });
  }
}
