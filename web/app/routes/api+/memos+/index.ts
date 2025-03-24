import { createMemoRepository } from "~/domains/memos/memo-repository-factory";

export async function loader() {
  const memoRepository = createMemoRepository();

  const memos = await memoRepository.findAll();

  return Response.json(memos.map((memo) => memo.toJSON()));
}
