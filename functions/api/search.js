
export async function onRequest({ request, env }) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  if (request.method !== "POST") {
    return Response.json(
      { error: "Use the search box to search." },
      { status: 405, headers }
    );
  }

  try {
    const body = await request.json();
    const query = String(body.query || body.q || "").trim();

    if (!query) {
      return Response.json(
        { error: "Please enter search query." },
        { status: 400, headers }
      );
    }

    const apiKey = env.TAVILY_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key missing. Check Cloudflare Production secret TAVILY_API_KEY." },
        { status: 503, headers }
      );
    }

    const response = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: "basic",
        max_results: 8,
        include_answer: true
      })
    });

    if (!response.ok) {
      return Response.json(
        { error: "Tavily API error. Check the key and usage limits." },
        { status: 502, headers }
      );
    }

    const data = await response.json();

    return Response.json({
      query: query,
      answer: data.answer || "",
      results: (data.results || []).map(item => ({
        title: item.title,
        url: item.url,
        description: item.content || ""
      }))
    }, { headers });

  } catch (error) {
    return Response.json(
      { error: "Search failed. Please try again." },
      { status: 500, headers }
    );
  }
}

