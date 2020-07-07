import { Router } from "https://deno.land/x/oak/mod.ts";

import {
  getPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
} from "./controllers/posts.ts";

const router = new Router();

router
  .get("/posts", getPosts)
  .get("/posts/:title", getPost)
  .post("/posts", addPost)
  .put("/posts/:title", updatePost)
  .delete("/posts/:title", deletePost);

export default router;
