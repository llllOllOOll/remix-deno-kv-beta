// deno-lint-ignore-file
import React from "react";
import { Link } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/deno";
import { useLoaderData } from "@remix-run/react";
import { Outlet } from "@remix-run/react";
//@ts-ignore
import { User, getUsers } from "../services/db.server.ts";

export const loader = async ({ request }: LoaderArgs) => {
  const data = await getUsers();
  return json(data);
};

export default function Users() {
  const users = useLoaderData<typeof loader>();
  return (
    <>
      <main>
        <h1 className="title">Remix 🦕 DenoKV Beta</h1>
        <hr />
        <div className="container">
          <div>
            <h4>Users</h4>
            <ul className="listUsers">
              {users.map((user: User) => (
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    💿 {user.name} - {user.email}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="footer">
        <div>
          youtube:{" "}
          <Link to="https://www.youtube.com/@RemixJS-Brasil">
            RemixJS Brasil
          </Link>
        </div>
        <div>
          github:{" "}
          <Link to="https://github.com/llllOllOOll/remix-deno-kv-beta">
            github.com/llllOllOOll
          </Link>
        </div>
      </footer>
    </>
  );
}
