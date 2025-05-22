import { useState } from "preact/hooks";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  cargo: string;
}

export default function PerfilForm({ usuario }: { usuario: Usuario }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [cargo, setCargo] = useState(usuario.cargo);
  const [mensagem, setMensagem] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleAtualizarPerfil = async (e: Event) => {
    e.preventDefault();

    const res = await fetch("/perfil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, cargo }),
    });

    if (res.ok) {
      setMensagem("Perfil atualizado com sucesso!");
    } else {
      setMensagem(await res.text());
    }
  };

  const handleAlterarSenha = async (e: Event) => {
    e.preventDefault();

    if (novaSenha !== confirmarSenha) {
      setMensagem("As novas senhas não coincidem.");
      return;
    }

    const res = await fetch("/perfil/senha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        senhaAtual,
        novaSenha,
      }),
    });

    if (res.ok) {
      setMensagem("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } else {
      setMensagem(await res.text());
    }
  };

  return (
    <div>
      <form onSubmit={handleAtualizarPerfil} >
        <label >
          Nome:
          <input
            type="text"
            value={nome}
            onInput={(e) => setNome((e.target as HTMLInputElement).value)}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </label>

        <label>
          Cargo:
          <input
            type="text"
            value={cargo}
            onInput={(e) => setCargo((e.target as HTMLInputElement).value)}
          />
        </label>

        <button
          type="submit"
        >
          Atualizar Perfil
        </button>
      </form>

      <form onSubmit={handleAlterarSenha} >
        <h2>Alterar Senha</h2>

        <label>
          Senha atual:
          <input
            type="password"
            value={senhaAtual}
            onInput={(e) => setSenhaAtual((e.target as HTMLInputElement).value)}
          />
        </label>

        <label>
          Nova senha:
          <input
            type="password"
            value={novaSenha}
            onInput={(e) => setNovaSenha((e.target as HTMLInputElement).value)}
          />
        </label>

        <label>
          Confirmar nova senha:
          <input
            type="password"
            value={confirmarSenha}
            onInput={(e) =>
              setConfirmarSenha((e.target as HTMLInputElement).value)
            }
          />
        </label>

        <button
          type="submit"
        >
          Alterar Senha
        </button>
      </form>

      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}
