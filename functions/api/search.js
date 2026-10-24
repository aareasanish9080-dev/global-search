
export async function onRequest({ request, env }) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q || !q.trim()) {
    return Response.json(
      { error: "Please enter a search query." },
      { status: 400, headers: cors }
    );
  }

  if (!env.BRAVE_SEARCH_API_KEY) {
    return Response.json(
      { error: "Search API key is not configured yet." },
      { status: 503, headers: cors }
    );
  }

  const response = await fetch(
    "https://api.search.brave.com/res/v1/web/search?q=" +
      encodeURIComponent(q),
    {
      headers: {
        "Accept": "application/json",
        "X-Subscription-Token": env.BRAVE_SEARCH_API_KEY
      }
    }
  );

  if (!response.ok) {
    return Response.json(
      { error: "Search provider error. Check your API key." },
      { status: 502, headers: cors }
    );
  }

  const data = await response.json();
  const results = (data.web?.results || []).map(item => ({
    title: item.title,
    url: item.url,
    description: item.description
  }));

  return Response.json(
    { query: q, results },
    { headers: cors }
  );
}
