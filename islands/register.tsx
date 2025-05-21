import { useState } from "preact/hooks";


export default function RegisterForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha, cargo }),
    });

    const texto = await res.text();
if (!res.ok) {
  setMensagem(`Erro no cadastro: ${texto}`);
} else {
  setMensagem(texto);
  // redirecionar após sucesso
  setTimeout(() => window.location.href = "/login", 1500);
}
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 >Cadastro</h2>
      <input
        
        type="text"
        placeholder="Nome"
        value={nome}
        onInput={(e) => setNome((e.target as HTMLInputElement).value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onInput={(e) => setSenha((e.target as HTMLInputElement).value)}
        required
      />
      <input
        type="text"
        placeholder="Cargo"
        value={cargo}
        onInput={(e) => setCargo((e.target as HTMLInputElement).value)}
        required
      />
      <button
        type="submit"
      >
        Cadastrar
      </button>
      {mensagem && <p >{mensagem}</p>}
      <p>
        Já tem uma conta?{" "}
        <a href="/login" >
          Faça login
        </a>
      </p>
    </form>
  );
}