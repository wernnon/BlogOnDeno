// routes/api/post.ts
import { Handlers } from "$fresh/server.ts";
import { query } from "../../lib/db.ts";

export const handler: Handlers = {
  async GET(_req) {
    try {
      const posts = await query("SELECT * FROM posts");
      return new Response(JSON.stringify(posts), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    } catch (err) {
      console.error("Erro no GET /api/post:", err);
      return new Response("Erro ao buscar posts", { status: 500 });
    }
  },

  async POST(req) {
    try {
      const Conteudo = await req.json();
      const { titulo, conteudo } = Conteudo;

      if (!titulo || !conteudo) {
        return new Response("Título e conteúdo são obrigatórios", { status: 400 });
      }

      await query(
        "INSERT INTO posts (titulo, conteudo) VALUES ($1, $2)",
        [titulo, conteudo]
      );

      return new Response("Post criado com sucesso", { status: 201 });
    } catch (err) {
      console.error("Erro no POST /api/post:", err);
      return new Response("Erro ao criar post", { status: 500 });
    }
  },
};
