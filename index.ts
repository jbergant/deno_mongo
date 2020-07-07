import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const app = new Application();
const env = Deno.env.toObject();
const PORT = Number(env.PORT) || 8000;
const HOST = env.HOST || "localhost";

interface IPost {
  title: string;
  url: string;
  content: string;
}

let posts: Array<IPost> = [
  {
    title: "Chatbots",
    url: "chatbots",
    content: "Article about chatbots",
  },
  {
    title: "Google Assistant app",
    url: "google_assistant_app",
    content: "Article about Google Assistant apps",
  },
  {
    title: "Blog with Jekyll",
    url: "blog_with_jekyll",
    content: "Article about blogging",
  },
];

const router = new Router();



export const getPosts = ({ response }: { response: any }) => {
    response.body = posts;
  };
  
  router
    .get("/posts", getPosts);
  

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);
