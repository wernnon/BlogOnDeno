// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_login from "./routes/api/login.ts";
import * as $api_user from "./routes/api/user.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $perfil from "./routes/perfil.tsx";
import * as $perfil_senha from "./routes/perfil/senha.ts";
import * as $register from "./routes/register.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $login_1 from "./islands/login.tsx";
import * as $perfil_1 from "./islands/perfil.tsx";
import * as $register_1 from "./islands/register.tsx";
import * as $user from "./islands/user.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/login.ts": $api_login,
    "./routes/api/user.ts": $api_user,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/perfil.tsx": $perfil,
    "./routes/perfil/senha.ts": $perfil_senha,
    "./routes/register.tsx": $register,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/login.tsx": $login_1,
    "./islands/perfil.tsx": $perfil_1,
    "./islands/register.tsx": $register_1,
    "./islands/user.tsx": $user,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
