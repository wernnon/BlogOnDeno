import { Handlers, PageProps } from "$fresh/server.ts";
import PerfilForm from "../islands/perfil.tsx";
import { verificarJWT } from "../lib/auth.ts";
import { query } from "../lib/db.ts";

// Função para extrair o token do cookie
function extrairToken(cookie: string | null): string | null {
  if (!cookie) return null;
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="));
  return token?.split("=")[1] ?? null;
}

export const handler: Handlers = {
  // GET: Carrega os dados do usuário autenticado
  async GET(req, ctx) {
    const token = extrairToken(req.headers.get("cookie"));
    if (!token) {
      return new Response("Não autorizado", { status: 401 });
    }

    const user = await verificarJWT(token);
    if (!user) {
      return new Response("Token inválido", { status: 401 });
    }

    const result = await query(
      "SELECT id, nome, email FROM usuarios WHERE id = $1",
      [user.id],
    );

    if (result.length === 0) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    return ctx.render(result[0]);
  },

  // POST: Atualiza os dados do usuário, incluindo o e-mail
  async POST(req) {
    const token = extrairToken(req.headers.get("cookie"));
    if (!token) return new Response("Não autorizado", { status: 401 });

    const user = await verificarJWT(token);
    if (!user) return new Response("Token inválido", { status: 401 });

    // Espera os dados do corpo da requisição
    const { nome, email} = await req.json();

    if (!nome || !email ) {
      return new Response("Dados incompletos", { status: 400 });
    }

    try {
      await query(
        "UPDATE usuarios SET nome = $1, email = $2  WHERE id = $4",
        [nome, email, user.id],
      );

      return new Response("Dados atualizados com sucesso", { status: 200 });
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return new Response("Erro ao atualizar usuário", { status: 500 });
    }
  },
};

// Página de perfil que renderiza o formulário com os dados do usuário
export default function PerfilPage({ data }: PageProps) {
  return (
    <div class='login-container'>
      <h1>Meu Perfil</h1>
      <PerfilForm usuario={data} />
    </div>
  );
}

