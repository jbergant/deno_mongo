import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8000;
const HOST = "localhost";

const router = new Router();

router
  .get("/", (ctx) => {
    ctx.response.body = "Home page";
  })
  .get("/contact", (ctx) => {
    ctx.response.body = "Contact page";
  })
  .post("/addComment", (ctx) => {
    ctx.response.body = "Comment added";
    // Implement code
  });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);