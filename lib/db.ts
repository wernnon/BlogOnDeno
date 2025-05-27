// db.ts
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const DB_URL = "postgres://postgres:1234@localhost:5432/blogondeno?sslmode=disable";

const pool = new Pool(DB_URL, 3, true);


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
