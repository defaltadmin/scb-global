export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Serve this site under the /scb-global path on the parent domain
    if (url.pathname.startsWith("/scb-global")) {
      const pagesUrl = env.PAGES_URL || "https://scb-global.<account>.pages.dev";
      const target = pagesUrl.replace(/\/$/, "");
      const path = url.pathname.slice("/scb-global".length) || "/";
      const cloned = request.clone();
      const response = await env.PAGES_API.fetch(new Request(target + path, cloned));
      return response;
    }

    return new Response("Not found", { status: 404 });
  },
};
