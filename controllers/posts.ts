import { IPost } from "../types.ts";
import { Post } from "../models/post.ts";
import * as yup from "https://cdn.pika.dev/yup@^0.29.0";

const createPostSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required()
});

export const getPosts = async({ response }: { response: any }) => {
  response.body = await Post.findAll();
};

export const getPost = async ({
  params,
  response,
}: {
  params: {
    title: string;
  };

  response: any;
}) => {
  const post = await Post.findOneByTitle(params.title);
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

    await createPostSchema.validate(body.value);

    await Post.insert(body.value);

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
  const body = await request.body();
  const { content }: { content: string } = body.value;
  const matchedCount = await Post.update(
    params.title,
    content,
  );

  if (matchedCount > 0) {
    response.status = 200;
    response.body = { msg: "OK" };
    return;
  }

  response.status = 400;
  response.body = { msg: `Cannot find post ${params.title}` };
};

export const deletePost = async ({
  params,
  response,
}: {
  params: {
    title: string;
  };
  response: any;
}) => {
  const deleteCount = await Post.delete(params.title);

  if (deleteCount === 0) {
    response.status = 400;
    response.body = { msg: `Cannot find post ${params.title}` };
    return;
  }

  response.body = { msg: "OK" };
  response.status = 200;
};
