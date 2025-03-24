import { createMemoRepository } from "~/shared/repositories/memo/memo-repository-factory";

export async function loader() {
  const memoRepository = createMemoRepository();

  const memos = await memoRepository.findAll();

  return Response.json(memos.map((memo) => memo.toJSON()));
}
