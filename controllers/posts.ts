import { IPost } from "../types.ts";
import { posts } from "../data/data.ts";
import { Post } from "../models/post.ts";

export const getPosts = async ({ response }: { response: any }) => {
  response.body = await Post.findAll();
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

export const updatePost = async ({
  params,
  request,
  response,
}: {
  params: {
    title: string;
  };
  request: any;
  response: any;
}) => {
  const temp = posts.filter((existingDPost) =>
    existingDPost.title === params.title
  );
  const body = await request.body();
  const { content }: { content: string } = body.value;

  if (temp.length) {
    temp[0].content = content;
    response.status = 200;
    response.body = { msg: "OK" };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find post ${params.title}` };
};

export const deletePost = ({
  params,
  response,
}: {
  params: {
    title: string;
  };
  response: any;
}) => {
  const lengthBefore = posts.length;
  const temp = posts.filter((post) => post.title !== params.title);

  if (temp.length === lengthBefore) {
    response.status = 400;
    response.body = { msg: `Cannot find post ${params.title}` };
    return;
  }

  response.body = { msg: "OK" };
  response.status = 200;
};
