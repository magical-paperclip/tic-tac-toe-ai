import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.114.0/http/file_server.ts";

const server = serve({ port: 8000 });

console.log("HTTP webserver running. Access it at: http://localhost:8000/");

for await (const request of server) {
  const url = new URL(request.url, `http://${request.headers.get("host")}`);
  let filePath = url.pathname === "/" ? "/index.html" : url.pathname;
  try {
    const content = await serveFile(request, `.${filePath}`);
    request.respond(content);
  } catch {
    request.respond({ status: 404, body: "Not Found" });
  }
}