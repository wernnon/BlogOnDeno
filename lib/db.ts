// db.ts
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const DB_URL = "postgres://postgres:1234@localhost:5432/blogondeno?sslmode=disable";

const pool = new Pool(DB_URL, 3, true);

export type Post = {
  id_post: number;
  titulo: string;
  conteudo: string;
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
  return await query("SELECT id_post, titulo, conteudo FROM posts") as Post[];
}

// Insere um novo post
export async function createPost(titulo: string, conteudo: string) {
  await query("INSERT INTO posts (titulo, conteudo) VALUES ($1, $2)", [titulo, conteudo]);
}
