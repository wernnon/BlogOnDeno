import { Handlers } from "$fresh/server.ts";
import { query } from "../../lib/db.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const { nome, email, senha} = await req.json();

      if (!nome || !email || !senha ) {
        return new Response("Todos os campos são obrigatórios", { status: 400 });
      }
      // Verificar se o e-mail já está cadastrado
      const usuariosExistente = await query(
        "SELECT id FROM usuarios WHERE email = $1",
        [email],
      );

      if (usuariosExistente.length > 0) {
        return new Response("E-mail já cadastrado", { status: 409 }); // 409 = conflito
      }

      const hashed = await bcrypt.hash(senha);

      await query(
        "INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)",
        [nome, email, hashed],
      );

      return new Response("Usuário cadastrado com sucesso", { status: 201 });
    } catch (err) {
      console.error("Erro no cadastro:", err);
      return new Response("Erro no servidor", { status: 500 });
    }
  },
};