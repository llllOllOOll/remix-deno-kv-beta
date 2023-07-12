import { ActionArgs, redirect, json } from "@remix-run/deno";
import React from "react";
//@ts-ignore
import {
  User,
  createUser,
  deleteUser,
  getUser,
} from "../services/db.server.ts";
import { LoaderArgs } from "@remix-run/deno";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ params }: LoaderArgs) => {
  const userID = params.userID;
  return json(await getUser(userID));
};

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.intent === "delete") {
    await deleteUser(data.id);
    return redirect("/users");
  }

  const newUser: User = {
    id: data.id,
    name: data.name,
    email: data.email,
  };

  await createUser(newUser);
  return redirect("/users");
};

export default function UpsertUser() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="form-container">
      <form method="post">
        <input type="hidden" name="id" defaultValue={data.id} />
        <div className="form-field">
          <label className="form-label" htmlFor="name">
            Name
          </label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            defaultValue={data.name}
          />
        </div>

        <div className="form-field">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-input"
            type="text"
            id="email"
            name="email"
            defaultValue={data.email}
          />
        </div>
        <div className="form-btn-container">
          <button name="intent" value="submit" type="submit">
            Update
          </button>
          <button name="intent" value="delete" type="submit">
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}
