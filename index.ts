import { Hono, HTTPException } from "./deps.ts";
import post from "./routes/post.ts";
import { AppDataSource } from "./datasource.ts";
import { logger } from "./logger.ts";

const app = new Hono();

app.route("/post", post);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  logger.error(err);
  return c.json({ status: err.message }, 500);
});

AppDataSource.initialize()
  .then(() => {
    Deno.serve(app.fetch);
  })
  .catch((error) => logger.error(error));
