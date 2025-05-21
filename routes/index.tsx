import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { PageProps } from "$fresh/server.ts"
import { Handlers } from "$fresh/server.ts";  
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";


interface Data {
  timestamp: string;
}
export const handler: Handlers<Data> = {
  async GET(_req, _ctx) {
    const client = new Client({
      user: "derondev",       // altere aqui
      password: "1234",   // altere aqui
      database: "blogondeno",     // altere aqui
      hostname: "localhost",
      port: 5432,
    });

    try {
      await client.connect();
      const result = await client.queryObject<{ now: string }>("SELECT NOW() AS now;");
      await client.end();
      return new Response(JSON.stringify({ timestamp: result.rows[0].now }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (e: unknown) {
  const errorMessage = e instanceof Error ? e.message : String(e);
  return new Response(JSON.stringify({ timestamp: "Erro ao conectar: " + errorMessage }), {
    headers: { "Content-Type": "application/json" },
  });
}

  },
};

export default function Home(props: PageProps<Data>) {
  const count = useSignal(3);
  return (
    <div>
      <div>
        <img
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo"
        />
        <h1 >Welcome to Fresh</h1>
        <Counter count={count} />
      </div>
    </div>
  );
}
