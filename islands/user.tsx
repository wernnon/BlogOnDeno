import { useState } from "preact/hooks";

export default function User() {
  const [usuario, setUsuario] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ usuario }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
      <h3>✍️ Atualizar dados locais</h3>

      <label>
        Usuário:
        <input
          value={usuario}
          onInput={(e) => setUsuario((e.target as HTMLInputElement).value)}
          required
        />
      </label>
      <button type="submit" style={{ marginTop: "1rem" }}>
        💾 Salvar
      </button>

      {success && <p style={{ color: "green" }}>✔️ Dados atualizados!</p>}
    </form>
  );
}
