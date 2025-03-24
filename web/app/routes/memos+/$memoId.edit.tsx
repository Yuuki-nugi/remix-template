import {
  LoaderFunctionArgs,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";
import { MemoViewModel } from "~/view/memo/memo-view-model";
import { createMemoRepository } from "~/shared/repositories/memo/memo-repository-factory";
import { createMemoUsecase } from "~/shared/usecases/memo/memo-usecase-factory";

export async function loader({ params }: LoaderFunctionArgs) {
  const memoId = new MemoId(Number(params.memoId));
  const memoRepository = createMemoRepository();
  const memo = await memoRepository.findById(memoId);

  if (!memo) {
    return redirect("/memos");
  }
  return {
    memo: memo.toJSON(),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const memoUsecase = createMemoUsecase();
  const form = await request.formData();

  const id = new MemoId(Number(form.get("id")));
  const text = new MemoText(form.get("text") as string);
  await memoUsecase.updateMemo(id, text);
  return redirect("/memos");
}

export default function MemoEditPage() {
  const data = useLoaderData<typeof loader>();
  const memo = MemoViewModel.fromDTO(data.memo);

  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">
          ID: ${memo.id.getValue()} の編集
        </h2>
        <Form method="post">
          <input type="hidden" name="id" value={memo.id.getValue()} />
          <input
            type="text"
            name="text"
            className="border p-2 w-full mb-4"
            defaultValue={memo.text.getValue()}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                navigate("/memos");
              }}
              className="bg-gray-300 text-black px-3 py-1 mr-2"
            >
              キャンセル
            </button>
            <button className="bg-blue-600 text-white px-3 py-1" type="submit">
              保存
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
