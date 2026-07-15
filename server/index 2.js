
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && request.method === "GET" && !url.pathname.split("/").pop().includes(".")) {
      const indexUrl = new URL("/index.html", url);
      response = await env.ASSETS.fetch(new Request(indexUrl, request));
    }
    return response;
  }
};
