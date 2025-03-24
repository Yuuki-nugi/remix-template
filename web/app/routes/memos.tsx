import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";
import { MemoViewModel } from "~/view/memo/memo-view-model";
import { createMemoRepository } from "~/shared/repositories/memo/memo-repository-factory";
import { MemoListItem } from "~/view/memo/components/MemoListItem";
import { createMemoUsecase } from "~/shared/usecases/memo/memo-usecase-factory";

// ローダーでアイテム一覧取得
export async function loader() {
  const memoRepository = createMemoRepository();
  const memos = await memoRepository.findAll();
  return {
    memos: memos.map((m) => m.toJSON()),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const memoUsecase = createMemoUsecase();

  const form = await request.formData();
  const intent = form.get("_intent");

  if (intent === "update") {
    const id = new MemoId(Number(form.get("id")));
    const text = new MemoText(form.get("text") as string);
    await memoUsecase.updateMemo(id, text);
  } else if (intent === "delete") {
    const id = new MemoId(Number(form.get("id")));
    await memoUsecase.deleteMemo(id);
  } else if (intent === "create") {
    const text = new MemoText(form.get("text") as string);
    await memoUsecase.createMemo(text);
  }

  return redirect("/memos");
}

export default function MemosPage() {
  const data = useLoaderData<typeof loader>();
  const memos = data.memos.map((dto) => MemoViewModel.fromDTO(dto));

  const fetcher = useFetcher();
  const memoFetcher = useFetcher<{ id: MemoId; text: string }>();

  const [editingMemoId, setEditingMemoId] = useState<MemoId | null>(null);
  const [creating, setCreating] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    if (memoFetcher.data && editingMemoId !== null) {
      setModalText(memoFetcher.data.text);
    }
  }, [memoFetcher.data, editingMemoId]);

  const openEditModal = async (id: MemoId) => {
    memoFetcher.load(`/api/memos/${id.getValue()}`);
    setEditingMemoId(id);
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.set("_intent", editingMemoId ? "update" : "create");
    if (editingMemoId) formData.set("id", editingMemoId.getValue().toString());
    formData.set("text", modalText);
    fetcher.submit(formData, { method: "post" });
    setEditingMemoId(null);
    setCreating(false);
  };

  return (
    <div>
      <h1>メモ一覧</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 mb-4"
        onClick={() => {
          setModalText("");
          setCreating(true);
        }}
      >
        新規作成
      </button>
      <ul>
        {memos.map((item) => (
          <MemoListItem
            key={item.id.getValue()}
            item={item}
            onEdit={openEditModal}
          />
        ))}
      </ul>

      {/* モーダル */}
      {(editingMemoId !== null || creating) && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-lg font-bold mb-4">
              {creating ? "新規作成" : `ID: ${editingMemoId} の編集`}
            </h2>
            <input
              type="text"
              value={modalText}
              onChange={(e) => setModalText(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setEditingMemoId(null);
                  setCreating(false);
                }}
                className="bg-gray-300 text-black px-3 py-1 mr-2"
              >
                キャンセル
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-3 py-1"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
