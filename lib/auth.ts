// lib/auth.ts
import {
  create,
  verify,
  getNumericDate,
  Payload,
} from "https://deno.land/x/djwt@v2.8/mod.ts";

// Chave secreta para assinar/verificar JWT
const secretKey = "seu_segredo_seguro_aqui"; // Troque por uma string forte e secreta

const secret = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKey),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

// Gera um JWT com ID e nome do usuário
export function gerarJWT(id: number, nome: string) {
  const payload: Payload = {
    iss: "my-blog",
    id,
    nome,
    exp: getNumericDate(60 * 60), // expira em 1 hora
  };

  return create({ alg: "HS256", typ: "JWT" }, payload, secret);
}

// Verifica um JWT e retorna os dados do usuário, ou null se inválido
export async function verificarJWT(token: string): Promise<Payload | null> {
  try {
    const payload = await verify(token, secret);
    return payload;
  } catch {
    return null;
  }
}

// Função auxiliar usada nas rotas protegidas
export async function getUserFromToken(token: string) {
  const payload = await verificarJWT(token);
  if (payload && typeof payload.id === "number" && typeof payload.nome === "string") {
    return { id: payload.id, nome: payload.nome };
  }
  return null;
}
