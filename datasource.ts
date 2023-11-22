import { DataSource } from "./deps.ts";
import { Post } from "./models/post.ts";
import { load } from "./deps.ts";

const env = await load();

function getVar(key: string) {
  return env[key] || Deno.env.get(key);
}

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getVar("DB_HOST"),
  port: Number(getVar("DB_PORT")),
  username: getVar("DB_USER"),
  password: getVar("DB_PASSWORD"),
  database: getVar("DB_NAME"),
  entities: [Post],
  synchronize: true,
  logging: false,
});
