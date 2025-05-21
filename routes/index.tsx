import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { PageProps } from "$fresh/server.ts"

interface Data {
  timestamp: string;
}

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
