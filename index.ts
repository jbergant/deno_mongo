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

export const getPost = ({
  params,
  response,
}: {
  params: {
    title: string;
  };
  response: any;
}) => {
  const post = posts.filter((post) => post.title === params.title);
  if (post.length) {
    response.status = 200;
    response.body = post[0];
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find post ${params.title}` };
};

export const addPost = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const post: IPost = body.value;
  posts.push(post);

  response.body = { msg: "OK" };
  response.status = 200;
};

router
  .get("/posts", getPosts)
  .get("/posts/:title", getPost)
  .post("/posts", addPost);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen(`${HOST}:${PORT}`);
