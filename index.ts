import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes.ts";

const env = Deno.env.toObject();
const PORT = Number(env.PORT) || 8000;
const HOST = env.HOST || "localhost";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on ${HOST}:${PORT}...`);

await app.listen(`${HOST}:${PORT}`);
