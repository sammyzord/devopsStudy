import { Hono } from "../deps.ts";
import { Post } from "../models/post.ts";
import { AppDataSource } from "../datasource.ts";

const post = new Hono();

post.post("/", async (c) => {
  const { title, body } = await c.req.json();

  const post = new Post();

  post.title = title;
  post.body = body;

  await AppDataSource.manager.save(post);

  return c.json({
    status: "ok",
  });
});

post.get("/", async (c) => {
  const posts = await AppDataSource.manager.find(Post);

  return c.json({
    status: "ok",
    data: posts,
  });
});

export default post;
