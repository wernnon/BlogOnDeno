import { useState } from "preact/hooks";


export default function RegisterForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, email, senha }),
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
    <form onSubmit={handleSubmit} class='login-container'>
      <div class='login-box'>
        <h2 class='titulo-2'>Cadastro</h2>
        <div class='form-container'>  
          <div class='form-icon'>Nome:</div>
          <input
            class='form-input'
            type="text"
            placeholder="Nome"
            value={nome}
            onInput={(e) => setNome((e.target as HTMLInputElement).value)}
            required
            />
        </div>    
        <div class='form-container'>    
          <div class='form-icon'>Email:</div>
          <input
            class='form-input'
            type="email"
            placeholder="Email"
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
            />
        </div>    
        <div class='form-container'>
          <div class='form-icon'>Senha:</div>
          <input
            class='form-input'
            type="password"
            placeholder="Senha"
            value={senha}
            onInput={(e) => setSenha((e.target as HTMLInputElement).value)}
            required
            />
        </div>
          <button class='button' type="submit">
            Cadastrar
          </button>
      </div>
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