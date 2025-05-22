import { Handlers } from "$fresh/server.ts";
import { query } from "../../lib/db.ts";
import { verificarJWT } from "../../lib/auth.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";

// Função auxiliar para extrair o token do cookie
function extrairToken(cookie: string | null): string | null {
  if (!cookie) return null;
  const token = cookie.split(";").find((c) => c.trim().startsWith("token="));
  return token?.split("=")[1] ?? null;
}

// Define a estrutura esperada do corpo da requisição
interface SenhaPayload {
  senhaAtual: string;
  novaSenha: string;
}

export const handler: Handlers = {
  async POST(req) {
    // Extrai e valida o token
    const token = extrairToken(req.headers.get("cookie"));
    if (!token) return new Response("Não autorizado", { status: 401 });

    const user = await verificarJWT(token);
    if (!user) return new Response("Token inválido", { status: 401 });

    // Corrigido: tipagem segura para o body
    let data: SenhaPayload;
    try {
      data = await req.json() as SenhaPayload;
    } catch {
      return new Response("Erro ao processar dados", { status: 400 });
    }

    if (!data?.senhaAtual || !data?.novaSenha) {
      return new Response("Dados inválidos", { status: 400 });
    }

    // Busca a senha atual no banco
    const result = await query("SELECT senha FROM usuarios WHERE id = $1", [
      user.id,
    ]);
    if (result.length === 0) {
      return new Response("Usuário não encontrado", { status: 404 });
    }

    // Tipagem explícita para evitar erro TS2571
    const row = result[0] as { senha: string };
    const senhaHash = row.senha;

    // Verifica se a senha atual está correta
    const validaSenha = await bcrypt.compare(data.senhaAtual, senhaHash);
    if (!validaSenha) {
      return new Response("Senha atual incorreta", { status: 401 });
    }

    // Atualiza a senha no banco
    const novaHash = await bcrypt.hash(data.novaSenha);
    await query("UPDATE usuarios SET senha = $1 WHERE id = $2", [
      novaHash,
      user.id,
    ]);

    return new Response("Senha alterada com sucesso");
  },
};
