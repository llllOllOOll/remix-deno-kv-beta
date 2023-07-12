import * as React from "react";
import { Link } from "@remix-run/react";

export default function Home() {
  return (
    <div className="container-create">
      <div className="btn-create-user">
        <Link to={"/users/new"}>Create user</Link>
      </div>
    </div>
  );
}
