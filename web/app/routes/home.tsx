import { Link, useLoaderData } from "@remix-run/react";
import { getUser } from "~/domains/users/prisma-user-repository";

export async function loader() {
  const user = await getUser();
  return { user };
}

export default function HomePage() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>ユーザー情報</h1>
      {user ? (
        <>
          <p>ID: {user.id}</p>
          <p>Email: {user.email}</p>
          <p>Name: {user.name ?? "No name"}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/memos">メモ一覧へ</Link>
    </div>
  );
}
