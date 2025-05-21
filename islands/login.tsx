import { useState } from "preact/hooks";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensagem, setMensagem] = useState("");
  
  
  const handleSubmit = async (e: Event) => {
  
    e.preventDefault();
  
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({email, password}),
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
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}