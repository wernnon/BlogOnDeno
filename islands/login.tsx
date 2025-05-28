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
    <div class='login-container'>
      <form onSubmit={handleSubmit} class='login-box' >
        <h1 class='titulo-2'>Login</h1>
        <div class='form-container'>
          <label class='form-icon' htmlFor="email">E-mail:</label>
          <input class='form-input'
            placeholder="Digite seu email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange ={(e) => setEmail((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <div class='form-container'>
          <label class='form-icon' htmlFor="senha">Senha:</label>
          <input class='form-input'
          placeholder="Digite sua senha"
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => setSenha((e.target as HTMLInputElement).value)}
            required
          />
        </div>
        <button class='button' type="submit">Entrar</button>
        {mensagem && <p class="text-red-500 text-sm">{mensagem}</p>}
      </form>
      <p>
        Não tem uma conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}