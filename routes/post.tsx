// routes/post.tsx
import { Handlers, PageProps } from "$fresh/server.ts";
import PostsView from "../islands/post.tsx";
import User from "../islands/user.tsx";
import { getPosts } from "../lib/db.ts"; // 👈 importar do DB

type Post = {
  id_post: number;
  titulo: string;
  conteudo: string;
};

type Data = {
  local: { id: string; cargo: string };
  api: { userId: number; id_post: number; titulo: string; conteudo: string };
  posts: Post[]; // 👈 adicionar aqui
};

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const text = await Deno.readTextFile("data.json");
    const localData = JSON.parse(text);

    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const apiData = await res.json();

    const posts = await getPosts(); // 👈 buscar os posts do banco

    return ctx.render({ local: localData, api: apiData, posts });
  },
};

export default function PostPage({ data }: PageProps<Data>) {
  return (
    <div>
      <h1>Dados do Blog</h1>

      <h2>Usuário local</h2>
      <ul>
        <li><strong>Nome:</strong> {data.local.id}</li>
        <li><strong>Cargo:</strong> {data.local.cargo}</li>
      </ul>

      <h2>Post da API</h2>
      <ul>
        <li><strong>ID:</strong> {data.api.id_post}</li>
        <li><strong>Título:</strong> {data.api.titulo}</li>
        <li><strong>Texto:</strong> {data.api.conteudo}</li>
      </ul>

      <hr  />
      <PostsView posts={data.posts} /> 
      <User />
    </div>
  );
}
