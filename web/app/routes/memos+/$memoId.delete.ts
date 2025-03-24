import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { createMemoUsecase } from "~/shared/usecases/memo/memo-usecase-factory";
import { MemoId } from "~/shared/value-objects/memo-value-objects";

export async function action({ params }: ActionFunctionArgs) {
  if (!params.memoId) throw new Error("Parameter is missing");

  const memoUsecase = createMemoUsecase();
  const id = new MemoId(Number(params.memoId));
  await memoUsecase.deleteMemo(id);

  return redirect("/memos");
}
