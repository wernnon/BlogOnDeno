
import PerfilForm from "../islands/perfil.tsx";


// Função para extrair o token do cookie


// Página de perfil que renderiza o formulário com os dados do usuário
export default function PerfilPage() {
  return (
    <div >
      <h1 >Meu Perfil</h1>
      <PerfilForm usuario={{ id: 1, nome: "Joaquim", email: "bA4wO@example.com", cargo: "Desenvolvedor" }}/>
    </div>
  );
}
