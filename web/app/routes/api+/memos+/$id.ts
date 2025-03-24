import { LoaderFunctionArgs } from "@remix-run/node";
import { createMemoRepository } from "~/shared/repositories/memo/memo-repository-factory";
import { MemoId } from "~/shared/value-objects/memo-value-objects";

export async function loader({ params }: LoaderFunctionArgs) {
  const memoRepository = createMemoRepository();

  const id = new MemoId(Number(params.id));
  if (isNaN(id.getValue())) {
    throw new Response("Invalid ID", { status: 400 });
  }

  const memo = await memoRepository.findById(id);
  if (!memo) {
    throw new Response("Not Found", { status: 404 });
  }

  return Response.json(memo.toJSON());
}
