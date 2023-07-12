// deno-lint-ignore-file
import { ActionArgs, redirect } from "@remix-run/deno";
import React from "react";
import { Link } from "@remix-run/react";
//@ts-ignore
import { User, createUser } from "../services/db.server.ts";

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newUser: User = {
    id: crypto.randomUUID(),
    name: data.name.toString(),
    email: data.email.toString(),
  };

  await createUser(newUser);
  return redirect("/users");
};

export default function CreateUser() {
  return (
    <div className="form-container">
      <form method="post">
        <div className="form-field">
          <label className="form-label" htmlFor="name"></label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            placeholder="name"
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email"></label>
          <input
            className="form-input"
            type="text"
            id="email"
            name="email"
            placeholder="email"
          />
        </div>
        <button type="submit">Create new User</button>
      </form>
    </div>
  );
}
