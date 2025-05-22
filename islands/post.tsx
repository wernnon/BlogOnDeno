import { useState } from "preact/hooks";

type Posts = {
  id_post: number;
  titulo: string;
  conteudo: string;
};

export default function PostsView({ posts }: { posts: Posts[] }) {
  const [post, setPost] = useState<Posts | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadPost() {
    setLoading(true);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/2");
    const data = await res.json();
    setPost(data);
    setLoading(false);
  }

  return (
    <div>
      <button type ='submit' onClick={loadPost}>
        🔄 Carregar outro post
      </button>

      {loading && <p>Carregando...</p>}

      {post && (
        <div >
          <h3 >🆕 Novo Post</h3>
          <p><strong>Título:</strong> {post.id_post}</p>
          <p>{post.conteudo}</p>
        </div>
      )}

      <h2>📚 Posts do Banco</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id_post}>
            <h3 >{p.titulo}</h3>
            <p>{p.conteudo}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
