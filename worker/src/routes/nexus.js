import { json } from "../http.js";
import { saveNexusBlocks, secretOk } from "../services/nexusBlocks.js";

/** POST /api/nexus/blocks { events: [{ id, start, end, allDay? }] } — remplace la liste précédente. */
export async function handlePostNexusBlocks(request, env) {
  if (!secretOk(request.headers.get("x-nexus-secret") || "", env.NEXUS_BLOCKS_SECRET)) {
    return json(request, { error: "Non autorisé" }, 401);
  }
  const body = await request.json().catch(() => null);
  if (!body || !Array.isArray(body.events)) return json(request, { error: "events requis" }, 400);
  return json(request, { ok: true, count: await saveNexusBlocks(env, body.events) });
}
