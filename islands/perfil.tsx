import { useState } from "preact/hooks";

interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export default function PerfilForm({ usuario }: { usuario: Usuario }) {
  const [nome, setNome] = useState(usuario.nome);
  const [email, setEmail] = useState(usuario.email);
  const [mensagem, setMensagem] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleAtualizarPerfil = async (e: Event) => {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email}),
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

    const res = await fetch("/api/perfil/senha", {
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
    <div class='side-by-sider'>
      <div class='login-box'>
      <form onSubmit={handleAtualizarPerfil} >
        <div class='form-container'>
            <label class='form-icon'>
            Nome:
            </label>
            <input class='form-input'
              type="text"
              value={nome}
              onInput={(e) => setNome((e.target as HTMLInputElement).value)}
            />
        </div>
        <div class='form-container'>
          <label class='form-icon'>
            Email:
            </label>
            <input
              class='form-input'
              type="email"
              value={email}
              onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            />
        </div>
        <div class='gambi'>
          a
        </div>
          <button
          class='button'
          type="submit"
          >
            Atualizar Perfil
          </button>
        </form>
      </div>
      <div class='login-box'>
        <form onSubmit={handleAlterarSenha} >
          <div class='form-container'> 
            <label  class='form-icon'>
              Senha atual:
            </label>
            <input
              class='form-input'
              type="text"
              value={senhaAtual}
              onInput={(e) => setSenhaAtual((e.target as HTMLInputElement).value)}
            />
          </div>
          <div class='form-container'>
            <label  class='form-icon'>
              Nova senha:
            </label>
            <input
              class='form-input'
              type="text"
              value={novaSenha}
              onInput={(e) => setNovaSenha((e.target as HTMLInputElement).value)}
              />
          </div>
          <div class='form-container'>    

            <label  class='form-icon'>
              Confirmar:
            </label>
            <input
              class='form-input'
              type="text"
              value={confirmarSenha}
              onInput={(e) =>
                setConfirmarSenha((e.target as HTMLInputElement).value)
             }
             />
            </div>
            <button
              class='button'
              type="submit"
              >
              Alterar Senha
            </button>
        {mensagem && <p>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
}