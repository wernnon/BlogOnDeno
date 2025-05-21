import { Handlers } from "$fresh/server.ts";
import { query } from "../../lib/db.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { gerarJWT } from "../../lib/auth.ts";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const { email, senha } = await req.json();
      const users = await query("SELECT * FROM usuarios WHERE email = $1", [email]);

      if (users.length === 0) {
        return new Response("Usuário não encontrado", { status: 404 });
      }

      const user = users[0] as Usuario;
      const valid = await bcrypt.compare(senha, user.senha);
      if (!valid) {
        return new Response("Senha incorreta", { status: 401 });
      }

      const token = await gerarJWT(user.id, user.nome);

      return new Response(null, {
        status: 302,
        headers: {
          "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=3600`,
          "Location": "/perfil",
        },
      });
    } catch (err) {
      console.error("Erro no login:", err);
      return new Response("Erro no servidor", { status: 500 });
    }
  },
};
