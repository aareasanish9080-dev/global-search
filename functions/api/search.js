
export async function onRequest({ request, env }) {
  const cors = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers: cors });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Please use the search box." },
      { status: 405, headers: cors }
    );
  }

  try {
    const body = await request.json();
    const q = String(body.query || body.q || "").trim();

    if (!q) {
      return Response.json(
        { error: "Please enter search query" },
        { status: 400, headers: cors }
      );
    }

    if (!env.BRAVE_SEARCH_API_KEY) {
      return Response.json(
        { error: "Search API key is not configured." },
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
        { error: "Search provider error. Check API key." },
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
  } catch (error) {
    return Response.json(
      { error: "Search failed. Please try again." },
      { status: 500, headers: cors }
    );
  }
}
