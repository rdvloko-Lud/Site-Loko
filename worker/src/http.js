const ALLOWED_ORIGINS = [
  "https://www.lokofr.com",
  "https://lokofr.com",
  "http://localhost:3000",
];

export function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function json(request, data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders(request), "Content-Type": "application/json; charset=utf-8" },
  });
}

export function bearer(request) {
  return (request.headers.get("Authorization") || "").replace("Bearer ", "");
}

export function adminOk(request, env) {
  const token = bearer(request);
  return Boolean(env.ADMIN_PASSWORD) && token === env.ADMIN_PASSWORD;
}
