import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const PORT = 8000;
const HOST = "localhost";

const router = new Router();

export const getHome = ({ response }: { response: any }) => {
  response.body = "Home page";
};

export const getContact = ({ response }: { response: any }) => {
  response.body = "Contact page";
};

export const saveComment = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  // Do something with data
  response.body = "Comment added";
  response.status = 200;
};

router
  .get("/", getHome)
  .get("/contact", getContact)
  .post("/addComment", saveComment);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);