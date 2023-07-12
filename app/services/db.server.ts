const db = await Deno.openKv();

export interface User {
  id: string;
  name: string;
  email: string;
}

export const getUsers = async () => {
  const users: User[] = [];
  const iter = await db.list({ prefix: ["users"] });

  for await (const item of iter) {
    users.push(item.value as User);
  }
  return users;
};

export const getUser = async (id: string) => {
  const userKey = ["users", id];
  const res = await db.get<User>(userKey);
  return res.value;
};

export const deleteUser = async (id: string) => {
  const userKey = ["users", id];
  await db.delete(userKey);
};
export const createUser = async (user: User) => {
  const userKey = ["users", user.id];
  const userEmailKey = ["users_by_email", user.email];

  const res = await db.get<User>(userKey);

  if (!res.value) {
    const success = await db
      .atomic()
      .check(res)
      .set(userKey, user)
      .set(userEmailKey, user.id)
      .commit();

    if (!success) throw new Error("Failed to create user");
  } else {
    const success = await db
      .atomic()
      .check(res)
      .delete(["users_by_email", res.value.email])
      .set(userKey, user)
      .set(userEmailKey, user.id)
      .commit();
    if (!success) throw new Error("Failed to update user");
  }
};
