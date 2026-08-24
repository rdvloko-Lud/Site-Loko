import { json, corsHeaders } from "./http.js";
import { handlePostContact, handleGetAdminContacts, handleDeleteAdminContact } from "./routes/contact.js";
import { handleGetSlots, handlePostBook } from "./routes/bookings.js";
import {
  handleGetAdminBookings,
  handlePostAdminBlock,
  handlePostAdminCancel,
  handlePostAdminLogin,
} from "./routes/admin.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    if (method === "OPTIONS") return new Response(null, { headers: corsHeaders(request) });

    try {
      if (path === "/api/contact" && method === "POST") return await handlePostContact(request, env, ctx);
      if (path === "/api/slots" && method === "GET") return await handleGetSlots(request, url, env);
      if (path === "/api/book" && method === "POST") return await handlePostBook(request, env, ctx);

      if (path === "/api/admin/login" && method === "POST") return await handlePostAdminLogin(request, env);
      if (path === "/api/admin/bookings" && method === "GET") return await handleGetAdminBookings(request, url, env);
      if (path === "/api/admin/block" && method === "POST") return await handlePostAdminBlock(request, env);
      if (path === "/api/admin/cancel" && method === "POST") return await handlePostAdminCancel(request, env, ctx);
      if (path === "/api/admin/contacts" && method === "GET") return await handleGetAdminContacts(request, env);
      if (path === "/api/admin/contact" && method === "DELETE") return await handleDeleteAdminContact(request, env);

      return json(request, { error: "Route introuvable" }, 404);
    } catch (err) {
      console.log(JSON.stringify({ level: "error", message: "unhandled", path, error: String(err) }));
      return json(request, { error: "Erreur serveur" }, 500);
    }
  },
};
