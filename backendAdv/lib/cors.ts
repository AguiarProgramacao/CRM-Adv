// lib/cors.ts
export function withCORS(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Access-Control-Allow-Origin", "*");
  headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return new Response(response.body, {
    status: response.status,
    headers,
  });
}

export function handleOptions(): Response {
  return withCORS(new Response(null, { status: 204 }));
}
