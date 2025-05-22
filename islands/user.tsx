import { useState } from "preact/hooks";

export default function User() {
  const [usuario, setUsuario] = useState("");
  const [cargo, setCargo] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const res = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ usuario, cargo }),
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
      <br />
      <label>
        Cargo:
        <input
          value={cargo}
          onInput={(e) => setCargo((e.target as HTMLInputElement).value)}
          required
        />
      </label>
      <br />
      <button type="submit" style={{ marginTop: "1rem" }}>
        💾 Salvar
      </button>

      {success && <p style={{ color: "green" }}>✔️ Dados atualizados!</p>}
    </form>
  );
}
