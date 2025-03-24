import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { MemoText } from "~/shared/value-objects/memo-value-objects";
import { createMemoUsecase } from "~/shared/usecases/memo/memo-usecase-factory";

export async function action({ request }: ActionFunctionArgs) {
  const memoUsecase = createMemoUsecase();
  const form = await request.formData();

  const text = new MemoText(form.get("text") as string);
  await memoUsecase.createMemo(text);
  return redirect("/memos");
}

export default function MemosCreatePage() {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-4">新規作成</h2>
        <Form method="post">
          <input type="text" name="text" className="border p-2 w-full mb-4" />
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
              作成
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
