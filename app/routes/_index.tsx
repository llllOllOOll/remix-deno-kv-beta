import { redirect, type V2_MetaFunction } from "@remix-run/deno";
import * as React from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix App -  Deno KV Demo" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = () => {
  return redirect("/users");
};

export default function Index() {
  return <h1>Deno KV</h1>;
}
