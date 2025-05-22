import { useState } from "preact/hooks";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  
  
  const handleSubmit = async (e: Event) => {
  
    e.preventDefault();
  
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({email, senha}),
    });
      if(res.redirected) {

        window.location.href = res.url;
      }
      else {  
    
        const erro = await res.text();
        setMensagem(erro);
    
      }
  
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Nome de Usuário:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange ={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="senha"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
        {mensagem && <p class="text-red-500 text-sm">{mensagem}</p>}
      </form>
      <p>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}