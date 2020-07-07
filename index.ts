import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8000;
const HOST = "localhost";

app.use((ctx) => {
  ctx.response.body = "Hello world!";
});

await app.listen(`${HOST}:${PORT}`);