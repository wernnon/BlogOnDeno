// db.ts
import { Client, Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const client = new Client({
  user: "derondev",
  password: "1234",
  database: "blogondeno",
  hostname: "localhost",
  port: 5432,
});
const DB_URL = "postgres://derondev:1234@localhost:5432/blogondeno";

const pool = new Pool(DB_URL, 3, true);

export type Post = {
  id: number;
  title: string;
  body: string;
};

export async function query(sql: string, params: unknown[] = []) {
  const client = await pool.connect();
  try {
    const result = await client.queryObject({
      text: sql,
      args: params,
    });
    return result.rows;
  } finally {
    client.release();
  }
}
// Retorna os posts do banco já tipados corretamente
export async function getPosts(): Promise<Post[]> {
  return await query("SELECT id, title, body FROM posts") as Post[];
}

// Insere um novo post
export async function createPost(title: string, body: string) {
  await query("INSERT INTO posts (title, body) VALUES ($1, $2)", [title, body]);
}

await client.connect();

export default client;